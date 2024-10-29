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

- Polling in React applications is a powerful technique to keep the user's page up-to-date with the latest data without needing them to refresh the page manually. At its core, React polling involves making periodic API calls to a server to fetch the most current data.

This method is beneficial in scenarios where data changes frequently and needs to be displayed in real-time, such as in a dashboard displaying live statistics or a chat app that shows new messages.

Unlike traditional API calls that occur once when a user performs an action or when a component mounts, React polling continuously sends requests at specified polling intervals. This ensures that the app remains interactive and that the data displayed is as fresh as possible.

However, it's crucial to balance the frequency of these API calls to avoid overwhelming the server or degrading the user experience with excessive loading times.

- `Polling intervals are the heartbeats of React polling, dictating how often your app should make API calls to fetch new data. The key to setting up effective polling intervals lies in striking a balance between real-time updates and system performance. A shorter polling interval means more up-to-date information but can lead to higher server load and potential performance bottlenecks. Conversely, a longer interval reduces the load but may result in stale data.`

### Different types of Polling:

- 1. `Short Polling:` In a short polling client requests data from the server and the server will return the response if it is available and if it is not available then it returns an empty response. This process will be repeated at regular intervals.

Although, there are a few problems with short polling, i.e., the frequency of polling can cause an unacceptable burden on the network, the server, or both, when the acceptable latency is low, in general.

- 2.  `long polling :` In Short polling, there was a problem that if the response is not available then the server returns an empty response.
      So, In long polling, this problem got solved. Here, in long polling, the client sends a request to the server and if the response is not available then the server will hold the request till the response gets available, & after the availability of the response, the server will send the response back. After getting a response, again the request will be made either immediately or after some period of time and this process will repeat again and again. In simple words, the client will always be in the live connection to the server.

A. With Long-Polling, the client requests information from the server exactly as in normal polling, but with the expectation that the server may not respond immediately. That’s why this technique is sometimes referred to as a “Hanging GET”.

B. as it receives the response , client send the new request of polling to server again . But unlike regular polling it does not keep on sending request , it waits till the time it gets response.

Protocol : HTTP -> application/json -> text/palin

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
import React, { useState, useEffect, useRef } from 'react';

import './style.css';

