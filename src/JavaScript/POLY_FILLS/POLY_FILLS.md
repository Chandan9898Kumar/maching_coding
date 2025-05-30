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
  // 1. // Will fallback to window if context is null, undefined, 0, '', or false
  // context = context || window;

  // 2. // Most modern and readable approach
  // context = context ?? window;

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

Function.prototype.myApply = function (context = window, arg = []) {
  if (typeof this !== "function") {
    throw new Error(this + "It is not callable");
  }
  if (!Array.isArray(arg)) {
    throw new Error(`${arg} should be an array `);
  }
  context = context ?? window;

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

Function.prototype.myBind = function (context = window, ...args) {
  context = context ?? window;

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

Function.prototype.myBind = function (context = window, ...args) {
  context = context ?? window

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



### 9. polyfills of fill method.

1. The fill() method fills specified elements in an array with a value.
2. The fill() method overwrites the original array.
3. Start and end position can be specified. If not, all elements will be filled.

// Syntax
// array.fill(value, start, end)

const arrays = [1,2,3,4,5,6]
const start = 0
const end = 2

  Array.prototype.myFill = function(item, start, end) {
  if (!Array.isArray(this) || this.length === 0) {
 return [];
  }

  if (arguments.length === 1 || (arguments.length === 2 && typeof start !== 'number')) {
 for (let i = 0; i < this.length; i++) {
 this[i] = item;
 }
  } else if (arguments.length === 2 && typeof start === 'number') {
 for (let i = start; i < this.length; i++) {
 this[i] = item;
 }
  } else if (arguments.length === 3 && typeof start === 'number' && typeof end === 'number') {
 for (let i = start; i < end; i++) {
this[i] = item;
}
  }

  return this;
}


const result = arrays.myFill('o');
console.log(result, 'result', arrays);



### 10. polyfills of Sort method.

// Simple polyfill for sort() method using Bubble Sort
Array.prototype.mySort = function(compareFunction) {
    // Default compare function if none provided
    if (!compareFunction) {
        compareFunction = (a, b) => {
            return String(a) > String(b) ? 1 : -1;
        }
    }

    const length = this.length;

    // Bubble sort
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (compareFunction(this[j], this[j + 1]) > 0) {
                // Swap elements
                [this[j], this[j + 1]] = [this[j + 1], this[j]];
            }
        }
    }

    return this;
};

// Test Cases
// 1. Sorting numbers
const numbers = [5, 2, 8, 1, 9];
console.log("Sorting numbers:");
console.log("Before:", numbers);
console.log("After:", numbers.mySort());
// Output: [1, 2, 5, 8, 9]

// 2. Sorting strings
const fruits = ['banana', 'apple', 'orange'];
console.log("\nSorting strings:");
console.log("Before:", fruits);
console.log("After:", fruits.mySort());
// Output: ['apple', 'banana', 'orange']

// 3. Custom sorting (descending order)
const nums = [1, 5, 2, 4, 3];
console.log("\nCustom sorting (descending):");
console.log("Before:", nums);
console.log("After:", nums.mySort((a, b) => b - a));
// Output: [5, 4, 3, 2, 1]

// 4. Sorting objects by age
const people = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 }
];
console.log("\nSorting objects by age:");
console.log("Before:", people);
console.log("After:", people.mySort((a, b) => a.age - b.age));
// Output: sorted by age (25, 30, 35)




### Polyfills of indexOf

// Array indexOf polyfill
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    // Handle case when array is null/undefined
    if (this === null || this === undefined) {
      throw new TypeError('Cannot read property "indexOf" of null or undefined');
    }

    // Convert this to object
    const array = Object(this);

    // Convert array length to integer
    const length = array.length >>> 0;

    // Return -1 if array is empty
    if (length === 0) {
      return -1;
    }

    // Convert fromIndex to integer
    let fromIndexInt = parseInt(fromIndex) || 0;

    // Handle negative fromIndex
    if (fromIndexInt < 0) {
      fromIndexInt = Math.max(length + fromIndexInt, 0);
    }

    // Search for element
    for (let i = fromIndexInt; i < length; i++) {
      if (i in array && array[i] === searchElement) {
        return i;
      }
    }

    return -1;
  };
}

// Usage Example
const arr = [1, 2, 3, 4, 2, 5];
console.log(arr.indexOf(2));     // 1
console.log(arr.indexOf(2, 2));  // 4
console.log(arr.indexOf(6));     // -1

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

 ### Other Example :

let Animal = {
  isHuman: false,
  sound: "Unspecified",
  makeSound() {
    console.log(this.sound);
  },
};

let properties = {
  isHuman: {
    value: true,
  },
  name: {
    value: "Jack",
    enumerable: true,
    writable: true,
  },
  introduce: {
    value: function () {
      console.log(`Hey! I am ${this.name}.`);
    },
  },
};

human = Object.create(Animal, properties);
console.log(human,'human',Animal)
```

### 5. Polyfills of Strings

1. polyfills of indexOf

```js
// String indexOf polyfill
if (!String.prototype.indexOf) {
  String.prototype.indexOf = function (searchValue, fromIndex) {
    // Handle null/undefined string
    if (this === null || this === undefined) {
      throw new TypeError('Cannot read property "indexOf" of null or undefined');
    }

    // Convert this to string
    const string = String(this);

    // Convert searchValue to string
    const searchString = String(searchValue);

    const stringLength = string.length;
    const searchLength = searchString.length;

    // Convert fromIndex to integer
    let fromIndexInt = parseInt(fromIndex) || 0;

    // Handle negative fromIndex
    if (fromIndexInt < 0) {
      fromIndexInt = 0;
    }

    // Search for string
    for (let i = fromIndexInt; i <= stringLength - searchLength; i++) {
      let found = true;

      for (let j = 0; j < searchLength; j++) {
        if (string[i + j] !== searchString[j]) {
          found = false;
          break;
        }
      }

      if (found) {
        return i;
      }
    }

    return -1;
  };
}

