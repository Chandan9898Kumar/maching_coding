### 1. Find The OutPut

```ts
foo(); // Output: "Hello"
function foo() {
  console.log("Hello");
}
// The above code is equivalent to:
function foo() {
  console.log("Hello");
}
foo(); // Output: "Hello"


- In above example, we define `a function foo()` and call it before the actual declaration. Surprisingly, the code works without any errors. This is `because function declarations are hoisted to the top of their scope`, allowing us to `call the function before its declaration in the code`.
```

### 2. Difference between Micro-task Queue and Callback Queue ?

In JavaScript, both the Micro-task Queue (also known as the Job Queue) and the Callback Queue (also known as the Task Queue) are parts of the event loop mechanism that helps manage asynchronous operations. However, they serve different purposes and have distinct characteristics. Let’s explore the differences between the Micro-task Queue and the Callback Queue:

## Micro-task Queue (Job Queue):

Priority:

1. Higher priority than the Callback Queue.
2. Microtasks are executed before the next rendering, which makes them suitable for tasks that should be executed before the user interface updates.

`Examples of Microtasks:`

1. Promises: then(), catch(), and finally() callbacks.
2. process.nextTick in Node.js.

`Order of Execution:`

1. Microtasks are processed in a FIFO (First-In-First-Out) order.
2. Once the call stack is empty, the event loop checks the Microtask Queue and processes each microtask one by one.

`Usage Scenario:`

1. Often used for tasks that need to be executed before the browser renders, making it suitable for UI-related updates and ensuring faster response times.

## Callback Queue (Task Queue):

`Priority:`

1. Lower priority than the Microtask Queue.
2. Callbacks in the Callback Queue are executed after the Microtask Queue is empty.

`Examples of Callbacks:`

1. setTimeout and setInterval callbacks.
2. DOM events like click, input, etc.
3. I/O operations in Node.js.

`Order of Execution:`

1. Callbacks in the Callback Queue are processed in a FIFO order, similar to the Microtask Queue.
   The event loop checks the Callback Queue only when the Microtask Queue is empty.

`Usage Scenario:`

1. Used for general asynchronous tasks and I/O operations that don’t require immediate attention and can be deferred.

## Relationship:

1. Execution Order:

A. When the call stack is empty, the event loop first checks the Microtask Queue. If there are microtasks, it executes them all.
B. After the Microtask Queue is empty, the event loop checks the Callback Queue and executes any available callbacks.
C. This process continues in a loop.

2. Interaction:

A. Microtasks are often used for tasks that need to be completed immediately and impact the rendering process.
B. Callbacks in the Callback Queue are typically used for less critical tasks, such as deferred or background operations.

### 3. Write a JavaScript function to parse an URL.

```ts
function parse_URL(url) {
  var a = document.createElement("a");
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(":", ""),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function () {
      var ret = {},
        seg = a.search.replace(/^\?/, "").split("&"),
        len = seg.length,
        i = 0,
        s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split("=");
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1],
    hash: a.hash.replace("#", ""),
    path: a.pathname.replace(/^([^\/])/, "/$1"),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
    segments: a.pathname.replace(/^\//, "").split("/"),
  };
}

console.log(parse_URL("https://github.com/pubnub/python/search?utf8=%E2%9C%93&q=python"));
```

### 4. What is Document Object Model (DOM)

- The Document Object Model (DOM) is an application programming interface (API) for manipulating HTML documents.

- The DOM represents an HTML document as a tree of nodes. The DOM provides functions that allow you to add, remove, and modify parts of the document effectively.

- Note that the DOM is cross-platform and language-independent ways of manipulating HTML and XML documents.

- In this DOM tree, the document is the root node. The root node has one child node which is the <html> element. The <html> element is called the document element.

- Each document can have only one document element. In an HTML document, the document element is the <html> element. Each markup can be represented by a node in the tree.

# NOTE :

`The getElementById()` and `querySelector()` returns an object with the Element type while `getElementsByTagName()` or `querySelectorAll()` returns NodeList which is a collection of nodes.

`Node Relationships`

- Any node has relationships to other nodes in the DOM tree. The relationships are the same as the ones described in a traditional family tree.

1. For example, <body> is a child node of the <html> node, and <html> is the parent of the <body> node.

2. The <body> node is the sibling of the <head> node because they share the same immediate parent, which is the <html> element.

<!--
How to flatten a deeply nested array?
How to implement Array indexOf method?
How to implement Array includes method?
How to implement Array findIndex method?
How to implement Array find method?
How to implement Array at method?
How to implement Array some method?
How to implement Array every method?
How to implement Array unshift method?
How to implement Array pop method? -->

### 5. What is the Output

```ts
setTimeout(() => {
  console.log("timeout 1");

  Promise.resolve().then(() => {
    console.log("promise 1");
  });
}, 0);

new Promise(function (resolve, reject) {
  console.log("promise 2");

  setTimeout(() => {
    console.log("timeout 2");

    resolve("resolve 1");
  }, 0);
}).then((res) => {
  console.log("dot then 1");
  setTimeout(() => {
    console.log(res);
  }, 0);
});
```

### 6. What is the OutPut

```ts
console.log("start");

const promise1 = Promise.resolve().then(() => {
  console.log("promise 1");
  const timer2 = setTimeout(() => {
    console.log("timer2");
  }, 0);
});

const timer1 = setTimeout(() => {
  console.log("timer1");
  const promise2 = Promise.resolve().then(() => {
    console.log("promise2");
  });
}, 0);

console.log("stop");
```

### 7. What is the OutPut

```ts
var value = 2;

function outer() {
  console.log(value, "outer");

  function inner() {
    console.log(value, "inner");
  }

  inner();

  var value = 5;
}

outer();
```

### 8. what is the output

```ts
var name = "Yomesh";

function print(name) {
  console.log(name);
  var name = "Ajay";
  console.log(name);
}
print(name);

- NOTE :  We are capturing the variable in function arguments.
// OUTPUT:
1. "Yomesh"
2.  "Ajay"



//            B.

var name = "Yomesh";

function print() {
  console.log(name);
  var name = "Ajay";
  console.log(name);
}
print();


- NOTE : Here we did not pass variable inside function arguments, so value will not be retained and hence due to hoisting it will show undefined.
// OUTPUT :
1. undefined
2. "Ajay"
```

### 9. what is the output

```ts
async function check() {
  await Promise.resolve(console.log(1));
  console.log(2);
}

console.log(3);
check();
console.log(4);

//  O/P  3,1,4,2

//  Explanation :

//   js starts executing the code synchronously so,
//  first console.log(3) will be printed.
//  next code will move on to check function ,now this is a asynchronous function which executes its statement synchronously up-to the await statement.
//  so when it reaches the await statement promise.resolve function is called  since argument provided to this function is a function call itself with console.log(1)
//  so this console function is also executed and return undefined (console does not return anything) so this undefined is passed to the promise.resolve function
//  top level code up-to await is now executed synchronously but the below which comes after the await will run asynchronously(consider this as a .then(()=>))
//  now however this promise resolved immediately js first completes the synchronous task first and moves on to next synchronous code which is console.log(4)
// now all  of these synchronous task has finished executing and then it moves back to execute asynchronous task so this means that after
// running console.log(4)  the final console.log(2) statement will be executed.

//  Note : the asynchronous code is handled by the micro-task queue and it is executed by the event loop only after the call stack is empty.
```

### 10. what is the output

<!--  Check above explanation -->

```ts
async function check() {
  await setTimeout(() => {
    console.log(1);
  }, 100);
  console.log(2);
}

console.log(3);
check();
console.log(4);

// O/P :  3,4,2,1

//   Next  below code console.log(2) will not works as async because no await is there as given at above example.
async function check() {
  setTimeout(() => {
    console.log(1);
  }, 100);
  console.log(2);
}

console.log(3);
check();
console.log(4);

//  O/P : 3,2,4,1
```

### 11. write a function which satisfy the logic

<!--
count() // 1
count() // 2
count() // 3
count.reset()
count() //1
count() // 2
count() // 3
-->

```ts
//  A closure is a function having access to the parent scope, even after the parent function has closed.

//  Method 1. with the help of closure we can get it.
function add() {
  let counter = 0;
  function countValue() {
    counter += 1;
    return counter;
  }

  //  NOTE: We know that everything in js is an object, so we created a reset function on  countValue function in its property,
  countValue.reset = function () {
    counter = 0;
  };

  return countValue;
}

const count = add();

console.log(count());
console.log(count());
console.log(count());
count.reset();

console.log(count());
console.log(count());
console.log(count());

//                                                      By using IIFE to form closure

const count = (function () {
  let value = 0;

  function inner() {
    value++;
    return value;
  }

  inner.reset = function () {
    value = 0;
  };

  return inner;
})();

console.log(count());
console.log(count());
console.log(count());
count.reset();

console.log(count());
console.log(count());
console.log(count());

// The variable 'count' is assigned to the return value of a self-invoking function.
// The self-invoking function only runs once. It sets the counter to zero (0), and returns a function expression.
// This way add becomes a function. The "wonderful" part is that it can access the counter in the parent scope.
// This is called a JavaScript closure. It makes it possible for a function to have "private" variables.
// The counter is protected by the scope of the anonymous function, and can only be changed using the count function.
```

### 12. what is the output

```ts
// <!--  1. -->
function counter() {
  let count = 0;

  return function call() {
    count++;
    return count;
  };
}

const callBack = counter();
console.log(callBack());
console.log(callBack());
console.log(callBack());

//    2.
function counter() {
  let count = 0;

  return function call() {
    return count++;
  };
}

const callBack = counter();

console.log(callBack());
console.log(callBack());
console.log(callBack());



//  NOTE :The increment (++) operator increments (adds one to) its operand and returns the value before or after the increment,depending on where the operator is placed.
// 1. If used postfix, with operator after operand (for example, x++), the increment operator increments and returns the value before incrementing.

- Postfix increment
Example :
let x = 3;
const y = x++;
// x is 4; y is 3

let x2 = 3n;
const y2 = x2++;
// x2 is 4n; y2 is 3n

// 2. If used prefix, with operator before operand (for example, ++x), the increment operator increments and returns the value after incrementing.
- Prefix increment
let x = 3;
const y = ++x;
// x is 4; y is 4

let x2 = 3n;
const y2 = ++x2;
// x2 is 4n; y2 is 4n
```

### 13. Write a script to fetch top 3 results from Google search. Search this in google engine : last element of string java and get top 3 results.

```ts
function search() {
  let items = document.querySelectorAll(".yuRUbf a");

  let array = [];

  for (let x of items) {
    let links = x.getAttribute("href");

    array.push(links);
  }

  return array.slice(0, 3);
}

const result = search();

console.log(result);
```

### 14. What is Reconciliation in React JS

```ts
1️⃣ When a component's state is updated in ReactJS, it generates a new virtual DOM tree, referred to as the "updated tree", which mirrors the new state of the UI.

2️⃣ React compares this "updated tree" with the previous virtual DOM tree, known as the "current tree", to pinpoint the differences.

3️⃣ After identifying the changes, React selectively updates only the parts of the actual DOM that have changed, avoiding a complete re-render.

4️⃣ This selective update process, known as "reconciliation" or "diffing", is key to ReactJS's efficiency, significantly reducing the number of operations needed to refresh the UI.

5️⃣ React also prioritizes updates to improve user experience by ensuring critical updates are processed first, making interactions feel smoother and more responsive.

6️⃣ Additionally, React can batch multiple state updates together, which further optimizes performance by reducing the frequency of re-renders and updates to the DOM.

```

### 15. Explain all 7 of OOPS concepts

```ts
1️⃣ Encapsulation
-  Bundles data and methods in a single unit.
-  Protects data from outside interference and misuse.

Example: A class `Car` with private attributes like `speed` and `fuel`, and public methods like `accelerate` and `brake`.

 2️⃣ Abstraction
-  Hides complex implementation details, exposing only the necessary information.
-  Simplifies code interaction and reduces complexity.

Example: A `Database` interface with methods `connect` and `query`, hiding the details of SQL or NoSQL operations.

 3️⃣ Inheritance
-  Allows a class to inherit properties and behaviors from another class.
-  Promotes code reuse and reduces redundancy.

Example: A `Vehicle` class inherited by `Car` and `Bike` classes, sharing common properties like `engine` and methods like `start`.

 4️⃣ Polymorphism
-  Objects of different types can be treated as the same type.
-  Enables flexible and modular code.

Example: A method `draw` that can work with objects of `Circle`, `Square`, and `Triangle` classes.

 5️⃣ Composition
-  Combines simpler objects to create complex ones.
-  Enhances code maintainability and flexibility.

Example: A `House` class composed of `Room` objects like `Kitchen`, `Bedroom`, and `Bathroom`.

 6️⃣ Association
-  Relationship between two objects where one uses or depends on the other.
-  Defines how objects interact with each other.

Example: A `Library` class is associated with `Book` class where the library contains books.

 7️⃣ Dependency Inversion
-  High-level modules should not depend on low-level modules;
-  both should depend on abstractions.
-  Reduces coupling between code and enhances flexibility.

Example: A `PaymentProcessor` class depends on an `IPaymentGateway` interface instead of concrete implementations like `Paypal` or `Stripe`.

```

### 16. fetch retry function typescript

```ts
export async function fetchRetry(url: string, delay: number, tries: number, callback: () => void, handleError?: (error: any) => void) {
  async function onError(err: any) {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      handleError?.(err);
      return;
    }
    await wait(delay);
    return fetchRetry(url, delay, triesLeft, callback, handleError);
  }
  try {
    const response = await fetchPolyfill(api(url));
    const result: { canRoute: boolean } = await response.json();
    if (result.canRoute) {
      callback();
    } else {
      onError("Contact not created in Hubspot CRM");
    }
  } catch (error) {
    onError(error);
  }
}
```

### 17. Design and Implement localStorage API .

you need to design and implement the localStorage API. It should mimic the behaviour of existing window.localStorage.

- Properties

1. localStorage.length
   Returns an integer representing the number of data items stored in the localStorage object.

- Methods:

1. localStorage.setItem(key, value)
   When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.

2. localStorage.getItem(key)
   When passed a key name, will return that key's value.

3. localStorage.removeItem(key)
   When passed a key name, will remove that key from the storage.

4. localStorage.clear()
   When invoked, will empty all keys out of the storage.

Make sure you handle different edge cases

```ts
// 1.                                               Implementation using Objects:
class LocalStorage {
  constructor() {
    this.store = {};
    this.length = 0;
  }

  getItem = (...args) => {
    if (!args.length) {
      throw new TypeError("Failed to execute 'getItem'. 1 argument required, but only 0 present.");
    }

    const key = args[0];

    if (Object.prototype.hasOwnProperty.call(this.store, key)) {
      return this.store[key];
    }

    return undefined;
  };

  setItem = (...args) => {
    if (!args.length || args.length < 2) {
      throw new TypeError(`Failed to execute 'setItem'. 2 argument required, but only ${args.length} present.`);
    }

    const key = args[0];
    const value = args[1];

    this.store[String(key)] = String(value);
    this.length += 1;
  };

  removeItem = (...args) => {
    if (!args.length) {
      throw new TypeError("Failed to execute 'removeItem'. 1 argument required, but only 0 present.");
    }

    const key = args[0];

    if (Object.prototype.hasOwnProperty.call(this.store, key)) {
      delete this.store[key];
    }

    this.length -= 1;
  };

  clear = () => {
    this.store = {};
    this.length = 0;
  };
}

const localStorage = new LocalStorage();

//  2.                                               Implementation using Map
class LocalStorage {
  constructor() {
    this.store = new Map();
  }

  get length() {
    return this.store.size;
  }

  getItem = (...args) => {
    if (!args.length) {
      throw new TypeError("Failed to execute 'getItem'. 1 argument required, but only 0 present.");
    }

    const key = args[0];

    return this.store.get(String(key));
  };

  setItem = (...args) => {
    if (!args.length || args.length < 2) {
      throw new TypeError(`Failed to execute 'setItem'. 2 argument required, but only ${args.length} present.`);
    }

    const key = args[0];
    const value = args[1];

    this.store.set(String(key), String(value));
  };

  removeItem = (...args) => {
    if (!args.length) {
      throw new TypeError("Failed to execute 'removeItem'. 1 argument required, but only 0 present.");
    }

    const key = args[0];

    this.store.delete(String(key));
  };

  clear = () => {
    this.store.clear();
  };
}

const localStorage = new LocalStorage();
```

### 18. LocalStorage with expiry

`Points:`

1. Extend the local storage to accept an expiry time and expire the entry after that time.

- To implement this we will override the existing local storage method.

While adding the entry we will accept the expiry date in milliseconds (30 days by default). Set the expiry date to time from the current date along with the value and store it in the original local storage.

Likewise, while getting the value for the given key, check if there is a value associated with the key, if it exists and is not expired then return the value, else remove the entry and return null.

```ts
window.myLocalStorage = {
  getItem(key) {
    // get the parsed value of the given key
    let result = JSON.parse(window.localStorage.getItem(key));

    // if the key has value
    if (result) {
      // if the entry is expired
      // remove the entry and return null
      if (result.expireTime <= Date.now()) {
        window.localStorage.removeItem(key);
        return null;
      }

      // else return the value
      return result.data;
    }

    // if the key does not have value
    return null;
  },

  // add an entry
  // default expiry is 30 days in milliseconds
  setItem(key, value, maxAge = 30 * 60 * 60 * 1000) {
    // store the value as object
    // along with expiry date
    let result = {
      data: value,
    };

    if (maxAge) {
      // set the expiry
      // from the current date
      result.expireTime = Date.now() + maxAge;
    }

    // stringify the result
    // and the data in original storage
    window.localStorage.setItem(key, JSON.stringify(result));
  },

  // remove the entry with the given key
  removeItem(key) {
    window.localStorage.removeItem(key);
  },

  // clear the storage
  clear() {
    window.localStorage.clear();
  },
};

`Input:`;
myLocalStorage.setItem("foo", "bar", 1000);

setTimeout(() => {
  console.log(myLocalStorage.getItem("foo"));
}, 1500);

`Output:`;
// null
```

### 19. design ui which shows concentric circles based on given number of times.

```ts
export default function App() {
  const NUM = 5;
  return (
    <div className="App">
      <Circles n={NUM} />
    </div>
  );
}

const Circles = ({ n }) => {
  const size = `${n * 100}px`;
  const styles = {
    width: size,
    height: size,
    border: "1px solid gray",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return <div style={styles}>{n > 1 ? <Circles n={n - 1} /> : null}</div>;
};
```

### 20. Fetch not throwing error on 4XX in JavaScript.

1. Fetch in JavaScript helps you to make the network call and fetch the data from the server.

2. It is easy to use and abstracts the traditional XMLHttpRequest object and helps to do better to Ajax calls.

