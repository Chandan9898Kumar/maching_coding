# Frontend Security Guide: 7 Critical Lessons

## Table of Contents
1. [XSS (Cross-Site Scripting) Attacks](#1-xss-cross-site-scripting-attacks)
2. [CSRF (Cross-Site Request Forgery) Exploits](#2-csrf-cross-site-request-forgery-exploits)
3. [CORS (Cross-Origin Resource Sharing) Misuse](#3-cors-cross-origin-resource-sharing-misuse)
4. [JWT Storage Risks](#4-jwt-storage-risks)
5. [CSP (Content Security Policy)](#5-csp-content-security-policy)
6. [Clickjacking Attacks](#6-clickjacking-attacks)
7. [Secure Headers](#7-secure-headers)
8. [Scenario-Based Security Questions](#8-scenario-based-security-questions)

---

## 1. XSS (Cross-Site Scripting) Attacks

### What is XSS?
XSS occurs when malicious scripts are injected into trusted websites. The key principle: **User input ≠ safe input**.

### Types of XSS:
- **Stored XSS**: Malicious script stored on server
- **Reflected XSS**: Script reflected from user input
- **DOM-based XSS**: Script executes in DOM without server interaction

### Vulnerable Code Examples:

```javascript
// VULNERABLE: Direct innerHTML injection
function displayUserComment(comment) {
    document.getElementById('comments').innerHTML = comment;
    // If comment = "<script>alert('XSS')</script>", it executes!
}

// VULNERABLE: Direct URL parameter usage
const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('msg');
document.getElementById('welcome').innerHTML = `Welcome ${message}`;
// URL: site.com?msg=<script>steal_cookies()</script>
```

### Prevention Strategies:

```javascript
// SECURE: Input sanitization and validation
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// SECURE: Use textContent instead of innerHTML
function displayUserComment(comment) {
    const sanitized = sanitizeInput(comment);
    document.getElementById('comments').textContent = sanitized;
}

// SECURE: Template literals with proper escaping
function createUserCard(user) {
    return `
        <div class="user-card">
            <h3>${escapeHtml(user.name)}</h3>
            <p>${escapeHtml(user.bio)}</p>
        </div>
    `;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// SECURE: Using DOMPurify library
import DOMPurify from 'dompurify';

function displayRichContent(htmlContent) {
    const clean = DOMPurify.sanitize(htmlContent);
    document.getElementById('content').innerHTML = clean;
}
```

### React/Vue Prevention:
```jsx
// React automatically escapes by default
function UserProfile({ user }) {
    return (
        <div>
            <h1>{user.name}</h1> {/* Safe - automatically escaped */}
            <div dangerouslySetInnerHTML={{__html: user.bio}} /> {/* Dangerous! */}
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(user.bio)}} /> {/* Safe */}
        </div>
    );
}
```

---

## 2. CSRF (Cross-Site Request Forgery) Exploits

### What is CSRF?
CSRF tricks users into executing unwanted actions on applications where they're authenticated. **Hidden requests can destroy trust**.

### Attack Example:
```html
<!-- Malicious site with hidden form -->
<form action="https://bank.com/transfer" method="POST" style="display:none">
    <input name="to" value="attacker@evil.com">
    <input name="amount" value="10000">
</form>
<script>document.forms[0].submit();</script>
```

### Prevention Strategies:

#### 1. CSRF Tokens
```javascript
// Server generates unique token per session
app.use(csrf());

// Frontend includes token in requests
function transferMoney(to, amount) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    
    fetch('/transfer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({ to, amount })
    });
}
```

#### 2. SameSite Cookies
```javascript
// Server sets SameSite cookie attribute
app.use(session({
    cookie: {
        sameSite: 'strict', // or 'lax'
        secure: true,
        httpOnly: true
    }
}));
```

#### 3. Double Submit Cookie Pattern
```javascript
// Generate random token
function generateCSRFToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Set as cookie and include in request
function makeSecureRequest(data) {
    const token = generateCSRFToken();
    document.cookie = `csrf-token=${token}; Secure; SameSite=Strict`;
    
    fetch('/api/secure-endpoint', {
        method: 'POST',
        headers: {
            'X-CSRF-Token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
```

---

## 3. CORS (Cross-Origin Resource Sharing) Misuse

### What is CORS?
CORS controls which domains can access your resources. **Wrong config = open door for attackers**.

### Dangerous CORS Configurations:

```javascript
// DANGEROUS: Wildcard with credentials
app.use(cors({
    origin: '*',
    credentials: true // This combination is forbidden and dangerous
}));

// DANGEROUS: Reflecting any origin
app.use(cors({
    origin: (origin, callback) => {
        callback(null, origin); // Accepts any origin!
    },
    credentials: true
}));
```

### Secure CORS Configuration:

```javascript
// SECURE: Whitelist specific origins
const allowedOrigins = [
    'https://myapp.com',
    'https://admin.myapp.com',
    'https://api.myapp.com'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// SECURE: Environment-based configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://myapp.com'] 
        : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
};
```

### Frontend CORS Handling:
```javascript
// Proper error handling for CORS issues
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data', {
            method: 'GET',
            credentials: 'include', // Include cookies
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('CORS')) {
            console.error('CORS error - check server configuration');
        }
        throw error;
    }
}
```

---

## 4. JWT Storage Risks

### The Problem
**localStorage isn't always safe** for storing JWTs due to XSS vulnerabilities.

### Storage Options Comparison:

| Storage Method | XSS Vulnerable | CSRF Vulnerable | Persistent | Accessible to JS |
|----------------|----------------|-----------------|------------|------------------|
| localStorage   | ✅ Yes         | ❌ No           | ✅ Yes     | ✅ Yes           |
| sessionStorage | ✅ Yes         | ❌ No           | ❌ No      | ✅ Yes           |
| httpOnly Cookie| ❌ No          | ✅ Yes          | ✅ Yes     | ❌ No            |
| Memory         | ❌ No          | ❌ No           | ❌ No      | ✅ Yes           |

### Secure JWT Implementation:

#### Option 1: httpOnly Cookies (Recommended)
```javascript
// Server sets httpOnly cookie
app.post('/login', (req, res) => {
    const token = generateJWT(user);
    
    res.cookie('token', token, {
        httpOnly: true,    // Prevents XSS
        secure: true,      // HTTPS only
        sameSite: 'strict', // Prevents CSRF
        maxAge: 3600000    // 1 hour
    });
    
    res.json({ success: true });
});

// Frontend doesn't handle token directly
fetch('/api/protected', {
    credentials: 'include' // Automatically includes httpOnly cookies
});
```

#### Option 2: Memory Storage with Refresh Tokens
```javascript
class TokenManager {
    constructor() {
        this.accessToken = null;
        this.refreshToken = null;
    }
    
    async login(credentials) {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
        const { accessToken, refreshToken } = await response.json();
        
        // Store access token in memory
        this.accessToken = accessToken;
        
        // Store refresh token in httpOnly cookie
        this.refreshToken = refreshToken;
        
        // Set up automatic refresh
        this.scheduleTokenRefresh();
    }
    
    async makeAuthenticatedRequest(url, options = {}) {
        if (!this.accessToken || this.isTokenExpired()) {
            await this.refreshAccessToken();
        }
        
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${this.accessToken}`
            }
        });
    }
    
    isTokenExpired() {
        if (!this.accessToken) return true;
        
        const payload = JSON.parse(atob(this.accessToken.split('.')[1]));
        return Date.now() >= payload.exp * 1000;
    }
    
    async refreshAccessToken() {
        const response = await fetch('/refresh', {
            method: 'POST',
            credentials: 'include' // Sends httpOnly refresh token
        });
        
        const { accessToken } = await response.json();
        this.accessToken = accessToken;
        this.scheduleTokenRefresh();
    }
    
    scheduleTokenRefresh() {
        const payload = JSON.parse(atob(this.accessToken.split('.')[1]));
        const expiresIn = (payload.exp * 1000) - Date.now();
        const refreshTime = expiresIn - 60000; // Refresh 1 minute before expiry
        
        setTimeout(() => this.refreshAccessToken(), refreshTime);
    }
}
```

#### Option 3: Secure localStorage with Additional Protection
```javascript
class SecureTokenStorage {
    constructor() {
        this.storageKey = 'app_token';
        this.fingerprintKey = 'app_fingerprint';
    }
    
    generateFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Browser fingerprint', 2, 2);
        
        return canvas.toDataURL() + 
               navigator.userAgent + 
               navigator.language + 
               screen.width + screen.height;
    }
    
    async storeToken(token) {
        const fingerprint = this.generateFingerprint();
        const hashedFingerprint = await this.hashString(fingerprint);
        
        localStorage.setItem(this.storageKey, token);
        localStorage.setItem(this.fingerprintKey, hashedFingerprint);
    }
    
    async getToken() {
        const token = localStorage.getItem(this.storageKey);
        const storedFingerprint = localStorage.getItem(this.fingerprintKey);
        
        if (!token || !storedFingerprint) return null;
        
        const currentFingerprint = this.generateFingerprint();
        const hashedCurrentFingerprint = await this.hashString(currentFingerprint);
        
        if (storedFingerprint !== hashedCurrentFingerprint) {
            this.clearToken();
            return null;
        }
        
        return token;
    }
    
    clearToken() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.fingerprintKey);
    }
    
    async hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
}
```

---

## 5. CSP (Content Security Policy)

### What is CSP?
CSP is **the shield browsers give you, if you use it**. It prevents XSS by controlling resource loading.

### Basic CSP Implementation:

```html
<!-- Meta tag approach -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