// Usage Example
const str = "Hello World";
console.log(str.indexOf("World")); // 6
console.log(str.indexOf("world")); // -1
console.log(str.indexOf("o", 5)); // 7
```

# 6. Polyfills of Promises.

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

2. - Polyfill of Promise.all()

` In practice, the Promise.all() is useful to aggregate the results from multiple asynchronous operations.`

- NOTE : Promise is an object and all() is a function.

```js
`Method 1. Here we using above promise method which is build from scratch.`;

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 1 * 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(20);
  }, 6 * 1000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(30);
  }, 3 * 1000);
});

function p4() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(40);
    }, 4 * 1000);
  });
}

function p5() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(50);
    }, 5 * 1000);
  });
}

function PromiseFunction(executorFunction, arrayOfPromises) {
  let onResolve,
    onReject,
    isFullFilled = false,
    isRejected = false,
    isCalled = false,
    value;

  const resolve = (data) => {
    isFullFilled = true;
    value = data;

    if (typeof onResolve === "function") {
      onResolve(data);
      isCalled = true;
    }
  };

  const reject = (data) => {
    isRejected = true;
    value = data;

    //  Here we have to use isCalled condition because reject function was calling two times and return two rejected promise values one after other.
    //  As Promise.all() rejected promise as soon as any the of the promise get rejected and returns the first rejected promise and stop the process.
    if (typeof onReject === "function" && !isCalled) {
      onReject(data);
      isCalled = true;
    }
  };

  this.then = function (callback) {
    onResolve = callback;

    if (isFullFilled && !isCalled) {
      onResolve(value);
      isCalled = false;
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;
    if (isRejected && !isCalled) {
      onReject(value);
      isCalled = true;
    }
    return this;
  };

  try {
    executorFunction(resolve, reject, arrayOfPromises);
  } catch (error) {
    reject(error);
  }
}

// The below code defines a function `executorResolved` that takes three parameters: `resolve`,
// `reject`, and `arrayOfPromises`. The function iterates over the `arrayOfPromises`, resolving each
// promise and storing the result in an array. Once all promises have been resolved, the function
// resolves with the array of results. If any promise is rejected, the function will reject with the
// error.
const executorResolved = (resolve, reject, arrayOfPromises) => {
  let result = [];
  let pending = arrayOfPromises.length;

  if (!arrayOfPromises.length) {
    resolve(result);
  }

  arrayOfPromises.forEach((items, index) => {
    items
      .then((response) => {
        result[index] = response;
        pending--;
        if (!pending) {
          resolve(result);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// The below code is attempting to create a custom implementation of `Promise.all()` method in
// JavaScript. It defines a function `PromiseAll` that takes an array of promises as an argument.
// Inside `PromiseAll`, it creates a new Promise object using a custom `PromiseFunction` constructor
// with an executor function `executorResolved` and the array of promises passed as an argument.

Promise.PromiseAll = function (arrayOfPromises) {
  return new PromiseFunction(executorResolved, arrayOfPromises);
};

Promise.PromiseAll([p1, p2, p3, p4(), p5()])
  .then((result) => {
    console.log(result, "result final >>>>>>>>>>>>>>");
  })
  .catch((error) => {
    console.log(error, "error >>>>>>>>>>>>>>>");
  });

`Method 2. Here we simply using new Promise() method instead of creating a promise from scratch just like Above` It is More Optimized;

Promise.PromiseAll = function (arrayOfPromises) {
  return new Promise((resolve, reject) => {
    // when promise get resolved then it gives output in an Array.
    let result = [];

    // now if we pass an empty array,then it should give that array as an output so we used condition
    if (!arrayOfPromises.length) {
      resolve(result);
    }

    let pending = arrayOfPromises.length;

    // arrayOfPromises.forEach((items, ind) => {
    //   Promise.resolve(items)
    //     .then((response) => {
    //       // data coming from response,after resolved,we are pushing it to
    //       // result,so that we can get all resolved promise in an array.
    //       result[ind] = response;
    //       pending--;
    //       if (pending === 0) {
    //         resolve(result);
    //       }
    //     })
    //     .catch((err) => {
    //       reject(err);
    //     });

    //  OR

    arrayOfPromises.forEach((items, index) => {
      items
        .then((response) => {
          // data coming from response,after resolved,we are pushing it to
          // result,so that we can get all resolved promise in an array.
          result[index] = response;
          pending--;
          if (!pending) {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

Promise.PromiseAll([p1, p2, p3, p4(), p5()])
  .then((result) => {
    console.log(result, "result >>>>>>>>>>>>>>");
  })
  .catch((error) => {
    console.log(error, "error >>>>>>>>>>>>>>>");
  });



### Method 3. By Recursively calling the method.

Promise.PromiseAll = function (arrayOfPromises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let pending = arrayOfPromises.length;
    let index =0

    async function callback(){

        try{
          let response = await arrayOfPromises[index]
          result.push(response)
          index++

          if(result.length===pending){
            resolve(result)
            return
          }

          if(index<pending){
            callback()
          }

        }catch(error){
          reject(error)
          return
        }
    }

    callback()
  })
}

Promise.PromiseAll([p1, p2, p3, p4(), p5()])
  .then((result) => {
    console.log(result, "result >>>>>>>>>>>>>>");
  })
  .catch((error) => {
    console.log(error, "error >>>>>>>>>>>>>>>");
  });
```

3. - Polyfill of Promise.allSettled()

- ES2020 introduced the Promise.allSettled() method that accepts a list of Promises and returns a new promise that resolves after all the input promises have settled, either resolved or rejected.

- The Promise.allSettled() method accepts an iterable of promises and returns a new promise that resolves when every input promise has settled with an array of objects that describes the result of each promise in the iterable object.

The Promise.allSettled() method returns a promise that resolves to an array of objects that each describes the result of the input promise.

`Each object has two properties: status and value (or reason).`

1. The status can be either fulfilled or rejected.
2. The value if case the promise is fulfilled or reason if the promise is rejected.

`NOTE :` It Returns resolve and reject promise together in then method. Here catch method is not being called.

```js


const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10);
    }, 5 * 1000);

});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(20);
    }, 2 * 1000);
});

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(30);
    }, 12 * 1000);

});

