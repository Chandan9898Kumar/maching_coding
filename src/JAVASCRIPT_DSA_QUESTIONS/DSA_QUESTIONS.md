const parseWithScope = require("babel-eslint/lib/parse-with-scope")

### 1.Given an array of objects[{ banana: 5, apples: 5 }, { pear: 6 }, { apples: 5 }, { banana: 2 }], return an object with the sum of all the fruits.

```ts
let arr = [{ banana: 5, apples: 5 }, { pear: 6 }, { apples: 5 }, { banana: 2 }];

function sumOfFruits(arr) {
  return arr.reduce((acc, curr) => {
    for (let x in curr) {
      acc["totalFruits"] = (acc["totalFruits"] || 0) + curr[x];
    }
    return acc;
  }, {});
}
let result = sumOfFruits(arr);

//                                               Second Type of question might be asked.

//  count number of each fruits.
let fruits = [
  { apple: 4, orange: 7, grape: 3 },
  { guava: 6, lemon: 4, banana: 8 },
  { orange: 5, pineapple: 7, apple: 7 },
];

function fruitsCount(arrayValue) {
  const fruits = arrayValue.reduce((acc, curr) => {
    for (x in curr) {
      acc[x] = (acc[x] || 0) + curr[x];
    }
    return acc;
  }, {});

  return fruits;
}

const result = fruitsCount(fruits);
console.log(result, "result");

//                                              Third Type of Question

//   Count how the occurrence of the fruits .
function fruitsCount(arrayValue) {
  let items = [];
  const fruits = arrayValue.reduce((acc, curr) => {
    for (x in curr) {
      acc[x] = (acc[x] || 0) + 1;
    }
    return acc;
  }, {});

  return fruits;
}

const result = fruitsCount(fruits);
console.log(result, "result");
```

### 2. - count on the basis of name.

```ts
const person1 = { name: "aryan", height: 178 };
const person2 = { name: "kaush", height: 182 };
const person3 = { name: "abhishek", height: 176 };
const person4 = { name: "aryan", height: 78 };
const person5 = { name: "kaush", height: 82 };
const person6 = { name: "abhishek", height: 76 };
const person7 = { name: "aryan", height: 18 };
const person8 = { name: "kaush", height: 18 };
const person9 = { name: "abhishek", height: 16 };

const arrs = [person1, person2, person3, person4, person5, person6, person7, person8, person9];

const result = arrs.reduce((acc, curr) => {
  for (let x in curr) {
    if (typeof curr[x] === "string") {
      acc[curr[x]] = (acc[curr[x]] || 0) + 1;
    }
  }

  return acc;
}, {});

console.log(result, "result");
```

### 3. Given a number in string format, return a single-digit no by recursively adding the digits in a string format .

`Solution - 1.`

```ts
let n = 9624;
function ab(n, stri) {
  if (n === 0) {
    return n;
  }
  if (n % 9 === 0) {
    return 9;
  } else {
    return n % 9;
  }
}
let res = ab(n);
```

// OR

`Solution .2.`

```ts
function ab(value) {
  let newValue = 0;

  let str = String(value);

  for (let x of str) {
    newValue += Number(x);
  }
  if (newValue > 9) {
    return ab(newValue);
  }

  return newValue;
}

const res = ab(55555);

console.log(res, "ressssssssssssss");
```

### 4. Reverse string at same place = 'you are winner'

```ts
let str = "you are winner";

const rever = (str) => {
  let spli = str.split(" ");
  let arr = [];

  for (let x of spli) {
    arr.push(x.split("").reverse().join(""));
  }
  return arr.join(" ");
};
const result = rever(str);
console.log(result);
```

### 5. Sort on this basis of height,ig height is same then sort on name.

