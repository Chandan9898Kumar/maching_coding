
### System Design Approach

In the context of front end system design interviews, the systems you are asked to design tend to be products, so we'll refer to the system as "product" from here on. Start by understanding the Requirements, defining the high level Architecture and the Data Model. Then define the Interfaces between the components in the product and talk about any Optimizations or dive deep into specific areas which require special attention.


### What is RADIO about?

1. `Requirements exploration:` Understand the problem thoroughly and determine the scope by asking a number of clarifying questions

2. `Architecture / High-level design:` Identify the key components of the product and how they are related to each other

3. `Data model / Core entities:` Describe the core entities and its data – the fields each entity contains and which component(s) they belong to

4. `Interface definition (API):` Define the interface (API) between components in the product, functionality of each API, their parameters and responses

5. `Optimizations and deep dive: `Discuss possible optimization opportunities and specific areas of interest when building the product
Requirements exploration



**Requirements exploration**

`Objective:` Understand the problem thoroughly and determine the scope by asking a number of clarifying questions.

1. Some general questions you should get answers to before moving on to the next part of the interview:

> What are the main use cases we should be focusing on?

    A. Imagine you were asked to "Design Facebook". Facebook is a huge platform, there's news feed, profiles, friends, groups, stories, and more. Which parts of Facebook should you focus on? The interviewer has the answer in mind but wants you to find out by asking questions. Typically you should focus on the most unique aspects of the product, the features which define it. For Facebook, it would be the news feed, pagination of the feed, and creating new posts. For YouTube, it would be the video-watching experience. The important areas for other type of products be found in the types of questions.


2. What are the `functional requirements and non-functional requirements?`
Firstly, what are functional and non-functional requirements?

###                      Functional requirements

`Functional requirements:` Basic requirements of the product such that the product cannot function without them. This is usually whether a user can complete the core flows correctly.


Functional requirements specify what the system should do. They describe the features, functionalities, and behaviors of the system. In the context of a frontend design system, functional requirements might include:

1. `User Interface Components:`
    Buttons, forms, modals, navigation bars, etc.

2. `User Interactions:`
    How users interact with the UI (e.g., click events, hover effects).

3.` Data Handling:`
    How data is fetched, displayed, and manipulated (e.g., API calls, state management).

4. `Accessibility Features:`
    Compliance with accessibility standards (e.g., ARIA roles, keyboard navigation).

5. `Responsive Design:`
    Adaptation of UI components to different screen sizes and devices.

6. `Theming and Customization:`
    Options for users to customize the look and feel of the application.

7. `Error Handling:`
    How the system responds to errors (e.g., validation messages, error pages).


*Questions to Ask for Functional Requirements:*
    1. What specific features must the system provide?
    2. How should users interact with the system?
    3. What data needs to be displayed, and how should it be structured?
    4. Are there any specific accessibility requirements?
    5. What are the expected user flows and scenarios?
    6. How should the system handle errors and exceptions?
    7. What are the core features to focus on and which are good-to-have?
    8. What devices/platforms (desktop/tablet/mobile) need to be supported?
    9. Is offline support necessary?
   10. Who are the main users of the product?
   11. Which browsers should we support?
   12. Do we need to support internationalization? (i18n)


###                    Non-functional requirements 


`Non-functional requirements:` Requirements that are viewed as improvements to the product, but not strictly required for the product to be usable, i.e. the product can still be used without these. These include performance (how fast the page loads, how fast an interaction takes), scalability (how many items can be present on the page before the page slows to a crawl), good user experience, etc.


Non-functional requirements define how the system performs its functions. They focus on the quality attributes of the system. In a frontend design system, non-functional requirements might include:



1. Performance
    Load times, responsiveness, and smoothness of interactions.

2. Scalability:
    Ability to handle increased load or user traffic.

3. Usability:
    Ease of use and learning curve for users.

4. Maintainability:
    How easy it is to update and maintain the codebase.

5. Security:
    Protection against vulnerabilities (e.g., XSS, CSRF).

6. Compatibility:
    Support for different browsers and devices.

7. Localization and Internationalization:
    Support for multiple languages and regional settings.



> OR


These define HOW the system should perform. Non-functional requirements include things like:

1. Performance :
 a. Performance optimization example using memoization,Callback,Code splitting etc.
2. Security:
3. Accessibility.
4. Responsiveness.
5. Error Handling.
6. Loading States.
7. Browser Compatibility.
8. SEO Requirements.
9. Reliability.
10. Maintainability.
11. Caching.





`Ask your interviewer these questions to better understand the non-functional requirements:`

1. What is the scale of the system?
2. How many users should it support?
3. How many requests should the server handle?
4. Are most use cases read-only?
5. Do users typically read the data shortly after someone else overwrites it?
6. Are most users on mobile devices?
7. What are the performance benchmarks we need to meet?
8. How will we ensure the system is scalable?
9. What usability standards should we adhere to?
10. How will we ensure the system is maintainable over time?
11. What security measures need to be implemented?
12. cWhich browsers and devices must the system support?
13. Are there any localization requirements for different regions?