const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(40);
    }, 7 * 1000);
});




# Method 1.

Promise.AllSettled = function(arrayOfPromise){

  return new Promise((resolve,reject)=>{

    let newArray = []

    if(Array.isArray(arrayOfPromise) && !arrayOfPromise.length){
      resolve(newArray)
    }

    if(!Array.isArray(arrayOfPromise)){
      throw new Error(`${typeof arrayOfPromise} is not iterable.`)
    }

    let pendingStatus = arrayOfPromise.length


    arrayOfPromise.forEach((promiseItem,index)=>{

      promiseItem.then((response)=>{

         newArray[index] = {status:"fulfilled",value:response}
         pendingStatus --

         if(!pendingStatus){
           resolve(newArray)
         }


      }).catch((error)=>{
        pendingStatus --
        newArray[index] = {status:"rejected",reason:error}
         if(!pendingStatus){
           resolve(newArray)
         }
      })


    })

  })

}

const promiseOutcome = Promise.AllSettled([p1,p2,p3,p4])
promiseOutcome.then((result)=>{
  console.log(result,'result >>>>>>>>>>>>>>>>>>>')
})


## Method 2. Here we have first built promise from scratch then used it for Promise.AllSettled.



const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {

        resolve(10);
    }, 5 * 1000);

});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {

        reject(20);
    }, 2 * 1000);
});

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {

        resolve(30);
    }, 12 * 1000);

});

const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {

        reject(40);
    }, 7 * 1000);
});


function PromiseNormal(executorFunction,arrayOfPromise){

    let onResolve,
        onReject,
        isFullFilled = false,
        isRejected = false,
        isCalled = false,
        value



      const resolve=(data)=>{
        isFullFilled = true
        value = data

        if(typeof onResolve === 'function'){
          isCalled = true
          onResolve(data)
        }
      }

      const reject =(data)=>{
        isRejected = true
        value = data

        if(typeof onReject==='function'){
          isCalled = true
          onReject(data)
        }

      }


      this.then=function(callback){

        onResolve = callback

        if(isFullFilled && !isCalled){
          onResolve(value)
          isCalled = true
        }

        return this

      }


       this.catch=function(callback){
         onReject = callback
         if(isRejected && !isCalled){
           callback(value)
           isCalled = true
         }
        return this
      }

      this.finally= function(){

      }



     try{
       executorFunction(resolve,reject,arrayOfPromise)
     }catch(error){
       reject(error)
     }




}

const executor=(resolve,reject,arrayOfPromise)=>{

    let newArray = []

    if(Array.isArray(arrayOfPromise) && !arrayOfPromise.length){
      resolve(newArray)
    }

    let pendingStatus = arrayOfPromise.length


    arrayOfPromise.forEach((promiseItem,index)=>{

      promiseItem.then((response)=>{

         newArray[index] = {status:"fulfilled",value:response}
         pendingStatus --

         if(!pendingStatus){
           resolve(newArray)
         }


      }).catch((error)=>{
        pendingStatus --
        newArray[index] = {status:"rejected",reason:error}
         if(!pendingStatus){
           resolve(newArray)
         }
      })


    })


}



Promise.AllSettled = function(arrayOfPromise){

  if(!Array.isArray(arrayOfPromise)){
      throw new Error(`${typeof arrayOfPromise} is not iterable.`)
    }

  return  new PromiseNormal(executor,arrayOfPromise)
}


const promiseOutcome = Promise.AllSettled([p1,p2,p3,p4])

promiseOutcome.then((result)=>{
  console.log(result,'result >>>>>>>>>>>>>>>>>>>')
})


```

4. - Polyfill of Promise.any()

The Promise.any() method accepts a list of Promise objects as an iterable object:

`Syntax`
Promise.any(iterable)

If one of the promises in the iterable object is fulfilled, the Promise.any() returns a single promise that resolves to a value which is the result of the fulfilled promise:

In practice, you use the Promise.any() to return the first fulfilled promise. Once a promise is fulfilled, the Promise.any() method does not wait for other promises to be complete. In other words, the Promise.any() short circuits after a promise is fulfilled.

The Promise.any() return rejected promises when all the promises gets failed. If any of the promise gets resolved, then it will returned the first resolved promise.

```js

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10);
    }, 5 * 1000);

});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(20);
    }, 12 * 1000);
});

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(30);
    }, 3 * 1000);

});

const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(40);
    }, 7 * 1000);
});


## Method 1.

Promise.PromiseAny= function(arrayOfPromises){

  return new Promise((resolve,reject)=>{

    let newArray = []

     if(!Array.isArray(arrayOfPromises)){
      throw new Error(`${typeof arrayOfPromises} is not iterable.`)
    }


      if(!arrayOfPromises.length){
        resolve([])
      }

      let pendingStatus = arrayOfPromises.length

      arrayOfPromises.forEach((item,index)=>{
        item.then((response)=>{
          resolve(response)
        }).catch((error)=>{
          newArray[index] = error
          pendingStatus --

          if(!pendingStatus){
            reject(newArray)
          }
        })

      })

      //  Below code is best approach. Because it faster.

      // for(let items=0;items<arrayOfPromises.length;items++){
      //   arrayOfPromises[items].then((response)=>{
      //     resolve(response)
      //     return
      //   }).catch((error)=>{
      //     newArray[items] = error
      //     pendingStatus --

      //     if(!pendingStatus){
      //       reject(newArray)
      //     }

      //   })
      // }

  })

}

const promiseResult = Promise.PromiseAny([p1,p2,p3,p4])

promiseResult.then((result)=>{
  console.log(result,'result >>>>>>>>>>>>>>')
}).catch((error)=>{
  console.log(error,'error >>>>>>>>>>>>>')
})