```javascript
// Server header approach (recommended)
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https:; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "connect-src 'self' https://api.example.com;"
    );
    next();
});
```

### Progressive CSP Implementation:

#### Level 1: Basic Protection
```javascript
const cspLevel1 = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", "data:", "https:"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'connect-src': ["'self'"]
};
```

#### Level 2: Nonce-based
```javascript
// Generate nonce for each request
function generateNonce() {
    return crypto.randomBytes(16).toString('base64');
}

app.use((req, res, next) => {
    const nonce = generateNonce();
    res.locals.nonce = nonce;
    
    res.setHeader('Content-Security-Policy',
        `default-src 'self'; ` +
        `script-src 'self' 'nonce-${nonce}'; ` +
        `style-src 'self' 'nonce-${nonce}';`
    );
    next();
});
```

```html
<!-- Use nonce in templates -->
<script nonce="<%= nonce %>">
    // Inline script allowed with nonce
    console.log('This script is allowed');
</script>
```

#### Level 3: Hash-based
```javascript
// Calculate hash for inline scripts
const crypto = require('crypto');

function calculateScriptHash(script) {
    return crypto.createHash('sha256').update(script).digest('base64');
}

const inlineScript = "console.log('Hello World');";
const scriptHash = calculateScriptHash(inlineScript);

const csp = `script-src 'self' 'sha256-${scriptHash}';`;
```

