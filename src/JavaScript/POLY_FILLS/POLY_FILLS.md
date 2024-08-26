### POLY-FILLS

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


```
