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

const taskList = [createAsyncTask(), createAsyncTask(), createAsyncTask(), createAsyncTask(), createAsyncTask(), createAsyncTask()];

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

```