```ts
`This is how we make requests using fetch,`
async function networkCall(){
  try{
    const response = await fetch('https://learnersbucket.com/dummy');
    return response.json();
  }catch(e){
    console.error(e);
  }
}

- The weird thing about above example is that  fetch does not throw an error when the HTTP network returns status 4XX or 5XX. To fix this, we can use a workaround and manually throw an error when the network status is not OK or 200.

`Solution :`
async function networkCall(){
  try{
    const response = await fetch('https://learnersbucket.com/dummy');
    if(!response.ok){
       // Throw an error if not 200
       throw new Error('Did not received 200 in response');
    }
    return response.json();
  }catch(e){
    console.error(e);
  }
}
```

### 21. Implement ClearAllInterval in JavaScript

- Points To Notice.

1. JavaScript has a timer function setInterval which repeatedly executes a function after a specified amount of time. Each setInterval method returns a unique id which can be used to cancel or clear the interval using clearInterval.

2. It is a common interview question where we are asked to implement a method clearAllInterval which will clear all the running setInterval’s.

3. Similarly, as we have implemented the clearAllTimeout method, the same logic can be used to implement the clearAllInterval.

4. First, to clear all the intervals at once, we need to store all of them so that they can be cleared one by one using the clearInterval method.

5. Thus we can define a global variable intervalIds that will store the ids of the setIntervals and override the existing setInterval function to push the ids in this global variable.

```ts
//to store all the interval ids
window.intervalIds = [];

//original interval function
const originalIntervalFn = window.setInterval;

//overriding the original
window.setInterval = function (fn, delay) {
  const id = originalIntervalFn(fn, delay);
  //storing the id of each interval
  intervalIds.push(id);
  return id;
};

//clear all interval
window.clearAllInterval = function () {
  while (intervalIds.length) {
    clearInterval(intervalIds.pop());
  }
};

//  Execution:

let timer = setInterval(() => {
  console.log("Hello");
}, 2000);

let timer2 = setInterval(() => {
  console.log("Hello2");
}, 5000);

clearAllInterval(); // It will stop all setIntervals But if you want to stop single interval then pass the timer inside clearAllInterval(timer) and set while loop accordingly.

let timer3 = setInterval(() => {
  console.log("Hello3");
}, 1000);

// Output:
("Hello3"); // after every ~1 sec

//  Note: top two setInterval method  will not execute because we have called clearAllInterval but below setInterval will work and o/p : Hello3


- If you notice, here we have added a global variable intervalIds which we are using to store the ids of each setInterval and later to cancel all of them. Using the global variable is bad practice as it can be overridden.

1. One thing you could do over here is to wrap these inside a closure or higher-order function or an Object to keep it restricted.

2. This way we won’t be interfering with existing methods and can still get our work done.


const MY_TIMERS = {
    intervalIds : [],//global interval id's arrays
    //create a MY_TIMERS's interval
    setInterval : function(fn,delay){
        let id = setInterval(fn,delay);
        this.intervalIds.push(id);
        return id;
    },
    //MY_TIMERS's clearAllTimeout
    clearAllInterval : function(){
        while(this.intervalIds.length){
          clearInterval(this.intervalIds.pop());
        }
    }
};

//  Execution:
MY_TIMERS.setInterval(() => {
  console.log("Hello");
}, 2000);

MY_TIMERS.setInterval(() => {
  console.log("Hello2");
}, 500);

MY_TIMERS.clearAllInterval();

MY_TIMERS.setInterval(() => {
  console.log("Hello3");
}, 1000);

```

### 22 .Implement clearAllTimeout in JavaScript.

1. ClearAllTimeout clears all the setTimeout which are active.

2. setTimeout is an asynchronous function that executes a function or a piece of code after a specified amount of time.

3. setTimeout method returns a unique Id when it is invoked, which can be used to cancel the timer anytime using the clearTimeout method which is inbuilt.

4. Reading about the problem statement we can understand that all we have to do is to clear all the active timers and the same can be done by clearing all timeoutIds using clearTimeout.

```ts
//  to clear all the timeoutIds at once, we will need to store them somewhere, let’s say in an array. For which we will override the existing setTimeout method and collect all the timeoutIds in an array.
window.timeoutIds = [];

// store the original method
const originalTimeoutFn = window.setTimeout;

//over-writing the original method
window.setTimeout = function (fn, delay) {
  const id = originalTimeoutFn(fn, delay);
  timeoutIds.push(id);

  //return the id so that it can be originally cleared
  return id;
};

window.clearAllTimeout = function () {
  //clear all timeouts
  while (timeoutIds.length) {
    clearTimeout(timeoutIds.pop());
  }
};


//  Execution :
- If we test this, this runs as expected. It will clear all the timeouts, as setTimeout is an Asynchronous function, meaning that the timer function will not pause execution of other functions in the functions stack, thus clearAllTimeout runs and cancels them before they can be executed.

setTimeout(() => {console.log("hello")}, 2000);
setTimeout(() => {console.log("hello1")}, 3000);

clearAllTimeout(); // Here it will clear all timeout above it and prevent them from execution.

setTimeout(() => {console.log("hello2")}, 4000);
setTimeout(() => {console.log("hello3")}, 5000);


- OR By Using IIFE

(function(w) {

  const timeoutIds = [];

  // store the original method
  const originalTimeoutFn = w.setTimeout;

  // override the original setTimeout method with our
  // custom implementation
  w.setTimeout = function(fn, delay) {
    const id = originalTimeoutFn(fn, delay);
    timeoutIds.push(id);
    //return the id so that it can be originally cleared
    return id;
  }
  w.clearAllTimeout = function(){
    //clear all timeouts
    while(timeoutIds.length){

      clearTimeout(timeoutIds.pop());

    }
  }
})(window);

- Case 1 without clearing
setTimeout(() => {console.log("One")}, 4000);
setTimeout(() => {console.log("Two")}, 5000);
setTimeout(() => {console.log("Three")}, 6000);
setTimeout(() => {console.log("Four")}, 7000);

`O/P :`
// One
// Two
// Three
// Four


- Case 2 with clearing
setTimeout(() => {console.log("One")}, 4000);
setTimeout(() => {console.log("Two")}, 5000);
setTimeout(() => {console.log("Three")}, 6000);
setTimeout(() => {console.log("Four")}, 7000);
clearAllTimeout();

`O/P :`
//  It will print nothing.

- NOTE :
1. Here we have added a global variable timeoutIds which we are using to store the ids of each setTimeout and later to cancel all of them, using the global variable is bad practice as it can be overridden.

2. One thing you could do over here is to wrap these inside a closure or higher-order function or an Object to keep it restricted.

3. This way we won’t be interfering with existing methods and can still get our work done.


`Optimized Way :`
const MY_TIMERS = {
    timeoutIds : [],//global timeout id arrays.

    //create a MY_TIMERS's timeout
    setTimeout : function(fn,delay){
        let id = setTimeout(fn,delay);
        this.timeoutIds.push(id);
        return id;
    },
    //MY_TIMERS's clearAllTimeout
    clearAllTimeout : function(){
        while(this.timeoutIds.length){
          clearTimeout(this.timeoutIds.pop());
        }
    }
};


const id1 = MY_TIMERS.setTimeout(() => {console.log("hello1")}, 1000);
console.log(id1);

const id2 = MY_TIMERS.setTimeout(() => {console.log("hello2")}, 2000);
console.log(id2);

MY_TIMERS.clearAllTimeout();

const id3 = MY_TIMERS.setTimeout(() => {console.log("hello3")}, 3000);
console.log(id3);
```

### 23. Methods for Merging Nested Objects in JavaScript.

```ts
const obj1 = {
  name: "gk",
  Home: {
    place: "London",
    country: "Uk",
    Game: {
      type: {
        action: "gta",
      },
    },
  },
};

const obj2 = {
  subject: "SST",
  school: {
    place: "bangalore",
    name: "dav",
  },
};


- 1. Shallow Merge with Spread Operator
The spread operator (...) is a concise way to merge two objects. While it performs a shallow merge, it's a quick and clean solution for simple cases.

const shallowMergedObj = { ...obj1, ...obj2 };
console.log(shallowMergedObj)



- 2. Using Object.assign
Object.assign is a method for copying the values of all enumerable properties from one or more source objects to a target object, providing a simple way for shallow merging.

const shallowMergedObjAssign = Object.assign({}, obj1, obj2);
console.log(shallowMergedObjAssign)

- 3.  Using JSON.parse and JSON.stringify
For JSON-serializable objects, converting them to JSON strings, merging the strings, and then parsing them back can be an interesting approach.

const jsonString1 = JSON.stringify(obj1);
const jsonString2 = JSON.stringify(obj2);
const mergedJsonString = JSON.stringify({ ...JSON.parse(jsonString1), ...JSON.parse(jsonString2) });

const deepMergedObjJSON = JSON.parse(mergedJsonString);
console.log(deepMergedObjJSON)



- 4. Using a Library — Lodash
Lodash is a popular utility library with a merge function that handles deep merging efficiently.

const _ = require('lodash');

const lodashMergedObj = _.merge({}, obj1, obj2);

- 5. Using a Library — Deepmerge
The deepmerge library provides a dedicated utility for deep merging, making the process straightforward.

const deepmerge = require('deepmerge');

const deepMergedObjDeepmerge = deepmerge(obj1, obj2);


- 6. Using a Library — Ramda
Ramda is a functional programming library that includes a mergeDeepRight function for deep merging.

const R = require('ramda');
const ramdaMergedObj = R.mergeDeepRight(obj1, obj2);

- 7. Using ES6 Spread Operator for Deep Merge
Leveraging the ES6 spread operator with recursion allows for a concise syntax while achieving a deep merge.

function deepMergeWithSpread(obj1, obj2) {
  const result = { ...obj1 };

  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
        result[key] = deepMergeWithSpread(obj1[key], obj2[key]);
      } else {
        result[key] = obj2[key];
      }
    }
  }

  return result;
}

const deepMergedObjSpread = deepMergeWithSpread(obj1, obj2);


- 8. Deep Merge with Recursive Function
For a deep merge, a recursive function can be employed to traverse and merge nested objects at all levels.

function deepMerge(obj1, obj2) {
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
        obj1[key] = deepMerge(obj1[key], obj2[key]);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  return obj1;
}

const deepMergedObj = deepMerge(obj1, obj2);
```

### 24. What is a deep copy ?

1. A deep copy means actually creating a new array and copying over the values, since whatever happens to it will never affect the original one.
2. For objects and arrays containing other objects or arrays, copying these objects requires a deep copy. Otherwise, changes made to the nested references will change the data nested in the original object or array.
3. When JavaScript objects including arrays are deeply nested, the spread operator only copies the first level with a new reference, but the deeper values are still linked together. To solve this problem requires creating a deep copy

- Shallow Copy Example

```ts
1. Array.from,
let a = [{x:1,y:2,z:3}];
let b = Array.from(a);
b[0].x = 0;

console.log(JSON.stringify(a)); // [{"x":0,"y":2,"z":3}]
console.log(JSON.stringify(b)); // [{"x":0,"y":2,"z":3}]

2. Object.create,
let a = [{x: 1,y: 2,z: 3}];
let b = Array.from(Object.create(a));
b[0].x = 0;

console.log(JSON.stringify(a)); // [{"x":0,"y":2,"z":3}]
console.log(JSON.stringify(b)); // [{"x":0,"y":2,"z":3}]

3. Object.assign,

let a = { x: {z:1} , y: 2};
let b = Object.assign({}, a);
b.x.z=0

console.log(JSON.stringify(a)); // {"x":{"z":0},"y":2}
console.log(JSON.stringify(b)); // {"x":{"z":0},"y":2}

```

- For Deep Copy,

1. $.extend is the deep copy solution for nested objects and objects inside array.

2. JSON.parse and JSON.stringify is the best and simple way to Deep copy. The JSON.stringify() method converts a JavaScript value to a JSON string.The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string.

- Deep Copy Example

```ts
The easiest (but flawed) way to deep copy an object in JavaScript is to first serialize it and then deserialize it back via JSON.stringify and JSON.parse.

Although this approach is acceptable given the input object only contains null, boolean, number, string, you should be aware of the downsides of this approach:

  1.  We can only copy non-symbol-keyed properties whose values are supported by JSON. Unsupported data types are simply ignored.
  2. JSON.stringify also has other a few surprising behaviors such as converting Date objects to ISO timestamp strings, NaN and Infinity becoming null etc.


 - On Object.
let a = { x:{z:1} , y: 2};
let b = JSON.parse(JSON.stringify(a));
b.x.z=0

console.log(JSON.stringify(a)); // {"x":{"z":1},"y":2}
console.log(JSON.stringify(b)); // {"x":{"z":0},"y":2}


- On objects inside array.

//Deep Clone
let a = [{ x:{z:1} , y: 2}];
let b = JSON.parse(JSON.stringify(a));
b[0].x.z=0

console.log(JSON.stringify(a)); //[{"x":{"z":1},"y":2}]
console.log(JSON.stringify(b)); // [{"x":{"z":0},"y":2}]

- Implementation of Deep Copy, Without using any third party.

A deep clone makes a copy of JavaScript value, leading to a completely new value that has no references pointing back to the properties in the original object (if it's an object). Any changes made to the deep-copied object will not affect the original object.

const obj = {
   a1: {
       b1: {
           c1: "SS"
       }
    }
}
const deepCopy = (val) => {
   if (["string", "boolean", "number"].includes(typeof val)) {
      return val;
   } else if (Array.isArray(val)) {
      return val.map(item => deepCopy(item))
   } else {
      return Object.keys(val).reduce((acc, key) => {
        acc[key] = deepCopy(val[key]);
        return acc;
     }, {});
  }
}
console.log(deepCopy(obj));

//   Method 2

const  deepClone(value) {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, value]) => [key, deepClone(value)]),
  );
}

console.log(deepClone(obj))
```

### 25. Convert HEX color to RGB in JavaScript.

`NOTE :`

- Hexadecimal uses 16 unique symbols, representing values as “0 – 9” for values between 0 – 9 and “A – F” or “a – f” for values between “10 – 15”.

- Hexadecimal is a base 16 system numbering system where a Hex code can be any of these 16 digits: 0 1 2 3 4 5 6 7 8 9 A B C D E F

- RGB format is a combination of three colors, red, green, and blue in the range of 0 – 255. A hex color code is the hexadecimal representation of the RGB numbers.

`NOTE :`

- The parseInt() function parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems).

// Syntax :
parseInt(string)
parseInt(string, radix)

- Parameters

1. string
   A string starting with an integer. Leading whitespace in this argument is ignored.

2. radix Optional
   An integer between 2 and 36 that represents the radix (the base in mathematical numeral systems) of the string. It is converted to a 32-bit integer; if it's nonzero and outside the range of [2, 36] after conversion, the function will always return NaN. If 0 or not provided, the radix will be inferred based on string's value. Be careful — this does not always default to 10! The description below explains in more detail what happens when radix is not provided.

- Return value
  An integer parsed from the given string, or NaN when :

1. the radix as a 32-bit integer is smaller than 2 or bigger than 36, or
2. the first non-whitespace character cannot be converted to a number.

`Examples :`
console.log(parseInt('123'));
// 123 (default base-10)
console.log(parseInt('123', 10));
// 123 (explicitly specify base-10)
console.log(parseInt(' 123 '));
// 123 (whitespace is ignored)
console.log(parseInt('077'));
// 77 (leading zeros are ignored)
console.log(parseInt('1.9'));
// 1 (decimal part is truncated)
console.log(parseInt('ff', 16));
// 255 (lower-case hexadecimal)
console.log(parseInt('0xFF', 16));
// 255 (upper-case hexadecimal with "0x" prefix)
console.log(parseInt('xyz'));
// NaN (input can't be converted to an integer)

```ts
const Input = "#ff33ff"

// Output:{
//   "r": 255,
//   "g": 51,
//   "b": 255
// }


`Approach 1. Using slice() method.`

A HEXA color code '#ff33ff' starts with '#' followed by six alpha-numeric characters ff,33,ff, two of them each representing, R, G, & B.
We can use the slice() to get the two number and then use parseInt() method that accepts a radix value and convert the string to number.


// Example :
const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // return {r, g, b}
    return { r, g, b };
}

console.log(hex2rgb("#ff33ff"));

- In case we are given a short form of Hexa code like #f3f, we will have to convert it to the original form.

const fullHex = (hex) => {
  let r = hex.slice(1,2);
  let g = hex.slice(2,3);
  let b = hex.slice(3,4);

  r = parseInt(r+r, 16);
  g = parseInt(g+g, 16);
  b = parseInt(b+b, 16);

  // return {r, g, b}
  return { r, g, b };
}

//convert hex to rgb
const hex2rgb = (hex) => {
    if(hex.length === 4){
      return fullHex(hex);
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // return {r, g, b}
    return { r, g, b };
}

console.log(hex2rgb("#f3f"));
```

### 26 .Convert RGB color to HEX in JavaScript.

```ts

- All the input parameters are mandatory so let us first take case of the error condition
const isInvalid = (value) => {
  return Boolean(value === null || value === undefined || typeof value !== "number");
};


- Every input parameter is an integer, let us create a function to convert them to strings using toString method with a base of 16.

The each Hex code should be at-least of length 2. Let us extend our function to handle this case so that RGB values like 0 results in 00. We would be using padStart method for this. The padStart method takes the total length of the string and another string that needs to appended to the start of the original string i.e. '0'.padStart(3, '1') becomes 110.

function convertToString(value) {
  //  The RGB values are in the range 0-255. Let us handle if the values provided are outside this range.

  if (value > 255) {
    return "FF";
  } else if (value < 0) {
    return "00";
  }

  return value.toString(16).padStart(2, "0").toUpperCase();
}

function rgbToHex(r, g, b) {
  "use strict";

  const isRedValueInvalid = isInvalid(r);
  const isGreenValueInvalid = isInvalid(g);
  const isBlueValueInvalid = isInvalid(b);

  if (isRedValueInvalid || isGreenValueInvalid || isBlueValueInvalid) {
    throw new TypeError("Invalid input parameters");
  }

  return "#" + convertToString(r) + convertToString(g) + convertToString(b);
}


- Our function rgbToHex takes three input parameters, namely, r, g, and b where each parameter defines the intensity of a color as an integer between 0 and 255.

rgbToHex(255, 255, 255);
// -> Should return #FFFFFF

rgbToHex(0, 0, 0);
// -> Should return #000000

rgbToHex(186, 218, 85);
// -> Should return #BADA55

rgbToHex(256, 255, 255);
// -> Should return #FFFFFF


-  OR

function rgb(...arrays){
    let hex ='#'

  for(let x of arrays){

    hex = hex + x.toString(16)
  }
  return hex
}

let result = rgb(29,55,25)
console.log(result,'result')



//                Second Way

var a = "rgb(255,255,255)".split("(")[1].split(")")[0];
// Then split it into separate numbers:

a = a.split(",");
// Convert the single numbers to hex

var b = a.map(function(x){             //For each array element
    x = parseInt(x).toString(16);      //Convert to a base16 string
    return (x.length==1) ? "#" : x;  //Add # if we get only one character
})
// And glue it back together:

b = "#"+b.join("");

console.log(b,'result')


// ===============================================================================================================================================================
 - NOTE : The toString() method of Number values returns a string representing this number value.

 function hexColor(c) {
  if (c < 256) {
    return Math.abs(c).toString(16);
  }
  return 0;
}

console.log(hexColor(233));
// Expected output: "e9"

console.log(hexColor('11'));
// Expected output: "b"

`Syntax:`
1. toString()
2. toString(radix)

`Parameters`
1. radix Optional
An integer in the range 2 through 36 specifying the base to use for representing the number value. Defaults to 10.

`Return value`
A string representing the specified number value. Scientific notation is used if radix is 10 and the number's magnitude (ignoring sign) is greater than or equal to 1021 or less than 10-6.

`Exceptions`
1. RangeError
Thrown if radix is less than 2 or greater than 36.

`TypeError`
Thrown if this method is invoked on an object that is not a Number.


- Examples
const count = 10;
console.log(count.toString()); // "10"

console.log((17).toString()); // "17"
console.log((17.2).toString()); // "17.2"

const x = 6;
console.log(x.toString(2)); // "110"
console.log((254).toString(16)); // "fe"
console.log((-10).toString(2)); // "-1010"
console.log((-0xff).toString(2)); // "-11111111"


- Converting radix of number strings
If you have a string representing a number in a non-decimal radix, you can use parseInt() and toString() to convert it to a different radix.

`Example:`
const hex = "CAFEBABE";
const bin = parseInt(hex, 16).toString(2); // "11001010111111101011101010111110"
```