## Method 2. Writing promise from scratch first then integrate it on Promise.PromiseAny()


function NormalPromise(executorFunction,arrayOfPromises){

  let onResolve,
      onReject,
      isFullFilled = false,
      isRejected = false,
      isCalled = false,
      value



    const resolve=(data)=>{
      isFullFilled = true
      value = data

      //  Here we have to use isCalled condition because resolve function was calling two times and return two promises value .
      //  As Promise.any() method return first  resolved promise So, resolved method should only run one time when any of the promises gets resolved.
      if(typeof onResolve ==='function' && !isCalled){
        onResolve(data)
        isCalled = true
      }
    }


    const reject=(data)=>{
      isRejected = true
      value = data

      if(typeof onReject ==='function'){
        onReject(data)
        isCalled = true
      }

    }


    this.then= function(callback){
      onResolve = callback
      if(isFullFilled && !isCalled){
        callback(value)
        isCalled = true
      }
      return this
    }


    this.catch= function(callback){
      onReject = callback
      if(isRejected && !isCalled){
        callback(value)
        isCalled = true
      }
      return this
    }

    try{
      executorFunction(resolve,reject,arrayOfPromises)
    }catch(error){
      reject(error)
    }

}


const executor=(resolve,reject,arrayOfPromises)=>{

   let newArray = []

      if(!arrayOfPromises.length){
        resolve([])
      }

      let pendingStatus = arrayOfPromises.length

      arrayOfPromises.forEach((item,index)=>{

        item.then((response)=>{
          resolve(response)
        }).catch((error)=>{

          newArray[index] = error
          pendingStatus --

          if(!pendingStatus){
            reject(newArray)
          }


        })
      })
}


Promise.PromiseAny= function(arrayOfPromises){

   if(!Array.isArray(arrayOfPromises)){
      throw new Error(`${typeof arrayOfPromises} is not iterable.`)
    }

 return new NormalPromise(executor,arrayOfPromises)

}

const promiseResult = Promise.PromiseAny([p1,p2,p3,p4])

promiseResult.then((result)=>{
  console.log(result,'result >>>>>>>>>>>>>>')
}).catch((error)=>{
  console.log(error,'error >>>>>>>>>>>>>')
})


```

5. - Polyfill of Promise.race()

The Promise.race() static method accepts a list of promises as an iterable object and returns a new promise that fulfills or rejects as soon as there is one promise that fulfills or rejects, with the value or reason from that promise.

```js

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(10);
    }, 5 * 1000);

});

const p2 = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve(20);
    }, 4 * 1000);

});

const p3 = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve(30);
    }, 2 * 1000);

});

const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(40);
    }, 1 * 1000);
});



## Method 1.

Promise.PromiseRace = function(arrayOfPromises){

  return new Promise((resolve,reject)=>{


     if(!Array.isArray(arrayOfPromises)){
      throw new Error(`${typeof arrayOfPromises} is not iterable.`)
    }


    if(!arrayOfPromises.length){
        resolve([])
      }

    let promiseLength = arrayOfPromises.length

    for(let item = 0;item<promiseLength;item++){
      arrayOfPromises[item].then((response)=>{
        resolve(response)
      }).catch((error)=>{
        reject(error)
      })

    }


  })


}

const promiseResult = Promise.PromiseRace([p1,p2,p3,p4])

promiseResult.then((result)=>{
  console.log(result,'result')
}).catch((error)=>{
  console.log(error,'error')
})


## Method 2.  By creating promise from scratch and integrated it in Promise.PromiseRace() method.

function NormalPromise(executorFunction,arrayOfPromises){

  let onResolve,
      onReject,
      isFullFilled = false,
      isRejected = false,
      isCalled = false,
      value



    const resolve=(data)=>{
      isFullFilled = true
      value = data

      //  Here we have to use isCalled condition because resolve function was calling two times and return two promises value .
      //  As Promise.race() method return either first resolved or rejected promise So, resolved method should only run one time when any of the promises gets resolved.
      if(typeof onResolve ==='function' && !isCalled){

        onResolve(data)
        isCalled = true
      }
    }


    const reject=(data)=>{
      isRejected = true
      value = data

      //  Here we have to use isCalled condition because resolve function was calling two times and return two promises value .
      //  As Promise.race() method return either first resolved or rejected promise So, reject method should only run one time when any of the promises gets rejected.
      if(typeof onReject ==='function' && !isCalled){

        onReject(data)
        isCalled = true
      }

    }


    this.then= function(callback){
      onResolve = callback

      if(isFullFilled && !isCalled){

        callback(value)
        isCalled = true
      }
      return this
    }


    this.catch= function(callback){
      onReject = callback

      if(isRejected && !isCalled){
        callback(value)

        isCalled = true
      }
      return this
    }

    try{
      executorFunction(resolve,reject,arrayOfPromises)
    }catch(error){
      reject(error)
    }

}


const executor=(resolve,reject,arrayOfPromises)=>{


    if(!arrayOfPromises.length){
        resolve([])
      }

    let promiseLength = arrayOfPromises.length

    for(let item = 0;item<promiseLength;item++){
      arrayOfPromises[item].then((response)=>{
        resolve(response)
      }).catch((error)=>{
        reject(error)
      })

    }
}


Promise.PromiseRace = function(arrayOfPromises){

   if(!Array.isArray(arrayOfPromises)){
      throw new Error(`${typeof arrayOfPromises} is not iterable.`)
    }


  return new NormalPromise(executor,arrayOfPromises)

}

const promiseResult = Promise.PromiseRace([p1,p2,p3,p4])


promiseResult.then((result)=>{
  console.log(result,'result >>>>>>>')
}).catch((error)=>{
  console.error(error,'error >>>>>>>>>>>>>>>>>>')
})



