### POLY-FILLS :A Script that Updates/Adds new function is called polyfill.

- Polyfill is a Browser fallback. Just Supposed we want to implement bind() method, but older browser doesn't support bind() method. There we have to write our own bind() method.

- Polyfill fills the gap between the browsers for JavaScript.

### 1. Polyfills for Functions. Write polyfills for the call(), apply(), and bind() methods in JavaScript.

- NOTE : The call(), apply() and bind() methods are used for function borrowing in JavaScript. It means that by using them, we can use the methods of one object on a different object without having to make a copy of that method and maintain it in two separate places.

Every function in JavaScript has access to these call(), apply() and bind() methods.

- 1. Polyfills for the call().

```js
const details = {
  FName: "john",
  LNAME: "Cena",
};

function calling(greet, message) {
  return `${greet} ${this.FName} ${this.LNAME} ${message}`;
}

Function.prototype.myCall = function (context = {}, ...vals) {
  if (typeof this !== "function") {
    throw new Error(this + "This is not callable");
  }
  context = context === null || context === undefined ? window : context;

  context = Object(context);

  let symKey = Symbol();

  context[symKey] = this;

  let result = context[symKey](...vals);

  delete context[symKey];

  return result;
};

let r = calling.myCall(details, "hi", "Hope you are doing great");
let t = calling.myCall(details, "hi", "How are you.");

console.log(r, t);

`The above code is a simple polyfill for the call() method. Here context points to the 'details' object and the this keyword points to the calling() function.`;
```

# The only difference between the call() and apply() methods is that the call() method takes arguments separately but the apply() method takes arguments as an array.

- 2. Polyfills for the apply().

```js
const details = {
  FName: "john",
  LNAME: "Cena",
};

function calling(greet, message) {
  return `${greet} ${this.FName} ${this.LNAME} ${message}`;
}

Function.prototype.myApply = function (context = {}, arg = []) {
  if (typeof this !== "function") {
    throw new Error(this + "It is not callable");
  }
  if (!Array.isArray(arg)) {
    throw new Error(`${arg} should be an array `);
  }
  context = context === null || context === undefined ? window : context;

  context = Object(context);

  let symKey = Symbol();
  context[symKey] = this;

  let result = context[symKey](...arg);

  delete context[symKey];
  return result;
};

let result = calling.myApply(details, ["hi", "See you Soon."]);

console.log(result, "result");
```

- 3. Polyfills for the bind().

```js
const details = {
  FName: "john",
  LNAME: "Cena",
};

function calling(greet, message, status, ...rest) {
  this.game = "GTA 6";
  return `${greet} ${this.FName} ${this.LNAME} ${message} and your status is ${status}`;
}

Function.prototype.myBind = function (context = {}, ...args) {
  context = context === null || context === undefined ? window : context;

  if (typeof this !== "function") {
    throw new Error("Not Callable");
  }

  let symKey = Symbol();
  context = Object(context);

  context[symKey] = this;

  return function (...vals) {
    let callbackResult = context[symKey](...args, ...vals);
    delete context[symKey];
    return callbackResult;
  };
};

const callback1 = calling.myBind(details, "Hey", "Hope to see you soon.");
let result1 = callback1("Success");
console.log(result1, "result1");

const callback2 = calling.myBind(details, "Hey There", "Hope to see you soon.");
let result2 = callback2("Full Success");
console.log(result2, "result2");

`NOTE :`; // If we don't delete context[symKey] this,then it will be having two keys of same name however Symbol() always give unique values.
//  we are doing this Just to make object ("details") in its original  state.



A. `BY Using Call Method :`

Function.prototype.myBind = function (context = {}, ...args) {
  context = context === null || context === undefined ? window : context;

  if (typeof this !== "function") {
    throw new Error("Not Callable");
  }

  let symKey = Symbol();
  context = Object(context);

  context[symKey] = this;

  return function (...vals) {
   return context[symKey].call(context,...args, ...vals)
  };
};

const callback1 = calling.myBind(details, "Hey", "Hope to see you soon.");
let result1 = callback1("Success");
console.log(result1, "result1");

const callback2 = calling.myBind(details, "Hey There", "Hope to see you soon.");
let result2 = callback2("Full Success");
console.log(result2, "result2");

B. `BY Using apply Method :`

Function.prototype.myBind = function (context = {}, ...args) {
  context = context === null || context === undefined ? window : context;

  if (typeof this !== "function") {
    throw new Error("Not Callable");
  }

  let symKey = Symbol();
  context = Object(context);

  context[symKey] = this;

  return function (...vals) {
   return context[symKey].apply(context,[...args, ...vals])
  };
};

const callback1 = calling.myBind(details, "Hey", "Hope to see you soon.");
let result1 = callback1("Success");
console.log(result1, "result1");

const callback2 = calling.myBind(details, "Hey There", "Hope to see you soon.");
let result2 = callback2("Full Success");
console.log(result2, "result2");

```