```ts
const person1 = { name: "aryan", height: 178 };
const person2 = { name: "kaush", height: 182 };
const person3 = { name: "abhishek", height: 176 };
const person4 = { name: "aryan", height: 78 };
const person5 = { name: "kaush", height: 82 };
const person6 = { name: "abhishek", height: 76 };
const person7 = { name: "zaryan", height: 18 };
const person8 = { name: "kaush", height: 18 };
const person9 = { name: "abhishek", height: 16 };
const person10 = { name: "abhishea", height: 16 };

const arr = [person1, person2, person3, person4, person5, person6, person7, person8, person9, person10];

const result = arr.sort((a, b) => {
  if (a["height"] > b["height"]) {
    return 1;
  }
  if (a["height"] < b["height"]) {
    return -1;
  }

  if (a["height"] === b["height"]) {
    return -1;
  }
});

console.log(result, "result");
```

### 6. find smallest word by length in an array.if length match then compare by ascii character.

```ts
const arr=['hello','cat','data','sata','apple','game','do','famous','bo',]

// Method /1.
function smallest(arr){
let smallLength= arr[0]
for(let x of arr){
if(smallLength.length>x.length){
smallLength=x
}
if(smallLength.length===x.length){
if(smallLength >x ){
smallLength = x
}
}
}
return smallLength
}
const result = smallest(arr) o/p = 'bo'

```

### 7. find 2nd largest Number.

```ts
// method 1. When no duplicates are there.
const arr = [2, 6, 3, 8, 9, 11, 4];
const result = arr.sort((a, b) => b - a);
console.log(result);

// 2. when duplicates are there.
function sortarr() {
  const arr2 = [4, 2, 14, 11, 5, 14];
  const newarr = arr2
    .reduce((acc, curr) => {
      if (acc.includes(curr)) {
        return acc;
      }
      acc.push(curr);
      return acc;
    }, [])
    .sort((a, b) => b - a)[1];

  return newarr;
}
const result = sortarr();
console.log(result);
```

### 8 . Group book objects by genre:

`By  Using GroupBy`

```ts
const books = [
  { title: "The Catcher in the Rye", genre: "Fiction" },
  { title: "Sapiens", genre: "Non-Fiction" },
  { title: "Dune", genre: "Science Fiction" },
  { title: "To Kill a Mockingbird", genre: "Fiction" },
];

const group = Object.groupBy(books, (book) => book.genre);
OR;
const group = Object.groupBy(books, ({ genre }) => genre);
```

`By using Reduce Method`

```ts
const result = books.reduce((acc, curr) => {
  acc[curr.genre] = acc[curr.genre] ? [...acc[curr.genre], curr] : [curr];
  return acc;
}, {});
```

### 9. categorize numbers into odd and even groups:

```ts
const numbers = [1, 2, 6, 5, 4, 9];

Solution .1.
const result = Object.groupBy(numbers,(num)=> num%2===0 ? 'even' : 'odd')

Solution .2.
const res = numbers.reduce((acc,curr)=>{
if(curr%2===0){
acc['even']= acc['even'] ? [...acc['even'],curr] : [curr]
}else{
acc['odd']= acc['odd'] ? [...acc['odd'],curr] : [curr]
}
return acc
},{})


```

### 10. find duplicate key-value pairs.

```ts
const obj1 = {
  a: 1,
  b: 2,
  c: 3,
  d: 10,
  e: 12,
};

const obj2 = {
  a: 2,
  f: 6,
  d: 10,
  e: 12,
};

// Answer : {d: 10, e: 12}

// Solution

function cal(val1, val2) {
  let dup = {};

  for (let x in val1) {
    for (let y in val2) {
      if (x === y && val1[x] === val2[y]) {
        dup[x] = val1[x];
      }
    }
  }

  return dup;
}
const res = cal(obj1, obj2);
```

### 10. Design a Calulator interface for 2 number inputs which can perform sum, difference, product and dividend whenever invoked on the same interface.

There can be many ways to solve this question but here we will solve it in two ways.

