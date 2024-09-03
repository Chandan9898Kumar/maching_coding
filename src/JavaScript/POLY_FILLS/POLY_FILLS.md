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

4. - ForEach

```js
//  NOTE : forEach method does not return new array it returns undefined, It simply changes the original array.
const persons = [
  { fName: "john", lName: "Cena", age: 10 },
  { fName: "Randy", lName: "Orton", age: 20 },
  { fName: "Brock", lName: "Lesnar", age: 30 },
  { fName: "Eddy", lName: "Garairo", age: 40 },
];

Array.prototype.forEach = null;

Array.prototype.forEach = function (callback = () => {}) {
  if (!Array.isArray(this)) {
    throw new Error("Should be an array");
  }

  if (typeof callback !== "function") {
    throw new Error("Should be a function");
  }

  let length = this.length;

  for (let x = 0; x < length; x++) {
    let result = callback(this[x], x, this);
    this[x] = result;
  }

  return undefined;
};

const callback = (item, index, array) => {
  item.age = item.age + 10;
  return item;
};

const result = persons.forEach(callback);

console.log(persons, "result", result);
```

5. - polyfills of some method.

```js
let arrayObj = [
  {
    name: "a",
    age: 5,
  },
  {
    name: "b",
    age: 6,
  },
  {
    name: "c",
    age: 1,
  },
  {
    name: "d",
    age: 2,
  },
];

Array.prototype.some = null;
Array.prototype.some = function (callback = () => {}) {
  if (!Array.isArray(this)) {
    throw new Error("This Should be an array.");
  }

  if (typeof callback !== "function") {
    throw new Error("This should be a function");
  }

  let isFalse = false;
  let length = this.length;

  for (let x = 0; x < length; x++) {
    if (callback(this[x], x, this)) {
      return true;
    }
  }

  return isFalse;
};

const callback = (item, index, array) => {
  return item.age > 5;
};

const result = arrayObj.some(callback);

console.log(result, "result >>>>>>>");
```

6. - polyfills of every method.

```js
let arrayObj = [
  {
    name: "a",
    age: 5,
  },
  {
    name: "b",
    age: 6,
  },
  {
    name: "c",
    age: 1,
  },
  {
    name: "d",
    age: 2,
  },
];

Array.prototype.every = function (callback = () => {}) {
  if (!Array.isArray(this)) {
    throw new Error("This should be an array");
  }

  if (typeof callback !== "function") {
    throw new Error("This should be a function");
  }

  let isTrue = true;
  let length = this.length;

  for (let x = 0; x < length; x++) {
    if (!callback(this[x], x, this)) {
      return false;
    }
  }
  return isTrue;
};

const callback = (item, index, arr) => {
  return item.age >= 2;
};
const result = arrayObj.every(callback);
console.log(result, "result >>>>");
```

7. - polyfills of find method.

```js
let arrayObj = [
  {
    name: "a",
    age: 5,
  },
  {
    name: "b",
    age: 6,
  },
  {
    name: "c",
    age: 1,
  },
  {
    name: "d",
    age: 2,
  },
];

Array.prototype.find = null;

Array.prototype.find = function (callback = () => {}) {
  if (!Array.isArray(this)) {
    throw new Error("This should be an array");
  }

  if (typeof callback !== "function") {
    throw new Error("This should be a function ");
  }

  let length = this.length;

  for (let x = 0; x < length; x++) {
    let item = callback(this[x], x, this);
    if (item) {
      return item;
    }
  }

  return undefined;
};

const callback = (item, index, arr) => {
  if (item.age > 1) {
    return item;
  }
};

const result = arrayObj.find(callback);

console.log(result, "result >>>>");
```

8. - polyfills of flat method.