```

## 6. Polyfills of setTimeout() .

```js
function createSetTimeoutPolyfill() {
  let intervalId = 1;
  let intervalMap = {};

  function callSetTimeout(callback, delay = 0, ...args) {
     if (typeof callback !== "function") throw new TypeError('"callback" must be a function');

    let id = intervalId++;
    intervalMap[id] = true;

    let start = Date.now() + delay;
    function triggerCallback() {
      if (!intervalMap[id]) {
        return;
      }

      if (Date.now() > start &&  intervalMap[id];) {
        callback.apply(this, args);
        delete intervalMap[id]
        return
      } else {
       // This recursive call is crucial!
       // It schedules the next check
         requestIdleCallback(triggerCallback, { timeout: 100 }); // Minimum 100ms delay between recursive calls which help to tackle stack overflow.
         // requestIdleCallback makes triggerCallback function keep getting called. This creates separate calls in different animation frames.
         // Execution happens like:
        // Frame 1: triggerCallback()
        // Frame 2: triggerCallback()
        // Frame 3: triggerCallback()
        // Each in its own clean stack
        // Cleans up between frames

        // NOTE: If we called triggerCallback() directly, then This creates an infinite loop in the same call stack and  Will cause stack overflow.
        // Also : It Keeps all previous calls in memory.
      }
    }

    requestIdleCallback(triggerCallback, { timeout: 100 });

    return id;
  }

  function clearSetTimeout(id) {
    delete intervalMap[id];
  }

  return { callSetTimeout, clearSetTimeout };
}

const callbackFunction = (response) => {
  console.log(response, "response");
};

const delay = 5000;

const data = "Hi, How are you";

const { callSetTimeout, clearSetTimeout } = createSetTimeoutPolyfill();

console.log("start");
const id = callSetTimeout(callbackFunction, delay, data);
console.log("stop");

// setTimeout(()=>{
//   clearSetTimeout(id)
// },2000)

- NOTE : Above we used requestIdleCallback just to make setTimeout behaves as Asynchronous.

Window: requestIdleCallback() method :

The window.requestIdleCallback() method queues a function to be called during a browsers idle periods.
This enables developers to perform background and low priority work on the main event loop, without impacting latency-critical events such as animation and input response.
Functions are generally called in first-in-first-out order; however, callbacks which have a timeout specified may be called out-of-order if necessary in order to run them
before the timeout elapses.
You can call requestIdleCallback() within an idle callback function to schedule another callback to take place no sooner than the next pass through the event loop.

Syntax :

`requestIdleCallback(callback)`

`Parameters`
1. callback
A reference to a function that should be called in the near future, when the event loop is idle. The callback function is passed an IdleDeadline object
describing the amount of time available and whether or not the callback has been run because the timeout period expired.

```

NOTE : `Using requestIdleCallback for a setTimeout polyfill isn't ideal.`

Here's why:

1. `Timing Accuracy` : requestIdleCallback is designed for low-priority background tasks and executes during idle periods. This means it doesn't guarantee precise timing that setTimeout should provide. [1]

2. `Execution Priority` : setTimeout tasks should execute as soon as possible after their delay, while requestIdleCallback intentionally waits for idle periods.

# Here's a better implementation using requestAnimationFrame which is more suitable for timing-sensitive operations:

```js
function createSetTimeoutPolyfill() {
  let intervalId = 1;
  let intervalMap = {};

  function callSetTimeout(callback, delay = 0, ...args) {
    if (typeof callback !== "function") {
      throw new TypeError('"callback" must be a function');
    }

    let id = intervalId++;
    intervalMap[id] = true;
    const start = Date.now() + delay;

    function triggerCallback() {
      if (!intervalMap[id]) {
        return;
      }

      if (Date.now() >= start) {
        callback.apply(this, args);
        delete intervalMap[id];
        return;
      }

      // Use requestAnimationFrame for more precise timing
      requestAnimationFrame(triggerCallback); // Creates a fresh stack for each frame
    }

    requestAnimationFrame(triggerCallback);
    return id;
  }

  function clearSetTimeout(id) {
    delete intervalMap[id];
  }

  return { callSetTimeout, clearSetTimeout };
}

// Usage example
const { callSetTimeout, clearSetTimeout } = createSetTimeoutPolyfill();

const callbackFunction = (response) => {
  console.log(response, "response");
};

// Test it
const timeoutId = callSetTimeout(callbackFunction, 5000, "Hi, How are you");

// Benefits of using requestAnimationFrame:

// Better Timing : It runs at ~60fps (approximately every 16.7ms), providing more accurate timing than requestIdleCallback

// Proper Priority : It's designed for timing-sensitive operations, similar to how real setTimeout works

// Performance : It's optimized for animations and timing operations, making it more suitable for this use case
```

`However, for a setTimeout polyfill, requestAnimationFrame remains the better choice as it more closely matches the expected behavior of the native setTimeout.`

## 7. Polyfills of setInterval() .