### 27. Execute async functions in parallel in JavaScript.

Implement a function in JavaScript that takes a list of async functions as input and a callback function and executes the async tasks in parallel that is all at once and invokes the callback after every task is executed.

```js
// To create an async task, we have created a function that accepts a callback and runs a setTimeout for a random time and invokes this callback inside the timeout.
function createAsyncTask() {
  const value = Math.floor(Math.random() * 10);
  return function (callback) {
    setTimeout(() => {
      callback(value);
    }, value * 1000);
  };
}

function asyncParallel(tasks, callback) {
  const results = [];
  let tasksCompleted = 0;

  // run each task
  tasks.forEach((asyncTask) => {
    // invoke the async task
    // it can be a promise as well
    // for a promise you can chain it with then
    asyncTask((value) => {
      // store the output of the task
      results.push(value);

      // increment the tracker
      tasksCompleted++;

      // if all tasks are executed
      // invoke the callback
      if (tasksCompleted >= tasks.length) {
        callback(results);
      }
    });
  });
}

//                      OR

// function asyncParallel(tasks, callback) {
//   const results = [];

//   let tasksCompleted = 0;

//   const callBackFunction = (value) => {

//     results.push(value);
//     tasksCompleted++;

//     if (tasksCompleted >= tasks.length) {
//       callback(results);
//     }
//   };

//   tasks.forEach((asyncTask) => {

//     asyncTask(callBackFunction);

//   });

// }

const taskList = [createAsyncTask(1), createAsyncTask(2), createAsyncTask(3), createAsyncTask(4), createAsyncTask(5), createAsyncTask(6)];

asyncParallel(taskList, (result) => {
  console.log("results", result);
});


- NOTE : In above example data is not getting stored in a sequence. To store Data in sequence we need take index and store data to matched index in an array.

### Example to store async function data in a sequence.

function createAsyncTask(data) {
  const value = Math.floor(Math.random() * 10);
  return function (callback,index) {
    setTimeout(() => {
      callback(data,index);
    }, value * 1000);
  };
}

function asyncParallel(tasks, callback) {
  const results = [];

  let tasksCompleted = 0;

  const callBackFunction = (value,index) => {

    results[index] = value
    tasksCompleted++;

    if (tasksCompleted >= tasks.length) {
      callback(results);
    }
  };

  tasks.forEach((asyncTask,index) => {

    asyncTask(callBackFunction,index);

  });

}



const taskList = [createAsyncTask(1), createAsyncTask(2), createAsyncTask(3), createAsyncTask(4), createAsyncTask(5), createAsyncTask(6)];

asyncParallel(taskList, (result) => {
  console.log("results", result);
});


```

`NOTE`: Execute promises in Parallel.
In the above example, we have seen the async task created through setTimeout, the same can be extended to execute the promises in Parallel.

First thing we will have to do is update the createAsyncTask() test function, this function will now return a promises that will reject if the random value is less than 5, else it will resolve.

```js
function createAsyncTask() {
  const value = Math.floor(Math.random() * 10);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value < 5) {
        reject(`Error ${value}`);
      } else {
        resolve(value * 1000);
      }
    }, value * 1000);
  });
}

// After this, we will modify the asyncParallel() function, we will use the same logic, but now will store the outcome of resolved as well as rejected promises in different arrays, and handle them using the then, catch, and finally block.

function asyncParallel(tasks, callback) {
  // store the result
  const results = [];

  const errors = [];

  // track the task executed
  let tasksCompleted = 0;

  // run each task
  tasks.forEach((asyncTask) => {
    // invoke the async task
    // it can be a promise as well
    // for a promise you can chain it with then
    asyncTask
      .then((value) => {
        // store the output of the task
        results.push(value);
      })
      .catch((error) => {
        errors.push(error);
      })
      .finally(() => {
        // increment the tracker
        tasksCompleted++;

        // if all tasks are executed
        // invoke the callback
        if (tasksCompleted >= tasks.length) {
          callback(errors, results);
        }
      });
  });
}

const taskList = [createAsyncTask(), createAsyncTask(), createAsyncTask(), createAsyncTask(), createAsyncTask(), createAsyncTask()];

asyncParallel(taskList, (error, result) => {
  console.log("errors", error);
  console.log("results", result);
});
```

### 28. Javascript setInterval method

```js

- 1. Calling predefined function
 let start = 0;

 let count = (count, message) => {
   console.log(`${message} is ${count}`);
 }

 setInterval(function(){
   count(start++, 'count');
 }, 1000);

//count is 0
//count is 1
//count is 2


- 2. Passing params separately
 let start = 0;

 let count = (count, message) => {
   console.log(`${message} is ${count}`);
 }

 setInterval(count, 1000, start++, 'count');

//count is 0
//count is 0
//count is 0

`NOTE :`  Here the start is not getting increment because the value is accessed from the global scope. Also this method won’t work in IE9 and less.



- 3. Handling this with setInterval.
let increment = {
  count: 1,
  start: function(){
    setInterval(function(){
      console.log(this.count++);
    }, 1000)
  }
}

increment.start();
//NaN
//NaN
//NaN

Now this inside the setInterval is referring to its context but we want to access the parent’s this. Incrementing the undefined value is resulting in NaN.
So we assign the parent’s this to another variable and use it.

`Solution :`

1.

let increment = {
  count: 1,
  start: function(){
    //Assign this to a variable that
    var that = this;
    setInterval(function(){
      console.log(that.count++);
    }, 1000)
  }
}

increment.start();
//1
//2
//3

2. with introduction of Arrow Function  => function in ES6 we can handle this easily.

let increment = {
  count: 1,
  start: function(){
    setInterval(() => {
      console.log(this.count++);
    }, 1000)
  }
}

increment.start();
//1
//2
//3
```

### 29. Retry promises N number of times in JavaScript.

Implement a function in JavaScript that retries promises N number of times with a delay between each call.

We have to create a retry function that Keeps on retrying until the promise resolves with delay and max retries.

```js
`Delay function`
We can create a delay function by creating a new promise and resolve it after a given time using setTimeout.

//delay func
const wait = ms => new Promise((resolve) => {
  setTimeout(() => resolve(), ms);
});


- 1. By Using async…await.
When using async-await, we need to wrap the code inside try..catch block to handle the error, thus in the catch block, we can check if the max retries are still left then recursively call the same function or else throw the final error.



const retryWithDelay = async (
    fn,
    retries = 3,
    interval = 5000,
    finalErr = 'Retry failed'
  ) => {
    try {
      let result = await fn();
      return result;

    } catch ({ error, message }) {

      // if no retries left throw error
      if (retries <= 1) {
        return Promise.reject(finalErr);
      }

      //delay the next call, meaning until this wait get resolved the below code will not be executed. below code has to be to wait for this function.
      await wait(interval);
                              //  OR Directly we can put delay like this instead of using await wait():
      // await new Promise(resolve => setTimeout(resolve, interval));

      //recursively call the same func
      return retryWithDelay(fn, retries - 1, interval, finalErr);
    }
  };


- 2. By Using then…catch.

To retry the promise we have to call the same function recursively with reduced max tries, if the promise fails that is in the catch block. Check if there is a number of tries left then recursively call the same function or else reject with the final error.


  // const retryWithDelay = (
  //   operation,
  //   retries = 3,
  //   delay = 5000,
  //   finalErr = 'Retry failed'
  // ) =>
  //   new Promise((resolve, reject) => {
  //     return operation()
  //       .then((finalResult) => {
  //         resolve(finalResult);
  //       })
  //       .catch((reason) => {
  //         //if retries are left
  //         if (retries > 0) {
  //           //delay the next call
  //           return (
  //             wait(delay)
  //               //recursively call the same function to retry with max retries - 1
  //               .then(
  //                 retryWithDelay.bind(
  //                   null,
  //                   operation,
  //                   retries - 1,
  //                   delay,
  //                   finalErr
  //                 )
  //               )
  //               .then(resolve)
  //               .catch(reject)
  //           );
  //         }

  //         // throw final error
  //         return reject(finalErr);
  //       });
  //   });


  // Test function
  const getTestFunc = () => {
    const value = Math.floor(Math.random() * 10);
    return async function () {
      try {
        const response = await fetch(
          `https://dummyjson.com/users?limit=${value}&skip=0&select=firstName`
        );
        const result = await response.json();
        return result;
      } catch (error) {
        throw new Error(error);
      }
    };
  };

  // Test the code
  const test = async () => {
    try {
      let result = await retryWithDelay(getTestFunc(), 3);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Print the result
  test()
    .then((result) => {
      console.log(result, 'result final');
    })
    .catch(({ message }) => {
      console.log('final error >>>>>>>>>>>>>', message);
    });
```

### NEW Way Of Retry promises N number of times in JavaScript.

```js
const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

function fetchDataWithRetry(url, maxRetries) {
  return new Promise((resolve, reject) => {
    let retries = 0;
    const fetchData = async () => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => {
          retries++;
          if (retries <= maxRetries) {
            console.log(`Request failed. Retrying (${retries}/${maxRetries})...`);
            wait(5000).then(() => {
              fetchData();
            });
          } else {
            reject(new Error(`Failed after ${maxRetries} retries. Error: ${error.message}`));
          }
        });
    };

    fetchData();
  });
}

// Usage example:
//const apiUrl = 'https://jsonplaceholder.typicode.com/posts3';
const apiUrl = "https://jsonplaceholder.typicode.com/posts";
console.log("URL-> ", apiUrl);
const maxRetries = 3;

fetchDataWithRetry(apiUrl, maxRetries)
  .then((data) => {
    console.log("Fetched data:", data);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });



  `In the above exercise -`

  1. The "fetchDataWithRetry()" function accepts two parameters: url specifies the API endpoint to fetch data from, and maxRetries indicates the maximum number of retries if the request fails.

  2. Inside the function, a counter retries is initialized to keep track of the number of retries. The core logic is encapsulated in the fetchData() function, which performs the fetch request and handles success and failure cases.

  3. If the request is successful (response.ok), the data is resolved using resolve(data). Otherwise, if the request fails, the function checks if the number of retries is less than or equal to the 'maxRetries'. If so, it logs a retry message and recursively calls "fetchData()" again to retry the request. If the maximum number of retries is reached, it rejects the Promise with an error.

  4. In the usage example, the apiUrl specifies the API endpoint, and 'maxRetries' is set to 3. The function "fetchDataWithRetry()" is called, and the retrieved data or error is logged accordingly.

```

### 30. How to implement custom map function with limit on number of operations?

In this question, you need to implement a custom mapLimit function that takes 4 arguments

1. inputs: An array of inputs
2. limit: The maximum number of operations at any given time.
3. iterateeFn: The async function that should be called with each input to generate the corresponding output. It will have two arguments:
   A. input: The input being processed
   B. callback: A function that will be called when the input is finished processing. It will be provided with one argument, the processed output.
4. callback: A function that should be called with the array of outputs once all inputs have been processed.

`NOTE:` At any given point, your program can make max 2 calls i.e. at any given point your program can process 1, 2 or 2, 3 or so on user ids.

```js
function getUserById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime * 10);
}

function mapLimit(inputs, limit, iterateeFn, callback) {
  let index = 0;
  let response = [];
  let taskCompleted = 0;

  function postCompletionCallback(activeIndex, output) {
    response[activeIndex] = output; // we are taking index here,so that after performing async behavior it should put data related to its index (Sequence).
    taskCompleted++;

    if (taskCompleted === inputs.length) {
      callback(response);
      return;
    }

    if (index < inputs.length) {
      iterateeFn(inputs[index], postCompletionCallback.bind(null, index));
      index += 1;
    }
  }

  while (index < limit) {
    iterateeFn(inputs[index], postCompletionCallback.bind(null, index));
    index += 1;
  }
}

mapLimit([1, 2, 3, 4, 5], 2, getUserById, (allResults) => {
  console.log("final result:", allResults);
});

- 2. OR we Can do like this way :;

function getUserById(id, callback, activeIndex) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback("User" + id, activeIndex);
  }, randomRequestTime);
}

function mapLimit(inputs, limit, iterateeFn, callback) {
  let index = 0;
  const outputs = [];

  function postCompletionCallback(output, activeIndex) {
    outputs[activeIndex] = output;

    if (outputs.length === inputs.length) {
      callback(outputs);
    }

    if (index >= inputs.length) {
      return;
    }

    iterateeFn(inputs[index], postCompletionCallback, index);
    index += 1;
  }

  while (index < limit) {
    iterateeFn(inputs[index], postCompletionCallback, index);
    index += 1;
  }

  //NOTE:Here limit is 2,so in while loop it will take input from index 0 and 1.if it 3 then 0,1,2. and to take rest data we used iterateeFn to take rest index data
}

mapLimit([1, 2, 3, 4, 5], 2, getUserById, (allResults) => {
  console.log("output:", allResults);
});

- 3. we can do like this as well.

function getUserById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime);
}

function mapLimit(inputs, limit, iterateeFn, callback) {
  // write your solution here
  const indexedInputs = inputs.map((value, index) => ({ value, index }));
  const results = [];

  function run(input) {
    iterateeFn(input.value, (result) => {
      results[input.index] = result;

      if (indexedInputs.length > 0) {
        const nextInput = indexedInputs.shift();
        run(nextInput);
      }

      if (results.length === inputs.length) {
        callback(results);
      }
    });
  }

  indexedInputs.splice(0, limit).forEach(run);
}

mapLimit([1, 2, 3, 4, 5], 2, getUserById, (allResults) => {
  console.log("output:", allResults);
});


- 4. we can solve it by using for loop as well.

function getUserById(id, callback,activeIndex) {

  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback("User" + id,activeIndex)
  }, randomRequestTime*10);
}

function mapLimit(inputs, limit, iterateeFn, callback) {

  let index =0
  let result =[]
  let totalTaskDone=0

  function postCompletionCallback(output,activeIndex) {

    result[activeIndex]= output
    totalTaskDone++

    if(totalTaskDone>=inputs.length){
      callback(result)
      return
    }

    if(index>=inputs.length){
      return
    }
    iterateeFn(inputs[index],postCompletionCallback,index)
    index=index+1

    }

  for(let x=0;x<limit;x++){
    iterateeFn(inputs[x],postCompletionCallback,x)
    index=index+1
  }

}

mapLimit([1,2,3,4,5], 2, getUserById, (allResults) => {
  console.log('output:', allResults)
})

```

### 31. Create an array sequence from 1 to N in a single line in JavaScript

```js
- 1. Using Array.from() function
const N = 5;
const arr = Array.from({length: N}, (_, index) => index + 1);
console.log(arr);
/*
    Output: [ 1, 2, 3, 4, 5 ]
*/
Or use Array Constructor

const N = 5;
const arr = Array.from(Array(N), (_, index) => index + 1);
console.log(arr);

/*
    Output: [ 1, 2, 3, 4, 5 ]
*/

Or

const N = 5;
const arr = Array.from(Array(N+1).keys()).slice(1);
console.log(arr);

/*
    Output: [ 1, 2, 3, 4, 5 ]
*/


- 2. Using Spread operator
const N = 5;
const arr = [...Array(N+1).keys()].slice(1);
console.log(arr);

/*
    Output: [ 1, 2, 3, 4, 5 ]
*/

or

const N = 5;
const arr = [...Array(N).keys()].map(x => ++x);
console.log(arr);

/*
    Output: [ 1, 2, 3, 4, 5 ]
*/

or

const N = 5;
const arr = [...Array(N)].map((_, index) => index + 1);
console.log(arr);

/*
    Output: [ 1, 2, 3, 4, 5 ]
*/

- 3. Using Underscore Library
var _ = require('underscore');

const N = 5;
const arr = _.range(1, N+1);
console.log(arr);

/*
    Output: [ 1, 2, 3, 4, 5 ]
*/

- The _.range method is overloaded to generate a range from start (inclusive) to stop (exclusive), incremented (or decremented) by step.

var _ = require('underscore');

const start = 1, end = 10, step = 2;
const arr = _.range(start, end, step);
console.log(arr);

/*
    Output: [ 1, 3, 5, 7, 9 ]
*/


```

### 32. Write your own Event Emitter

```js
class MyEventEmitter {
  constructor() {
    this.events = [];
  }

  addListener(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
    return this;
  }

  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }

  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    if (!this.events[eventName]) return this;
    const filteredListeners = (listener) => listener !== fn;
    this.events[eventName] = this.events[eventName].filter(filteredListeners);
    return this;
  }

  emit(eventName, data) {
    if (!this.events[eventName]) {
      throw new Error(`Can't emit an event. Event ${eventName} doesn't exists. `);
    }
    const fireCallbacks = (callback) => {
      callback(data);
    };

    this.events[eventName].forEach(fireCallbacks);
  }

  once(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    const onceWrapper = () => {
      fn();
      this.off(eventName, onceWrapper);
    };
    this.events[eventName].push(onceWrapper);
    return this;
  }

  eventsCount(eventName) {
    let fns = this.events[eventName] || [];
    return fns.length;
  }

  rawListeners(eventName) {
    return this.events[eventName];
  }
}

// Usage
const myEventEmitter = new MyEventEmitter();
const handleMyEvent = (data) => {
  console.log("Was fired: ", data);
};

myEventEmitter.on("testEvent", handleMyEvent);
myEventEmitter.emit("testEvent", "Hi"); // Was fired: trigger
myEventEmitter.emit("testEvent", "trigger"); // Was fired: trigger
myEventEmitter.emit("testEvent", "again");
// myEventEmitter.emit('fakeEvent', {});
myEventEmitter.removeListener("testEvent", handleMyEvent);
myEventEmitter.emit("testEvent", "again");
```

### 33. the frequently and commonly used methods available on Math object with coding examples

```js