`NOTE : ` At the very minimum, your design has to meet the functional requirements. After meeting all the function requirements, move on to talk about how to fulfill the non-functional requirements.



**Architecture / High-level design**

Architecture for front end interviews are typically focused on the client-side architecture, and not on large scale distributed systems where databases, load balancers and servers are involved.

For components, list down the various subcomponents that will exist within it and what data is being passed among each component.


`Objective:` Identify the key components of the product and how they are related to each other.



With the requirements in mind, we can move on to the architecture design proper. Your next task is to come up with a product/system architecture by identifying the key components of the product, how the components interact with each other, and how they are related. Remember to focus on the client-side architecture, not the back end.

Diagrams are your friends here. Each component can be represented using a rectangle and your high-level design usually ends up looking like a few rectangular boxes with arrows between them to demonstrate the flow of data. It is also possible to have components within components, in that case, draw the parent using bigger rectangles since they need to fit multiple subcomponents.


Examples of components/modules which are commonly found in a high-level front end design:

    1. `Server:` In front end system design interviews, we can treat the server as a black box and assume it exposes some APIs you can call via HTTP/WebSockets.

    2. `View:` This represents what the user sees, and it usually contains smaller subviews within it. Can contain client-side only state.

    3. `Controller:` The module which responds to user interactions and processes the data from the store/model in a format the view expects. This module is not always needed if the application is small and there's not much passing of data between modules.

    4. `Model/Client store:` Where the data lives. Stores contain data which will be presented to the user via views and stores tend to be app-wide in an interview context. In reality, you can have multiple stores within an application and stores can contain other stores.

Other things to consider when defining the responsibilities of components:

    1. `Separation of concerns:` Components are meant to be modular and serve to encapsulate a set of functionality and data. Consider the purpose/functionality of each component, what data it should contain and how it can service the rest of the system (what it can do for the other components).

    2. `Where computation should occur:` If some amount of computation is needed (e.g. filtering of results given a search term, calculating the total amount for a cart), should the work be done on the server or the client? There are tradeoffs to each approach and the decision is both product-dependent and context-dependent.



It is important to realize that not every common component mentioned above will be relevant and necessary for every product, it depends on the unique aspects of the product.

After drawing out the architecture diagram, verbally describe the responsibilities of each component (box in the diagram).



**Data model**

Data model for components will refer to the component state. The concept of state should be familiar to most front end developers who have used front end UI libraries/frameworks such as React, Angular, Vue, Svelte, etc. In every of these libraries/frameworks, state is a common concept.

Deciding what data to put in state is essential to doing well for this portion. Few factors to consider when deciding what goes into component state:

    1. State is allowed to change over time during the lifecycle of the component, typically as a result of user interactions.

    2. Each component should maintain its own independent state which allows multiple instances of the component to coexist on a single page. The state of a component instance should not affect the state of another instance.

    3. Components are easier to reason about (read/understand) the fewer the fields there are in the state. We should strive to reduce the amount of state needed. If a component uses a value which can be derived from another piece of state, then that value should most likely not be part of the state. For example if your component is rendering a list of items and you want to display a message when there are no items to render, there shouldn't be an additional isEmpty state because it can be derived from the length of the items.

    4. If a component has multiple subcomponents, it'll be best if it's possible to consolidate the state within the top level and the rest of the components are pure and stateless.


`Objective:` Describe the various data entities, the fields they contain and which component(s) they belong to.


We now have to think about what data fields are present in the client. There are two kinds of data on client applications:

1. `Server-originated data`
Data that originates from the server, usually from a database and meant to be seen by multiple people or accessed from multiple different devices. Common examples include user data (name, profile picture) and user-generated data (feed posts, comments).

2. `Client-only data`
Client-only data, also commonly known as state, is data that only needs to live on the client and does not have to be sent to the server for writing into the database. Client data can be further broken down into two:

    A. Data to be persisted: Usually user input such as data entered into form fields. These data usually has to be sent to the server and saved into a database for it to be useful.

    B. Ephemeral data: Temporary state that lasts for a short time. Common examples include form validation state, current navigation tab, whether a section is expanded, etc. It's usually acceptable to lose these data when the browser tab is closed.


When listing the data fields, it'd be useful to identify what kind of data that field is, whether it's server-originated data or client-only data

Depending on how far you progress along in the question and how the requirements have evolved and grown during the interview, you might need to add more fields. It's a dynamic and iterative process.

You might want to write these fields near the components which owns them in your architecture diagram.



*Interface definition (API)*


`Objective:` Define the interface between components in the product, functionality of the various APIs, their parameters and responses.


The key idea behind components is for them to be reused and abstract complexities. Good components are designed in a way that they can be reused in multiple scenarios, and users do not have to know how they work internally before using them. In the case of components, API refers to configuration options that the component developer would expose to other developers for specification.

