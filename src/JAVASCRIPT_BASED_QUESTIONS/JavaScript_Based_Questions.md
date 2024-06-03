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

<!-- How to flatten a deeply nested array?
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

### Write a script to fetch top 3 results from Google search. Search this in google engine : last element of string java and get top 3 results.

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
