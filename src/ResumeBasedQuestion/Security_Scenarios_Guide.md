# Security Scenarios: Critical Questions & Solutions

## 1. Password Field Auto-saves in Browser

### What Went Wrong?
Browser auto-save exposes sensitive data through:
- Password managers storing unencrypted data
- Browser cache containing form data
- Shared computers retaining credentials

### Solution:
```html
<!-- Prevent auto-save -->
<form autocomplete="off">
  <input type="password" name="password" autocomplete="new-password" />
</form>
```

```javascript
// Clear on unload
window.addEventListener('beforeunload', () => {
  document.querySelectorAll('input[type="password"]').forEach(input => {
    input.value = '';
  });
});
```

---

## 2. File Upload: .php Disguised as Image

### The Risk:
Malicious files can execute server-side code, leading to:
- Remote code execution
- Server compromise
- Data theft

### Solution:
```javascript
const multer = require('multer');
const fileType = require('file-type');

const upload = multer({
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png'];
    cb(null, allowed.includes(file.mimetype));
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const type = await fileType.fromFile(req.file.path);
  if (!type || !['jpg', 'png'].includes(type.ext)) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'Invalid file' });
  }
  res.json({ success: true });
});
```

---

## 3. API Call Without Validation

### The Risk:
- SQL injection
- Data corruption
- Unauthorized access
- System compromise

### Solution:
```javascript
const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  age: Joi.number().min(13).max(120).required()
});

app.post('/api/user', (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  // Safe to use validated data
  createUser(value);
  res.json({ success: true });
});
```

---

## 4. Sensitive Pages Cached

### The Problem:
Cached sensitive data can be accessed by:
- Unauthorized users on shared devices
- Browser history attacks
- Forensic recovery

### Solution:
```javascript
// Server-side headers
app.use('/dashboard', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
```

```html
<!-- Client-side meta tags -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

---

## 5. Third-party Widget Injects Malicious Script

### The Defense:
```javascript
// CSP to restrict script sources
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "script-src 'self' https://trusted-widget.com;"
  );
  next();
});
```

```javascript
// Sandboxed iframe approach
function loadWidget(widgetUrl) {
  const iframe = document.createElement('iframe');
  iframe.src = widgetUrl;
  iframe.sandbox = 'allow-scripts allow-same-origin';
  document.getElementById('widget-container').appendChild(iframe);
}
```

---

## 6. App Runs on HTTP, Not HTTPS

### What Can Go Wrong:
- Man-in-the-middle attacks
- Data interception
- Session hijacking
- Credential theft

### Solution:
```javascript
// Force HTTPS redirect
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});

// HSTS header
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

---

## 7. Logout Doesn't Invalidate Session

### The Impact:
- Session hijacking
- Unauthorized access after logout
- Shared computer vulnerabilities

### Solution:
```javascript
app.post('/logout', (req, res) => {
  // Server-side session destruction
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});
```

```javascript
// Client-side cleanup
function logout() {
  fetch('/logout', { method: 'POST' })
    .then(() => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/login';
    });
}
```

---

## 8. Secure Token Storage in Cookies

### The Secure Way:
```javascript
// Server sets httpOnly cookie
app.post('/login', (req, res) => {
  const token = generateJWT(user);
  
  res.cookie('token', token, {
    httpOnly: true,     // Prevents XSS
    secure: true,       // HTTPS only
    sameSite: 'strict', // Prevents CSRF
    maxAge: 3600000     // 1 hour
  });
  
  res.json({ success: true });
});
```

```javascript
// Alternative: Encrypted localStorage
function storeToken(token) {
  const encrypted = CryptoJS.AES.encrypt(token, secretKey).toString();
  localStorage.setItem('token', encrypted);
}

function getToken() {
  const encrypted = localStorage.getItem('token');
  if (!encrypted) return null;
  
  const decrypted = CryptoJS.AES.decrypt(encrypted, secretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
}
```

---

## 9. Frontend Cloning Protection

### How to Stop It:
```javascript
// Domain validation
const ALLOWED_DOMAINS = ['myapp.com', 'www.myapp.com'];

function validateDomain() {
  const currentDomain = window.location.hostname;
  if (!ALLOWED_DOMAINS.includes(currentDomain)) {
    document.body.innerHTML = '<h1>Unauthorized Domain</h1>';
    return false;
  }
  return true;
}

// API endpoint validation
class SecureAPI {
  constructor(baseURL) {
    if (!baseURL.includes('myapp.com')) {
      throw new Error('Invalid API endpoint');
    }
    this.baseURL = baseURL;
  }
  
  async request(endpoint, options) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'X-Domain-Check': window.location.hostname
      }
    });
    return response;
  }
}
```

```javascript
// Server-side domain verification
app.use((req, res, next) => {
  const allowedOrigins = ['https://myapp.com', 'https://www.myapp.com'];
  const origin = req.headers.origin;
  
  if (!allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }
  
  next();
});
```

## Quick Security Checklist

### Input Validation:
- [ ] Validate all user inputs
- [ ] Sanitize HTML content
- [ ] Use parameterized queries

### Authentication:
- [ ] Implement proper session management
- [ ] Use secure password policies
- [ ] Enable MFA where possible

### Data Protection:
- [ ] Use HTTPS everywhere
- [ ] Encrypt sensitive data
- [ ] Implement proper access controls

### Headers & Policies:
- [ ] Set security headers
- [ ] Implement CSP
- [ ] Configure CORS properly

### File Handling:
- [ ] Validate file types by content
- [ ] Limit file sizes
- [ ] Store uploads securely

### Monitoring:
- [ ] Log security events
- [ ] Monitor for anomalies
- [ ] Regular security audits