### CSP Reporting:
```javascript
// Set up CSP reporting
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy',
        "default-src 'self'; " +
        "report-uri /csp-report; " +
        "report-to csp-endpoint;"
    );
    next();
});

// Handle CSP violation reports
app.post('/csp-report', express.json(), (req, res) => {
    console.log('CSP Violation:', req.body);
    // Log to monitoring system
    res.status(204).send();
});
```

---

## 6. Clickjacking Attacks

### What is Clickjacking?
**Invisible traps hiding in your UI** - attackers overlay invisible iframes to trick users into clicking malicious content.

### Attack Example:
```html
<!-- Attacker's malicious page -->
<style>
    #malicious-frame {
        position: absolute;
        top: 100px;
        left: 100px;
        opacity: 0; /* Invisible */
        z-index: 1000;
    }
    
    #fake-button {
        position: absolute;
        top: 100px;
        left: 100px;
        z-index: 999;
    }
</style>

<button id="fake-button">Click for Free Gift!</button>
<iframe id="malicious-frame" src="https://bank.com/transfer" width="200" height="100"></iframe>
```

### Prevention Strategies:

#### 1. X-Frame-Options Header
```javascript
// Server-side protection
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY'); // Never allow framing
    // or
    res.setHeader('X-Frame-Options', 'SAMEORIGIN'); // Only same origin
    // or
    res.setHeader('X-Frame-Options', 'ALLOW-FROM https://trusted.com');
    next();
});
```