export default function App() {
  let [data, setData] = useState([]);

  const getData = async () => {
    try {
      let response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let result = await response.json();
      setData(result.products);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
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

  //  This useEffect hook ensures that the most recent callback is always used without re-establishing the interval.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  //  This second useEffect hook is responsible for setting up the interval with setInterval and clearing it with clearInterval when the component unmounts or the delay changes.
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

### Example of Long polling in React :

`Long Polling Process Workflow:`

1. The client initiates a request to the server, typically through an HTTP request.
2. Instead of immediately responding, the server holds the request open, keeping the connection active (live).
3. If no new data is available, the server waits until it has something to send back.
4. Once the server has new data or a predefined timeout occurs, it responds to the client with the latest information.
5. Upon receiving the response, the client immediately sends another request to the server to maintain the connection.
   This cycle of sending requests and receiving responses continues, ensuring real-time updates.

```js
import React, { useState, useEffect, useRef } from 'react';
import './style.css';

### ### EXAMPLE 1:

export default function App() {
  let [data, setData] = useState([]);
  let [isError, setIsError] = useState('');
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let result = await response.json();
        setData(result.products);
      } catch (error) {
        setIsError(error);
      } finally {
        getData() // Trigger the next request immediately after receiving a response.
      }
    };
    getData(); // Start the long polling process
  }, []);

  if (isError) {
    return <p>{isError}</p>;
  }

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


//  In above example the api is getting called faster when the response comes from server the getData() method calls immediately. so to check until the response comes from server
//  do not call the getData() method. So we made below code to check it behavior.

### EXAMPLE 2:

export default function App() {
  let [data, setData] = useState([]);
//  Here we have created this function just pause a api call by using setTimeout. according to long polling when response from the server then only we call function again.
//  to check this behavior we used this function. Otherwise above example is good.
  const getApiResponse = () => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          let response = await fetch("https://dummyjson.com/products");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }, 5000);
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await getApiResponse();
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let result = await response.json();
        setData(result.products);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        getData();
      }
    };
    getData();
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
```

### Explanation of Sort Polling with visibilitychange feature.

- In this Example when switch our tab to another tab then polling will stop running, because the visibility of page is gone. But when we come back then it will start again.
- Note : It will work when we Switch tab not on when we switch one react route to another route.

Implementing efficient polling in a React application, where the polling starts when users actively view a page and stops when they navigate away or switch tabs, can be challenging. In this blog post, we will explore a solution that effectively handles visibility changes and gracefully stops polling when necessary. We’ll utilize the useEffect hook, handle page visibility changes using the Page Visibility API, and ensure polling starts and stops based on user interaction. Additionally, we will implement a mechanism to stop polling in case of API failures, preventing unnecessary requests. Let’s dive in and discover how to implement this solution in your React application.

- Handling Page Visibility:
  To handle page visibility changes, we can leverage the Page Visibility API available in modern browsers. In order to encapsulate this functionality, we created a custom hook called usePageVisibility. This hook utilizes the document.hidden property and the visibilitychange event to determine if the page is currently visible or hidden.

```js
// usePageVisibility.js
import { useEffect, useState } from "react";

export function usePageVisibility() {
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isPageVisible;
}


### Inside the usePageVisibility hook, we initialize the isPageVisible state variable based on the initial value of document.hidden. We then add an event listener for the visibilitychange event and update the isPageVisible state accordingly. The cleanup function ensures that the event listener is removed when the component unmounts.
```

- Implementing Polling with Visibility Control:
  Now that we have a way to track page visibility, let’s proceed with implementing the polling functionality. We created a component called MyComponent to demonstrate how to utilize the usePageVisibility hook and control polling based on visibility changes.

```js
import { useEffect, useState, useRef } from 'react';
import { usePageVisibility } from './usePageVisibility';

export function MyComponent() {
  const isPageVisible = usePageVisibility();
  const timerIdRef = useRef(null);
  const [isPollingEnabled, setIsPollingEnabled] = useState(true);

  useEffect(() => {
    const pollingCallback = () => {
      // Your polling logic here
      console.log('Polling...');

      // Simulating an API failure in the polling callback
      const shouldFail = Math.random() < 0.2; // Simulate 20% chance of API failure

      if (shouldFail) {
        setIsPollingEnabled(false);
        console.log('Polling failed. Stopped polling.');
      }
    };

    const startPolling = () => {
      // pollingCallback(); // To immediately start fetching data
      // Polling every 30 seconds
      timerIdRef.current = setInterval(pollingCallback, 30000);
    };

    const stopPolling = () => {
      clearInterval(timerIdRef.current);
    };

    if (isPageVisible && isPollingEnabled) {
      startPolling();
    } else {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [isPageVisible, isPollingEnabled]);

  return (
    // JSX for your component
  );
}


### In MyComponent, we utilize the usePageVisibility hook to obtain the current value of isPageVisible, indicating whether the page is visible or hidden. We also use a timerIdRef reference created with useRef to keep track of the polling interval without triggering re-renders. Additionally, we maintain an isPollingEnabled state variable to control whether polling should occur.

### Inside the useEffect hook, we define the pollingCallback function, which contains the actual logic for polling. In this example, we simulate a failure by introducing a random probability check. If the API call fails, we want to stop polling to avoid overloading the server with failure requests.

### To start and stop polling based on visibility and the polling enabled state, we have startPolling and stopPolling functions. startPolling sets up an interval using setInterval to execute the pollingCallback at a specified interval, while stopPolling clears the interval using clearInterval.

### By conditionally calling startPolling or stopPolling based on the current values of isPageVisible and isPollingEnabled, we ensure that polling only occurs when the page is visible and polling is enabled.

### The cleanup function returned by the useEffect hook stops the polling by calling stopPolling when the component unmounts. This ensures that we clean up the interval properly to avoid memory leaks.

```

### Here Is Full Example Short polling with visibilitychange feature. Change Tab and see polling will stop and start when comes back.

```js
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./style.css";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const NavBar = () => {
  return (
    <>
      <div>
        <p>
          <NavLink to="/">Home</NavLink>
        </p>
        <p>
          <NavLink to="/contact">Contact</NavLink>
        </p>
      </div>
    </>
  );
};

const HomePage = () => {
  let [data, setData] = useState([]);
  let [isError, setIsError] = useState("");
  const isPageVisible = usePageVisibility();
  const timerIdRef = useRef(null);
  const [isPollingEnabled, setIsPollingEnabled] = useState(true);

  const getApiResponse = () => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          let response = await fetch("https://dummyjson.com/products");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };
  let counter = 0;
  useEffect(() => {
    const pollingCallback = async (counter) => {
      // Your polling logic here
      try {
        let response = await getApiResponse();
        console.log(response, "response >>>", counter);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let result = await response.json();
        setData(result.products);
      } catch (error) {
        setIsPollingEnabled(false);
        setIsError(error);
      }
    };

    const startPolling = () => {
      // pollingCallback(); // To immediately start fetching data
      // Polling every 30 seconds

      timerIdRef.current = setInterval(() => {
        counter++;
        console.log("interval >>>>>>>>>>>>>", counter);
        pollingCallback(counter);
      }, 3000);
    };

    const stopPolling = () => {
      clearInterval(timerIdRef.current);
    };

    if (isPageVisible && isPollingEnabled) {
      startPolling();
    } else {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [isPageVisible, isPollingEnabled]);

  if (isError) {
    return <p>{isError}</p>;
  }

  return (
    <div>
      <h1>Home Page</h1>

      {data?.map((item, index) => (
        <li key={item.id + index + Date.now()}>{item.title}</li>
      ))}
    </div>
  );
};

const ContactPage = () => {
  return <>This is Contact Page</>;
};

export function usePageVisibility() {
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden);
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isPageVisible;
}
```

### ### Here Is Full Example long polling with visibilitychange feature. Change Tab and see polling will stop and start when comes back.

```js
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./style.css";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const NavBar = () => {
  return (
    <>
      <div>
        <p>
          <NavLink to="/">Home</NavLink>
        </p>
        <p>
          <NavLink to="/contact">Contact</NavLink>
        </p>
      </div>
    </>
  );
};

const HomePage = () => {
  let [data, setData] = useState([]);
  let [isError, setIsError] = useState("");
  const isPageVisible = usePageVisibility();
  const timerIdRef = useRef(null);
  timerIdRef.current = isPageVisible;

  const getApiResponse = () => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          let response = await fetch("https://dummyjson.com/products");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }, 4000);
    });
  };

  const pollingCallback = async () => {
    // Your polling logic here
    try {
      let response = await getApiResponse();
      console.log(response, "response");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let result = await response.json();
      setData(result.products);
    } catch (error) {
      setIsError(error);
    } finally {
      // Here if we give isPageVisible inside if condition then it will not work, because of closure. it will take initial value not the update value.So Used useRef() instead.
      if (timerIdRef.current) {
        pollingCallback();
      }
    }
  };

  useEffect(() => {
    pollingCallback();
  }, [isPageVisible]);

  if (isError) {
    return <p>{isError}</p>;
  }

  return (
    <div>
      <h1>Home Page</h1>

      {data?.map((item, index) => (
        <li key={item.id + index + Date.now()}>{item.title}</li>
      ))}
    </div>
  );
};

const ContactPage = () => {
  return <>This is Contact Page</>;
};

export function usePageVisibility() {
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden);
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isPageVisible;
}
```

### React Optimistic Update Feature.

```js
import React, { useState, useRef } from "react";
import "./style.css";

export default function App() {
  return (
    <div>
      <h1>Optimistic Data</h1>
      <p>Start clicking add with and without input values)</p>
      <OptimisticUpdate />
    </div>
  );
}

const OptimisticUpdate = () => {
  const [data, setData] = useState("");
  const [item, setItem] = useState([]);
  const [error, setError] = useState(null);
  const ElementFocus = useRef();
  const getOptimistic = (value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value) {
          if (isNaN(value)) {
            resolve(value);
          } else {
            reject("Numbers are not valid");
          }
        } else {
          reject("NOT FOUND");
        }
      }, 1000);
    });
  };

  const handleUpdate = (updatedData) => {
    setData(updatedData);
  };

  const handleClick = async () => {
    setItem([...item, data + " Loading ... "]);
    setData("");
    setError("");
    try {
      let response = await getOptimistic(data);
      setItem([...item, response]);
    } catch (error) {
      setItem([...item]);
      setError(error);
      setData(data);
      ElementFocus.current.focus();
    }
  };

  return (
    <div>
      <input ref={ElementFocus} type="text" value={data} onChange={(e) => handleUpdate(e.target.value)} />
      <button onClick={handleClick}>Add</button>
      <ul>{!!item.length && item.map((item, index) => <li key={index}>{item}</li>)}</ul>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
```

### Implement Custom useLocalStorage Hook in React.

```js

### 1st Example :

export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, removeItem };
};



### 2nd Example:

import { useState } from "react";

const useLocalStorage = (key, defaultValue) => {
    // Create state variable to store
    // localStorage value in state
    const [localStorageValue, setLocalStorageValue] = useState(() => {
        try {
            const value = localStorage.getItem(key)
            // If value is already present in
            // localStorage then return it

            // Else set default value in
            // localStorage and then return it
            if (value) {
                return JSON.parse(value)
            } else {
                localStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue
            }
        } catch (error) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue
        }
    })

    // this method update our localStorage and our state
    const setLocalStorageStateValue = (valueOrFn) => {
        let newValue;
        if (typeof valueOrFn === 'function') {
            const fn = valueOrFn;
            newValue = fn(localStorageValue)
        }
        else {
            newValue = valueOrFn;
        }
        localStorage.setItem(key, JSON.stringify(newValue));
        setLocalStorageValue(newValue)
    }
    return [localStorageValue, setLocalStorageStateValue]
}

export default useLocalStorage;


```

### ReactJS useInterval Custom Hook.

```js
import React, { useState, useEffect, useRef } from "react";

// creating the custom useInterval hook
export function useInterval(callback, delay) {
  // Creating a ref
  const savedCallback = useRef();

  const savedId = useRef();
  // To remember the latest callback .If we don't have a callback inside the use effect hook as dependency then it will not work because every time state changes then
  // This useInterval hook gets called again and again and the callback function gets new memory in space  so, useEffect hook will not get the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // combining the setInterval and clearInterval methods based on delay.
  useEffect(() => {
    function func() {
      savedCallback.current();
    }
    if (delay !== null) {
      savedId.current = setInterval(func, delay);
      return () => clearInterval(savedId.current);
    }
  }, [delay]);

  return savedId.current;
}

//  NOTE : if we try to pass reference to setInterval then it will not work :
useEffect(() => {
  if (interval) {
    savedId.current = setInterval(savedCallback.current, interval);
    return () => {
      clearInterval(savedId.current);
    };
  }
}, [interval]);

//  Reason :
// The issue is that savedCallback.current is not a function when you pass it to setInterval. This is because useRef initializes the ref with undefined, and you're not updating it with the actual callback function until the next render cycle.
// When you call setInterval(savedCallback.current, interval), savedCallback.current is still undefined, so setInterval is not calling the callback function.

//  To fix this : Pass reference function to dependency of useEffect.

useEffect(() => {
  if (interval) {
    savedId.current = setInterval(savedCallback.current, interval);
    return () => {
      clearInterval(savedId.current);
    };
  }
}, [interval, savedCallback.current]);
```

### ReactJS useTimeout Custom Hook.

```js
import React, { useState, useEffect, useRef } from 'react';

// creating the custom useTimeout hook
const useTimeout = (callback, delay) => {

	// Creating a ref
	const savedCallback = useRef();

	// To remember the latest callback .
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Setting and clearing up a timeout
	useEffect(() => {
		const func = () => {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setTimeout(func, delay);
			return () => clearTimeout(id);
		}
	}, [delay]);
};

export default useTimeout;


### App.js


import { React, useState } from 'react';
import './App.css';
import useTimeout from './useTimeout';

const App = () => {
    const [text, setText] = useState(false);

    //using the custom useTimeout hook
    useTimeout(() => {
        setText(true);
    }, 5000);

    return (
        <div className='msg'>
            <h1>
                {text
                    ? 'Hey Geek, welcome back to geeksforgeeks.'
                    : 'Your message is loading......'}
            </h1>
        </div>
    )
}

export default App;

```