```js
const myArr = [
  [1, 2],
  [3, 4],
  [5, 6, [7, 8]],
];

let flatLength = 2;

Array.prototype.flat = null;

Array.prototype.flat = function (depth = 1) {
  if (!Array.isArray(this)) {
    throw new Error("It should be an array");
  }

  let newArray = [];

  function flatArray(array, depth) {
    for (let x of array) {
      if (Array.isArray(x) && depth) {
        flatArray(x, depth - 1);
      } else {
        newArray.push(x);
      }
    }
  }

  flatArray(this, depth);

  return newArray;
};

const result = myArr.flat(flatLength);
console.log(result, "result >>>>>>>>>>>>>>>>");

//   OR

Array.prototype.flat = function (depth = 1) {
  if (!Array.isArray(this)) {
    throw new Error("It should be an array");
  }

  function flatArray(array, depth) {
    let newArray = [];

    for (let x of array) {
      if (Array.isArray(x) && depth) {
        let flat = flatArray(x, depth - 1);
        newArray.push(...flat);
      } else {
        newArray.push(x);
      }
    }

    return newArray;
  }

  return flatArray(this, depth);
};

const result = myArr.flat(flatLength);
console.log(result, "result >>>>>>>>>>>>>>>>");
```

# 3. Create a polyfill method that transforms array values into upper case: Create a polyfill of upperCase for Array items.

```js
let arrayObj = [
  {
    name: "akon",
    age: 5,
    place: "united",
  },
  {
    name: "becon",
    age: 6,
    place: "kingdom",
  },
  {
    name: "ckon",
    age: 1,
    place: "place",
  },
  {
    name: "dkon",
    age: 2,
    place: "universe",
  },
];

let propertyToUpperCase = "place";

Array.prototype.upperCase = function (propertyToUpperCase = "") {
  if (!Array.isArray(this)) {
    throw new Error("This should be an array");
  }

  let length = this.length;

  const convertUpperCase = (item, propertyToUpperCase) => {
    return { ...item, [propertyToUpperCase]: item[propertyToUpperCase].toUpperCase() };
  };

  for (let x = 0; x < length; x++) {
    this[x] = convertUpperCase(this[x], propertyToUpperCase);
  }

  return this;
};

let result = arrayObj.upperCase(propertyToUpperCase);

console.log(result, "result >>>>", arrayObj);
```

# 4. Polyfill of Objects

1. - polyfills of Object.assign method.

It is a method used to copy the values of all enumerable own properties from one or more source objects to a target object. It performs a shallow copy, meaning that nested objects or arrays are copied by reference rather than creating new instances. The target object is returned after the properties have been assigned to it.

```js
const obj1 = {
  name1: "obj 1",
  Car: "Jaguar",
};

const obj2 = {
  name2: "obj 2",
  place: "Japan",
};

const obj3 = {
  name3: "obj 3",
  country: "UK",
};

// - In this example, we define the Object.assign() polyfill as before, and then we use it to merge three objects: obj1, obj2, and obj3. The resulting object, result, contains all the properties from the three objects, with the properties from obj3 overriding the properties from obj2, and the properties from obj2 overriding the properties from obj1.

// This polyfill checks if Object.myAssign() is not already defined, and if not, it defines it.
if (!Object.myAssign) {
  Object.prototype.myAssign = function (target, ...sources) {
    if (target === null || target === undefined) {
      throw new TypeError("Cannot convert undefined or null to object");
    }

    let newTarget = Object(target);

    sources.forEach((sourceItem) => {
      if (sourceItem !== null && sourceItem !== undefined) {
        for (const item in sourceItem) {
          // For each property, it checks if the property is the object's own property using Object.prototype.hasOwnProperty.call(), and if so, it assigns the property to the target object. Finally, it returns the target object.

          if (Object.prototype.hasOwnProperty.call(sourceItem, item)) {
            newTarget[item] = sourceItem[item];
          }
        }
      }
    });

    return newTarget;
  };
}

let result = Object.myAssign(obj1, obj2, obj3);

console.log(result, "result", obj1);
```

1. - polyfills of Object.create method.

- The Object.create() static method creates a new object, using an existing object as the prototype of the newly created object.