#### 2. CSP frame-ancestors (Modern approach)
```javascript
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 
        "frame-ancestors 'none';" // Equivalent to X-Frame-Options: DENY
        // or
        // "frame-ancestors 'self';" // Equivalent to SAMEORIGIN
        // or
        // "frame-ancestors https://trusted.com;"
    );
    next();
});
```

#### 3. JavaScript Frame Busting
```javascript
// Client-side protection (less reliable)
(function() {
    if (window.top !== window.self) {
        // Page is in a frame
        if (confirm('This page is being displayed in a frame. Click OK to break out.')) {
            window.top.location = window.self.location;
        }
    }
})();

// More robust frame busting
function preventFraming() {
    if (window.top !== window.self) {
        try {
            if (window.top.location.hostname !== window.location.hostname) {
                throw new Error('Framed by different domain');
            }
        } catch (e) {
            // Cross-origin frame detected
            document.body.innerHTML = '<h1>This page cannot be framed</h1>';
            window.top.location = window.location;
        }
    }
}

preventFraming();
```

#### 4. Visual Indicators
```javascript
// Add visual indicators when page might be framed
function addFramingWarning() {
    if (window.top !== window.self) {
        const warning = document.createElement('div');
        warning.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: red;
            color: white;
            text-align: center;
            padding: 10px;
            z-index: 999999;
            font-weight: bold;
        `;
        warning.textContent = 'WARNING: This page is being displayed in a frame';
        document.body.insertBefore(warning, document.body.firstChild);
    }
}
```

---

## 7. Secure Headers

### Overview
**Small configs, massive protection** - HTTP security headers provide multiple layers of defense.

### Essential Security Headers:

```javascript
// Comprehensive security headers middleware
function securityHeaders(req, res, next) {
    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Enable XSS protection
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Force HTTPS
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // Control referrer information
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Permissions policy
    res.setHeader('Permissions-Policy', 
        'camera=(), microphone=(), geolocation=(), payment=()');
    
    // Content Security Policy
    res.setHeader('Content-Security-Policy',
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;");
    
    next();
}

app.use(securityHeaders);
```

### Using Helmet.js (Recommended):
```javascript
const helmet = require('helmet');

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));
```

### Header-by-Header Explanation:

#### 1. Strict-Transport-Security (HSTS)
```javascript
// Forces HTTPS for specified duration
res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

// Conditional HSTS for development
if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
}
```

#### 2. X-Content-Type-Options
```javascript
// Prevents MIME type sniffing
res.setHeader('X-Content-Type-Options', 'nosniff');
```

#### 3. Referrer-Policy
```javascript
// Controls referrer information leakage
const referrerPolicies = {
    strict: 'no-referrer',
    moderate: 'strict-origin-when-cross-origin',
    loose: 'unsafe-url'
};

res.setHeader('Referrer-Policy', referrerPolicies.moderate);
```

#### 4. Permissions-Policy
```javascript
// Controls browser features
res.setHeader('Permissions-Policy', [
    'camera=()',
    'microphone=()',
    'geolocation=(self)',
    'payment=()',
    'usb=()',
    'magnetometer=()'
].join(', '));
```

---

## 8. Scenario-Based Security Questions

### Scenario 1: Password Field Auto-saves
**Problem**: Browser auto-saves sensitive data in forms.

```html
<!-- VULNERABLE -->
<form>
    <input type="password" name="password" />
    <input type="text" name="ssn" />
</form>
```

**Solution**:
```html
<!-- SECURE -->
<form autocomplete="off">
    <input type="password" name="password" autocomplete="new-password" />
    <input type="text" name="ssn" autocomplete="off" />
</form>
```

```javascript
// Additional JavaScript protection
document.addEventListener('DOMContentLoaded', function() {
    const sensitiveFields = document.querySelectorAll('[data-sensitive]');
    
    sensitiveFields.forEach(field => {
        field.setAttribute('autocomplete', 'off');
        field.setAttribute('data-form-type', 'other');
        
        // Clear on page unload
        window.addEventListener('beforeunload', () => {
            field.value = '';
        });
    });
});
```

### Scenario 2: File Upload Security
**Problem**: Malicious file uploads (.php disguised as image).

```javascript
// VULNERABLE
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    res.json({ message: 'File uploaded', filename: file.filename });
});
```

**Solution**:
```javascript
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Secure file upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Generate random filename
        const randomName = crypto.randomBytes(32).toString('hex');
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, randomName + ext);
    }
});