```js
function createSetIntervalPolyfill() {
  let intervalId = 0;
  let intervalMap = {};

  function setIntervalPolyfill(func, delay = 0, ...args) {
    if (typeof func !== "function") throw new TypeError('"callback" must be a function');

    let uniqueId = intervalId++;

    function repeat() {
      intervalMap[uniqueId] = setTimeout(() => {
        func.apply(this, args);
        //  OR
        // func(...args);

        // terminating condition
        if (intervalMap[uniqueId]) {
          repeat();
        }
      }, delay);
    }
    repeat();
    return uniqueId;
  }

  //  NOTE : Here in clearIntervalPolyfill we are clearing the time interval and delete the interval. But this clearTimeout is not working . it is not stopping the timer.
  // But it works Because we are deleting the intervalMap here and checking if condition in setTimeout. if you comment this delete keyword then you will
  // see that clearTimeout is not stopping the timer.Ideally timer should be stopped and we don't need if condition in timer and not have to use delete keyword here.
  // The issue lies in the fact that clearTimeout is not able to stop the setTimeout because the setTimeout is being called recursively in the repeat function. When clearTimeout is called, it only clears the current timeout, but the recursive call to repeat has already been scheduled, so it will still be executed.
  //  We can use setTimeout like this as well to make this work  and remove this if condition from repeat function above:
  //  More explanation is given  at bottom of this code :

  //   function clearIntervalPolyfill(intervalId) {
  //   setTimeout(()=>{
  //     clearTimeout(intervalMap[intervalId]);
  //   })
  // }

  function clearIntervalPolyfill(intervalId) {
    clearTimeout(intervalMap[intervalId]);
    delete intervalMap[intervalId];
  }

  return {
    setIntervalPolyfill,
    clearIntervalPolyfill,
  };
}

const { setIntervalPolyfill, clearIntervalPolyfill } = createSetIntervalPolyfill();

const intervalId = setIntervalPolyfill(greet, 1000, "Hello Man");

var counter = 0;
function greet(name) {
  counter++;
  console.log(`Hello ${name}`);
  //  Here when counter is greater than equal to 3 then stop the timer.
  if (counter >= 3) {
    clearIntervalPolyfill(intervalId);
  }
}

/*
setTimeout(()=>{
  clearIntervalPolyfill(intervalId)
}, 3000) */


### HERE is complete explanation of (above NOTE) why using setTimeout inside clearIntervalPolyfill function works and stop the timer but when removing it ,not working .
// 1. The reason why using setTimeout inside clearIntervalPolyfill function works and stops the timer, but removing it doesn't work, is due to the way the JavaScript event loop works.

// 2. When you call clearIntervalPolyfill, it doesn't immediately clear the timeout. Instead, it schedules a new task to clear the timeout after a short delay (in this case, 0 milliseconds). This is because setTimeout is an asynchronous function that schedules a task to be executed after a certain delay.

// 3. When you remove the setTimeout call from clearIntervalPolyfill, the clearTimeout call is executed immediately, but it's too late. The recursive call to repeat has already been scheduled, and it will still be executed, even though the interval has been cleared.

// 4. By using setTimeout inside clearIntervalPolyfill, you're essentially scheduling the clearTimeout call to be executed after the current task has finished executing. This ensures that the recursive call to repeat is not scheduled again, and the interval is effectively cleared.


### To illustrate this, heres a simplified example:

// - 1. In this example, the repeat function is called recursively every 1 second. When clearIntervalPolyfill is called, it schedules a new task to clear the timeout after a short delay. This ensures that the recursive call to repeat is not scheduled again, and the interval is effectively cleared.

// If you remove the setTimeout call from clearIntervalPolyfill, the clearTimeout call is executed immediately, but its too late. The recursive call to repeat has already been scheduled, and it will still be executed, even though the interval has been cleared.

function repeat() {
  console.log('Repeat');
  setTimeout(repeat, 1000);
}

function clearIntervalPolyfill() {
  setTimeout(() => {
   clearTimeout(repeat);
  });
}

repeat();
clearIntervalPolyfill();


// - 2. In this case, the clearTimeout call is executed immediately, but it doesn't prevent the recursive call to repeat from being scheduled again. The interval is not effectively cleared.
let timeoutId;

function repeat() {
  console.log('Repeat');
  timeoutId = setTimeout(repeat, 1000);
}

function clearIntervalPolyfill() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(repeat, 1000); // Try to schedule another timeout with the same ID
}

repeat();
clearIntervalPolyfill();


```

### 8. HERE Below we have used setTimeout polyfill in the setInterval polyfill.

```js
//   //  Set the Timeout

function createSetTimeoutPolyfill() {
  let intervalId = 1;
  let intervalMap = {};

  function callSetTimeout(callback, delay = 0, ...args) {
    let id = intervalId;
    intervalMap[intervalId] = true;

    let start = Date.now() + delay;
    function triggerCallback() {
      if (!intervalMap[id]) {
        return;
      }

      if (Date.now() > start) {
        callback.apply(this, args);
      } else {
        requestIdleCallback(triggerCallback);
      }
    }

    requestIdleCallback(triggerCallback);

    return id;
  }

  function clearSetTimeout(id) {
    delete intervalMap[id];
  }

  return { callSetTimeout, clearSetTimeout };
}

//  Set the interval

function createSetIntervalPolyfill() {
  let intervalId = 1;
  let intervalMap = {};

  const { callSetTimeout, clearSetTimeout } = createSetTimeoutPolyfill();

  function setIntervalPolyfill(func, delay = 0, ...args) {
    if (typeof func !== "function") throw new TypeError('"callback" must be a function');

    let uniqueId = intervalId++;

    function repeat() {
      let timer = callSetTimeout(() => {
        func.apply(this, args);
        if (intervalMap[uniqueId]) {
          repeat();
        }
      }, delay);

      intervalMap[uniqueId] = timer;
    }

    repeat();
    return uniqueId;
  }

  function clearIntervalPolyfill(intervalId) {
    clearSetTimeout(intervalId);
    delete intervalMap[intervalId];
  }

  return {
    setIntervalPolyfill,
    clearIntervalPolyfill,
  };
}

const { setIntervalPolyfill, clearIntervalPolyfill } = createSetIntervalPolyfill();

const intervalId = setIntervalPolyfill(greet, 5000, "Hello Man");

var counter = 0;
function greet(name) {
  counter++;
  console.log(`Hello ${name}`), intervalId;
  if (counter >= 3) {
    clearIntervalPolyfill(intervalId);
  }
}
```

### 9. Deferred Promises in JavaScript .

1. A Deferred Promise acts as a bridge between the promise and its eventual resolution. It allows you to control when a promise is resolved or rejected, giving you greater flexibility in handling asynchronous operations.

2. This pattern is particularly useful when you need to coordinate multiple asynchronous tasks or when the resolution of a promise depends on external factors. By using deferred promises, you can separate the logic of producing a value from the promise itself, leading to cleaner and more maintainable code.

`Key Points:`

1. Promise vs. Deferred: A promise represents a value that may not be available yet, while a deferred object allows you to manage that promise’s resolution or rejection explicitly.