. abs is used to get the absolute value of the given number
. floor is used to get the greatest integer smaller than or equal to the given number
. ceil is used to get the smallest integer greater than or equal to the given number
. round is used to round the given number to the nearest integer.
. max is used to get the largest of zero or more numbers
. min is used to get the smallest of zero or more numbers
. sqrt is used to calculate the square root of the given number
. pow is used to calculate the power base on inputs
. trunc is used to return the integer part of a number by removing any fractional digits (method is present on prototype of Number)


- Examples :

Math.abs(-5));                      // 5
Math.floor(1.6));                   // 1
Math.ceil(2.4));                    // 3
Math.round(3.8));                   // 4
Math.max(-4, 5, 6));                // 6
Math.min(-7, -2, 3));               // -7
Math.sqrt(64));                     // 8
Math.pow(5, 3));                    // 125
Math.trunc(-6.3));                  // -6
```

### 34. Write a function which executes only if the number of "arguments" match the number of "parameters" the function is expecting

. When a function is invoked the arguments passed to it are accessible using the default object called "arguments".
. The number of parameters declared in a function can be obtained by accessing the length property of the function

```js
function func(a, b, c) {
  if (func.length === arguments.length) {
    console.log("Number of arguments passed match the expected arguments");
  } else {
    throw new Error("Number of arguments passed do not match the expected arguments");
  }
}
```

### 45. Show how an array in JavaScript can act like a stack and queue.

```js
. Stack is a 'Last In First Out' data structure can be achieved using push and pop operations
// To add the value to the stack
arr.push(value);
// To remove the value from the stack
arr.pop();


. Queue is a 'First In First Out' data structure can be achieved using push and shift operations
// To add the value to the queue
arr.push(value);
// To remove the value from the queue
arr.shift();
```

### 46. Show the execution of 3 asynchronous block of code, one after the other in sequence.

```js
. The asynchronous block of code can be a function which executes asynchronously
. The execution of such function can be simulated using setTimeout to with delay and execute different blocks of code inside each


function asyncFunc() {
  console.log("Started asyncFunc1");
  //Async1 code
  setTimeout(() => {
    console.log("Completed asyncFunc1");
    console.log("Started asyncFunc2");
    //Async2 code
    setTimeout(() => {
      console.log("Completed asyncFunc2");
      console.log("Started asyncFunc3");
      //Async3 function code
      setTimeout(() => {
        console.log("Completed asyncFunc3");
      }, 1000);
    }, 2000);
  }, 3000);
}
asyncFunc();
```

### 47. Create a function which returns a random number in the given range of values both inclusive

. Math.random function returns a floating-point, pseudo-random number between 0 (inclusive) and 1 (exclusive)

```js
function randomNumberGeneratorInRange(rangeStart, rangeEnd) {
  return rangeStart + Math.round(Math.random() * (rangeEnd - rangeStart));
}

randomNumberGeneratorInRange(10, 50); // 12

`Notes`
Usage of Math.round depends on the logic used to accomplish the requirement
```

### 48. Write a function which can convert the time input given in 12 hours format to 24 hours format.

. The check for 'AM' and 'PM' can be verified using endsWith String method
. An extra 0 would be needed if the hours have single digit
. Conversion of string to lowerCase helps in case insensitive comparison

```js
function convertTo24HrsFormat(timeText) {
  var timeTextLower = timeText.toLowerCase();
  let [hours, mins] = timeTextLower.split(":");

  // 12 o clock is the special case to be handled both for AM and PM
  if (timeTextLower.endsWith("am")) hours = hours == 12 ? "0" : hours;
  else if (timeTextLower.endsWith("pm")) hours = hours == 12 ? hours : String(+hours + 12);

  return hours.padStart(2, 0) + ":" + mins.slice(0, -2).padStart(2, 0);
}

// Example
convertTo24HrsFormat("12:10AM"); // 00:10
convertTo24HrsFormat("5:00AM"); // 05:00
convertTo24HrsFormat("12:33PM"); // 12:33
convertTo24HrsFormat("01:59PM"); // 13:59
convertTo24HrsFormat("11:8PM"); // 23:08
convertTo24HrsFormat("10:02PM"); // 22:02
```

### 49. Write a function which accepts a string argument and returns the count of characters between the first and last character 'X'

. indexOf and lastIndexOf are the methods on String which returns the position of the given string in the input string from start and end respectively
. If the match is not found, these methods return -1

```js
function getTheGapX(str) {
  if (!str.includes("X")) {
    return -1;
  }

  const firstIndex = str.indexOf("X");
  const lastIndex = str.lastIndexOf("X");
  return firstIndex === lastIndex ? -1 : lastIndex - firstIndex;
}

// Example
getTheGapX("XeroX"); // 4
getTheGapX("Xamarin"); // -1       (If there is only single character 'X')
getTheGapX("JavaScript"); // -1       (If there is no character 'X')
getTheGapX("F(X) !== G(X) !== F(X)"); // 18
```

### 50. Write a function which accepts two valid dates and returns the difference between them as number of days.

. The difference between 2 dates in JavaScript will give the time difference in milliseconds
. Time difference can be converted in to days by dividing the 24Hrs time in milliseconds

```js
const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

function getDaysBetweenDates(dateText1, dateText2) {
  const date1 = new Date(dateText1);
  const date2 = new Date(dateText2);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / DAY_IN_MILLISECONDS);
  return diffDays;
}

getDaysBetweenDates("10/15/2020", "12/1/2020"); // 47
```

### 51. Design a function with toggle functionality for given list of inputs where toggle function accepts list of values to be toggled upon.

. Toggle functionality can be obtained by returning the next value cyclically on each call to the function
. The toggle function will return another function which maintains the closure over the values with which it was initialized

```js
function toggle(...values) {
  let state = -1;
  const length = values.length;
  return function () {
    state = (state + 1) % length;
    return values[state];
  };
}

// Example
var hello = toggle("hello");
var onOff = toggle("on", "off");
var speed = toggle("slow", "medium", "fast");

hello(); // "hello"
hello(); // "hello"

onOff(); // "on"
onOff(); // "off"
onOff(); // "on"

speed(); // "slow"
speed(); // "medium"
speed(); // "fast"
speed(); // "slow"
```

### 52. Create a range function which returns an array for the provided inputs as start and end.

. Range functionality can be obtained by returning the an array from start to end both inclusive
. In case if 2nd argument is not passed, function will return another function which calls itself with once both the values are obtained

```js
function range(start, end) {
  if (end === undefined) {
    return function (end) {
      return range(start, end);
    };
  }

  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

// Example
range(3, 6); // [3, 4, 5, 6]
range(3)(5); // [3, 4, 5]
range(3)(0); // []
```

### 53. Create a single function which can perform sum(a, b, c), sum(a, b)(c), sum(a)(b, c) and sum(a)(b)(c) and returns sum of a, b and c.

. Sum functionality can be obtained by returning the sum when all the arguments are present
. The cases when only 1 or 2 arguments are passed need to be managed and handled

```js
function sum(a, b, c) {
  if (a !== undefined && b !== undefined && c !== undefined) {
    return a + b + c;
  }
  if (a !== undefined && b !== undefined) {
    return function (c) {
      return sum(a, b, c);
    };
  }
  return function (b, c) {
    if (b !== undefined && c !== undefined) {
      return sum(a, b, c);
    }
    return function (c) {
      return sum(a, b, c);
    };
  };
}

// Example
sum(2)(4)(6); // 12
sum(3, 2)(5); // 10
sum(4)(-10, -6); // -12
sum(6, -3, 1); // 4
```

### 54. Create an interface for a function such that whenever a function is triggered the system should log the time. Do not modify the function code

. Function call can be handled using Proxy in JavaScript
. apply keyword in proxy can be used to achieve the functionality without modifying the existing function code

```js
function generateSecretObject(key, value) {
  return { [key]: value };
}

generateSecretObject = new Proxy(generateSecretObject, {
  apply(target, context, args) {
    console.log(`${target.name} function is accessed at ${new Date()}`);
    return target.apply(context, args);
  },
});

// driver code
const user = {
  username: "0001",
  generateSecretObject,
};
generateSecretObject("username", "Password"); // "generateSecretObject function is accessed at {time}"


`NOTE :`

This technique is helpful in logging or managing the data being passed to & returned from function without modifying the actual function code especially when function is a part of library or framework
```

### 55. Create an interface exposing subscribe and publish functionality, which allows publishing data which in turn invokes all the subscribers with the data.

. A simple module with publish and subscribe function can be exposed to achieve such functionality
. List of subscribers can be maintained in an array and can be invoked in loop on each publish

```js
function pubSub() {
  const subscribers = [];

  function publish(data) {
    subscribers.forEach((subscriber) => subscriber(data));
  }

  function subscribe(fn) {
    subscribers.push(fn);
  }

  return {
    publish,
    subscribe,
  };
}

// driver code
const pubSubObj = pubSub();
pubSubObj.subscribe((data) => {
  console.log("Subscriber 1: " + data);
});
pubSubObj.subscribe((data) => {
  console.log("Subscriber 2: " + data);
});

// all subscribers will be called with the data on publish
pubSubObj.publish("Value is 10");


`NOTE :`
This is a well known JavaScript pattern called as Publish/Subscribe Pattern
```

### 56. Display all the keys and values of a nested object.

. typeof operator on value gives the type of value
. Recursive solution can be used to iterate over all the nested objects

```js
let nestedObject = {
  id: 28802695164,
  date: "December 31, 2016",
  data: {
    totalUsers: 99,
    online: 80,
    onlineStatus: {
      active: 67,
      away: 13,
      busy: 8,
    },
  },
};

function keyValuePrinter(obj) {
  for (let key in obj) {
    if (typeof obj[key] !== "object") {
      console.log("[" + key + " : " + obj[key] + "]");
    } else {
      keyValuePrinter(obj[key]);
    }
  }
}

keyValuePrinter(nestedObject);
```

### 57. Write a program which can empty a given object.

. Object can be emptied by removing all the keys present on it.
. Alternatively, a new object can be created and the prototype of the new object can be set as prototype of old object.

```js
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    delete obj[key];
  }
}

OR;

const newObj = {};
Object.setPrototypeOf(newObj, obj);
```

### 58. Create an object with a property 'marks' which cannot be set to a value less than 0.

. getter and setter on the properties of object can be used to control the read and write behavior

```js
const obj = { marks: 0 };

Object.defineProperty(obj, "marks", {
  set(value) {
    if (value < 0) throw new Error("Marks cant be less than zero");
    marks = value;
  },
  get() {
    return marks;
  },
});


OR

. This solution shown directly defines getter and setter for property marks, hence uses another variable to store the data

const obj = {
  _marks: 0,

  set marks(value) {
    if (value < 0) throw new Error("Marks cant be less than zero");
    this._marks = value;
  },

  get marks() {
    return this._marks;
  },
};
```

### 59. Stringify an object by excluding the 'password' property

. JSON.stringify is the method which can be used for stringification of an object or any other value
. It accepts 2nd argument which can be a function or array.

```js
// Example
const obj = {
  id: 1,
  username: "John",
  password: "secret",
  email: "john@email.com",
};

1. JSON.stringify(obj, (key, value) => (key === "password" ? undefined : value)); // {"id":1,"username":"John","email":"john@email.com"}

2. JSON.stringify(obj, ["id", "username", "email"]); // {"id":1,"username":"John","email":"john@email.com"}
```

### 60. Write a program to make all the properties of an object read only but allow the addition of new properties.

- The exisiting properties of the object can be made read only with set keyword using Proxy.

```js
const readOnlyObj = new Proxy(obj, {
  get: function (target, key) {
    return target[key];
  },

  set: function () {
    if (target.hasOwnProperty(key)) {
      throw new Error("Object properties are read only");
    }
    target[key] = value;
  },
});

NOTE :

If condition takes care whether the property is new or existing to handle the read only scenario.
```

### 60. Design a utility on an array of objects where the access can be made to the object using index (as usual) and also from primary key of the object.

. The access to the index happens for arrays by default and the Proxy can be setup to enable the fetching of object using primary key (any other key can also be coded)

```js
const employees = [
  { name: "John", id: "1" },
  { name: "Jane", id: "2" },
  { name: "Pai", id: "0" },
];

const flexEmployees = new Proxy(employees, {
  get(target, handler) {
    if (handler in target) {
      return target[handler];
    } else if (typeof handler === "string") {
      return target.find((obj) => obj.name === handler);
    } else {
      return undefined;
    }
  },
});

// Example

flexEmployees[0]; // { name: 'John', id: '1' }
flexEmployees["Pai"]; // { name: 'Pai', id: '0' }
flexEmployees["doe"]; // undefined
```

### 61. Provide an object on which a value can be set to nested property even if it does not exist.

. The nested object can be accessed only if all the nested properties are defined on the object
. A proxy can designed to create such nested object properties on demand whenever such non existent property is requested and attempted to set with value
. get trap of proxy can be used to create the objects dynamically and set the value.

```js
function ProxyObject(obj) {
  return new Proxy(obj, {
    get: (target, property) => {
      if (!(property in target)) {
        target[property] = new ProxyObject({});
      }
      return target[property];
    },
  });
}

// driver code
const obj = new ProxyObject({});
obj.x.y.z = "nested value";

obj.x.y.z; // nested value
```

### 62. Extract the list of all the elements from the list of numbers given in 2 arrays.

- The union array will be the result if all the elements from the 2 arrays are picked

```js
const set1 = new Set(arr1);
const set2 = new Set(arr2);
const distinctArr = [...set1, ...set2];
```

### 63. Get the list of all distinct elements which are present in both list of numbers.

- The intersection array will be the result if the common elements from the 2 arrays are picked.

```js
Method .1.
const intersectionArr = arr1.filter((value) => arr2.includes(value));
const distinctIntersectionArr = [...new Set(intersectionArr)];

Method .2.
const set1 = new Set(arr1);
const set2 = new Set(arr2);
const distinctIntersectionArr = [...set1].filter((value) => set2.has(value));
```

### 64. Extract list of elements present only in the first list given.

- The only present elements of 1st list will be the result when all the elements of 1st list not present in the 2nd are chosen.

```js
const set1 = new Set(arr1);
const set2 = new Set(arr2);
const intersectionArr = [...set1].filter((value) => !set2.has(value));

`Notes`

Elements of 2nd list only can be obtained by checking for all the elements of lis 2 which are not present in list1
```

### 65. Create a Proxy object through which the array can be accessed as usual but also allow to access the values through negative indices.

```js
. get trap of proxy can be used to map the negative index to the valid array position

let arr = [10, 20, 30];


let array = new Proxy(arr, {
  get(target, handler) {
    if (handler < 0) return target[target.length + Number(handler)];
    else return target[handler];
  },
});
```

### 66. Write a code to eliminate duplicate objects in an array where each object has an 'id' property which can be used to identify the object and the duplicate object with lower rank to be removed.

```js
// Example
const arr = [
  {
    id: 1,
    name: "emp1",
    rank: 4,
  },
  {
    id: 2,
    name: "emp2",
    rank: 1,
  },
  {
    id: 2,
    name: "emp2",
    rank: 2, // this is a duplicate object (id = 2) and has lower rank
  },
  {
    id: 3,
    name: "emp3",
    rank: 3,
  },
];



- METHOD 1.

. The duplicate objects cannot be removed using Set as the 2 objects with same structure and data have different references
. Map can be used to have 'id' as the key and object as value
. If 'id' is already present in the array, object with the higher rank can be retained.


const map = new Map();

arr.forEach((obj) => {
  if (map.has(obj.id)) {
    if (obj.rank < map.get(obj.id).rank) {
      map.set(obj.id, obj);
    }
  } else {
    map.set(obj.id, obj);
  }
});

distinctArr = [...map.values()];


METHOD 2.


let newArray = [...arr].sort((a,b)=>{
  if(a.id!==b.id){
    return 1
  }else{
    return a.rank > b.rank ? 1 : -1
  }
})



function removeDuplicate(){
  let arrays = newArray.filter((item,index,array)=>index === array.findIndex((indexItem)=>indexItem.id===item.id))
  return arrays
}

console.log(removeDuplicate(),'removeDuplicate()')



METHOD 3.

`Using keys as Index:`

. A temporary array is created that stores the objects of the original array using one of its keys as the index.
. Any of the object properties can be used as a key. The key is extracted from the object and used as the index of the new temporary array.
. The object is then assigned to this index.
. This approach will remove the duplicate objects as only one of each object of the original array will get assigned to the same index.


function removeDuplicates() {

    // Create an array of objects
    books = [
        { title: "C++", author: "Bjarne" },
        { title: "Java", author: "James" },
        { title: "Python", author: "Guido" },
        { title: "Java", author: "James" },
    ];

    // Declare a new array
    let newArray = [];

    // Declare an empty object
    let uniqueObject = {};

    // Loop for the array elements
    for (let i in books) {

        // Extract the title
        objTitle = books[i]['title'];

        // Use the title as the index
        // If Object keys are same then it will overwrite the existing key with the new key.
        uniqueObject[objTitle] = books[i];
    }

    // Loop to push unique object into array
    for (i in uniqueObject) {
        newArray.push(uniqueObject[i]);
    }

    // Display the unique objects
    console.log(newArray);
}
removeDuplicates();
```

### 67. Write a utility which prints numbers starting from an initial value and increment in steps which can be started and stopped by the user, any number of times

1. The functionality to start and stop can be exposed from a function which internally takes care of incrementing and displaying data
2. setInterval can be used to achieve the task and handle the start & stop of data display

```js
function timer(init = 0, step = 1) {
  var intervalId;
  var count = init;

  function startTimer() {
    if (!intervalId) {
      intervalId = setInterval(() => {
        console.log(count);
        count += step;
      }, 1000);
    }
  }

  function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
  }

  return {
    startTimer,
    stopTimer,
  };
}