1. With help of the 𝐅𝐮𝐧𝐜𝐭𝐢𝐨𝐧 𝐨𝐛𝐣𝐞𝐜𝐭𝐬 and 𝐜𝐥𝐨𝐬𝐮𝐫𝐞𝐬.
2. With the help of the 𝐇𝐢𝐠𝐡𝐞𝐫 𝐨𝐫𝐝𝐞𝐫 𝐟𝐮𝐧𝐜𝐭𝐢𝐨𝐧.

Let's get to know a little bit about all these

`𝐅𝐮𝐧𝐜𝐭𝐢𝐨𝐧 𝐨𝐛𝐣𝐞𝐜𝐭𝐬`: In JavaScript, 𝐟𝐮𝐧𝐜𝐭𝐢𝐨𝐧𝐬 𝐚𝐫𝐞 𝐟𝐢𝐫𝐬𝐭-𝐜𝐥𝐚𝐬𝐬 𝐨𝐛𝐣𝐞𝐜𝐭𝐬, because they can have properties and methods just like any other object. What distinguishes them from other objects is that functions can be called. In brief, they are Function objects.

`𝐜𝐥𝐨𝐬𝐮𝐫𝐞𝐬`: A function bundled together with it's lexical enviroment, form a 𝐜𝐥𝐨𝐬𝐮𝐫𝐞𝐬. And when functions are call in other scope, They still remember that where they were parsent actually.

`𝐇𝐢𝐠𝐡𝐞𝐫 𝐨𝐫𝐝𝐞𝐫 𝐟𝐮𝐧𝐜𝐭𝐢𝐨𝐧`: A function takes another function as a argument or return a function from it, Is a 𝐇𝐢𝐠𝐡𝐞𝐫 𝐨𝐫𝐝𝐞𝐫 𝐟𝐮𝐧𝐜𝐭𝐢𝐨𝐧.

### Solution 1. By Higher Order

```ts
function add(a, b) {
  console.log(a + b);
}

function subt(a, b) {
  console.log(a - b);
}

function mul(a, b) {
  console.log(a * b);
}

function main(add, subt, mul, a, b) {
  add(a, b);
  subt(a, b);
  mul(a, b);
}

main(add, subt, mul, 6, 5);
```

### Solution 1. By function object and closures.

```ts
function Main(n1,n2){

function add(){
console.log(n1+n2)
}

function sub(){
console.log(n1-n2)
}

function mul(){
console.log(n1\*n2)
}

function div(){
console.log(n1/n2)
}

return {add,sub,mul,div}

}
const res=Main(6,5)
res.add()
res.sub()
res.mul()
res.div()

```

### 11. Count repeated number of words in string (Counts the frequency), exclude empty strings.

```ts
const string = " hi hello how    are you     sir       hi hello how is this that ball this   ";

const arrays = string.split(" ");

const result = arrays.reduce((acc, curr) => {
  if (curr) {
    acc[curr] = (acc[curr] || 0) + 1;
  }

  return acc;
}, {});

console.log(result);
```

### 12. Find First word whose count is 1.

```ts
const string = " hi hello how    are you     sir       hi hello how is this that ball this   ";

const arrays = string.split(" ");

function findValue(arrays) {
  const obj = arrays.reduce((acc, curr) => {
    if (curr) {
      acc[curr] = (acc[curr] || 0) + 1;
    }

    return acc;
  }, {});

  for (let x in obj) {
    if (obj[x] === 1) {
      return { [x]: obj[x] };
    }
  }
}

const result = findValue(arrays);
console.log(result);
```

### 13. Sort An Array In Ascending Order, Without Using Sort Method.

`Bubble sort algorithm : Bubble sort is a simple sorting algorithm that works by repeatedly stepping through the list to be sorted`