1. What are the configuration options you would allow for the component? (props in React). What would be reasonable defaults?

2. Follow the Open-closed principle - the component should be open for extension but closed for modification.

3. If your component is meant to be part of a UI library that doesn't bother about the appearance and leaves the styling to the user, extra care has to go into the design of the props and to allow users to customize the look and feel of the components.
There are a few ways to go about this in React:
    1. Composition - Props which accept React components which also promotes code reuse.

    2. Render props are function props that a component uses to know what to render. It also helps in reusing behavior without bothering about the appearance.

    3. className or style props - Allows users to inject class names and/or styling attributes to inner DOM elements. This could have negative consequences but is still a common way of allowing user to customize component appearance.

4. Possible configuration options:
    1. Lifecycle/event hooks - onClick, onChange, onBlur, onFocus, etc.



. With the components and data within each components, we can move on to discuss the interface (APIs) between the components. API is an overloaded term and generally refer to the protocol which software components communicate and request/send data between components. Client and server communicate via network layer APIs (HTTP/WebSockets). Client components generally communicate via functions in the browser runtime. 





*Optimizations and deep dive*


`Objective:` Discuss about possible optimization opportunities and specific areas of interest when building the product.


1. User experience (UX) :

    UX might not fall squarely under engineering but good front end engineers have good understanding of UX and building UI with great UX. There are too many UX practices to be aware of, but the most common ones/low hanging fruits are:

    1. Reflect state of the component to the user - If there's a pending background request, show a spinner. If there's an error, make sure to display it instead of silently failing.

    2. Display an empty state if there are no items in a list, instead of not rendering anything.

    3. Destructive actions should have a confirmation step, especially irreversible ones.

    4. Disable interactive elements if they trigger an async request! Prevents double firing of events in the case of accidental double clicking (possible for people with motor disabilities).

    5. If there are search inputs involved, each keystroke should not fire a network request.

    6. Handle extreme cases
        a. Strings can be really long/short and your UI should not look weird in either case. For long strings, they can have their contents truncated and hidden behind a "View more" button.

        b. If there are many items to display within a component, they shouldn't all be displayed on the screen at once and making the page extremely long/wide. Paginate the items or contain them within a container with a maximum width/height.

    7. Keyboard friendliness - This involves making sure the component is keyboard-friendly
        a. Add shortcuts to make the component more usable by keyboard-only users
        b. Ensure that elements can be focused and tab order within the component is correct

2. Performance

In front end, performance typically refers to a few things - loading speed, how fast the UI responds to user interactions, memory space (heap) required by the component.


    1. `Loading speed:` The less JavaScript the component contains, the less JavaScript the browser has to download to load the component and the lower the network request time. It's also important to modularize components and allow users to download only the necessary JavaScript modules needed for their use case.

    2. `Responsiveness to user interactions.`
        a. If a user interaction results in displaying of data that has to be loaded over the network, there will be a delay between the user interaction and updating of the UI. Minimizing that delay or removing it entirely is the key to improving responsiveness.

        b. JavaScript in a browser is single-threaded. The browser can only do execute one line of code at any one time. The less work (JavaScript executed, DOM updates) the component has to do when a user does something on the page, the faster the component can update the UI to respond to the changes.

    3. `Memory space:` The more memory your component takes up on the page, the slower the browser performs and the experience will feel sluggish/janky. If your component has to render hundreds/thousands of items (e.g. number of images in a carousel, number of items in a selector), memory space might become significant.



3. Optimization tips.

    1. Render only what is displayed on the screen.
    2. Lazy loading/load only necessary data.
    3. Preloading/prefetching data ahead of time


4. Accessibility (a11y)
Accessibility (a11y) is the practice of making your websites usable by as many people as possible.

    1. Color contrasts (e.g. color blindness)
    2. Keyboard friendliness (e.g. people with limited fine motor control)
    3. Visual Impairment (e.g. blind)
    4. Transcripts for audio (e.g. deaf)

5. Internationalization (i18n).
Internationalization (i18n) is the design and development of a product, application or document content that enables easy localization for target audiences that vary in culture, region, or language.


6. Multi-device support
Is the component expected to be used on mobile web? Mobile devices have unique constraints - they have less powerful hardware and viewport size is smaller. Hence things could be done differently to allow the component to work better on mobile devices - making a conscious effort to:

    1. Not use too much memory - using too much memory makes the device perform slower
    2. Increasing the hit box of interactive elements - fingers have an easier time tapping on the right element


7. Security
Most of the time, components aren't exposed to security vulnerabilities, but it can still happen. Here are the more common security vulnerabilities you should be aware of:

    1. XSS - Is your component vulnerable to cross-site scripting (XSS)? E.g. Do you render user input via .innerHTML or dangerouslySetInnerHTML (React-specific)?

    2. CSRF (Cross-Site Request Forgery)

    3. Clickjacking
    
    4. rel=noopener
