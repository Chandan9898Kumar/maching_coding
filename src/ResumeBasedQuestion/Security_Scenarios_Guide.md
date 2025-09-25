# Security Scenarios: Critical Questions & Solutions

## 1. Password Field Auto-saves in Browser

### What Went Wrong?

`How This Happens`
. When users enter passwords in forms, browsers automatically:
. Store credentials in their password manager
. Cache form data for convenience
. Remember passwords on shared computers
. Auto-fill sensitive fields later

`This creates security risks because:`
. Other users on shared devices can access saved passwords
. Browser cache can be compromised
. Password managers might store data insecurely
. Malicious scripts could access auto-filled data

### Solution:

`Key Prevention Strategies`
. autoComplete="off" - Tells browser not to save form data
. autoComplete="new-password" - Prevents auto-filling existing passwords
. Clear on unmount - Remove sensitive data when component is destroyed
. Clear on page unload - Clean up when user leaves the page
. Controlled inputs - Use React state to manage and clear values.

> These simple techniques significantly reduce the risk of password exposure through browser auto-save features.

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


> Clear Fields on Component Unmount In react

import { useEffect, useRef } from 'react';

function SecurePasswordForm() {
  const passwordRef = useRef(null);

  useEffect(() => {
    // Clear password when component unmounts
    return () => {
      if (passwordRef.current) {
        passwordRef.current.value = '';
      }
    };
  }, []);

  return (
    <form autoComplete="off">
      <input
        ref={passwordRef}
        type="password"
        autoComplete="new-password"
        placeholder="Password"
      />
    </form>
  );
}

```

---

## 2. File Upload: .php Disguised as Image

### The Risk:

Malicious files can execute server-side code, leading to:

- Remote code execution
- Server compromise
- Data theft

`How This Attack Happens`
. Attackers upload malicious files by:
. Renaming a PHP script to malicious.jpg
. Changing MIME type to image/jpeg
. Bypassing basic file extension checks
. Executing server-side code when accessed

### Solution:

`Key Prevention Strategies To prevent It :`

. Check file signatures - Validate actual file content, not just extension
. Server-side/Client-side validation - Never trust client-side checks alone
. File size limits - Prevent large malicious uploads
. Separate upload directory - Store files outside web root
. Rename uploaded files - Remove original extensions
. Content-Type validation - Check MIME types on both client and server
. These techniques prevent attackers from uploading executable files disguised as images.

```javascript
const multer = require("multer");
const fileType = require("file-type");

const upload = multer({
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png"];
    cb(null, allowed.includes(file.mimetype));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const type = await fileType.fromFile(req.file.path);
  if (!type || !["jpg", "png"].includes(type.ext)) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: "Invalid file" });
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

`Key Prevention Strategies`
. Input Validation - Check all data before processing
. Parameterized Queries - Never build SQL with string concatenation
. Type Checking - Ensure data types are correct
. Range Limits - Set min/max values for numbers
. Sanitization - Clean input data
. Authentication - Verify user permissions
. Remember: Never trust user input! Always validate everything on both client and server side.

`Input Validation with Joi`

```javascript
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
  age: Joi.number().min(13).max(120).required(),
});

app.post("/api/user", (req, res) => {
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

## 4. Sensitive Pages Cached :

Real Example: "MyBank" Online Banking
Let's say you use MyBank online banking to check your account balance and transfer money.

How Browser Caching Works Normally >

`Step 1: You Login to MyBank`

1. Visit: mybank.com/login
2. Enter: username & password
3. Login successful
4. Redirected to: mybank.com/dashboard

`Step 2: Browser Automatically Caches Pages`
Browser saves to cache:

- mybank.com/dashboard (shows $50,000 balance)
- mybank.com/transactions (shows recent transfers)
- mybank.com/profile (shows personal info)

`Step 3: You Logout and Leave`

1. Click logout
2. Close browser
3. Leave the computer

`The Security Problem`
Scenario: Shared Computer at Library

`What happens next:`
Next person uses the same computer
Types mybank.com in browser
Browser suggests cached pages from history
Browser loads CACHED page (no server request! is required here, even user is logged out)
Sees your bank balance and personal info!

`Step-by-Step Attack Example`

> Attack 1: Browser History Access

```ts
<!-- Attacker opens browser history -->
<!-- Sees cached sensitive URLs -->
mybank.com/dashboard
mybank.com/account-balance
mybank.com/transfer-history