```ts
const arrays = [18, 2, 5, 1, 19, 4, 3, 6];
const len = arrays.length;

for (let x = 0; x < len - 1; x++) {
  for (let y = x + 1; y < len; y++) {
    if (arrays[x] > arrays[y]) {
      [arrays[x], arrays[y]] = [arrays[y], arrays[x]];
    }
  }
}

console.log(arrays);

// Method 2 . By making Array.prototype.

Array.prototype.bubbleSort_algo = function () {
  var is_sorted = false;
  while (!is_sorted) {
    is_sorted = true;
    for (var n = 0; n < this.length - 1; n++) {
      if (this[n] > this[n + 1]) {
        var x = this[n + 1];
        this[n + 1] = this[n];
        this[n] = x;
        is_sorted = false;
      }
    }
  }
  return this;
};

console.log([6, 4, 0, 3, -2, 1].bubbleSort_algo());
```

### 14. Sort An Array In descending Order, Without Using Sort Method.

```ts
const arrays = [18, 2, 5, 1, 19, 4, 3, 6];
const len = arrays.length;

for (let x = 0; x < len - 1; x++) {
  for (let y = x + 1; y < len; y++) {
    if (arrays[x] < arrays[y]) {
      [arrays[x], arrays[y]] = [arrays[y], arrays[x]];
    }
  }
}

console.log(arrays);
```

### 15. Find The Missing Number From The Array

```ts
const array =[0,1,2,3,5,6]

// Brute force solution
// Time complexity - O(n^2)
// Space complexity - O(1)
function missingNumber1(nums) {
  for (let i = 0; i <= nums.length; i++) {
    let flag = 0;

    for (let j = 0; j < nums.length; j++) {
      if (i === nums[j]) {
        flag = 1;
        break;
      }
    }

    if (flag == 0) {
      return i;
    }
  }
}

// Better solution
// Time complexity - O(n logn) + O(n) = O(n logn)
// Space complexity - O(1)
function missingNumber2(nums) {
  nums.sort();

  let result = nums.length;
  for (let i = 0; i < nums.length; i++) {
    if (i !== nums[i]) {
      result = i;
      break;
    }
  }

  return result;
}


// Optimal solution
// Time complexity - O(n)
// Space complexity - O(1)
- Using Arithmetic Progression Formula
function findMissingNumber(value) {
  // We are aware that (n(n+1))/2 is the sum of all items in the range of 1 to n
  const n = value.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = value.reduce((acc, curr) => acc + curr, 0);
  return expectedSum - actualSum;
}

const missingNumber = findMissingNumber(array);

```

### 16. use HASH MAP for Caching

HashMaps can be used effectively for caching frequently accessed data in an application. By using a HashMap as a cache, you can store the results of expensive operations and retrieve them quickly when needed. This can significantly improve the performance of your application.

```ts
// Create a HashMap for caching (also an example of memoization)
const cache = new Map();
function expensiveOperation(input) {
  if (cache.has(input)) {
    return cache.get(input);
  }
  // Perform the expensive operation
  const result = performExpensiveOperation(input);
  // Store the result in the cache
  cache.set(input, result);
  return result;
}

const result = expensiveOperation(10);
```

### 17. Remove Duplicate Objects From An Array using built-in functions. It should not return new array.

```ts
const person1 = { name: "aryan", height: 18 };
const person2 = { name: "kaush", height: 182 };
const person3 = { name: "abhishek", height: 176 };
const person4 = { name: "aryan", height: 78 };
const person5 = { name: "kaush", height: 82 };
const person6 = { name: "abhishek", height: 76 };
const person7 = { name: "aryan", height: 18 };
const person8 = { name: "kaush", height: 182 };
const person9 = { name: "abhishek", height: 16 };

const arrayOfObject = [person1, person2, person3, person4, person5, person6, person7, person8, person9];

const unique = [];

for (let x of arrayOfObject) {
  const value = JSON.stringify(x); // To compare two object converting them into string.
  if (!unique.includes(value)) {
    unique.push(value);
  }
}
const parseData = unique.map((item) => JSON.parse(item));
// NOTE: If condition is to return results in new array then we can simply return parseData. No need to of below codes. But When condition is not return new array,
//  We have modify in the existing array then use below code.

arrayOfObject.splice(0, arrayOfObject.length, ...parseData); // First removing entire existing data from an array then pushing result into it.
console.log(arrayOfObject);

//  NOTE Condition 2. : If condition is to return a new array then  below code should be used. it is more simplified.

const data = arrayOfObject.filter((item, index, arr) => {
  return index === arr.findIndex((value, ind) => item.name === value.name && item.height === value.height);
});

console.log(data);

// The findIndex() method executes a function for each array element.

// The findIndex() method returns the index (position) of the first element that passes a test.

// The findIndex() method returns -1 if no match is found.

// The findIndex() method does not execute the function for empty array elements.

// The findIndex() method does not change the original array.

//                                                                3rd  Way
let UniqueValues = [];
arrayOfObject.forEach((item, index, arr) => {
  if (index === arr.findIndex((value, ind) => item.name === value.name && item.height === value.height)) {
    UniqueValues.push(item);
  }
});
arrayOfObject = UniqueValues;
console.log(arrayOfObject);
```