# 2. Polyfills for the Arrays.

1. - Map

```js
const persons = [
  { fName: "john", lName: "Cena", age: 10 },
  { fName: "Randy", lName: "Orton", age: 20 },
  { fName: "Brock", lName: "Lesnar", age: 30 },
  { fName: "Eddy", lName: "Garairo", age: 40 },
];

Array.prototype.myMap = function (callback = () => {}) {
  let newArray = [];
  let length = this.length;

  if (!Array.isArray(this)) {
    throw new Error(this + "This Should be an array.");
  }

  if (typeof callback !== "function") {
    throw new Error(callback + "This Should be a function.");
  }

  for (let x = 0; x < length; x++) {
    let result = callback(this[x], x, this);
    newArray.push(result);
  }

  return newArray;
};

const callbackFunction = (item, index, array) => {
  item.age = item.age + 10;
  return item.age;
};

const result = persons.myMap(callbackFunction);

console.log(result, "result");
```

2. - Filter

```js
const persons = [
  { fName: "john", lName: "Cena", age: 10 },
  { fName: "Randy", lName: "Orton", age: 20 },
  { fName: "Brock", lName: "Lesnar", age: 30 },
  { fName: "Eddy", lName: "Garairo", age: 40 },
];

Array.prototype.myFilter = function (callbackFun) {
  if (!Array.isArray(this)) {
    throw new Error("It should be an array.");
  }

  if (typeof callbackFun !== "function") {
    throw new Error("It should be a function.");
  }

  let newArray = [];
  let length = this.length;

  for (let x = 0; x < length; x++) {
    if (callbackFun(this[x], x, this)) {
      newArray.push(callbackFun(this[x], x, this));
    }
  }

  return newArray;
};

const callback = (item, index, arr) => {
  if (item.age < 40) {
    return item;
  }
};

const result = persons.myFilter(callback);

console.log(result, "result");
```

3. - Reduce

```js
const persons = [
  { fName: "john", lName: "Cena", age: 10 },
  { fName: "Randy", lName: "Orton", age: 20 },
  { fName: "Brock", lName: "Lesnar", age: 30 },
  { fName: "Eddy", lName: "Garairo", age: 40 },
];


A. Without passing second arguments in myReduce()
Array.prototype.myReduce = function (callbackFun, initialValue) {
  let finalResult;

  let startIndex = 0;

  let length = this.length;

  if (arguments.length <= 1) {
    finalResult = this[0];
    startIndex = 1;
  }

  if (arguments.length >= 2) {
    finalResult = initialValue;
  }

  if (!Array.isArray(this)) {
    throw new Error("It Should Be an Array");
  }

  if (typeof callbackFun !== "function") {
    throw new Error("This Should Be A Function.");
  }

  for (let x = startIndex; x < length; x++) {
    finalResult = callbackFun(finalResult, this[x], x, this);
  }

  return finalResult;
};

const callback = (acc, current, index, arr) => {
  acc["age"] = acc["age"] + current.age;

  return acc;
};

let result1 = persons.myReduce(callback);



B. With passing Second Arguments in myReduce()

Array.prototype.myReduce = function (callbackFun, initialValue) {
  let finalResult;

  let startIndex = 0;

  let length = this.length;

  if (arguments.length <= 1) {
    finalResult = this[0];
    startIndex = 1;
  }

  if (arguments.length >= 2) {
    finalResult = initialValue;
  }

  if (!Array.isArray(this)) {
    throw new Error("It Should Be an Array");
  }

  if (typeof callbackFun !== "function") {
    throw new Error("This Should Be A Function.");
  }

  for (let x = startIndex; x < length; x++) {
    finalResult = callbackFun(finalResult, this[x], x, this);
  }

  return finalResult;
};

const callback = (acc, current, index, arr) => {
  acc= acc + current.age;

  return acc;
};

let result2 = persons.myReduce(callback,0);
console.log(result1, "result",result2);
```