2. Use Cases: This pattern is particularly useful in complex applications where you need to coordinate multiple asynchronous tasks or manage their outcomes more effectively.

3. Built-in Support: With the ECMAScript 2024 Promise.withResolvers(), implementing this pattern will become even simpler, reducing boilerplate code and improving readability.

- Promise.withResolvers()

A. The Promise.withResolvers() static method returns an object containing a new Promise object and two functions to resolve or reject it, corresponding to the two parameters passed to the executor of the Promise() constructor.

Syntax :

Promise.withResolvers()

Return value
A plain object containing the following properties:

1. `promise`
   A Promise object.

2. `resolve`
   A function that resolves the promise. For its semantics, see the Promise() constructor reference.

3. `reject`
   A function that rejects the promise. For its semantics, see the Promise() constructor reference.

### Description

Promise.withResolvers() is exactly equivalent to the following code:

```js
let resolve, reject;
const promise = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});
```

`NOTE :  We’ll be implementing this pattern from scratch instead of using Promise.withResolvers()`

- Demystifying this pattern with a real life example:

Let’s assume we are building a game using JavaScript where the outcomes are influenced by multiple, unpredictable events such as win or loose.

Suppose we want to create a promise which resolves when we click on the button.

`Traditional Approach:`
Typically, we might set up an event listener inside a promise executor.

```js
<button id="win-button">Win</button>
<button id="loose-button">Loose</button>
<script>
    function winButtonClickHandler() {
        return new Promise((resolve) => {
            document
            .getElementById("win-button")
            .addEventListener("click", () => {
                resolve("You won! 🎉");
            });
        });
    }
    function looseButtonClickHandler() {
        return new Promise((_resolve, reject) => {
            document
            .getElementById("loose-button")
            .addEventListener("click", () => {
                reject("You loose 😔");
            });
        });
    }
    winButtonClickHandler().then((message) => {
        alert(message);
    });
    looseButtonClickHandler().catch((message) => {
        alert(message);
    });
</script>


- This traditional approach encapsulates the promise creation and event handling logic within a single function. This can be restrictive if multiple conditions or different parts of your code need to resolve or reject the promise.
```

### New Approach using Deferred Promise:

```js
# Interface for creating Deferred Promise:


const createDeferredExecution = () => {
    let resolve, reject;
    const promise = new Promise((res,rej) => {
        resolve = res;
        reject = rej;
    });
    return {
        promise,
        resolve,
        reject
    }
};

## Now Using it in code.

<button id="win-button">Win</button>
<button id="loose-button">Loose</button>
<script>
    const { promise, resolve, reject } = createDeferredExecution();

    document.getElementById("win-button").addEventListener("click", () => {
        resolve("You won! 🎉");
    });
    document.getElementById("loose-button").addEventListener("click", () => {
        reject("You loose 😔");
    });

    promise
        .then((message) => alert(message))
        .catch((message) => alert(message));
</script>



### Why deferred approach is optimal ?
1. Decoupling Event Handling: It allows separate definition of resolution mechanisms from the event monitoring, improving code organization and management of complex conditions.
2. Reusable Logic: The resolve and reject functions can be reused across different game scenarios, enabling flexible handling of various outcomes like winning or losing.
3. Simplified State Management: It makes managing asynchronous state transitions cleaner by separating the transitions from the handling logic.

```

### Polyfills of Split()

```js
let text = "The quick the fox jumps the lazy dog.";

String.prototype.mySplit = function (separator = "") {
  const str = this.toString();
  const array = [];

  if (!arguments.length) {
    return [str];
  }

  if (!separator.length) {
    return [...str];
  }

  function startSplit(str) {
    let index = str.indexOf(separator);
    if (index >= 0) {
      array.push(str.substring(0, index));
      startSplit(str.substring(index + separator.length), index + separator.length);
    } else {
      array.push(str);
    }
  }

  startSplit(str);

  return array;
};

let result = text.mySplit("the");

console.log(result);
```

### 8. Polyfills of localStorage

```js
function LocalsStorage() {
  let obj = new Map();

  this.setItem = function (key, value) {
    obj.set(key, value);
    localStorage.setItem(key, JSON.stringify(value));
    this.length = obj.size;
  };

  this.getItem = function (key) {
    if (obj.has(key)) {
      return localStorage.getItem(key);
    }
    return null;
  };

  this.removeItem = function (key) {
    if (obj.has(key)) {
      obj.delete(key);
      this.length = obj.size;
    }
    localStorage.removeItem(key);
  };

  this.clear = function () {
    obj.clear();
    localStorage.clear();
    this.length = obj.size;
  };

  this.length = obj.size;
}

const localStorages = new LocalsStorage();

localStorages.setItem("game", "Car Race");
localStorages.setItem("fame", "oscar");
localStorages.setItem("tame", "pet");
console.log(localStorages.getItem("game"));
console.log(localStorages.getItem("fame"));
console.log(localStorages.getItem("tame"));
console.log(localStorages.length);
localStorages.removeItem("tame");
console.log(localStorages.length);
```

### 9. Polyfills for useState