### 18. Remove Duplicate Objects From An Array Without using built-in functions. It should not return new array.

```ts
const uniqueData = [];
const person1 = { name: "aryan", height: 18 };
const person2 = { name: "kaush", height: 182 };
const person3 = { name: "abhishek", height: 176 };
const person4 = { name: "aryan", height: 78 };
const person5 = { name: "kaush", height: 82 };
const person6 = { name: "abhishek", height: 76 };
const person7 = { name: "aryan", height: 18 };
const person8 = { name: "kaush", height: 182 };
const person9 = { name: "abhishek", height: 16 };
const person10 = { name: "abhishek", height: 16 };
const person11 = { name: "abhishek", height: 16 };

let arrayOfObject = [person1, person2, person3, person4, person5, person6, person7, person8, person9, person10, person11];

for (let x = 0; x < arrayOfObject.length; x++) {
  let uniq = true;

  for (let j = x + 1; j < arrayOfObject.length; j++) {
    let isConditionTrue = arrayOfObject[x].name === arrayOfObject[j].name && arrayOfObject[x].height === arrayOfObject[j].height;
    if (isConditionTrue) {
      uniq = false;
      break;
    }
  }
  if (uniq) {
    uniqueData.push(arrayOfObject[x]);
  }
}
arrayOfObject = uniqueData;
console.log("unique", arrayOfObject);

//  NOTE : If condition is to return a new array then simply  return uniqueData instead of assign it to arrayOfObject.
```

### 19. Remove Duplicate items From An Array Without using built-in functions. It should not return new array.

```ts
const uniqueData = [];
let arrayOfObject = [1, 2, 3, 4, 2, 1];
let lengthOfArray = arrayOfObject.length

for (let x = 0; x < lengthOfArray; x++) {
  let uniq = true;
  for (let j = x + 1; j < lengthOfArray; j++) {
    if (arrayOfObject[x] === arrayOfObject[j]) {
      uniq = false;
      break;
    }
  }
  if (uniq) {
    uniqueData.push(arrayOfObject[x]);
  }
}

arrayOfObject = uniqueData;
console.log(arrayOfObject);


// More Optimal Solution. Only 1 for loop is used.

    for (i = 0; i < lengthOfArray; i++) {
        if (uniqueData.indexOf(arrayOfObject[i]) === -1) {
            uniqueData.push(arrayOfObject[i]);
        }
    }

arrayOfObject = uniqueData

console.log(uniqueData,'uniqueData')


//  NOTE : If condition is to return a new array then simply return uniqueData instead of assign it to arrayOfObject.



- Remove Duplicate items From An Array With using built-in functions.

let arrayOfObject = [1, 2, 3, 4, 2, 1];

//  Method 1.
const resultOne = arrayOfObject.reduce((acc,curr)=>{

  if(!acc.includes(curr)){
    acc.push(curr)
  }
  return acc
},[])

//  Method 2.
const resultTwo = arrayOfObject.filter((item,index,arr)=>{
      const isTrue=index === arr.findIndex((value,index,arr)=>item===value)
      if(isTrue){
        return item
      }

})

console.log(resultOne,resultTwo)
```