const fileFilter = (req, file, cb) => {
    // Whitelist allowed file types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(file.mimetype) && allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 1
    }
});

// Additional validation
const validateFile = async (filePath) => {
    const fileType = await import('file-type');
    const type = await fileType.fileTypeFromFile(filePath);
    
    const allowedTypes = ['jpg', 'png', 'gif'];
    return type && allowedTypes.includes(type.ext);
};

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        // Validate file type by content
        const isValid = await validateFile(req.file.path);
        if (!isValid) {
            fs.unlinkSync(req.file.path); // Delete invalid file
            return res.status(400).json({ error: 'Invalid file content' });
        }
        
        res.json({ 
            message: 'File uploaded successfully',
            filename: req.file.filename 
        });
    } catch (error) {
        res.status(500).json({ error: 'Upload failed' });
    }
});
```

### Scenario 3: API Validation
**Problem**: API calls without proper validation.

```javascript
// VULNERABLE
app.post('/api/user', (req, res) => {
    const { name, email, age } = req.body;
    // Direct database insertion without validation
    db.users.insert({ name, email, age });
    res.json({ success: true });
});
```

**Solution**:
```javascript
const Joi = require('joi');
const rateLimit = require('express-rate-limit');

// Input validation schema
const userSchema = Joi.object({
    name: Joi.string().min(2).max(50).pattern(/^[a-zA-Z\s]+$/).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(13).max(120).required()
});

// Rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP'
});

// Secure API endpoint
app.post('/api/user', apiLimiter, async (req, res) => {
    try {
        // Validate input
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                error: 'Validation failed', 
                details: error.details 
            });
        }
        
        // Check for existing user
        const existingUser = await db.users.findOne({ email: value.email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }
        
        // Sanitize and insert
        const sanitizedUser = {
            name: value.name.trim(),
            email: value.email.toLowerCase().trim(),
            age: value.age,
            createdAt: new Date()
        };
        
        await db.users.insert(sanitizedUser);
        res.status(201).json({ success: true, id: result.insertedId });
        
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
```

### Scenario 4: Preventing Page Caching
**Problem**: Sensitive pages cached by browser.

```javascript
// Prevent caching for sensitive pages
function noCacheHeaders(req, res, next) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
}

// Apply to sensitive routes
app.get('/dashboard', noCacheHeaders, (req, res) => {
    res.render('dashboard');
});

app.get('/profile', noCacheHeaders, (req, res) => {
    res.render('profile');
});
```

```html
<!-- Meta tags for additional protection -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

### Scenario 5: Third-party Widget Protection
**Problem**: Malicious scripts from third-party widgets.

```javascript
// Secure third-party integration
class SecureWidgetLoader {
    constructor() {
        this.allowedDomains = [
            'https://trusted-widget.com',
            'https://analytics.google.com'
        ];
    }
    
    async loadWidget(widgetUrl, containerId) {
        // Validate URL
        if (!this.isAllowedDomain(widgetUrl)) {
            throw new Error('Widget domain not allowed');
        }
        
        // Create sandboxed iframe
        const iframe = document.createElement('iframe');
        iframe.src = widgetUrl;
        iframe.sandbox = 'allow-scripts allow-same-origin';
        iframe.style.cssText = 'width: 100%; height: 400px; border: none;';
        
        // Add CSP for iframe content
        iframe.setAttribute('csp', "default-src 'self'; script-src 'self' 'unsafe-inline';");
        
        const container = document.getElementById(containerId);
        container.appendChild(iframe);
        
        // Monitor for suspicious activity
        this.monitorWidget(iframe);
    }
    
    isAllowedDomain(url) {
        try {
            const urlObj = new URL(url);
            return this.allowedDomains.some(domain => 
                urlObj.origin === new URL(domain).origin
            );
        } catch {
            return false;
        }
    }
    
    monitorWidget(iframe) {
        // Listen for postMessage from widget
        window.addEventListener('message', (event) => {
            if (event.source === iframe.contentWindow) {
                // Validate message origin
                if (!this.isAllowedDomain(event.origin)) {
                    console.warn('Suspicious message from widget:', event);
                    return;
                }
                
                // Process safe messages only
                this.handleWidgetMessage(event.data);
            }
        });
    }
    
    handleWidgetMessage(data) {
        // Sanitize and validate widget messages
        if (typeof data === 'object' && data.type === 'widget-event') {
            console.log('Safe widget event:', data);
        }
    }
}
```