// driver code
const timerObj = timer(100, 10);
timerObj.startTimer();
setTimeout(() => {
  timerObj.stopTimer();
}, 5000);
```

### 68. Implement a function to find the closest ancestor with the provided selector (Element.closest() method)

- The closest() method traverses the Element and its parents (heading toward the document root) until it finds a node that matches the provided selector string. Will return itself or the matching ancestor. If no such element exists, it returns null.

```js
Element.prototype.closest = function (selector) {
  var el = this;
  while (el) {
    if (el.matches(selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
};


## Description

. The closest() method searches up the DOM tree for elements which matches a specified CSS selector.

. The closest() method starts at the element itself, then the ancestor (parent, grandparent, ...) until a match is found.

. The closest() method returns null() if no match is found.
```

### 69 . Write a function to find the corresponding node in two identical DOM trees.

- Given two same DOM tree A, B, and an Element a in A, find the corresponding Element b in B. By corresponding, we mean a and b have the same relative position to their DOM tree root.

```js
const A = document.createElement("div");
A.innerHTML = `
<div>
<div>
  <div>
    <div id="node1"></div>
  </div>
  <div>
  </div>
  <div>
    <div>
      <p id="node2"></p>
    </div>
  </div>
<div>
</div>`;

const B = A.cloneNode(true);
const node1 = A.querySelector("#node1");
const node2 = A.querySelector("#node2");
const node1Target = B.querySelector("#node1");
const node2Target = B.querySelector("#node2");

const findCorrespondingNode = (rootA, rootB, target) => {
  if (rootA === target) return rootB;

  if (rootA.childElementCount) {
    for (let i = 0; i < rootA.childElementCount; i++) {
      let result = findCorrespondingNode(rootA.children[i], rootB.children[i], target);
      if (result) {
        return result;
      }
    }
  }
};

findCorrespondingNode(A, B, node1); // node1Target
findCorrespondingNode(A, B, node2); // node2Target
```

### 70. Write a function to get depth of a given DOM tree

- A depth of a given DOM tree is the max depth till which DOM nodes are nested

```js

Example 1.

/**
 * @param {HTMLElement | null} tree
 * @return {number}
 */
function getHeight(root) {
  if (!root) return 0;

  let maxDepth = 0;

  const helper = (current, depth = 1) => {
    if (current.hasChildNodes()) {
      for (let child of current.children) {
        helper(child, depth + 1);
      }
    }
    maxDepth = Math.max(maxDepth, depth);
  };

  helper(root);
  return maxDepth;
}



### Example 2.

`Problem Description :`

1. Height of a tree is the maximum depth from root node. Empty root node have a height of 0.
2. If given DOM tree, can you create a function to get the height of it?
3. For the DOM tree below, we have a height of 4.


<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
     <div>
  <div>
    <p>
      <button>Hello</button>
    </p>
  </div>
  <p>
    <span>World!</span>
  </p>
</div>
      <script src="script.js"></script>
  </body>
</html>


- Solution :

//  Recursive Solution with DFS

/**
 * @param {HTMLElement | null} tree
 * @return {number}
 */
function getHeight(tree) {
  if (tree === null) {
    return 0;
  }

  let maxHeight = 0;
  // Use .children instead of .childNodes to ignore TextNodes.
  for (const child of tree.children) {
    maxHeight = Math.max(maxHeight, getHeight(child));
  }

  return maxHeight + 1;
}

const result = getHeight(document.body.firstElementChild);
```

### 71. Implement a function to get the root node of a given DOM fragment (document.getRootNode() method).

- Root node is the topmost parent node of any given DOM fragment.

```js

<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
     <div>
  <div>
    <p>
      <button>Hello</button>
    </p>
  </div>
  <p>
    <span>World!</span>
  </p>
</div>
      <script src="script.js"></script>
  </body>
</html>


/**
 * @param {HTMLElement | null} tree
 * @return {HTMLElement | null}
 */
function getRootNode(tree) {
  if (!tree) return null;

  while (tree.parentElement) {
    tree = tree.parentElement;
  }

  return tree;
}

const rootNode = getRootNode(document.querySelector('span'))
```

### 72. Implement a function to get unique tag names in a given DOM tree

```js

- index.html

<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
      <h1 class="title">Hello World! </h1>
      <p id="currentTime"></p>

      <div>
        <p>
          <h1>
            <h2>
              <h3>
                <h4>
                  <h5>
                    <h6></h6>
                  </h5>
                </h4>
              </h3>
            </h2>
          </h1>
        </p>
      </div>
      <script src="script.js"></script>
  </body>
</html>


- script.js

const rootElement = document.body



/**
 * @param {HTMLElement | null} tree
 * @return {Array}
 */
function getUniqueTags(root, result = new Set()) {
  if (!root) return [];

  if (!result.has(root.tagName)) {
    result.add(root.tagName);
  }

  if (root.hasChildNodes()) {
    for (let child of root.children) {
      getUniqueTags(child, result);
    }
  }

  return [...result];
}

let result = getUniqueTags(rootElement)
console.log(result,'result')
```

### 73. Implement a function to get elements by tag name (document.getElementsByTagName() method).

1. The getElementsByTagName method of Document interface returns an HTMLCollection of elements with the given tag name.
2. For example, document.getElementsByTagName('div') returns a collection of all div elements in the document.

```js

- index.html

<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
      <h1 class="title">Hello World! </h1>
      <p id="currentTime"></p>

      <div>
        <p>
          <h1>
            1st h1 tag
            <h2>
              <h3>
                <h4>
                  <h5>
                    <h6>
                      <h1>
                        2nd h1 tag
                        <h1>3rd H1 Tag</h1>
                      </h1>
                    </h6>
                  </h5>
                </h4>
              </h3>
            </h2>
          </h1>
        </p>
      </div>
      <script src="script.js"></script>
  </body>
</html>


- script.js


const rootElement = document.body

/**
 * @param {HTMLElement | null} tree
 * @return {Array}
 */
function getElementsByTagName(root, tagName) {
  if (!root) return [];

  let result = [];

  if (root.tagName.toLowerCase() === tagName.toLowerCase()) {
    result.push(root);
  }

  if (root.hasChildNodes()) {
    for (let child of root.children) {
      result = result.concat(getElementsByTagName(child, tagName));
    }
  }

  return result;
}

let result = getElementsByTagName(rootElement,'h1')

console.log(result,'result')
```

### 74. Implement a function to check if a given DOM tree has duplicate IDs

1. In a given DOM tree, the id on each node has be unique
2. Although HTML is very forgiving, but we should avoid duplicate identifiers

```js
- index.html

<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
      <h1 class="title">Hello World! </h1>
      <p id="currentTime"></p>

      <div>
        <p>
          <h1 id="h1tags">
            1st h1 tag
            <h2>
              <h3 id="currentTimes">
                <h4>
                  <h5>
                    <h6>
                      <h1>
                        2nd h1 tag
                        <h1 id="h1tag">3rd H1 Tag</h1>
                      </h1>
                    </h6>
                  </h5>
                </h4>
              </h3>
            </h2>
          </h1>
        </p>
      </div>
      <script src="script.js"></script>
  </body>
</html>


- script.js

const rootElement = document.body


/**
 * @param {HTMLElement | null} tree
 * @return {Boolean}
 */
function hasDuplicateId(tree, idSet = new Set()) {
  if (!tree) return false;

  if (idSet.has(tree.id)) return true;

  tree.id && idSet.add(tree.id);

  if (tree.hasChildNodes()) {
    for (let child of tree.children) {
      const result = hasDuplicateId(child, idSet);
      if (result) return true;
    }
  }

  return false;
}

const result = hasDuplicateId(rootElement)

console.log(result,'result')
```

### 75. Execute an array of asynchronous functions one after the other in sequence using callbacks.

1. The asynchronous function can be simulated using setTimeout which executes the callback
2. The array of functions execution can be managed by having a function which takes care of execution of all the async functions
3. Asynchronous functions need not be aware of the function to be executed and will take a callback as argument and execute it after completion

```js

//  METHOD : 1
function asyncFunc1(callback) {
  console.log("Started asyncFunc1");
  setTimeout(() => {
    console.log("Completed asyncFunc1");
    callback();
  }, 3000);
}

function asyncFunc2(callback) {
  console.log("Started asyncFunc2");
  setTimeout(() => {
    console.log("Completed asyncFunc2");
    callback();
  }, 2000);
}

function asyncFunc3(callback) {
  console.log("Started asyncFunc3");
  setTimeout(() => {
    console.log("Completed asyncFunc3");
    callback();
  }, 1000);
}

function callbackManager(asyncFuncs) {
  function nextFuncExecutor() {
    const nextAsyncFunc = asyncFuncs.shift();
    if (nextAsyncFunc && typeof nextAsyncFunc === "function") {
      nextAsyncFunc(nextFuncExecutor);
    }
  }
  nextFuncExecutor();
}

// driver code
callbackManager([asyncFunc1, asyncFunc2, asyncFunc3]);

//  It wil work in a sequence.


// METHOD 2:  ABOVE CODE IS BETTER THAN BELOW CODE.
function asyncFunc() {
  console.log("Started asyncFunc1");
  //Async1 code
  setTimeout(() => {
    console.log("Completed asyncFunc1");
    console.log("Started asyncFunc2");
    //Async2 code
    setTimeout(() => {
      console.log("Completed asyncFunc2");
      console.log("Started asyncFunc3");
      //Async3 function code
      setTimeout(() => {
        console.log("Completed asyncFunc3");
      }, 1000);
    }, 2000);
  }, 3000);
}
asyncFunc();


1. The asynchronous block of code can be a function which executes asynchronously
2. The execution of such function can be simulated using setTimeout to with delay and execute different blocks of code inside each

```

### 76. Execute the given list of asynchronous functions in parallel and return the results in a sequence as an array to the callback.

```js


function asyncFunc1(callback) {
  setTimeout(() => {
    callback(1);
  }, 3000);
}

function asyncFunc2(callback) {
  setTimeout(() => {
    callback(2);
  }, 2000);
}

function asyncFunc3(callback) {
  setTimeout(() => {
    callback(3);
  }, 6000);
}

function asyncFunc4(callback) {
  setTimeout(() => {
    callback(4);
  }, 4000);
}

function asyncFunc5(callback) {
  setTimeout(() => {
    callback(5);
  }, 1000);
}

function asyncFunc6(callback) {
  setTimeout(() => {
    callback(6);
  }, 7000);
}



### METHOD 1:

function getValue(result) {
  console.log(result, "result");
}

function callbackManager(asyncFunctions, callback) {
  let output = [];

  function asyncExecutor(value) {
    if (value) {
      output.push(value);
    }

    let asyncfunc = asyncFunctions.shift();

    if (asyncfunc && typeof asyncfunc === "function") {
      asyncfunc(asyncExecutor);
    } else {
      callback(output);
    }
  }

  asyncExecutor();
}

callbackManager([asyncFunc1, asyncFunc2, asyncFunc3, asyncFunc4, asyncFunc5, asyncFunc6],getValue);


### METHOD 2:


function finalResult(data){

console.log(data,'data')

}

function callbackManager(asyncFunctions,finalResultFunction){

  let resultCounter = 0;
  let length = asyncFunctions.length
  const resultArr = new Array(length);

  asyncFunctions.forEach((item,index)=>{

//  NOTE : Here we have used callback function directly inside item function so, it is able to access index.
    item((value)=>{
      resultArr[index] = value
      resultCounter++

      if(resultCounter>=length){
        finalResultFunction(resultArr)
      }
    })

  })
}

callbackManager([asyncFunc1,asyncFunc2,asyncFunc3,asyncFunc4,asyncFunc5,asyncFunc6],finalResult)


- OR If we want to use callback separately instead of using it inside item function then we have pass index like below :


function asyncFunc1(callback,index) {
  setTimeout(() => {
    callback(1,index);
  }, 3000);
}

function asyncFunc2(callback,index) {

  setTimeout(() => {

    callback(2,index);
  }, 2000);
}

function asyncFunc3(callback,index) {

  setTimeout(() => {

    callback(3,index);
  }, 6000);
}



function asyncFunc4(callback,index) {

  setTimeout(() => {

    callback(4,index);
  }, 1000);
}


function asyncFunc5(callback,index) {

  setTimeout(() => {

    callback(5,index);
  }, 5000);
}



function asyncFunc6(callback,index) {

  setTimeout(() => {

    callback(6,index);
  }, 7000);
}


function finalResult(data){

console.log(data,'data')

}

function callbackManager(asyncFunctions,finalResultFunction){

  let data=[]
  let counter = 0

  const callback=(value,index)=>{
    data[index] = value
    counter++

    if(counter>=asyncFunctions.length){
      finalResult(data)
    }
  }

  asyncFunctions.forEach((item,index)=>{

    item(callback,index)

  })

}

callbackManager([asyncFunc1,asyncFunc2,asyncFunc3,asyncFunc4,asyncFunc5,asyncFunc6],finalResult)


### Example with using promise.

function asyncFunc1(value) {
  return new Promise((resolve,reject)=>{

    setTimeout(()=>{
      resolve(value)
    },6000)
  })
}

function asyncFunc2(value) {

   return new Promise((resolve,reject)=>{

    setTimeout(()=>{
      resolve(value)
    },4000)
  })
}

function asyncFunc3(value) {

 return new Promise((resolve,reject)=>{

    setTimeout(()=>{
      resolve(value)
    },5000)
  })
}

function asyncFunc4(value) {

 return new Promise((resolve,reject)=>{

    setTimeout(()=>{
      resolve(value)
    },7000)
  })
}

function asyncFunc5(value) {
 return new Promise((resolve,reject)=>{

    setTimeout(()=>{
      resolve(value)
    },2000)
  })
}

function asyncFunc6(value) {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(value)
    },1000)
  })
}


 function callbackManager(asyncFunctions, callback) {

   return new Promise((resolve,reject)=>{
     let output = [];
    let count =1
     async function asyncExecutor() {
    let asyncfunc = asyncFunctions.shift();

    if (asyncfunc && typeof asyncfunc === "function") {
      let response = await asyncfunc(count)
      output.push(response)
      count++
      asyncExecutor()
    } else {
      return resolve(output)
    }
  }

  asyncExecutor();
   })

}

let result = callbackManager([asyncFunc1, asyncFunc2, asyncFunc3, asyncFunc4, asyncFunc5, asyncFunc6]);

result.then((response)=>{
  console.log(response,'response')
})


```

### 78. YOU HAVE AN ARRAY OF ASYNC FUNCTIONS ( OR PROMISES ). YOU NEED TO EXECUTE THEM IN BATCHES WHERE EACH BATCH RUNS IN PARALLEL BUT BATCHES THEMSELVES ARE PROCEED IN SERIES.

```JS



function asyncFunc1() {
 return new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve(1);
  }, 7000);
 })
}

function asyncFunc2() {
   return new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve(2);
  }, 5000);
 })
}

function asyncFunc3() {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve(3);
  }, 3000);
 })
}

function asyncFunc4() {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve(4);
  }, 2000);
 })
}

function asyncFunc5() {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve(5);
  }, 1000);
 })
}

function asyncFunc6() {
   return new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve(6);
  }, 800);
 })
}



let batch = 2


### METHOD 1.

const wait =(delay)=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve()
    },delay)
  })
}


 function callbackManager(asyncFunctions,batch){

  let length = asyncFunctions.length
  let count = 0

  const executor=()=>{

   let callback = asyncFunctions.slice(count,count+batch)
   asyncFunctions.splice(count,count+batch)

   if(!!callback.length){

      Promise.all(callback).then(async(response)=>{
        console.log(response,'response >>>>>>>>>')
      if(!!response.length){
        await wait(5000)
        executor()
      }
    }).catch((error)=>{
      console.log(error,'error')
    })
   }

  }


  executor()
}

callbackManager([asyncFunc1(),asyncFunc2(),asyncFunc3(),asyncFunc4(),asyncFunc5(),asyncFunc6()],batch)



### METHOD 2. IN A MORE SIMPLIFIED WAY:


function asyncFunction(value,delay) {
 return new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve(value);
  }, delay);
 })
}


const p1 = asyncFunction(1,6000)
const p2 = asyncFunction(2,5000)
const p3= asyncFunction(3,4000)
const p4 = asyncFunction(4,3000)
const p5 = asyncFunction(5,2000)
const p6= asyncFunction(6,1000)

let batch = 2

const wait =(delay)=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve()
    },delay)
  })
}


 function callbackManager(asyncFunctions,batch){

  let length = asyncFunctions.length
  let count = 0

  const executor=()=>{

   let callback = asyncFunctions.slice(count,count+batch)
   asyncFunctions.splice(count,count+batch)

   if(!!callback.length){

      Promise.all(callback).then(async(response)=>{
        console.log(response,'response >>>>>>>>>')
      if(!!response.length){
        await wait(5000)
        executor()
      }
    }).catch((error)=>{
      console.log(error,'error')
    })
   }

  }

  executor()
}

callbackManager([p1,p2,p3,p4,p5,p6],batch)

```

### 79. Execute 3 asynchronous functions one after the other in sequence using async await.

- Async function with await for each promise can be used to execute in sequence.

```js
function asyncFunction(value, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, delay);
  });
}

const asyncFunc1 = asyncFunction(1, 3000);
const asyncFunc2 = asyncFunction(2, 2000);
const asyncFunc3 = asyncFunction(3, 1000);

async function executor() {
  try {
    let r1 = await asyncFunc1;
    let r2 = await asyncFunc2;
    let r3 = await asyncFunc3;
    console.log(r1, r2, r3);
  } catch (error) {
    console.log(error, "error");
  }
}

executor();
```

### 80. Execute 3 asynchronous functions one after the other in sequence using promise chaining .

- Promise chaining syntax

```js

### Sometimes, you have multiple asynchronous tasks you want to execute in sequence. In addition, you need to pass the result of the previous step to the next one. In this case, you can use the following syntax:

step1()
    .then(result => step2(result))
    .then(result => step3(result))
    ...

### If you need to pass the result of the previous task to the next one without passing the result, you use this syntax:

step1()
    .then(step2)
    .then(step3)
    ...


```

- EXAMPLE :

```js
### EXAMPLE 1.

function asyncFunction1(value,delay) {
 return new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve(value);
  }, delay);
 })
}

function asyncFunction2({value,delay}) {
 return new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve(value);
  }, delay);
 })
}


function asyncFunction3({value,delay}) {
 return new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve(value);
  }, delay);
 })
}



asyncFunction1(1,3000).then(
    (result1) => {
      console.log("Async1 success",result1);
      return {value:2,delay:2000}
    },
    () => {
      console.log("Async1 failure");
    }
  )
  .then(asyncFunction2)
  .then(
    (result2) => {
      console.log("Async2 success",result2);
      return {value:3,delay:1000}
    },
    () => {
      console.log("Async2 failure");
    }
  )
  .then(asyncFunction3)
  .then(
    (result3) => {
      console.log("Async3 success",result3);
    },
    () => {
      console.log("Async3 failure");
    }
  );

### EXAMPLE 2.

### Suppose that you want to perform the following asynchronous operations in sequence:

. First, get the user from the database.
. Second, get the services of the selected user.
. Third, calculate the service cost from the user’s services.


function getUser(userId) {
    return new Promise((resolve, reject) => {
        console.log('Get the user from the database.');
        setTimeout(() => {
            resolve({
                userId: userId,
                username: 'admin'
            });
        }, 1000);
    })
}

function getServices(user) {
    return new Promise((resolve, reject) => {
        console.log(`Get the services of ${user.username} from the API.`);
        setTimeout(() => {
            resolve(['Email', 'VPN', 'CDN']);
        }, 3 * 1000);
    });
}

function getServiceCost(services) {
    return new Promise((resolve, reject) => {
        console.log(`Calculate the service cost of ${services}.`);
        setTimeout(() => {
            resolve(services.length * 100);
        }, 2 * 1000);
    });
}


getUser(100)
    .then(getServices)
    .then(getServiceCost)
    .then(console.log);