### 20. Write a JavaScript program to list the keys and values of a JavaScript object and get the length of a JavaScript object.

```ts
const student = {
  name: "David Rayy",
  sclass: "VI",
  rollno: 12,
};

const key = Object.keys(student);
const value = Object.values(student);
const lengthOfObject = key.length;
console.log(key, value, lengthOfObject);
```

### 21. Write a JavaScript program to delete the rollno property from the following object. Also print the object before or after deleting the property.

```ts
const student = {
  name: "David Rayy",
  sclass: "VI",
  rollno: 12,
};

//  Method 1.
delete student.rollno;

console.log(student);

// Method 2.

const { rollno, ...rest } = student;
console.log(rest);
```

### 22. Write a JavaScript function to convert an object into a list of `[key, value]` pairs.

```ts
const student = {
  name: "David Rayy",
  sclass: "VI",
  rollno: 12,
};

console.log(Object.entries(student));
```

### 23. Get a copy of the object where the keys have become the values and the values the keys.

```ts
const student = {
  name: "David Rayy",
  sclass: "VI",
  rollno: 12,
};

function exchange(objects) {
  let exchangeData = {};

  for (let x in objects) {
    exchangeData[objects[x]] = x;
  }

  return exchangeData;
}

const result = exchange(student);

console.log(student, "student", result);
```

### 24. Write a JavaScript program that returns a subset of a string.

```ts
// Input string
let str = "dog";
// An empty array which will store the combinations.
let result = [];

/**
 * getCombination() method is used to get all the combinations of all the array elements passed as a parameter.
 */
function getCombination(inputArr) {
  // variable which will store the combination string.
  let temp = "";
  // Iterating input array to get elements one by one.
  inputArr.forEach((elem, index) => {
    // Pushing the element into result array.
    result.push(temp + elem);
    // To make the combination updating temp variable with the elem.
    temp += elem + "";
  });
}

// Once combination done for one iteration, removing the first element from an array and then again calling getCombination() method to get the combination for next set of elements.
str.split("").forEach((elem, index) => {
  getCombination([...str.slice(index)]);
});

// Expected result : Output: ["d", "do", "dog", "o", "og", "g"]
console.log(result);

//  OR Method 2 by creating prototype of string.

String.prototype.sub_String = function () {
  let subset = [];
  for (let m = 0; m < this.length; m++) {
    for (let n = m + 1; n < this.length + 1; n++) {
      subset.push(this.slice(m, n));
    }
  }
  return subset;
};

console.log("dog".sub_String());
```

### 25. write a function that counts the frequency of each value in an object:

```ts
const obj = {
  name: "John Cena",
  homeName: "John Cena",
  place: "Manchester",
  bithPlace: "Manchester",
  age: 22,
  country: "United kingdom",
};

//                                                          Method 1.
function countFrequency1(objValue) {
  let frequency = {};

  for (let x in objValue) {
    frequency[objValue[x]] = (frequency[objValue[x]] || 0) + 1;
  }

  return frequency;
}

const result = countFrequency1(obj);

//                                                              Method 2.
function countFrequency2(objValue) {
  return Object.keys(objValue).reduce((acc, curr, ind, arr) => {
    acc[objValue[curr]] = (acc[objValue[curr]] || 0) + 1;

    return acc;
  }, {});
}

const result = countFrequency2(obj);

//                                                              Method 3

function countFrequency3(obj) {
  const frequency = {};
  Object.entries(obj).forEach(([key, value]) => {
    frequency[value] = (frequency[value] || 0) + 1;
  });

  return frequency;
}

const result = countFrequency3(obj);

//                                                               Method 4

function countFrequency4(obj) {
  const frequency = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    frequency[value] = (frequency[value] || 0) + 1;
  });

  return frequency;
}

const result = countFrequency4(obj);

//                                                               Method 5

function countFrequency5(obj) {
  const frequency = {};

  Object.values(obj).forEach((value) => {
    frequency[value] = (frequency[value] || 0) + 1;
  });

  return frequency;
}
const result = countFrequency5(obj);

console.log(result, "result");
```

