# Getting Started with Create React App

- This Repository consists of machine coding, javaScript questions along with Design Pattern and Solid Principles.

### What is compiling ?

- Compiling is the process of converting a high-level programming language to a low-level programming language.

# But why do we need to compile our code?

As you already know, the computer understands low-level language, so in order to actually make our program run, we need to convert our language to something which the computer can understand.

Sometimes it’s compiled in multiple steps, each step optimizing the code and getting it closer to machine code.

For example, Java, C#, and C are a few examples of the high-level languages that are needed to be compiled.

### What is transpiling?

- Transpiling is converting one high-level language to another high-level language.

# But why do we need to transpile a high-level language?

You’ve probably heard about CoffeeScript and TypeScript. Anything you can write in JavaScript, you can write in CoffeeScript or TypeScript.

But the problem is, JavaScript environments only understand … Well, JavaScript.

Enter _drumrolls_ — Transpilers. They read CoffeeScript, TypeScript, and ES2015, and spit out JavaScript guaranteed to work anywhere.

A common example of a transpiler is Babel. It is used to convert ES6+ code into backward-compatible versions of Javascript.

### Using Pre-Commit and Pre-Push Git Hooks in a React Project.

- Husky
  husky, which claims to be “git hooks made easy.” (Accurate!). Since it’s only necessary in the dev environment, only install it as a dev dependency.
  `Install` : npm install husky --save-dev

We actually end up needing one additional dev dependency called `cross-env`, which will allow us to `configure a CI environment variable` in whatever environment we’re currently in.

`Install` : npm install cross-env --save-dev

Finally, let’s make some modifications to our package.json file to accomplish a few things:

1. Reconfigure jest tests to be run in Continuous Integration mode (otherwise, running npm test will hang)
2. Add a linting command (we didn’t have to install eslint separately as it bootstraps with create-react-app)
3. Configure our husky hooks to first lint and then test

- Outcome
  Now, whenever you try to commit or push your code, you will be prevented from doing so if linting or testing fails.

### Polling

- Polling simply means checking for new data over a fixed interval of time by making API calls at regular intervals to the server. It is used to get real-time updates in applications. There are many applications that need real-time data and polling is a life savior for those applications.

### Different types of Polling:

- 1. `Short Polling:` In a short polling client requests data from the server and the server will return the response if it is available and if it is not available then it returns an empty response. This process will be repeated at regular intervals.

Although, there are a few problems with short polling, i.e., the frequency of polling can cause an unacceptable burden on the network, the server, or both, when the acceptable latency is low, in general.

- 2. `long polling :` In Short polling, there was a problem that if the response is not available then the server returns an empty response.
     So, In long polling, this problem got solved. Here, in long polling, the client sends a request to the server and if the response is not available then the server will hold the request till the response gets available, & after the availability of the response, the server will send the response back. After getting a response, again the request will be made either immediately or after some period of time and this process will repeat again and again. In simple words, the client will always be in the live connection to the server.

- Real-World Polling Applications: Polling has different Real-world Applications. Some of them are described below:

1. `Taxi Service Provider:` When any user books a taxi from the taxi service provider’s application then, in that case, he/she needs to check the location of the driver every second to get an idea that how far the driver is from its pickup point.
   In that case, data on the location change rapidly so we need polling to get the correct location every time.

2. `Train Tracking` When any user wants the current location of any train then he/she uses the Train tracking application. Since the location of the train changes every moment. So, in this case, also there is a need for polling to get the updated location of the train at any time whenever a user searches.

### Comparison between short and long polling.

- A. Short polling

1. It is based on Timer. So, it is used for those applications that need to update data at a fixed interval of time.
2. Here, an empty response can be sent if a response is not available.
3. It is less preferred.
4. It creates lots of traffic.

- B. Long polling.

1. It is based on getting the response. So, It is used for those applications that don’t want empty responses.
2. Here empty response can never be sent.
3. It is more preferred, in comparison to Short Polling.
4. It also creates traffic but less than short polling.

### Example of Short polling in React : Polling API every x seconds with react.

```js
import React, { useState, useEffect, useRef } from "react";

import "./style.css";

export default function App() {
  let [data, setData] = useState([]);

  const getData = async () => {
    let response = await fetch("https://dummyjson.com/products");
    let result = await response.json();
    setData(result.products);
  };

  useInterval(() => {
    getData();
  }, 1000 * 10);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>

      {data?.map((item, index) => (
        <li key={item.id + index + Date.now()}>{item.title}</li>
      ))}
    </div>
  );
}

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

// =====================================================================================

### MORE Simple Way:

import React, { useState, useEffect, useRef } from 'react';

import './style.css';

export default function App() {
  let [data, setData] = useState([]);

  const getData = async () => {
    let response = await fetch('https://dummyjson.com/products');
    let result = await response.json();
    setData(result.products);
  };

  useEffect(() => {
    getData();

    let timer = setInterval(getData, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>

      {data?.map((item, index) => (
        <li key={item.id + index + Date.now()}>{item.title}</li>
      ))}
    </div>
  );
}

// =========================================================================================================

### NOTE :
Short polling is a simpler form of asynchronous communication, where the client sends periodic requests to the server at fixed intervals, checking for updates. This method is less efficient compared to long polling, as it often results in frequent unnecessary requests. Even if no new data is available, the client continues to send requests, potentially causing an increase in network traffic and server load. Here In Short polling we might face race condition aw well because we are continuously calling api after a short interval
so we are not sure when and which api gets called first. So it better give high time (2000,3000,4000 etc)

```