```

Then Attacker clicks on cached link:
Result: Your bank dashboard loads from cache!
Shows: Account balance, recent transactions, personal details

> Attack 2: Browser Cache Files

```ts
# Attacker checks browser cache folder
C:\Users\[username]\AppData\Local\Google\Chrome\User Data\Default\Cache

# Finds cached files containing:
- Your account balance: $50,000
- Recent transactions
- Personal information

```

> Attack 3: Back Button Attack

1. Attacker opens browser
2. Presses "Back" button multiple times
3. Browser shows cached banking pages
4. Attacker sees your sensitive data

`What happens:`
Browser saves dashboard page to cache
Next user can access cached version
Sensitive data exposed!

### Solution:

`Key Prevention Strategies`
. Server headers - Prevent caching at server level
. Meta tags - Client-side cache prevention
. Clear on logout - Remove sensitive data when user leaves
. Clear on unmount - Clean up React components
. Disable browser cache - For sensitive applications

```javascript
// Server-side headers : Cache-Control: no-store, no-cache, must-revalidate

// - no-store: Don't save page to disk
// - no-cache: Don't use cached version
// - must-revalidate: Always check with server

app.use("/dashboard", (req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});
```

```html
<!-- Client-side meta tags -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
```

---

`Why This Attack Works`
. Browser caches everything by default for performance
. Cache is local - no server authentication needed
. History persists even after logout
. Shared computers retain previous user's cache
. Users don't clear cache when they leave

# Key Takeaway

`The attack succeeds because:`
Authentication happens on the server
Cache exists on the client (browser)
Cached content bypasses server authentication

Solution: Always set no-cache headers for sensitive pages so browser never stores them locally!

## 5. Third-party Widget Injects Malicious Script

### The Defense:

```javascript
// CSP to restrict script sources
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://trusted-widget.com;");
  next();
});
```

```javascript
// Sandboxed iframe approach
function loadWidget(widgetUrl) {
  const iframe = document.createElement("iframe");
  iframe.src = widgetUrl;
  iframe.sandbox = "allow-scripts allow-same-origin";
  document.getElementById("widget-container").appendChild(iframe);
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
  if (req.header("x-forwarded-proto") !== "https") {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else {
    next();
  }
});

// HSTS header
app.use((req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
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
app.post("/logout", (req, res) => {
  // Server-side session destruction
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });

    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
});
```

```javascript
// Client-side cleanup
function logout() {
  fetch("/logout", { method: "POST" }).then(() => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  });
}
```

---

## 8. Secure Token Storage in Cookies

### The Secure Way:

```javascript
// Server sets httpOnly cookie
app.post("/login", (req, res) => {
  const token = generateJWT(user);

  res.cookie("token", token, {
    httpOnly: true, // Prevents XSS
    secure: true, // HTTPS only
    sameSite: "strict", // Prevents CSRF
    maxAge: 3600000, // 1 hour
  });

  res.json({ success: true });
});
```

```javascript
// Alternative: Encrypted localStorage
function storeToken(token) {
  const encrypted = CryptoJS.AES.encrypt(token, secretKey).toString();
  localStorage.setItem("token", encrypted);
}

function getToken() {
  const encrypted = localStorage.getItem("token");
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
const ALLOWED_DOMAINS = ["myapp.com", "www.myapp.com"];

function validateDomain() {
  const currentDomain = window.location.hostname;
  if (!ALLOWED_DOMAINS.includes(currentDomain)) {
    document.body.innerHTML = "<h1>Unauthorized Domain</h1>";
    return false;
  }
  return true;
}

// API endpoint validation
class SecureAPI {
  constructor(baseURL) {
    if (!baseURL.includes("myapp.com")) {
      throw new Error("Invalid API endpoint");
    }
    this.baseURL = baseURL;
  }

  async request(endpoint, options) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        "X-Domain-Check": window.location.hostname,
      },
    });
    return response;
  }
}
```

```javascript
// Server-side domain verification
app.use((req, res, next) => {
  const allowedOrigins = ["https://myapp.com", "https://www.myapp.com"];
  const origin = req.headers.origin;

  if (!allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: "Forbidden origin" });
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