### 26. write a function that counts the character(string character) of each value in an object:

```ts
const obj = {
  name: "John Cena",
  homeName: "John",
  place: "Manchester",
  country: "United kingdom",
};

function countObjectValueCharacters(objVal) {
  return Object.keys(objVal).reduce((acc, curr, ind, arr) => {
    const stringLength = objVal[curr].length;
    acc[objVal[curr]] = (acc[objVal[curr]] || 0) + stringLength;
    return acc;
  }, {});
}

const result = countObjectValueCharacters(obj);

console.log(result);
```

### 27. Given an array of student details containing registration numbers, scores, and subjects,aggregate the scores for each unique registration number and return the result as an array of objects with registration numbers and total scores.

```ts
let studentDetails = [
  { resgisterNo: 101, score: 70, subject: "Science" },
  { resgisterNo: 101, score: 50, subject: "Maths" },
  { resgisterNo: 101, score: 30, subject: "GK" },
  { resgisterNo: 101, score: 100, subject: "Sanskrit" },
  { resgisterNo: 102, score: 60, subject: "Science" },
  { resgisterNo: 102, score: 40, subject: "SST" },
  { resgisterNo: 103, score: 40, subject: "Hindi" },
];

//                                                            Method 1
function findData(arrayVal) {
  const registerDetails = arrayVal
    .reduce((acc, curr) => {
      if (!acc.includes(curr.resgisterNo)) {
        acc.push(curr.resgisterNo);
      }
      return acc;
    }, [])
    .reduce((acc, curr) => {
      let sum = 0;
      for (let x = 0; x < arrayVal.length; x++) {
        if (curr === arrayVal[x].resgisterNo) {
          sum = sum + arrayVal[x].score;
        }
      }

      acc.push({ resgisterNo: curr, score: sum });
      return acc;
    }, []);

  return registerDetails;
}

const result = findData(studentDetails);

//                                                          Method 2.

function findData(arrayVal) {
  const studentData = arrayVal.reduce((acc, curr) => {
    const studentDetails = acc.find((student) => student.resgisterNo === curr.resgisterNo);
    // Note:  Here in studentDetails we are directly changing values  inside it and it will reflect in acc because acc data and return data of acc.find are referential equal.
    //  Also you might notice that  we are pushing studentDetails in acc because it is not need reason is that data of studentDetails and acc both are equal by reference.
    //  Meaning changing any values in acc or studentDetails will reflect in both.

    if (studentDetails) {
      studentDetails.score = studentDetails.score + curr.score;
    } else {
      acc.push({ resgisterNo: curr.resgisterNo, score: curr.score });
    }

    return acc;
  }, []);

  return studentData;
}

const result = findData(studentDetails);

console.log(result, "result");

/**                                                       For Better understanding of reference equal :
const data = [1,2,3].reduce((acc,curr)=>{
  let data = acc[0]
  data.game='GTA'
  return acc
},[{ resgisterNo: 101, score: 70, subject: 'Science' }])

console.log(data,'result')

 */
```

### 28. Create a function which will accepts two arrays arr1 and arr2. The function should return true .if every value in arr1 has its corresponding value squared in array2. The frequency of values must be same.