### Scenario 6: HTTPS Enforcement
**Problem**: App running on HTTP instead of HTTPS.

```javascript
// Force HTTPS redirect
function forceHTTPS(req, res, next) {
    if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
        next();
    }
}

// Apply to all routes in production
if (process.env.NODE_ENV === 'production') {
    app.use(forceHTTPS);
}

// Additional HTTPS security
app.use((req, res, next) => {
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
    next();
});
```

### Scenario 7: Secure Session Management
**Problem**: Logout doesn't invalidate session.

```javascript
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// Secure session configuration
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true, // HTTPS only
        httpOnly: true, // Prevent XSS
        maxAge: 30 * 60 * 1000, // 30 minutes
        sameSite: 'strict' // CSRF protection
    }
}));

// Secure logout implementation
app.post('/logout', (req, res) => {
    const sessionId = req.sessionID;
    
    // Destroy session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        
        // Clear session cookie
        res.clearCookie('connect.sid');
        
        // Invalidate all user sessions (optional)
        invalidateAllUserSessions(req.user.id);
        
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Session validation middleware
function validateSession(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ error: 'Invalid session' });
    }
    
    // Check session expiry
    if (req.session.expiresAt && Date.now() > req.session.expiresAt) {
        req.session.destroy();
        return res.status(401).json({ error: 'Session expired' });
    }
    
    // Refresh session expiry
    req.session.expiresAt = Date.now() + (30 * 60 * 1000);
    
    next();
}
```

### Scenario 8: Secure Cookie Storage
**Problem**: Storing tokens in cookies insecurely.

```javascript
// Secure cookie implementation
class SecureCookieManager {
    constructor(secret) {
        this.secret = secret;
    }
    
    // Set secure cookie
    setSecureCookie(res, name, value, options = {}) {
        const defaultOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000, // 1 hour
            path: '/'
        };
        
        const cookieOptions = { ...defaultOptions, ...options };
        
        // Encrypt sensitive values
        if (options.encrypt) {
            value = this.encrypt(value);
        }
        
        res.cookie(name, value, cookieOptions);
    }
    
    // Get secure cookie
    getSecureCookie(req, name, encrypted = false) {
        const value = req.cookies[name];
        
        if (!value) return null;
        
        if (encrypted) {
            return this.decrypt(value);
        }
        
        return value;
    }
    
    encrypt(text) {
        const crypto = require('crypto');
        const algorithm = 'aes-256-gcm';
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipher(algorithm, this.secret);
        
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        const authTag = cipher.getAuthTag();
        
        return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
    }
    
    decrypt(encryptedData) {
        const crypto = require('crypto');
        const algorithm = 'aes-256-gcm';
        const parts = encryptedData.split(':');
        
        const iv = Buffer.from(parts[0], 'hex');
        const authTag = Buffer.from(parts[1], 'hex');
        const encrypted = parts[2];
        
        const decipher = crypto.createDecipher(algorithm, this.secret);
        decipher.setAuthTag(authTag);
        
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    }
}

// Usage
const cookieManager = new SecureCookieManager(process.env.COOKIE_SECRET);

app.post('/login', (req, res) => {
    // After successful authentication
    const token = generateJWT(user);
    
    cookieManager.setSecureCookie(res, 'auth_token', token, {
        encrypt: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.json({ success: true });
});
```

### Scenario 9: Frontend Cloning Protection
**Problem**: Someone clones frontend and changes API URLs.