- It is a method used to create a new object with a specified prototype object and optional properties. The newly created object inherits properties from the prototype object. It allows you to establish a prototype chain, where the created object can access properties and methods from its prototype.

```js
// - This polyfill checks if the Object.create() method is not already supported by the browser, and if not, it defines a new function that mimics its behavior. The function takes two arguments: proto, which is the prototype object that the new object should inherit from, and properties, which is an optional object that defines the properties of the new object.

const person = {
  firstName: "John",
  lastName: "Doe",
};



// - The function creates a new function "create" and sets its prototype to the proto object. It then creates a new object called "object" by calling the "create" function with the new keyword. If the properties object is provided, it uses the Object.defineProperties() method to define the properties of the new object.

// Finally, the function returns the new object called "object".

if (!Object.myCreate) {

  Object.prototype.myCreate = function (proto, properties = {}) {
    if (typeof proto !== "object" && typeof proto !== "function") {
      throw new TypeError("Object prototype may only be an Object or null");
    }

    function create() {}

    create.prototype = proto;
    let object = new create();

    if (properties !== undefined) {
      //  The Object.defineProperties() static method defines new or modifies existing properties directly on an object, returning the object.
      Object.defineProperties(object, properties);
    }

    return object;
  };
}

const man = Object.myCreate(person);
man.game = "GTA 6";
console.log(man, "man");

//  OR

const obj = Object.myCreate(person, {
  foo: {
   value: 'bar',
   writable: true,
   enumerable: true,
   configurable: true
  }
});

console.log(obj,'obj',obj.foo)


- NOTE : We have used Object.prototype.myCreate, so it will add myCreate method inside prototype, but if we do like this :
 Object.myCreate then it will add Create method Create method inside Constructor method which is also a correct implementation.
```

# 5. Polyfills of Promises.

1. - polyfills of Promise

```js
function PromiseFunction(executor) {
  console.log(this);
  let onResolve,
    onReject,
    isFullfilled = false, // for resolve()
    isRejected = false, // for reject()
    isCalled = false,
    value;

  function resolve(val) {
    console.log(onResolve, "onResolve");
    // onResolve(val)
    //  onResolve will come undefined.so to handle this we apply condition there,
    //   that whether it is a function or not

    // whenever resolve gets called our promise is fullfilled,so- isFullfilled=true,
    isFullfilled = true;
    value = val;
    if (typeof onResolve === "function") {
      onResolve(val);
      isCalled = true;
      // we used isCalled,to check onResolve() function is called
    }
  }

  function reject(val) {
    isRejected = true;
    value = val;
    if (typeof onReject === "function") {
      onReject(val);
      isCalled = true;
      // we used isCalled,to check onReject() function is called
    }
  }

  this.then = function (callback) {
    console.log("then");
    onResolve = callback;
    // since we have removed setTimeout and directly calling resolve()
    // which is a synchronous operation,and then () is not executing,so
    // to call then() after some time,we use condition,so that we can get value
    // in then() method 's callback function.

    if (isFullfilled && !isCalled) {
      // first it call resolve function,there it set isFullfilled=true
      // we put isCalled=true,so that we can know it is synchronous operation
      isCalled = true;
      //inside resolve function we set value=val,so that value we are using here.
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;

    if (isRejected && !isCalled) {
      // first it call reject function,there it set isRejected=true
      // we put isCalled=true,so that we can know it is synchronous operation
      isCalled = true;
      //inside reject function we set value=val,so that value we are using here.
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

function execute(resolve, reject) {
  console.log("inside");
  resolve(2);

  // we have removed timeout,so it will work as synchronous operation,so
  // .then() will not be executed,hence it will not go inside then()and onResolve will
  // not take callback function from then(),onResolve will just a variable there


  //   setTimeout(()=>{
  //     resolve(2)
  //   },1000)


}

const promiseREsult = new PromiseFunction(execute);
console.log(promiseREsult);

promiseREsult
  .then((res) => {
    console.log(res, "res");
  })
  .catch((err) => {
    console.error(err);
  });
```