```ts
//     Method 1.  By sorting items in ascending order and comparing by JSON.stringify(); If items are not sorted then stringify will give false.

// JSON.stringify() :  This method allows you to serialize each array by converting the array to a JSON string. You can then compare the two JSON strings.

const arr1 = [1, 2, 5];
const arr2 = [5, 2, 1];

arr1.sort((a, b) => a - b);
arr2.sort((a, b) => a - b);

function compareArray(val1, val2) {
  const one = JSON.stringify(val1);
  const two = JSON.stringify(val2);

  return one === two;
}
const result = compareArray(arr1, arr2);
console.log(result);

//  Method 2.  By Using toString()

// this method converts any data type to a string and can similarly convert an object to a string.

const array1 = [1, 2, 5];
const array2 = [5, 2, 1];

array1.sort((a, b) => a - b);
array2.sort((a, b) => a - b);

console.log(array1.toString() === array2.toString());

//  NOTE : You you do not use sort then it will throw false.

// Method 3. By Using for loop.  Remember we are using sort method then only it will work, else will throw false if we interchange the items.

const arr1 = [1, 2, 5];
const arr2 = [1, 5, 2];

arr1.sort((a, b) => a - b);
arr2.sort((a, b) => a - b);

function compare(val1, val2) {
  if (val1.length !== val2.length) {
    return false;
  }

  const lengths = arr1.length;

  for (let x = 0; x < lengths; x++) {
    if (arr1[x] !== arr2[x]) {
      return false;
    }
  }
  return true;
}

const result = compare(arr1, arr2);
console.log(result, "result");

//  Method 4.  Without using sort method.

const arr1 = [1, 2, 5];
const arr2 = [5, 1, 2];

function compare(val1, val2) {
  if (val1.length !== val2.length) {
    return false;
  }

  const obj1 = val1.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const obj2 = val2.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  let key1 = Object.keys(obj1);
  let value1 = Object.values(obj1);

  let key2 = Object.keys(obj2);
  let value2 = Object.values(obj2);

  if (key1.length !== key2.length && value1.length !== value2.length) {
    return false;
  }

  for (let x of key2) {
    if (!key1.includes(x)) {
      return false;
    }
  }

  for (let y of value2) {
    if (!value1.includes(y)) {
      return false;
    }
  }

  return true;
}

const result = compare(arr1, arr2);

//                                                OR we can solve like this way as well.

const arr1 = [1, 2, 3];
const arr2 = [1, 3, 2];

function compare(val1, val2) {
  if (val1.length !== val2.length) {
    return false;
  }

  const obj1 = val1.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const obj2 = val2.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const obj1Leng = Object.keys(obj1).length;
  const obj2Leng = Object.keys(obj2).length;

  const isMatched = {};

  for (let x in obj1) {
    for (let y in obj2) {
      if (x === y && obj1[x] === obj2[y]) {
        isMatched[x] = obj1[x];
        break;
      }
    }
  }
  const isMatchedLength = Object.keys(isMatched).length;

  if (isMatchedLength === obj1Leng && isMatchedLength === obj2Leng && obj1Leng === obj2Leng) {
    return true;
  } else {
    return false;
  }
}

const result = compare(arr1, arr2);

console.log(result, "result");
```

### 29. Count elements whose type is number in a nested array.

```ts
const arr = [[1, [2, [3, 4, "foo", { a: 1, b: 2 }]], "bar", 5], 6];

function count(arrayVal) {
  let total = 0;

  function findTotal(values) {
    for (let x of values) {
      if (Array.isArray(x)) {
        find(x);
      } else {
        if (typeof x === "number") {
          total += 1;
        }
      }
    }
  }
  findTotal(arrayVal);

  return total;
}

const result = count(arr);

console.log(result, "result");
```

### 30. Given a nested array and a callback function, count all the elements that pass the test in the callback and return the count.

```ts
const arr = [6, [1, [2, [3, 4, "foo", { a: 1, b: 2 }]], "bar", 5]];

function countInArray(arrayVal, callBackTest) {
  let total = 0;

  function find(values, callBackTest) {
    for (let x of values) {
      if (Array.isArray(x)) {
        find(x, callBackTest);
      } else {
        if (callBackTest(x)) {
          total += 1;
        }
      }
    }
  }
  find(arrayVal, callBackTest);

  return total;
}

const count = countInArray(arr, (e) => typeof e === "number");
console.log(count);
```