```

### 81. Execute 3 asynchronous functions one after the other in sequence using async await and do not terminate on failure.

```js
function getUser(userId) {
  return new Promise((resolve, reject) => {
    console.log("Get the user from the database.");
    setTimeout(() => {
      resolve({
        userId: userId,
        username: "admin",
      });
    }, 1000);
  });
}

function getServices(user) {
  return new Promise((resolve, reject) => {
    console.log(`Get the services of ${user.username} from the API.`);
    setTimeout(() => {
      resolve(["Email", "VPN", "CDN"]);
    }, 3 * 1000);
  });
}

function getServiceCost(services) {
  return new Promise((resolve, reject) => {
    console.log(`Calculate the service cost of ${services}.`);
    setTimeout(() => {
      resolve(services.length * 100);
    }, 2 * 1000);
  });
}

(async function executor() {
  let user, services, cost;
  try {
    user = await getUser(100);
    console.log("Async1 success", user);
  } catch (error) {
    console.log("Async1 failure", error);
  }
  try {
    services = await getServices(user || 10);
    console.log("Async2 success", services);
  } catch (error) {
    console.log("Async2 failure", error);
  }
  try {
    cost = await getServiceCost(services || ["vpn", "lan", "wan"]);
    console.log("Async3 success", cost);
  } catch (error) {
    console.log("Async3 failure", error);
  }
  console.log("All succeeded", cost);
})();



. Unlike promises, try-catch block can be used on async functions
. catch block for each asynchronous function can be used to catch errors and continue with next execution which will not propagate failures.

```

### 82. Perform async function in sequence using for loop. sequentially resolve a bunch of promises in order, one after the other.

- We can achieve the result with the help of async/await.

```js
function asyncFunction1(value = 1, delay = 8000) {
  console.log(value, "value >>>>>>>>>>>>>>", delay);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, delay);
  });
}

//  NOTE: Below wil work in stackblitz tool, but if you use other tool like js-bin, code-chef, scaler editor then it will not work.
//  it will throw : [TimeLimitExceeded] Your code took more than 1 second(s) to complete.(HERE we have given time like 8,5 and 2 seconds).

1. EXAMPLE:

let files = [asyncFunction1(1, 8000), asyncFunction1(2, 5000), asyncFunction1(3, 2000)];

const main = async () => {
  let finalResult = []
  console.log("Before For Each Loop");

  for (let i = 0; i < files.length; i++) {
    console.log(i, "i >>>>>>>>>>>>>>>>>>>>>>>>>");
    const result = await files[i];
    finalResult[i] = result
    console.log(result, "result");
  }

  console.log("After For Each Loop");
  return finalResult
};

let result = main()
result.then((response)=>{
    console.log(response,'response')
})


-  BUT If we give time like 0 second then it will work:

2. EXAMPLE :

let files = [asyncFunction1(1, 0), asyncFunction1(2, 0), asyncFunction1(3, 0)];

const main = async () => {
  let finalResult = []
  console.log("Before For Each Loop");

  for (let i = 0; i < files.length; i++) {
    console.log(i, "i >>>>>>>>>>>>>>>>>>>>>>>>>");
    const result = await files[i];
    finalResult[i] = result
    console.log(result, "result");
  }

  console.log("After For Each Loop");

  return Promise.resolve(finalResult)  // same as return finalResult
};

let result = main()
result.then((response)=>{
    console.log(response,'response')
}).catch((error)=>{
  console.log(error)
})



### NOTE :

1. This behavior works with most loops (like while and for-of loops)
2. But it wont work with loops that require a callback. Examples of such loops that require a fallback include forEach, map, filter, and reduce.
3. So, sequentially resolve a bunch of promises in order, one after the other is not not possible in forEach, map, filter (loops that require a callback).
But we can achieve this by using reduce method.


### Reduce Method Example:

  function asyncFunction1(value = 1, delay = 6000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(value);
      }, delay);
    });
  }

  function asyncFunction2(value = 2, delay = 3000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(value);
      }, delay);
    });
  }

  function asyncFunction3(value = 3, delay = 1000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(value);
      }, delay);
    });
  }

const asyncFuncArr = [asyncFunction1, asyncFunction2, asyncFunction3];


###   TYPE : 1
let arr = asyncFuncArr.reduce((acc, asyncFn) => {

  let accResult =  acc.then((response) => {

   let data = asyncFn().then((result)=>{
     console.log(result,'result >>>>>>>>>>')
     return result
   })

   return data

  });

  return accResult

}, Promise.resolve());



### TYPE : 2
let arr = asyncFuncArr.reduce((acc, asyncFn) => {
  return acc.then((response) => {
   return  asyncFn().then((result)=>{
     console.log(result,'result >>>>>>>>>>')
     return result
   })
  });

}, Promise.resolve());


### TYPE : 3

let arr = asyncFuncArr.reduce(async (acc, asyncFn) => {
   await acc
   return asyncFn().then((result)=>{
     console.log(result,'result')
     return result
   })
}, Promise.resolve());


- Final Result :

arr.then((result)=>{
  console.log(result,'result')
})


### Explanation.

- Each time our callback fires, we return a promise that resolves to another promise. And while reduce() doesn’t wait for any resolution to take place, the advantage it does provide is the ability to pass something back into the same callback after each run, a feature unique to reduce(). As a result, we’re able build a chain of promises that resolve into more promises, making everything nice and sequential:

new Promise( (resolve, reject) => {
  // Promise #1
  resolve();
}).then( (result) => {
  // Promise #2
  return result;
}).then( (result) => {
  // Promise #3
  return result;
}); // ... and so on!


- All of this should also reveal why we can’t just return a single, new promise each iteration. Because the loop runs synchronously, each promise will be fired immediately, instead of waiting for those created before it.

- Since all we’re returning in our callback is a chained promise, that’s all we get when the loop is finished: a promise. After that, we can handle it however we want, even long after reduce() has run its course.


- We found that the reason reduce() works for us is because we’re able to return something right back to our same callback (namely, a promise), which we can then build upon by having it resolve into another promise. With all of these other methods like map,filter,forEach, however, we just can’t pass an argument to our callback that was returned from our callback. Instead, each of those callback arguments are predetermined, making it impossible for us to leverage them for something like sequential promise resolution.
```

- For More Information about how it works in reduce method, Check out:

[Why Using reduce() to Sequentially Resolve Promises Works](https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/)

- TO See Explanation of async and await in loops, Click on the following link :

### Link To JavaScript async and await in loops Documentation.

[JavaScript async and await in loops](https://www.freecodecamp.org/news/javascript-async-and-await-in-loops-30ecc5fb3939/)

### 83. PERFORM ASYNCHRONOUS FUNCTIONS IN PARALLEL AND STORE RESULT IN A SEQUENTIAL ORDER ( ORDER IN WHICH THE ASYNC FUNCTIONS ARE CALLED) USING PROMISE.ALL AND MAP METHOD AND FOR LOOP.

```JS

### Using map function.

function asyncFunction1(value=1,delay=8000) {
  console.log(value,'value >>>>>>>>>>>>>>',delay)
 return new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve(value);
  },delay);
 })
}


let files= [asyncFunction1(1,8000),asyncFunction1(2,5000),asyncFunction1(3,2000)]

async function printFiles () {

// If you use await in a map, map will always return an array of promise. This is because asynchronous functions always return promises.
// Since map always return promises (if you use await), you have to wait for the array of promises to get resolved. You can do this with await Promise.all(arrayOfPromises).

   let result = await Promise.all(files.map(async (file) => {
    const contents = await file
    console.log(contents,'contents') // called : 3,2,1
    return contents
  }))

console.log(result,'result')

return result
}

### OR : Above and below have same implementation, below we are just calling  Promise.all() separately.

async function printFiles () {

// If you use await in a map, map will always return an array of promise. This is because asynchronous functions always return promises.
// Since map always return promises (if you use await), you have to wait for the array of promises to get resolved. You can do this with await Promise.all(arrayOfPromises).

   let promises = files.map(async (file) => {
    const contents = await file
    console.log(contents,'contents') // called : 3,2,1
    return contents
  })

   let finalResult = await Promise.all(promises)
   console.log(result,'result')

return result
}


let output = printFiles()

//   [1, 2, 3]


### Using For Loop


function asyncFunction1(value=1,delay=8000) {
  console.log(value,'value >>>>>>>>>>>>>>',delay)
 return new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve(value);
  },delay);
 })
}


let files= [asyncFunction1(1,8000),asyncFunction1(2,5000),asyncFunction1(3,2000)]

function asyncFunction(){
  return new Promise((resolve,reject)=>{
  let result = []
  let counter = files.length
  for(let item=0;item<files.length;item++){

  files[item].then((res)=>{
    result[item] = res
    counter--
    if(!counter){
      resolve(result)
    }
  })

}
})

}
let finalResult = asyncFunction()
finalResult.then((result)=>{
  console.log(result,'finalResult')
})

//  HERE we are using for loop inside  new promise method, then only it will work and put result in a sequence, Simply using for loop inside a function without new promise
// won't help to achieve the result

```

### 84. Example Function sequential piping and with promises.

- The pipe function takes a sequence of functions and returns a new function. When the new function is called with an argument, the sequence of functions are called in order, which each one receiving the return value of the previous function.

```js
const pipe =(...functions) =>(initialValue) => functions.reduce((acc, fn) => fn(acc), initialValue);

// Building blocks to use for composition
const double = (x) => 2 * x;
const triple = (x) => 3 * x;
const quadruple = (x) => 4 * x;

// Composed functions for multiplication of specific values
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

// Usage
multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240



###  Running promises in sequence
- Promise sequencing is essentially function piping demonstrated in the previous section, except done asynchronously.

// Compare this with pipe: fn(acc) is changed to acc.then(fn),
// and initialValue is ensured to be a promise
const asyncPipe =(...functions) =>(initialValue) =>{

 return functions.reduce((acc, fn) => {
  let response =  acc.then((res)=>{
   return fn(res)
  })
  return response
 }, Promise.resolve(initialValue))

}

# OR Below

// const asyncPipe =(...functions) =>(initialValue) => functions.reduce(async (acc, fn) => fn(await acc), initialValue);



// Building blocks to use for composition
const p1 = async (a) => {
 console.log(a,'a1')
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(a*5)
    },1000)
  })
};
const p2 = (a) =>{
    console.log(a,'a2')
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(a*2)
    },4000)
  })
}

// The composed functions can also return non-promises, because the values are
// all eventually wrapped in promises
const f3 = (a) => {
  console.log(a,'a3')
  return a * 3
}
const p4 = async (a) => {
  console.log(a,'a4')
  return a * 4
}

asyncPipe(p1, p2, f3, p4)(10).then(console.log)

```

### 85. Write a function to truncate a string to a certain number of letters.

1. Text can be truncated by fetching the substring from start till the count of characters
2. substr methods of String can be used to fetch the part of the string.

```js
function truncateString(str, charCount) {
  if (str.length > charCount) {
    return str.substr(0, charCount - 3) + "...";
  } else {
    return str;
  }
}

// Example
truncateString("JavaScript", 7); // "Java..."
truncateString("JS is fun", 10); // "JS is fun"
truncateString("JS is funny", 10); // "JS is f..."
```

### 85. O/P

```js
var show = 1;

console.log(show, "show top"); // 1

function show() {
  console.log("show");
}

console.log(show, "show bottom"); // 1
show() // show is not a function

### Note that in JavaScript, functions are "hoisted" to the top of their scope, which means that the function show() is moved to the top of the script.

- Hoisting is the default behavior of javascript where all the variable and function declarations are moved on top.
- This means that irrespective of where the variables and functions are declared, they are moved on top of the scope. The scope can be both local and global.

```

### 86. Explain Implicit Type Coercion in javascript.

- Implicit type coercion in javascript is the automatic conversion of value from one data type to another. It takes place when the operands of an expression are of different data types.

```js
1. String coercion
String coercion takes place while using the ‘ + ‘ operator. When a number is added to a string, the number type is always converted to the string type.

### Example 1:

var x = 3;
var y = "3";
x + y // Returns "33"


### Example 2:

var x = 24;
var y = "Hello";
x + y   // Returns "24Hello";



### Note - ‘ + ‘ operator when used to add two numbers, outputs a number. The same ‘ + ‘ operator when used to add two strings, outputs the concatenated string:

var name = "Vivek";
var surname = " Bisht";
name + surname     // Returns "Vivek Bisht"


- When JavaScript sees that the operands of the expression x + y are of different types ( one being a number type and the other being a string type ), it converts the number type to the string type and then performs the operation. Since after conversion, both the variables are of string type, the ‘ + ‘ operator outputs the concatenated string “33” in the first example and “24Hello” in the second example.


### Note - Type coercion also takes place when using the ‘ - ‘ operator, but the difference while using ‘ - ‘ operator is that, a string is converted to a number and then subtraction takes place.

### EXAMPLE 3:
var x = 3;
Var y = "3";
x - y    //Returns 0 since the variable y (string type) is converted to a number type


### Example 4:

function func1(){
  setTimeout(()=>{
    console.log(x); // 2
    console.log(y); // 12
  },3000);

  var x = 2;
  let y = 12;
}
func1();

Explanation:
- Outputs 2 and 12. Since, even though let variables are not hoisted, due to the async nature of javascript, the complete function code runs before the setTimeout function. Therefore, it has access to both x and y.
```

### 87. What gets logged?

```js
setTimeout(() => console.log(1));
Promise.resolve().then(() => console.log(2));
Promise.resolve().then(() => setTimeout(() => console.log(3)));
new Promise(() => console.log(4));
setTimeout(() => console.log(5));

### Explanation :

The order of logging in this scenario is determined by the event loop and the way JavaScript handles asynchronous operations. Here's a breakdown of what happens:

1. setTimeout(() => console.log(1)): This schedules a timer to log 1 to the console after a delay of 0 milliseconds. However, due to the way the event loop works, this will not be executed immediately.

2. Promise.resolve().then(() => console.log(2)): This creates a resolved promise and schedules a callback to log 2 to the console. Since promises are handled in the microtask queue, which has higher priority than the macrotask queue (where timeouts are handled), this will be executed before the first setTimeout.

3. Promise.resolve().then(() => setTimeout(() => console.log(3))): This creates another resolved promise and schedules a callback to set a timeout to log 3 to the console. The promise callback will be executed immediately after the previous one, but the timeout will be scheduled for later execution.

4. new Promise(() => console.log(4)): This creates a new promise and executes the provided callback immediately, logging 4 to the console. Note that this is not a resolved promise, so it doesn't schedule a callback in the microtask queue.

5. setTimeout(() => console.log(5)): This schedules another timer to log 5 to the console.

The order of execution and result are as follows:

4 (logged immediately by the promise constructor)
2 (logged by the first promise callback)
1 (logged by the first timeout)
5 (logged by the second timeout)
3 (logged by the timeout scheduled by the second promise callback)
```

### 88. What gets logged?

```js
setTimeout(() => console.log(1));

(async () => {
  console.log(2);
  await Promise.resolve();
  console.log(3);
})();

Promise.resolve().then(() => Promise.resolve().then(() => console.log(4)));

// O/P : 2,3,4,1

### Explanation :

1. The setTimeout function schedules a callback to be executed after a certain delay (in this case, 0ms). The callback is added to the macrotask queue.
2. The immediately invoked function expression (IIFE) is executed, logging 2 to the console.
3. The await keyword inside the IIFE creates a microtask that resolves the Promise.resolve() promise. When the promise is resolved, the execution is paused, and the microtask is added to the microtask queue.
4. The Promise.resolve().then() chain creates another microtask that resolves the promise and logs 4 to the console. This microtask is also added to the microtask queue.
5. The event loop checks the microtask queue and executes the microtask created by the await keyword, logging 3 to the console.
6. The event loop then checks the macrotask queue and executes the callback scheduled by setTimeout, logging 1 to the console.

### The order of execution is:

1. IIFE (logs 2)
2. Microtask queue (logs 3)
3. Microtask queue (logs 4)
4. Macrotask queue (logs 1)

- Note that the order of execution can vary depending on the specific JavaScript engine and its implementation of the event loop. However, in most modern browsers and Node.js, the order will be as described above. 😊
```

### 89. What gets logged?

```js
const objA = {
  type: "A",
  foo() {
    console.log(this.type, "<<<<<< this >>>>>>", this);
  },
};

const objB = {
  type: "B",
  foo: objA.foo,
  bar: () => objA.foo(),
  baz() {
    objA.foo();
  },
};

objB.foo();
objB.bar();
objB.baz();
```

### 90. Implement a throttler that executes an array of tasks. When the throttler is passed a number, only executes that number of the tasks and passes the other tasks into a queue.

- Example 1: In JavaScript

```js
<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
      <h1 class="title">Throttle an array of tasks</h1>
      <button id="btn">Add Throttle</button>
      <script>
        const throttleButton = document.querySelector('#btn')
          let array = [1, 2, 3, 4, 5, 6, 7, 8];
          let numberToThrottle = 2;

   const throttle = (arrays, number, callback) => {
    let flag = true;

    return function () {
      if (flag) {

       let argument = arrays.splice(0, number);
        callback.call(this, argument);
        flag = false;
        setTimeout(() => {
          flag = true;
        }, 1000);
      }
    };
  };

  const callbackFunction = (value) => {
    console.log(value, 'value');
  };

throttleButton.addEventListener('click',throttle(array,numberToThrottle,callbackFunction))
      </script>
  </body>
</html>


### Output:
// [object Array] (2)
[1,2] // 1st call

// [object Array] (2)
[3,4] // 2nd call after 2 seconds

// [object Array] (2)
[5,6] // 3rd call after 2 seconds

// [object Array] (2)
[7,8] // 4th call after 2 seconds

// [object Array] (2)
[1,2] // 5th call after 2 seconds

// [object Array] (2)
[3,4] // 6th call after 2 seconds