```js
import React, { useReducer } from "react";

// Component
export default function App() {
  const [count, setCount] = useMyState(0);
  const [multiplier, setMultiplier] = useMyState(5);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleMultiply = () => {
    setMultiplier((prev) => prev * 10);
  };

  return (
    <div>
      <h1>Custom useState Demo</h1>
      <div>
        <button onClick={handleIncrement}>Add</button>
        <span> Count: {count}</span>
      </div>
      <hr />
      <div>
        <button onClick={handleMultiply}>Multiply</button>
        <span> Result: {multiplier}</span>
      </div>
    </div>
  );
}

// Optimized custom useState implementation
const useMyState = (initialValue) => {
  // Store states in closure to prevent external access
  const stateStore = React.useRef([]);

  // Use useRef to maintain hook index across renders
  const hookIndex = React.useRef(0);

  // Create reducer for forcing updates
  const [, forceRender] = useReducer((s) => s + 1, 0);

  // Get current hook's index
  const currentIndex = hookIndex.current++;

  function setValue(newValue) {
    const currentState = stateStore.current[currentIndex][0];

    // Handle both function and direct value updates
    const value = typeof newValue === "function" ? newValue(currentState) : newValue;

    // Only update and re-render if value actually changed
    if (!Object.is(currentState, value)) {
      stateStore.current[currentIndex][0] = value;
      forceRender();
    }
  }

  // Initialize state if it doesn't exist
  if (!stateStore.current[currentIndex]) {
    stateStore.current[currentIndex] = [initialValue, setValue];
  }

  // Reset hook index on cleanup
  React.useEffect(() => {
    return () => {
      hookIndex.current = 0;
    };
  });

  return stateStore.current[currentIndex];
};
```

### 8. Polyfill of useEffect

```js
const useCustomEffect = (callback, deps) => {
  // Track if this is the first render
  let firstRender = useRef(true);
  // Store previous dependencies
  const prevDeps = useRef([]);

  // Handle first render separately
  if (firstRender.current) {
    firstRender.current = false;
    // Execute callback and handle cleanup if returned
    let cleanup = callback();

    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }

  // Validate deps is an array if provided
  if (deps && !Array.isArray(deps)) {
    throw new Error("Dependencies should be an array");
  }

  // Check if dependencies have changed
  // If deps not provided, effect runs after every render
  let depsChanged = deps ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current) : true;

  if (depsChanged) {
    // Execute callback and handle cleanup
    let cleanup = callback();
    if (cleanup && typeof cleanup === "function" && deps) {
      cleanup();
    }
  }

  // Update previous dependencies
  prevDeps.current = deps || [];
};
```

### 8. Polyfills And CustomHook Of useMemo is same.

```js
import React, { useState, useRef } from "react";
import "./style.css";

let data = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 56, 57, 689, 45, 678];

export default function App() {
  const [value, setValue] = useState(0);
  const [number, setNumber] = useState(10);

  const myFunction = () => {
    console.log("my function");
    return data.filter((item) => item > number);
  };
  const memoValue = useMyMemo(myFunction, [number]);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <input type="tel" value={value} onChange={(event) => setValue(event.target.value)} />
      <button onClick={() => setNumber(value)}>
        Add {"  "}
        {number}
      </button>
      <br />
      Memoized Value :{" "}
      {memoValue.map((item, index) => (
        <p key={item + index}>{item}</p>
      ))}
    </div>
  );
}

const useMyMemo = (callback, deps) => {
  // Store cache in a useRef because it will persist the value throughout lifecycle of the component
  const cache = useRef({
    deps: undefined,
    value: undefined,
  });

  // Validate inputs
  if (typeof callback !== "function") {
    throw new Error("First argument must be a function");
  }

  if (deps !== undefined && !Array.isArray(deps)) {
    throw new Error("Second argument must be an array or undefined");
  }

  // Check if deps have changed using Object.is for proper comparison
  const depsChanged = deps === undefined || !Array.isArray(cache.current.deps) || deps.length !== cache.current.deps.length || deps.some((dep, index) => !Object.is(dep, cache.current.deps[index]));

  // Compute new value if deps changed or no cache exists
  if (depsChanged) {
    cache.current.value = callback();
    cache.current.deps = deps;
  }

  return cache.current.value;
};



### This implementation better mirrors React's actual useMemo behavior and handles edge cases more robustly. It will properly memoize the callback result and only recompute when the dependencies actually change.

Remember that like React's useMemo:

  1. It only caches the most recent value

  2. It's primarily useful for expensive computations

  3. The callback should be pure (no side effects)

  4. Dependencies should be stable across renders when you want to prevent recomputation
```

### 9. Polyfill of useCallback and its custom hook are same.

```js
import React, { useState, useRef, memo } from "react";
import "./style.css";

export default function App() {
  const [counter, setCounter] = useState(1);
  const [mul, setMul] = useState(1);

  const handleMul = useMyCallback(() => {
    setMul(counter + 1);
  }, []);
  return (
    <div>
      <h1>useCallback Polyfills</h1>
      <p>Counter : {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Add</button>

      <Child mul={mul} onClick={handleMul} />
    </div>
  );
}

const ChildPage = ({ mul, onClick }) => {
  console.log("child");
  return (
    <>
      <h1>Multiplied : {mul}</h1>
      <button onClick={onClick}>Multiply</button>
    </>
  );
};

const Child = memo(ChildPage);

function useMyCallback(callback, dependencies) {
  // Store the previous values in refs to persist across renders
  const previousCallback = useRef(null);
  const previousDependencies = useRef([]);

  // Check if dependencies changed
  const dependenciesChanged = React.useMemo(() => {
    // If no dependencies provided, always return true
    if (!dependencies) return true;

    // If previous dependencies don't match in length, dependencies changed
    if (previousDependencies.current.length !== dependencies.length) {
      return true;
    }

    // Compare each dependency with its previous value
    return dependencies.some((dep, index) => !Object.is(dep, previousDependencies.current[index]));
  }, dependencies);

  // If dependencies changed or no previous callback exists, update the callback
  if (dependenciesChanged || !previousCallback.current) {
    previousCallback.current = callback;
    previousDependencies.current = dependencies;
  }

  // Return the memoized callback
  return previousCallback.current;
}

//              Below is 2nd  way of doing it.

// const useMyCallback = (callback, deps) => {
//   const prevCallback = useRef(callback);
//   const prevDeps = useRef(deps);

//   console.log(prevCallback.current, prevDeps.current, deps);

//   let isDepsChange = deps
//     ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current)
//     : true;

//   if (isDepsChange) {
//     prevCallback.current = callback;
//     prevDeps.deps = deps;
//     return prevCallback.current;
//   }
//   prevDeps.deps = deps;
//   return prevCallback.current;
// };
```