```javascript
// Domain validation
class DomainValidator {
    constructor(allowedDomains) {
        this.allowedDomains = allowedDomains;
        this.init();
    }
    
    init() {
        // Check if running on allowed domain
        if (!this.isValidDomain()) {
            this.handleInvalidDomain();
        }
        
        // Monitor for domain changes
        this.monitorDomain();
    }
    
    isValidDomain() {
        const currentDomain = window.location.hostname;
        return this.allowedDomains.includes(currentDomain);
    }
    
    handleInvalidDomain() {
        // Disable functionality
        document.body.innerHTML = '<h1>Unauthorized Domain</h1>';
        
        // Report to legitimate server
        fetch('https://legitimate-api.com/report-clone', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clonedDomain: window.location.hostname,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            })
        }).catch(() => {}); // Fail silently
    }
    
    monitorDomain() {
        setInterval(() => {
            if (!this.isValidDomain()) {
                this.handleInvalidDomain();
            }
        }, 5000);
    }
}

// API endpoint validation
class SecureAPIClient {
    constructor(baseURL, apiKey) {
        this.baseURL = baseURL;
        this.apiKey = apiKey;
        this.validateEnvironment();
    }
    
    validateEnvironment() {
        // Check if API URL matches expected pattern
        const allowedAPIPatterns = [
            /^https:\/\/api\.legitimate-site\.com/,
            /^https:\/\/.*\.legitimate-site\.com/
        ];
        
        const isValidAPI = allowedAPIPatterns.some(pattern => 
            pattern.test(this.baseURL)
        );
        
        if (!isValidAPI) {
            throw new Error('Invalid API endpoint');
        }
    }
    
    async makeRequest(endpoint, options = {}) {
        // Add integrity checks
        const headers = {
            'Content-Type': 'application/json',
            'X-API-Key': this.apiKey,
            'X-Domain-Verification': this.generateDomainHash(),
            ...options.headers
        };
        
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            ...options,
            headers
        });
        
        // Verify response integrity
        if (!this.verifyResponseIntegrity(response)) {
            throw new Error('Response integrity check failed');
        }
        
        return response;
    }
    
    generateDomainHash() {
        const domain = window.location.hostname;
        const timestamp = Math.floor(Date.now() / 60000); // 1-minute window
        const data = `${domain}:${timestamp}:${this.apiKey}`;
        
        return btoa(data); // Simple encoding (use proper crypto in production)
    }
    
    verifyResponseIntegrity(response) {
        // Check for expected headers
        const expectedHeaders = ['x-response-signature', 'x-timestamp'];
        return expectedHeaders.every(header => response.headers.has(header));
    }
}

// Initialize protection
const domainValidator = new DomainValidator(['legitimate-site.com', 'www.legitimate-site.com']);
const apiClient = new SecureAPIClient('https://api.legitimate-site.com', 'your-api-key');
```

## Security Checklist

### Development Phase:
- [ ] Input validation on all user inputs
- [ ] Output encoding/escaping
- [ ] CSRF tokens implemented
- [ ] Secure cookie configuration
- [ ] HTTPS enforcement
- [ ] Security headers configured
- [ ] CSP policy implemented
- [ ] File upload restrictions
- [ ] Rate limiting on APIs
- [ ] Session management security

### Testing Phase:
- [ ] XSS testing with various payloads
- [ ] CSRF attack simulation
- [ ] Clickjacking tests
- [ ] File upload security tests
- [ ] Authentication bypass attempts
- [ ] Session fixation tests
- [ ] CORS configuration validation
- [ ] Security header verification

### Deployment Phase:
- [ ] HTTPS certificate valid
- [ ] Security headers active
- [ ] CSP reporting configured
- [ ] Error handling doesn't leak info
- [ ] Logging and monitoring setup
- [ ] Regular security updates
- [ ] Dependency vulnerability scans
- [ ] Penetration testing completed

## Conclusion

Frontend security is not optional—it's essential. These 7 lessons provide a foundation for building secure web applications. Remember:

1. **Never trust user input**
2. **Implement defense in depth**
3. **Keep security headers updated**
4. **Regular security audits**
5. **Stay informed about new threats**

Security is an ongoing process, not a one-time implementation. Stay vigilant, keep learning, and always prioritize your users' safety.