```

- Example 2: In JavaScript.

```js
<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
      <h1 class="title">Throttle an array of tasks</h1>
      <button id="btn">Add Throttle</button>
      <script>
        const throttleButton = document.querySelector('#btn')
          const throttle = (task, count = task.length, callback, delay = 1000) => {
  // track the throttle
  let lastFunc;
  let lastRan;

  // track the task
  let queue = [];

  return function() {
    // store the context to pass it to the callback function
    const context = this;
    const args = arguments;

    // if the throttle is executed the first time
    // run it immediately
    if (!lastRan) {
      // copy all the tasks to the queue
      queue = [...queue, ...task];

      // get the amount of task to run
      const execute = queue.splice(0, count);

      // pass those tasks to the callback
      callback(execute);

      // update the last ran time
      // to run it after the delay
      lastRan = Date.now();
    } else {
      // clear the timer
      clearTimeout(lastFunc);

      // start a new timer
      // run the function after the delay
      lastFunc = setTimeout(function() {
        // calc the difference between
        // the last ran and current time
        // if it is greater than the delay
        // invoke it
        if ((Date.now() - lastRan) >= delay) {
          // copy all the tasks to the queue
          queue = [...queue, ...task];

           // get the amount of task to run
          const execute = queue.splice(0, count);

          // pass those tasks to the callback
          callback(execute);

          // update the last ran time
          // to run it after the delay
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  }
};


throttleButton.addEventListener('click',  throttle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, (task) => {
  console.log(task);
}, 2000));
      </script>
  </body>
</html>


### Output:
// [object Array] (2)
[1,2] // 1st call

// [object Array] (2)
[3,4] // 2nd call after 2 seconds

// [object Array] (2)
[5,6] // 3rd call after 2 seconds

// [object Array] (2)
[7,8] // 4th call after 2 seconds

// [object Array] (2)
[9,10] // 5th call after 2 seconds

// [object Array] (2)
[1,2] // 6th call after 2 seconds


```

Example 3: In React.

```js
import React, { useState } from "react";
import "./style.css";

export default function App() {
  let array = [1, 2, 3, 4, 5, 6, 7, 8];
  let numberToThrottle = 2;

  const throttle = (arrays, number, callback) => {
    let flag = true;
    let queue = [...arrays];
    return function () {
      if (!queue.length) {
        queue = [...arrays];
      }
      if (flag) {
        let argument = queue.splice(0, number);
        callback.call(this, argument);
        flag = false;
        setTimeout(() => {
          flag = true;
        }, 1000);
      }
    };
  };

  const callbackFunction = (value) => {
    console.log(value, "value");
  };

  const handleClick = throttle(array, numberToThrottle, callbackFunction);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>

      <button onClick={() => handleClick()}>{"Add"}</button>
    </div>
  );
}
```

### 91. What is the drawback of declaring methods directly in JavaScript objects?

- One of the drawbacks of declaring methods directly in JavaScript objects is that they are very memory inefficient. When you do that, a new copy of the method is created for each instance of an object. Here's an example:

```js
var Employee = function (name, company, salary) {
  this.name = name || "";
  this.company = company || "";
  this.salary = salary || 5000;

  // We can create a method like this:
  this.formatSalary = function () {
      return "$ " + this.salary;
  };
};

// Alternatively we can add the method to Employee's prototype:
Employee.prototype.formatSalary2 = function() {
    return "$ " + this.salary;
}

//creating objects
var emp1 = new Employee('Yuri Garagin', 'Company 1', 1000000);
var emp2 = new Employee('Dinesh Gupta', 'Company 2', 1039999);
var emp3 = new Employee('Erich Fromm', 'Company 3', 1299483);


### In this case each instance variable emp1, emp2, emp3 has its own copy of theformatSalary method. However the formatSalary2 will only be added once to Employee.prototype.
```

### 92. What will be the output of the following code?

```js
## EXAMPLE 1:

var output = (function(x) {
  delete x;
  return x;
})(0);

console.log(output);

### The code above will output 0 as output. delete operator is used to delete a property from an object. Here x is not an object, it's a local variable. delete operator doesn't affect local variables.

EXAMPLE 2:

var x = 1;
var output = (function() {
  delete x;
  return x;
})();

console.log(output);

EXAMPLE 3:
var x = { foo : 1};
var output = (function() {
  delete x.foo;
  return x.foo;
})();

console.log(output);
```

### 93. What will be the output of the following code?

```js
var Employee = {
  company: 'xyz'
}
var emp1 = Object.create(Employee);
delete emp1.company
console.log(emp1.company);



- The code above will output `xyz` as output. Here `emp1` object got company as **prototype** property. delete operator doesn't delete prototype property.
emp1 object doesn't have company as its own property. you can test it console.log(emp1.hasOwnProperty('company'));
 //output : false However, we can delete company property directly from Employee object using delete Employee.company or we can also delete from emp1 object using __proto__ property delete emp1.__proto__.company.


###  output of the following code?
var z = 1, y = z = typeof y;
console.log(y);

- The code above will print string "undefined" as output. According to associativity rule operator with the same precedence are processed based on their associativity property of operator. Here associativity of the assignment operator is Right to Left so first typeof y will evaluate first which is string "undefined" and assigned to z and then y would be assigned the value of z. The overall sequence will look like that:

var z;
z = 1;
var y;
z = typeof y;
y = z;

```

### 94. What is the difference between declaring a function in the formats listed below?

```js
1.
var foo = function() {
  // Some code
}

2.
function bar () {
  // Some code
}


### The main difference is that function foo is defined at run-time and is called a function expression, whereas function bar is defined at parse time and is called a function statement. To understand it better, let's take a look at the code below :

A.
// Run-Time function declaration
  foo(); // Call foo function here, It will give an error
  var foo = function() {
    console.log("Hi I am inside Foo");
  };

B.
// Parse-Time function declaration
bar(); // Call bar function here, It will not give an Error
function bar() {
  console.log("Hi I am inside Foo");
}
```

### 95. What is the output of the following?

```js
bar();
(function abc(){console.log('something')})();

function bar(){console.log('bar got called')};


- Since the function is called first and defined during parse time the JS engine will try to find any possible parse time definitions and start the execution loop which will mean function is called first even if the definition is post another function.
```

### 95. Calculate the length of the associative array

```js
var counterArray = {
  A : 3,
  B : 4
};
counterArray["C"] = 1;

### Method 1.
Object.keys(counterArray).length; // Output 3

### Method 2.
function getLength(object) {
  var count = 0;
  for(key in object) {
    // hasOwnProperty method check own property of object
    if(object.hasOwnProperty(key)) count++;
  }
  return count;
}


### Method 3.
Object.getOwnPropertyNames(counterArray).length; // Output 3
```

### 96. Write a function called deepClone which takes an object and creates a object copy of it.

```js

var personalDetail = {
	name : 'Nishant',
	address : {
	  location: 'xyz',
	  zip : '123456',
	  phoneNumber : {
	    homePhone: 8797912345,
	    workPhone : 1234509876
	  }
	}
}

function deepClone(object){
	var newObject = {};
	for(var key in object){
		if(typeof object[key] === 'object'  && object[key] !== null ){
		 newObject[key] = deepClone(object[key]);
		}else{
		 newObject[key] = object[key];
		}
	}
	return newObject;
}


var newObject = deepClone(personalDetail);

### Explanation: We have been asked to do deep copy of object so What's basically it's mean ??. Let's understand in this way you have been given an object personalDetail this object contains some property which again a type of object here as you can see address is an object and phoneNumber in side an address is also an object. In simple term personalDetail is nested object(object inside object). So Here deep copy means we have to copy all the property of personalDetail object including nested object.

- So when we do deep clone then we should copy every property (including the nested object).
```

### 97. What would be the output of the following code?

```js

function User(name) {
  this.name = name || "JsGeeks";
}

var person = new User("xyz")["location"] = "USA";
console.log(person);



### The output of above code would be "USA". Here new User("xyz") creates a brand new object and created property location on that and USA has been assigned to object property location and that has been referenced by the person.

Let say new User("xyz") created a object called foo. The value "USA" will be assigned to foo["location"], but according to ECMAScript Specification , pt 12.14.4 the assignment will itself return the rightmost value: in our case it's "USA". Then it will be assigned to person.

To better understand what's going on here, try to execute this code in console, line by line:

function User(name) {
 this.name = name || "JsGeeks";
}

var person;
var foo = new User("xyz");
foo["location"] = "USA";
// the console will show you that the result of this is "USA"

```

### 98. Design Browser History

- You have a browser of one tab where you start on the homepage and you can visit another URL, get back in the history number of steps or move forward in the history number of steps. The task is to design a data structure and implement the functionality of visiting a URL starting from the homepage and moving back and forward in the history.

### Example 1: By using basic class methods. it is working fine but not optimized solution.

```js
### 1.

let defaultUrl = "https://www.ARC018.com";  // it is the parent url.

class BrowserHistory {
  constructor(urlDefault) {
    this.history = [urlDefault];
    this.currentIndex = 0;
  }

  visit(url) {
    this.history.push(url);
    this.currentIndex = this.history.length - 1;
  }

  // previous(steps){
  //     if(this.currentIndex - steps <= 0){
  //       this.currentIndex = 0
  //       return this.history[this.currentIndex]
  //     }
  //     this.currentIndex -= steps
  //     return this.history[this.currentIndex]

  // }


//  OR Below
  previous(step) {
    if (this.currentIndex - step <= 0) {
      this.currentIndex = 0;
      return this.history[0];
    } else {
      let previousUrl = this.history[this.currentIndex - step];
      this.currentIndex -= step;
      return previousUrl;
    }
  }

  // forward(steps){
  //   if(this.currentIndex + steps >=this.history.length){
  //     this.currentIndex = this.history.length -1
  //     return  this.history[this.currentIndex]
  //   }
  //     this.currentIndex += steps
  //     return this.history[this.currentIndex]
  // }

  //  OR Below
  forward(step) {
    if (this.history.length <= this.currentIndex + step) {
      this.currentIndex = this.history.length - 1;
      return this.history[this.history.length - 1];
    } else {
      let forwardUrl = this.history[this.currentIndex + step];
      this.currentIndex += step;

      return forwardUrl;
    }
  }
}

const browserHistory = new BrowserHistory(defaultUrl);

### 2. It more optimized than above.

class BrowserHistory {
  constructor(defaultUrl) {
   this.history = [defaultUrl];
   this.currentIndex = 0;
  }

  visit(url) {

   this.history.push(url);
   this.currentIndex = this.history.length -1
  }

  previous(steps) {
   this.currentIndex = Math.max(this.currentIndex - steps, 0);
   return this.history[this.currentIndex];
  }

  forward(steps) {
   this.currentIndex = Math.min(this.currentIndex + steps, this.history.length - 1);
   return this.history[this.currentIndex];
  }
}

const browserHistory = new BrowserHistory(defaultUrl);

- This implementation uses an array to store the URLs visited and an index to keep track of the current position in the history. The visit method adds a new URL to the history and updates the index. The previous and forward methods update the index and return the URL at the new index.


### Calling methods :


browserHistory.visit('https://www.google.com');
browserHistory.visit('https://www.bing.com');
browserHistory.visit('https://www.duckduckgo.com');

console.log(browserHistory.previous(1));
console.log(browserHistory.previous(1));
console.log(browserHistory.forward(1));
browserHistory.visit('https://www.komoi.com');
console.log(browserHistory.previous(1));
console.log(browserHistory.previous(9));
console.log(browserHistory.previous(7));
console.log(browserHistory,'browserHistory')

```

### Example 2: Naive Approach [Use Two Stacks] :

We can implement a browser history design by employing two stacks. We need a stack to keep track of the previously visited URLs and another stack to store the current URL on the browser tab.

- The following functionalities should be covered:

1. visit(url) : Visits a URL given as string
2. forward(steps) : Takes ‘steps’ forward.
3. back(steps) : Takes ‘steps’ backward.

`Follow the steps mentioned below to implement the idea:`

1. Create two stacks, backStack, and forwardStack.
   A. A backStack stores the current URL, while a forwardStack keeps track of previously visited URLs.
2. The constructor BrowserHistory(string homepage) initializes the object with the homepage of the browser. Push the homepage into backStack.
3. We have a visit() function to visit a URL from the current page:
   A. While visiting a URL, the forward history gets cleared up. Since there will be nothing beyond the last visited URL. So, pop all the elements from the forwardStack and then push the URL we need to visit in the backSTack.
4. We have a back() function to move backward in history and return to the current page. The steps represent the number of steps we need to move.
   A. To move steps back, run a while loop till there is at least one element left in the backStack or we have moved step number of times.
   B. Push the top of the backStack into the forwardStack and then pop it from the backStack. Return the topmost element from the backStack.
   C. If we can only return x steps in the history and steps > x, we will return only x steps.
5. There is a forward() function to move steps forward in history and return the current page.
   A. To move steps forward, run a while loop for steps numbers of times and till the stack is not empty push the top element of forwardStack into backStack and then pop it from the forwardStack.
   B.Return the top value of backStack.

```js
// JavaScript Implementation of the approach

class BrowserHistory {
  constructor(homepage) {
    this.backStack = [];
    this.forwardStack = [];

    // Initialize object with homepage
    this.backStack.push(homepage);
  }

  // Visit current URL
  visit(url) {
    this.forwardStack = [];
    this.backStack.push(url);
  }

  // 'steps' move backward in history and return
  // current page
  back(steps) {
    while (this.backStack.length > 1 && steps-- > 0) {
      this.forwardStack.push(this.backStack[this.backStack.length - 1]);
      this.backStack.pop();
    }
    return this.backStack[this.backStack.length - 1];
  }

  // 'steps' move forward and return
  //current page
  forward(steps) {
    while (this.forwardStack.length > 0 && steps-- > 0) {
      this.backStack.push(this.forwardStack[this.forwardStack.length - 1]);
      this.forwardStack.pop();
    }
    return this.backStack[this.backStack.length - 1];
  }
}
// Driver Code

// Input case
let homepage = "gfg.org";

// Initialize the object of BrowserHistory
let obj = new BrowserHistory(homepage);

let url = "google.com";
obj.visit(url);

url = "facebook.com";
obj.visit(url);

url = "youtube.com";
obj.visit(url);

console.log(obj.back(1));
console.log(obj.back(1));
console.log(obj.forward(1));
obj.visit("linkedin.com");
console.log(obj.forward(2));
console.log(obj.back(2));
console.log(obj.back(7));

###
1. facebook.com
2. google.com
3. facebook.com
4. linkedin.com
5. google.com
6. gfg.org


### Explanation:
1. visit(“google.com”) :  We are at google.com
2. visit(“facebook.com”): Now, we are at facebook.com
3. visit(“youtube.com”): We are at youtube.com
4. back(1):  We would land up at facebook.com, if we move one step back.
5. back(1):  Moving one step back, takes us to google.com
6. forward(1): Moving a step forward we would be at facebook.com
7. visit(“linkedin.com”):  We are at linkedin.com
8. forward(2): We are still at linkedin. since visiting clear the forward history . When we are the current URL, there is no URL to move forward to.
9. back(2): Moving two steps back, takes us to google.com
10. back(7):  We need to move 7 steps back, but only 1 url is available. Therefore we would return gfg.org.
```

### Example 3: Expected Approach [Using a Doubly Linkeded List].

1. First Create a class Node have attributes as a link, Previous (Denoting the previous Node), Next (Denoting Next Node)
2. Node Made class BrowserHistory have attribute as Node Current where Current denotes the website in which you are currently
3. The constructor BrowserHistory(string homepage) initializes the object with the homepage of the browser set Current Node as current.link=homepage
4. We have a visit(String url) function to visit a URL from the current page: when visit(String url) is called it will a made new node have a link as URL and Previous as Current and Next as null then we will change the pointer of Current.next to the new node that we made then just do one thing make new Node as Current Node
5. For Function forward(int step) we will travel in a forward direction in the list and if attend the end of the string before completing all steps then we return the last link and if all steps are complete then we will return Node.link that travelling
6. For Function back(int step) we will do similar to forward just that we travel in the opposite direction

```js
class Node {
  constructor(link) {
    this.Previous = null; // Represents the previous link/node in the history.
    this.Next = null; // Represents the next link/node in the history.
    this.link = link; // Stores the URL of this node.
  }
}

class BrowserHistory {
  constructor(homepage) {
    this.Current = new Node(homepage); // Initialize with the homepage as the current node.
  }

  visit(url) {
    const urlNode = new Node(url); // Create a new node for the visited URL.
    urlNode.Previous = this.Current; // Set the previous node to the current node.
    this.Current.Next = urlNode; // Set the next node for the current node.
    this.Current = urlNode; // Update the current node to the newly visited URL.
  }

  back(step) {
    let temp = this.Current;
    // Travel 'step' times back if possible.
    while (temp.Previous && step > 0) {
      temp = temp.Previous;
      step--;
    }
    // After traveling back, update the current node.
    this.Current = temp;
    return this.Current.link;
  }

  forward(step) {
    let temp = this.Current;
    // Travel 'step' times forward if possible.
    while (temp.Next && step > 0) {
      temp = temp.Next;
      step--;
    }
    // After traveling forward, update the current node.
    this.Current = temp;
    return this.Current.link;
  }
}

// Input case
const homepage = "gfg.org";
const obj = new BrowserHistory(homepage);

let url = "google.com";
obj.visit(url);

url = "facebook.com";
obj.visit(url);

url = "youtube.com";
obj.visit(url);

console.log(obj.back(1)); // Move back one step.
console.log(obj.back(1)); // Move back one more step.
console.log(obj.forward(1)); // Move forward one step.
obj.visit("linkedin.com"); // Visit a new URL.
console.log(obj.forward(2)); // Move forward two steps.
console.log(obj.back(2)); // Move back two steps.
console.log(obj.back(7)); // Move back seven steps.

### OUTPUT :
facebook.com
google.com
facebook.com
linkedin.com
google.com
gfg.org
```

### Example 4:

```js
// Node Class: Define a ‘Node” class to represent each page in the browsing history, linked by pointers to the previous and next pages.

// 1.‘data’ stores the URL or identifier of the webpage.
// 2.‘next’ stores the pointer to the next page in the browsing history.
// 3. ‘back’ stores the previous page in the browsing history

// ‘next’ and ‘back’ pointers link each node to its adjacent nodes forming a doubly linked list representing the browsing history and enabling navigation backward and forward in the browsing history.

class Node {
  // Stores the URL of the page
  constructor(x) {
    this.data = x;
    // Pointer to the next page in history
    this.next = null;
    // Pointer to the previous page in history
    this.back = null;
  }
}

// Browser Class:

// The Browser Class has to be implemented in such a way that it encapsulates the functionalities of browsing, managing a history of visited URLs and navigating that history.

// Constructor: initialises the `Browser` object with the specified homepage URL and it creates a `Node` representing the homepage and sets it as the `currentPage`.

// `currentPage` is a private member variable initialised when a new ‘Browser’ object is created. Each instance of the `Browser` class will have its own `currentPage` pointer, maintaining its individual browsing history.

// `visit (string url)` adds a new page to the history by creating a new `Node` with the given URL, setting its back pointer to the current page and updating the current page to this node.

// `back (int steps)` navigates backward in the history by the specified number of steps, updating the `currentPage` pointer to the previous node. Returns the URL of the resulting page.

// `forward (int steps)` navigates forward in the history by a specified number of steps, updating the `currentPage` pointer to the next node. Returns the URL of the resulting page.

// This Browser class essentially maintains a linked list structure of visited pages, where each Node represents a page and contains the URL and pointers to the previous and next pages in the history. The Browser methods enable navigation through this history by updating the currentPage pointer accordingly.

class Browser {
  // Pointer to the current
  // page being viewed
  constructor(homepage) {
    this.currentPage = new Node(homepage);
  }

  // Visit a new page and
  // update the browsing history
  visit(url) {
    const newNode = new Node(url);
    // Set the back pointer of the
    // new page to the current page
    newNode.back = this.currentPage;
    // Set the next pointer of the
    // current page to the new page
    this.currentPage.next = newNode;
    // Update the current page to the new page
    this.currentPage = newNode;
  }

  // Go back a certain number
  // of steps in history
  back(steps) {
    // While there are steps
    // and a previous page exists
    while (steps && this.currentPage.back) {
      // Move to the previous page
      this.currentPage = this.currentPage.back;
      // Decrement the steps count
      steps--;
    }
    // Return the URL of the current page
    return this.currentPage.data;
  }

  // Go forward a certain number of steps in history
  forward(steps) {
    // While there are steps and a next page exists
    while (steps && this.currentPage.next) {
      // Move to the next page
      this.currentPage = this.currentPage.next;
      // Decrement the steps count
      steps--;
    }
    // Return the URL of the current page
    return this.currentPage.data;
  }
}

// Create a browser with a homepage
const browser = new Browser("homepage.com");
const queries = [
  ["visit", "google.com"], // Visit 'google.com'
  ["visit", "bing.com"], // Visit 'bing.com'
  ["back", "1"], // Go back one step
  ["forward", "1"], // Go forward one step
];

console.log("Queries:");
// Loop through each query and execute it
for (const query of queries) {
  if (query[0] === "visit") {
    console.log(`Visited ${query[1]}`);

    // Execute visit query
    browser.visit(query[1]);
  } else if (query[0] === "back") {
    console.log(`Back ${query[1]} steps: `);

    // Execute back query and print the result
    console.log(browser.back(parseInt(query[1])));
  } else if (query[0] === "forward") {
    console.log(`Forward ${query[1]} steps: `);

    // Execute forward query and print the result
    console.log(browser.forward(parseInt(query[1])));
  }
}


### Algorithm
Step 1:Define a Node class to represent each webpage in the browsing history. This class should have data fields for URL, a pointer to the next page, and a pointer to the previous page.

Step 2: Implement the Browser class by Create a private member variable `currentPage` within the constructor to maintain its browser history navigation pointer.

Step 3: Implement the `visit` function by adding a new webpage to the browsing history every time it is called.
  A. When invoked, this function creates a new Node representing the visited webpage and updates the pointers linking it ahead of the current webpage.
  B. The browser history now gets extended to this newly visited webpage with the currentPage navigator on it to go forward and backward.

Step 4: Implement the `forward function to facilitate forward traversal in the browsing history.
  A. This function advances the `currentPage` pointer to the next web page in the sequence.
  B. Allows users to navigate forward by a specified number of steps within their browsing history object instance.

Step 5: Implement the `backward function` to facilitate backward navigation in the browsing history.
  A. This function moves the `currentPage` pointer backward to the previous web pages.
  B.Allows users to move to web pages they visited web pages they had previously visited.
```

### 99. How to check whether a key exist in a JavaScript object or not.

```js
// Method 1: We can use in operator on objet to check own property or inherited property.

//  in operator also look into inherited property and if it finds then return true.

// Method 2: If we want to test property of object instance not inherited properties then we will use hasOwnProperty method of object instance.

let myObj = {
  game: "gta",
};

var person = Object.create(myObj);

person.name = "Vasco";
person.age = 22;

console.log(person);
console.log(person.hasOwnProperty("game"));
console.log("game" in person);
```

### 100.Sequentially call addTen,SubFive,and mulTwo methods.pass result of addTen to subFive methods and result of subFive methods to MulTwo methods then finally get the output

```js
const addTen = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num + 10);
    }, 6000);
  });
};

const subFive = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num - 5);
    }, 4000);
  });
};

const mulTwo = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * 2);
    }, 2000);
  });
};


### Method 1: By Using async/await functions.

async function sequenceCall(){

  let add = await addTen(10)
  let sub = await subFive(add)
  let mul = await mulTwo(sub)
  return mul
}
let res = sequenceCall()
res.then((res)=>{
  console.log(res,'res')
})


### Method 2: By Promise.resolve() in Reduce functions.

async function sequenceCall(arrays) {
  return arrays.reduce((promiseAccumulator, currentPromise) => {
    return promiseAccumulator.then((response) => {
      return currentPromise(response);
    });
  }, Promise.resolve(10));
}

let result = sequenceCall([addTen, subFive, mulTwo]);
result.then((result) => {
  console.log(result, "result >>>>>>>>>>>>");
});


//  Note Promise in reduce function working like this :  Its like a chaining function, result of one promise is passed to another promise and so on.
// promise.then(addTen).then(subFive).then(mulTwo).then((ans)=>{
// console.log(ans)
// }).catch((err)=>{console.log(err)});
```

### 101. What would be the output of following code?

```js
### 1.
var objA = {prop1: 42};
var objB = objA;
objB = {};
console.log(objA)

### The output will be {prop1: 42}.
When we assign objA to objB, the objB variable will point to the same object as the objB variable.
However, when we reassign objB to an empty object, we simply change where objB variable references to. This doesnt affect where objA variable references to.


### 2.
var arrA = [{prop1: "value of array A!!"},  {someProp: "also value of array A!"}, 3,4,5];
var arrB = arrA;
arrB[0].prop1=42;
console.log(arrA);

### The output will be [{prop1: 42},  {someProp: "also value of array A!"}, 3,4,5].
Arrays are object in JS, so both variables arrA and arrB point to the same array. Changing arrB[0] is the same as changing arrA[0]


### 3.
var arrA = [{prop1: "value of array A!!"}, {someProp: "also value of array A!"},3,4,5];
var arrB = arrA.slice();
arrB[0].prop1=42;
arrB[3] = 20;
console.log(arrA,arrB);

### The output will be [{prop1: 42},  {someProp: "also value of array A!"}, 3,4,5].
The slice function copies all the elements of the array returning the new array. However, it doesnt do deep copying. Instead it does shallow copying.
In case of our array arr[0] is an object {prop1: "value of array A!!"}. Only the reference to this object will be copied. This effectively means that arrays arrA and arrB share first two elements.
This is why changing the property of arrB[0] in arrB will also change the arrA[0].


### 5.
(function() {
	console.log(typeof displayFunc);
	var displayFunc = function(){
		console.log("Hi I am inside displayFunc");
	}
}());

### 6.
var employeeId = 'abc123';
function foo(){
	employeeId = '123bcd';
	return;
}
foo();
console.log(employeeId);

### 7.
var employeeId = 'abc123';
function foo() {
	employeeId = '123bcd';
	return;
	function employeeId() {}
}
foo();
console.log(employeeId);

### 8.
var employeeId = 'abc123';
function foo() {
	employeeId();
	return;
	function employeeId() {
		console.log(typeof employeeId,'type');
	}
}
foo();

### 9.
function foo() {
	employeeId();
	var product = 'Car';
	return;
	function employeeId() {
		console.log(product);
	}
}
foo();

### In the given code, the function foo is defined, which has its own scope. Inside the foo function, a variable product is declared and assigned the value 'Car'.
The function employeeId is also defined inside the foo function, and it logs the value of the product variable to the console.
When the foo function is called, the employeeId function is executed immediately, before the product variable is assigned a value. At this point, the product variable has been declared, but not assigned a value, so its value is undefined.
Therefore, the console.log(product) statement inside the employeeId function logs undefined to the console.
The return statement inside the foo function exits the function immediately, so the assignment of the product variable is never executed.

### 10.
(function foo() {
	bar();
	function bar() {
		abc();
		console.log(typeof abc,'abc');
	}
	function abc() {
		console.log(typeof bar,'bar');
	}
}());
```

### 102. What would be the output of following code ?

```js
### 1.
(function() {
	'use strict';

	var person = {
		name: 'John'
	};
	person.salary = '10000$';
	person['country'] = 'USA';

	Object.defineProperty(person, 'phoneNo', {
		value: '8888888888',
		enumerable: true
	})

	console.log(Object.keys(person));
})();


### 2.
(function() {
	'use strict';

	var person = {
		name: 'John'
	};
	person.salary = '10000$';
	person['country'] = 'USA';

	Object.defineProperty(person, 'phoneNo', {
		value: '8888888888',
		enumerable: false
	})

	console.log(Object.keys(person));
})();


### 3.
(function() {
	var objA = {
		foo: 'foo',
		bar: 'bar'
	};
	var objB = {
		foo: 'foo',
		bar: 'bar'
	};
	console.log(objA == objB);
	console.log(objA === objB);
}());
```

### 103. What would be the output of following code ?

```js
### 1.
var obj = {
  message: 'Hello',
  innerMessage: function () {
    (function () {
      console.log(this.message);
    }());
  }
};
console.log(obj.innerMessage()); // undefined

### NOTE :
// The O/p showing "undefined" is due to the way JavaScript handles the this keyword in different contexts.
// In the innerMessage function, this refers to the obj object, so this.message correctly logs 'Hello'.
// However, when you immediately invoke the inner function using the IIFE (Immediately Invoked Function Expression) syntax (),
// the this keyword inside that function no longer refers to the obj object. Instead, it refers to the global object
// (usually the window object in a browser or the global object in a Node.js environment).
// Since the global object does not have a message property, this.message is undefined, which is why youre seeing undefined logged to the console.

// - To fix this, you can use an arrow function instead of a traditional function expression for the inner function.
//   Arrow functions inherit the this context from their surrounding scope, so this will still refer to the obj object:

 const obj = {
  message: 'Hello',
  innerMessage: function () {
      (() => {
       console.log(this.message);
      })();
  }
};
console.log(obj.innerMessage());


//  OR We can do like this :
var obj = {
  message: 'Hello',
  innerMessage: function () {
  	var self = this;
    (function () {
      console.log(self.message);
    }());
  }
};
console.log(obj.innerMessage());


### 2.
function Person(name, age){
	this.name = name || "John";
	this.age = age || 24;
	this.displayName = function(){
		console.log(this.name);
	}
}

Person.name = "John";
Person.displayName = function(){
	console.log(this.name);
}

var person1 = new Person('John');
	person1.displayName();
	Person.displayName();
```

### 104. Implement Retry function.

```js
export function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export async function fetchRetry(url: string, delay: number, tries: number, callback: () => void, handleError?: (error: any) => void) {
  async function onError(err: any) {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      handleError?.(err);
      return;
    }
    await wait(delay);
    return fetchRetry(url, delay, triesLeft, callback, handleError);
  }
  try {
    const response = await fetchPolyfill(api(url));
    const result: { canRoute: boolean } = await response.json();
    if (result.canRoute) {
      callback();
    } else {
      onError("Contact not created in Hubspot CRM");
    }
  } catch (error) {
    onError(error);
  }
}
```

### 105. What would be the output of following code ?

```js
### 1.
(function() {
	var greet = 'Hello World';
	var toGreet = [].filter.call(greet, function(element, index) {
		return index > 5;
	});
	console.log(toGreet);
}());

// filter() is a method that creates a new array with all elements that pass the test implemented by the provided function. However, in this case, it's not being called on an array, but rather on the string greet.
// - call() is a method that calls a function with a given this value and arguments provided individually. In this case, it's being used to call the filter() method on the string greet, rather than on an array.
// - The callback function passed to filter() takes two arguments: element and index. In the context of a string, element will be each character of the string, and index will be the index of that character in the string.

//  In Simple terms :
// var greet = 'Hello World';
// Array.prototype.filter= null
// Array.prototype.filter=function(){
//   console.log(this,'this')
// }
// const res = [].filter.call(greet)



### 2.
(function greetNewCustomer() {
	console.log('Hello ' + this.name);
}.bind({
	name: 'John'
})());


### 3.
function mul(x){
	return function(y){
		return [x*y, function(z){
			return x*y + z;
		}];
	}
}

console.log(mul(2)(3)[0]);
console.log(mul(2)(3)[1](4));


### 4.
function mul(x) {
	return function(y) {
		return {
			result: x * y,
			sum: function(z) {
				return x * y + z;
			}
		};
	};
}
console.log(mul(2)(3).result);
console.log(mul(2)(3).sum(4));

### 5. which option is correct.
const bird = {
  size: 'small',
};

const mouse = {
  name: 'Mickey',
  small: true,
};

// A: mouse.bird.size is not valid
// B: mouse[bird.size] is not valid
// C: mouse[bird["size"]] is not valid

### 6.
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: 'purple' });
console.log(freddie.colorChange('orange'));

// The colorChange function is static. Static methods are designed to live only on the constructor in which they are created,
// and cannot be passed down to any children or called upon class instances. Since freddie is an instance of class Chameleon,
// the function cannot be called upon it. A TypeError is thrown.

### 7.
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person('Lydia', 'Hallie');
Person.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};
console.log(member.getFullName());

// In JavaScript, functions are objects, and therefore, the method getFullName gets added to the constructor function object itself. For that reason,
// we can call Person.getFullName(), but member.getFullName throws a TypeError.
// If you want a method to be available to all object instances, you have to add it to the prototype property:
Person.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

### 8.
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);

### 9.

let number = 0;
console.log(number++);
console.log(++number);
console.log(number);

### 10.
const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);

// ### Object keys are automatically converted into strings. We are trying to set an object as a key to object a, with the value of 123.
// However, when we stringify an object, it becomes "[object Object]". So what we are saying here, is that a["[object Object]"] = 123. Then, we can try to do the same again. c is another object that we are implicitly stringifying. So then, a["[object Object]"] = 456.
// Then, we log a[b], which is actually a["[object Object]"]. We just set that to 456, so it returns 456.

### 11. values which are falsy
a. undefined, b. nullNaN, c. false, d. '' ,e.  (empty string),f.  0, g. -0, h. 0n , i. (BigInt(0))

//  Function constructors, like new Number and new Boolean are truthy. and non-primitive.

### 12.  Everything in JavaScript is either a...
A. primitive or object - "non-primitive"

### 13.
(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x); // 1
  }
  console.log(x); // undefined
  console.log(y); // 2
})();

// ### The catch block receives the argument x. This is not the same x as the variable when we pass arguments. This variable x is block-scoped.
// Later, we set this block-scoped variable equal to 1, and set the value of the variable y. Now, we log the block-scoped variable x, which is equal to 1.
// Outside of the catch block, x is still undefined, and y is 2. When we want to console.log(x) outside of the catch block, it returns undefined, and y returns 2.
// primitive types are passed by values and not by references.
```

### 106. JavaScript Proxies

- In JavaScript, proxies (proxy object) are used to wrap an object and redefine various operations into the object such as reading, insertion, validation, etc. Proxy allows you to add custom behavior to an object or a function.

- A Proxy is a built-in object that allows you to create a custom behavior for fundamental operations on another object (called the target object). Proxies enable you to intercept and define custom behavior for operations such as property lookup, assignment, enumeration, function invocation, etc.

Creating a Proxy Object :-
The syntax of proxy is:

```js
new Proxy(target, handler);
```

Here,

1. new Proxy() - the constructor.
2. target - the object/function which you want to proxy
3. handler - can redefine the custom behavior of the object

- `Proxy handlers`
  A. Proxy provides two handler `methods get()` and `set()`.

1. get() handler : The get() method is used to access the properties of a target object. For example,

```js
Example 1.

let student1 = {
  name: "Jack",
  age: 24,
};

const handler = {
  // get the object key and value
  get(obj, prop) {
    return obj[prop];
  },
};

const proxy = new Proxy(student1, handler);
console.log(proxy.name); // Jack
//  Here, above the get() method takes the object and the property as its parameters.


Example 2 .
const handler = {
  get: function (obj, prop) {
    return obj[prop] ? obj[prop] : "property does not exist";
  },
};

const proxy = new Proxy(student1, handler);
console.log(proxy.name); // Felix
console.log(proxy.age); // 24
console.log(proxy.class); // property does not exist

// Here, the get() method is used to access the objects property value. And if the property is not available in the object, it returns property does not exist.

// As you can see, you can use a proxy to create new operations for the object. A case may arise when you want to check if an object has a particular key and perform an action based on that key. In such cases, proxies can be used.

// You can also pass an empty handler. When an empty handler is passed, the proxy behaves as an original object.

Example 3.

const handler = { };
// passing empty handler
const proxy1 = new Proxy(student1, {});

console.log(proxy1); // Proxy {name: "Jack", age: 24}
console.log(proxy1.name); // Jack
```

2. set() handler : The set() method is used to set the value of an object. For example,

```js
let student = {
  name: "John",
};

let setNewValue = {
  set: function (obj, prop, value) {
    obj[prop] = value;
    return;
  },
};

// setting new proxy
let person = new Proxy(student, setNewValue);

// setting new key/value
person.age = 25;
console.log(person); // Proxy {name: "John", age: 25}

//  Here, a new property age is added to the student object.
```

### Example : Uses of Proxy.

1. For Validation

- You can use a proxy for validation. You can check the value of a key and perform an action based on that value.

```js
let student = {
  name: "Jack",
  age: 24,
};

const handler = {
  // get the object key and value
  get(obj, prop) {
    // check condition
    if (prop == "name") {
      return obj[prop];
    } else {
      return "Not allowed";
    }
  },
};

const proxy = new Proxy(student, handler);
console.log(proxy.name); // Jack
console.log(proxy.age); // Not allowed

//  Here, only the name property of the student object is accessible. Else, it returns Not allowed.
```

2. Read Only View of an Object.

- There may be times when you do not want to let others make changes in an object. In such cases, you can use a proxy to make an object readable only.

```js
let student = {
  name: "Jack",
  age: 23,
};

const handler = {
  set: function (obj, prop, value) {
    if (obj[prop]) {
      // cannot change the student value
      console.log("Read only");
    }
  },
};

const proxy = new Proxy(student, handler);

proxy.name = "John"; // Read only
proxy.age = 33; // Read only

// In the above program, one cannot mutate the object in any way.
// If one tries to mutate the object in any way, you'll only receive a string saying Read Only.
```

3. Side Effects

You can use a proxy to call another function when a condition is met.

```js
const myFunction = () => {
  console.log("execute this function");
};

const handler = {
  set: function (target, prop, value) {
    if (prop === "name" && value === "Jack") {
      // calling another function
      myFunction();
    } else {
      console.log("Can only access name property");
    }
  },
};

const proxy = new Proxy({}, handler);

proxy.name = "Jack"; // execute this function
proxy.age = 33; // Can only access name property
```

4. This example uses Proxy methods to delete properties.

```js
const courseDetail = {
  name: "DSA",
  time: "6 months",
  status: "Ongoing",
};

const handler = {
  get(obj, prop) {
    return obj[prop] ? obj[prop] : "Not Found";
  },

  deleteProperty(target, prop) {

    if (prop in target) {
      delete target[prop];
      console.log(`Removed: ${prop}`);
    }
  },
};

const pro = new Proxy(courseDetail, handler);

console.log(pro.name, pro);
delete pro.name;
console.log(pro.name, pro);

5. Performance Optimization with Virtual Proxy.

- Consider a scenario where we need to load a large dataset. We can use a Virtual Proxy to delay this operation until it’s actually needed:


function loadHeavyData(key) {
  // Load data logic
  return `Data ${key}`
}


const handler = {
  get(target, property) {
    if (!target[property]) {
      console.log(`Loading ${property}`);
      target[property] = loadHeavyData(property); // Assume loadHeavyData is a heavy operation
    }
    return target[property];
  }
}

let heavyDataSet = new Proxy({}, handler);


console.log(heavyDataSet.user); // Logs: Loading user
```
