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

### 5. Sort on this basis of height and name.

<!--  The sort() method of Array instances sorts the elements of an array in place and returns the reference to the same array, now sorted. The default sort order is ascending. It changes the original Array -->

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

//  Way 1.
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

// Way 2.
const newResult = arr.sort((a, b) => a.height - b.height);

console.log(result, "result", newResult);

//                                                   -  Sort on this basis of name ?
const sortName = arr.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

//   Long Way
const sortName = items.sort((a, b) => {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
});
console.log(sortName,'sortName')


//    Sort On the Basis of Height , If Height is same then sort on the basis of name.
const sortedData = arr.sort((a, b) => {
  if (a.height === b.height) {
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
  } else {
    return a.height - b.height;
  }
});

console.log(sortedData,'sortedData)
```

### 6. find smallest word by length in an array.if length match then compare by ascii character.

```js
const arr=['hello','cat','data','sata','apple','game','do','famous','bo',]

function smallest(arr) {
  let smallLength = arr[0]
  for (let x of arr) {
    if (smallLength.length > x.length) {
      smallLength = x
    }
    if (smallLength.length === x.length) {
      if (smallLength > x) {
        smallLength = x
      }
    }
  }
  return smallLength
}
const result = smallest(arr) o/p = 'bo'

//  2nd way :

function smallest() {

  return arr.reduce((acc,curr)=>{
     if (acc.length > curr.length) {
      acc = curr
    }
    if (acc.length === curr.length && acc > curr) {
      acc = curr
    }

    return acc

  },arr[0])
}

const result = smallest()
console.log(result)

```

### 7. find 2nd largest Number.

```ts
// method 1. When no duplicates are there.
const arr = [2, 6, 3, 8, 9, 11, 4];
const result = arr.sort((a, b) => b - a)[1];
console.log(result);

// 2. when duplicates are there.
function sortArr() {
  const arr2 = [4, 2, 14, 11, 5, 14];
  const newArr = arr2
    .reduce((acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }

      return acc;
    }, [])
    .sort((a, b) => b - a)[1];

  return newArr;
}
const result = sortArr();
console.log(result);

//  Most Optimized Solution

function secLarge(arr) {
  let first = -Infinity;
  let second = -Infinity;

  for (let num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num < first) {
      second = num;
    }
  }
  return second === -Infinity ? null : second; // null if no second largest unique number
}

const arr = [2, 6, 3, 8, 9, 11, 4, 4, 2, 3];
console.log(secLarge(arr)); // Output: 9
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
const res = numbers.reduce((acc, curr) => {
  if (curr % 2 === 0) {
    acc['even'] = acc['even'] ? [...acc['even'], curr] : [curr]
  } else {
    acc['odd'] = acc['odd'] ? [...acc['odd'], curr] : [curr]
  }
  return acc
}, {})


Solution 3.

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const result = numbers.reduce((acc, curr) => ({
  ...acc,
  even: curr % 2 === 0 ? [...acc.even, curr] : acc.even,
  odd: curr % 2 !== 0 ? [...acc.odd, curr] : acc.odd
}), { even: [], odd: [] });

console.log(result);



Solution 4.
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const result = {
  even: numbers.filter(num => num % 2 === 0),
  odd: numbers.filter(num => num % 2 !== 0)
};

console.log(result);

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

// Solution 1.

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

//  Solution 2.

function findCommonKeyValues(obj1, obj2) {
  // Input validation
  if (!obj1 || !obj2) {
    return {};
  }

  const duplicates = {};

  for (const key in obj1) {
    // Using hasOwnProperty to avoid prototype chain properties
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] === obj2[key]) {
      duplicates[key] = obj1[key];
    }
  }

  return duplicates;
}

// Usage
const result = findCommonKeyValues(obj1, obj2);
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

//                                1. Brute force solution
// Time complexity - O(n^2)
// Space complexity - O(1)

const array = [0, 1, 2, 3, 5, 6] // it will give wrong data with : const array = [1, 2, 3, 5, 6];
function missingNumber1(nums) {
  for (let i = 0; i <= nums.length; i++) {
    let flag = 0;

    for (let j = 0; j < nums.length; j++) {
      if (i === nums[j]) {
        flag = 1;
        break;
      }
    }

    if (flag === 0) {
      return i;
    }
  }
}

//                            2. Better solution
// Time complexity - O(n logn) + O(n) = O(n logn)
// Space complexity - O(1)

const array = [0,1, 2, 3, 5, 6]; // it will wrong data with : const array = [1, 2, 3, 5, 6];
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


// `                                3. Optimal solution
// Time complexity - O(n)
// Space complexity - O(1)
- Using Arithmetic Progression Formula.

//  NOTE This function will give wrong data when use : const array = [1, 2, 3, 5, 6]
const array = [0,1, 2, 3, 5, 6];
function findMissingNumber(value) {
  // We are aware that (n(n+1))/2 is the sum of all items in the range of 1 to n.
  const n = value.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = value.reduce((acc, curr) => acc + curr, 0);
  return expectedSum - actualSum;
}
const missingNumber = findMissingNumber(array);


//                                 4. best Solution

//  This function is suitable for both 1. [0,1, 2, 3, 5, 6] and  2. [1, 2, 3, 5, 6]
const array = [1, 2, 3, 5, 6];
function missing(array) {
  const max = Math.max(...array);
  const min = Math.min(...array);
  const expectedSum = ((max * (max + 1)) / 2) - ((min * (min - 1)) / 2);
  const actualSum = array.reduce((acc, curr) => acc + curr, 0);
  return expectedSum - actualSum;
}
console.log(missing())


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

//                           By using set.

const seen = new Set();
const uniqueArray = arrayOfObject.filter((person) => {
  const key = `${person.name}-${person.height}`;
  if (seen.has(key)) {
    return false;
  } else {
    seen.add(key);
    return true;
  }
});

console.log(uniqueArray);
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

//  Second approach:

function removeDuplicates(arr) {
  var uniqueArr = [];
  for (var i = 0; i < arr.length; i++) {
    var isDuplicate = false;
    for (var j = 0; j < uniqueArr.length; j++) {
      if (arr[i].name === uniqueArr[j].name && arr[i].height === uniqueArr[j].height) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      uniqueArr.push(arr[i]);
    }
  }
  return uniqueArr;
}

var uniquePeople = removeDuplicates(arrayOfObject);
console.log(uniquePeople);

//                                       New way:

function removeDuplicate(arrayOfObject) {
  let seen = {};

  let update = [];

  for (let item of arrayOfObject) {
    let key = `${item.name}-${item.height}`;

    if (!seen[key]) {
      update.push(item);
      seen[key] = key;
    }
  }
  return update;
}

console.log(removeDuplicate(arrayOfObject));
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
     return index === arr.findIndex((value,index,arr)=>item===value)
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
  birthPlace: "Manchester",
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

//                                     3rd Way:

function findData(details) {
  const registerData = details.reduce((acc, curr) => {
    acc[curr.resgisterNo] = (acc[curr.resgisterNo] || 0) + curr.score;
    return acc;
  }, {});

  const result = Object.entries(registerData).map(([key, value]) => {
    return { resgisterNo: key, score: value };
  });

  console.log(registerData, result);
}

console.log(findData(studentDetails));

/**                                                       For Better understanding of reference equal :
const data = [1,2,3].reduce((acc,curr)=>{
  let data = acc[0]
  data.game='GTA'
  return acc
},[{ resgisterNo: 101, score: 70, subject: 'Science' }])

console.log(data,'result')

 */
```

### 28. Create a function which will accepts two arrays arr1 and arr2. The function should return true .if every value in arr1 has its corresponding value in array2. The frequency of values must be same.

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

### When we have to count all the numbers even inside objects as well. o/p : 8

const arr = [[1, [2, [3, 4, "foo", { a: 1, b: { c: 8 } }]], "bar", 5], 6];

function countNumber(arrayVal) {

  let totalCount = 0


  function callback(arrays) {

    for (let item of arrays) {


      if (Array.isArray(item)) {
        callback(item)
      }

      if (!Array.isArray(item) && typeof item === 'object') {
        callback(Object.values(item))
      }

      if (typeof item === 'number') {
        totalCount += 1
      }
    }


  }
  callback(arrayVal)


  return totalCount
}

const result = countNumber(arr);

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

### 31. Compare Two objects to deepEqual .

```ts
let value = { a: 1 };
let other = undefined;

let value = { a: 1 };
let other = { a: 1 };

let value = { a: { b: { c: { d: 2 } } } };
let other = window.structuredClone(value);

let value = { a: 2 };
let other = { a: 3 };

let value = { a: 1 };
let other = null;

let value = { a: 1 };
let other = undefined;

let value = { a: 1, b: 2, c: [1, 2, 3, 4] };
let other = { b: 2, a: 1, c: [1, 2, 3, 4] };

let value = { a: 1, b: 2, c: [1, 2, 3, 4] };
let other = { b: 2, a: 1, c: [1, 2, 4, 3] };

function deepEqual(obj1, obj2) {
  // Base case: If both objects are identical, return true.
  if (obj1 === obj2) {
    return true;
  }

  //  Objects values are array,then sort it.
  if (Array.isArray(obj1)) {
    obj1.sort();
  }
  if (Array.isArray(obj2)) {
    obj2.sort();
  }

  // Check if both objects are objects and not null.
  if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
    return false;
  }
  // Get the keys of both objects.
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  // Check if the number of keys is the same.
  if (keys1.length !== keys2.length) {
    return false;
  }
  // Iterate through the keys and compare their values recursively.
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  // If all checks pass, the objects are deep equal.
  return true;
}

const res = deepEqual(value, other);

console.log(res, "RES ");
```

### 32. Given two objects obj1 and obj2 and the task are to check that obj1 contains all the keys and values of obj2 in JavaScript.

```ts

const obj1= { name: "John", age: 23; degree: "CS" }
const obj2= {age: 23, degree: "CS"}

// Output: true

const obj1={ name: "John", degree: "CS" }
const obj2={name: "Max", age: 23, degree: "CS"}

// Output: false


//                                         For Loop
// Define the function check
function check(obj1, obj2) {

	// Iterate the obj2 using for..in
	for (key in obj2) {

		// Check if both objects do
		// not have the equal values
		// of same key
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}
	return true
}

// Call the function
console.log(check(obj1, obj2))



//                           Every Method
const every = Object.keys(obj2).every((item)=>{

  if(!obj1.hasOwnProperty(item) || obj1[item]!==obj2[item]){
    return false
  }
  return true
})

console.log(every,'every')

```

### 33. Flat an array to up to given depth.

```ts
// const nestedArray = [1,2,[3,4,5,6,[7,[8,[9],[10]]]],[11,12,[13,14]]]

const nestedArray = [1, 2, [3], [4], 5, [6, 7], [8, 9, 10, [11, 12]]];

const deep = 3;

const flatArray = (arrays, deep) => {
  if (deep === "undefined" || deep === null || deep < 0) {
    return arrays;
  }
  let flatData = [];

  for (let x of arrays) {
    if (Array.isArray(x) && deep) {
      deep = deep - 1;
      flatData.push(...flatArray(x, deep));
    } else {
      flatData.push(x);
    }
  }

  return flatData;
};

const result = flatArray(nestedArray, deep);

//       Method 2.                By Flat()

const result = nestedArray.flat(deep);

//   Method 3.                   By Reduce()

const flatten = (arr, deep) => {
  return arr.reduce((flat, flatArray) => {
    if (Array.isArray(flatArray) && deep) {
      flat.push(...flatten(flatArray, deep - 1));
    } else {
      flat.push(flatArray);
    }
    return flat;
  }, []);
};

const result = flatten(nestedArray, deep);

//   Method 4.
const emptyArray = [];
const flatArray = (array, newArray) => {
  for (let x of array) {
    if (Array.isArray(x)) {
      flatArray(x, newArray);
    } else {
      newArray.push(x);
    }
  }

  return newArray;
};

const result = flatArray(nestedArray, emptyArray);

//   Method 5 by using toString Or String Method. : NOTE : toString Or String Method converts array into a single string.
function flatArray(array) {
  //  After converting array into single string then we are splitting based on "," and then using map method to return strings as a number.
  //  Number inside map will convert digits which are in string into Number.
  const flattedArray = array.toString().split(",").map(Number);
  const ArrayFlatted = String(array).split(",").map(Number);

  return flattedArray;
}

const result = flatArray(nestedArray);

console.log(result, "result");

//  NOTE : Below Example shows how to convert array into a single string and convert back that string into original  array.
const array = [12, 13, 14, 15, "hi", "hello"];

let convertString = array.toString();

const backToArray = convertString.split(",").map((item) => {
  if (isNaN(Number(item))) {
    return item;
  }
  return Number(item);
});

console.log(convertString, "convertString", backToArray);
```

### 34. Remove Vowels from string.

```ts
const strings = "Hello World";
const vowels = ["a", "e", "o", "u", "i"];

function removeVowels(strings, vowels) {
  let consonants = "";

  for (let x of strings) {
    if (!vowels.includes(x.toLowerCase())) {
      consonants = consonants + x;
    }
  }

  return consonants;
}

const result = removeVowels(strings, vowels);

//    Method 2.   BY Regular Expression.

function removeVowels(strings) {
  return strings.replace(/[aeouiAEUOI]/g, "");
}

const result = removeVowels(strings);

console.log(result, "result");
```

### 35. Sum of digits of a number.

```ts
//                                    By Using Reduce Method
function sumOfDigits(number) {
  let arrayNumber = String(number).split("");

  const totalSum = arrayNumber.reduce((acc, curr) => {
    acc = acc + Number(curr);
    return acc;
  }, 0);

  return totalSum;
}

//                                  By Using Loop

function sumOfDigits(num) {
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

console.log(sumOfDigits(1287));
```

### 36. Count the number of digits of a number.

```ts
//  Method 1.
function countDigits(num) {
  const arrays = String(Math.abs(num)).split("");

  return arrays.length;
}

//    Method 2.

function countDigits(num) {
  num = Math.abs(num);
  let count = 0;
  do {
    count++;
    num = Math.floor(num / 10);
  } while (num > 0);
  return count;
}

console.log(countDigits(121)); // 3
console.log(countDigits(-1211413131)); // 10
```

### 37. Remove All Dots from given value

```ts
//       By Replace Method

const removeDecimal = (value) => {
  const reg = value.replace(/[.]/g, "");
  return reg;
};

//    By   ReplaceAll Method

const removeDecimal = (value) => {
  const reg = value.replaceAll(".", "");
  return reg;
};

//        By For Loop

const removeDecimal = (value) => {
  let removedDots = "";
  for (let x of value) {
    if (x !== ".") {
      removedDots = removedDots + x;
    }
  }
  return removedDots;
};

console.log(removeDecimal("22.334.788.3445.544"));
```

### 38. In a string, turn digits (1) into spelled words (one)

```ts
const replaceDigits = (str) => {
  return str
    .replace(/1/g, "one")
    .replace(/2/g, "two")
    .replace(/3/g, "three")
    .replace(/4/g, "four")
    .replace(/5/g, "five")
    .replace(/6/g, "six")
    .replace(/7/g, "seven")
    .replace(/8/g, "eight")
    .replace(/9/g, "nine")
    .replace(/0/g, "zero");
};

//           By For Loop

const object = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  0: "zero",
};

const replaceDigits = (value) => {
  let newStr = "";

  for (let x of value) {
    newStr = newStr + " " + object[x];
  }
  return newStr;
};

console.log(replaceDigits("1254346790"));
```

### 39. Hide every elements with "\*" except last 4 digits

```ts
const fruits = "2673-3342-3445-5449";
const len = fruits.length;
const citrus = fruits.slice(-4).padStart(len, "*");

console.log(citrus, "citrus");

//      By For Loop

const digits = "2673-3342-34457-5449";

const hideElement = (values) => {
  const len = values.length - 4;
  const lastElement = values.slice(-4);
  let newStr = "";

  for (let x = 0; x < len; x++) {
    newStr = newStr + "*";
  }

  return newStr + lastElement;
};

const result = hideElement(digits);

console.log(result, "result");
```

### 40. Hide every elements with "\*" except first 4 digits

```ts
const fruits = "2673-3342-3445-5449";
const len = fruits.length;
const citrus = fruits.slice(0, 4).padEnd(len, "*");

console.log(citrus, "citrus");
```

### 41. Remove full-stop, comma and spaces from a string

```ts
var str = "abc abc a, .aa 22.3333.4434.435";

var regex = /[.,\s]/g;

var result = str.replace(regex, "");

console.log(result);
```

### 42. How to find the most frequent word in a paragraph ?

```ts
`Functional Requirements`:
// - Words in the paragraph are not case sensitive.
// - The answer should be returned in lowercase. If the second argument is provided i.e. list of banned words then return the most frequent word that is not in the list of banned words.


const text = 'Bob hit a ball, the hit ball flew far after it was hit.'
const bannedWords = ['hit'];

const mostUsedWord=(textValue,nextWord='')=>{
    var regex = /[.,]/g;
    let frequent = 0
    let key = ''

    const splitText = textValue.replace(regex,"").split(" ")

    const object= splitText.reduce((acc,curr)=>{
        acc[curr] = (acc[curr] || 0) +1
        return acc
    },{})


//  If bannedWords is present then fetch 2nd highest frequent.
  for(let x in object){
    if(frequent<object[x] && !nextWord.includes(x)){
      frequent = object[x]
      key = x
    }
  }

  return key

 }


const answer = mostUsedWord(text);
// answer => hit

const answer = mostUsedWord(text, bannedWords);
// answer => ball


```

### 43. Implement a Credit Card Masker

- Functional Requirements

1. It should replace all but the 1st and last 4 digits in the provided sequence.
2. Should not mask input shorter than 6 characters.
3. Should not mask non-numeric characters.
4. Should return empty string for all other input types apart from string and number.

```ts
const maskify = (cardNumber) => {
  if (typeof cardNumber !== "number" && typeof cardNumber !== "string") {
    return "";
  }
  if ((typeof cardNumber === "number" || typeof cardNumber === "string") && cardNumber.length < 6) {
    return cardNumber;
  }
  cardNumber = String(cardNumber);

  let length = cardNumber.length;
  const firstChar = cardNumber.slice(0, 1);
  const lastChar = cardNumber.slice(length - 4, length);
  let loopingNumber = length - 4;
  let maskedOutput = "";
  for (let x = 1; x < loopingNumber; x++) {
    maskedOutput += isNaN(parseInt(cardNumber[x])) ? cardNumber[x] : "#";
  }

  return `${firstChar}${maskedOutput}${lastChar}`;
};

console.log(maskify("5512103073210694"));
// 5###########0694

console.log(maskify("4556-3646-0793-5616"));
// 4###-####-####-5616

console.log(maskify(""));
// ''

console.log(maskify("Devtools Tech"));
// Devtools Tech

console.log(maskify("S2k3i4p65p7y"));
// S#k#i#p#5p7y

console.log(maskify("82k3i4p65p7y1125"));
```

### 44. Make this function work using currying: add(4)(5)(7)(9)()

```ts
//    Currying

function add(a) {
  return function (b) {
    if (b) {
      return add(a + b);
    }
    return a;
  };
}

const result = add(4)(5)(7)(9)();
console.log(result, "result");

//                                                    Type 2. when more than one arguments are passed.
function curr(...a) {
  return function inner(...b) {
    if (b.length > 0) {
      let sumA = a.reduce((acc, curr) => acc + curr, 0);
      let sumB = b.reduce((acc, curr) => acc + curr, 0);
      return curr(sumA + sumB);
    } else {
      return Number(a);
    }
  };
}

const result = curr(7, 2)(7, 8)(9, 7)();
console.log(result, "result");
```

### 45. Make this function work : cal().add(10).sub(5).mult(20).div(2).result()

```ts
function cal() {
  let count = 0;

  function add(val1) {
    count = count + val1;
    return this;
  }

  function sub(val1) {
    count = count - val1;
    return this;
  }

  function mult(val1) {
    count = count * val1;
    return this;
  }

  function div(val1) {
    count = count / val1;
    return this;
  }

  function result() {
    return count;
  }

  return {
    add: add,
    sub: sub,
    mult: mult,
    div: div,
    result: result,
  };
}

const outcome = cal().add(10).sub(5).mult(20).div(2).result();

console.log(outcome, "outcome");
```

### 46. After flating this Object, get properties which is having values.

```ts
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
  country: {
    place: {
      state: {
        Area: "USA",
      },
      name: {
        of: {
          the: {
            game: {
              is: "GTA 6",
            },
          },
        },
      },
    },
  },
};

const nestedObjectFunction = (nestedObject) => {
  let newFlatObject = {};

  for (let x in nestedObject) {
    if (typeof nestedObject[x] === "object") {
      const data = nestedObjectFunction(nestedObject[x]);
      newFlatObject = { ...newFlatObject, ...data };
    } else {
      newFlatObject[x] = nestedObject[x];
    }
  }

  return newFlatObject;
};

const result = nestedObjectFunction(nestedObject);

// OR

const nestedObjectFunction = (nestedObject, newFlatObject = {}) => {
  for (let x in nestedObject) {
    if (typeof nestedObject[x] === "object") {
      nestedObjectFunction(nestedObject[x], newFlatObject);
    } else {
      newFlatObject[x] = nestedObject[x];
    }
  }

  return newFlatObject;
};

const result = nestedObjectFunction(nestedObject);

console.log(result, "result");

//  Result
// {
//   Area: "USA";
//   active: 67;
//   away: 13;
//   busy: 8;
//   date: "December 31, 2016";
//   id: 28802695164;
//   is: "GTA 6";
//   online: 80;
//   totalUsers: 99;
// }
```

### 47. Deep flatten object.

```ts
const flatten = (obj, prefix) => {
  //store the result
  let output = {};

  //iterate the object
  for (let k in obj) {
    let val = obj[k];

    //new key
    const newKey = prefix ? prefix + "." + k : k;

    //array and object both are object in js
    if (typeof val === "object") {
      // if it is array
      if (Array.isArray(val)) {
        //use rest & spread together to convert array to object
        const { ...arrToObj } = val;
        const newObj = flatten(arrToObj, newKey);
        output = { ...output, ...newObj };
      }
      //if it is object
      else {
        const newObj = flatten(val, newKey);
        output = { ...output, ...newObj };
      }
    }
    // normal value
    else {
      output = { ...output, [newKey]: val };
    }
  }

  return output;
};

const nested = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56,
    },
    Q: [1, 2],
  },
};

console.log(flatten(nested));

// Output:
// {
//   "A": "12"
//   "B": 23,
//   "C.O.L": 56,
//   "C.P": 23,
//   "C.Q.0": 1,
//   "C.Q.1": 2,
// }

//                               OR

const nest = (objects, prefix) => {
  let newObject = {};

  for (let key in objects) {
    let value = objects[key];
    let newKey = prefix ? prefix + "." + key : key;

    if (typeof value === "object") {
      let data = nest(value, newKey);

      newObject = { ...newObject, ...data };
    } else {
      newObject = { ...newObject, [newKey]: value };
    }
  }

  return newObject;
};

const result = nest(nested);

console.log(result, "restult");
```

### 48. Remove Only Object from an array.

```ts
const filterObjects = (arr) => {
  const newArray = [];

  for (let x of arr) {
    if (typeof x !== "object") {
      newArray.push(x);
    }
    if (x === null) {
      newArray.push(x);
    }
  }
  return newArray;
};

let arr = [123, "Prashant Yadav", "India", null, undefined, { abc: "xyz" }, { pqr: "stu" }];

console.log(filterObjects(arr));
//[123, 'Prashant Yadav', 'India', null, undefined]

//     Optmized Solution :

function removeObject(arr) {
  return arr.filter((item) => typeof item !== "object" || item === null || Array.isArray(item));
}
console.log(removeObject(arr));
```

### 49. Remove object from an array whose key:value pair matches.

```ts
let arr = [123, "Prashant Yadav", "India", null, { abc: "xyz" }, { pqr: "stu" }];

const filterObjects = (arr, key, value) => {
  const newArray = [];

  for (let x of arr) {
    if (x && x.hasOwnProperty(key) && x[key] === value) {
      continue;
    } else {
      newArray.push(x);
    }
  }
  return newArray;
};

//    Method 2. By Using filter method

const filterObjects = (arr, key, value) => {
  return arr.filter((item) => {
    if (item && item.hasOwnProperty(key) && item[key] === value) {
      return false;
    }
    return true;
  });
};

console.log(filterObjects(arr, "pqr", "stu"));

//[123, 'Prashant Yadav', 'India', null, {'abc': 'xyz'}]
```

### 50. How to merge objects in javascript

```ts

let obj1 = {
  name: 'prashant',
  age: 23,
}

let obj2 = {
  qualification: 'BSC CS',
  loves: 'Javascript'
}

- 1.  Using ... spread operator
// spread operators copies all the properties of the objects into another object.

let merge = {...obj1, ...obj2};

console.log(merge);

- 2. Using Object.assign() method
// Object.assign(target, source1, soure2, ...) method copies all the enumerable own property of source object to target object and returns the target object.
let merge = Object.assign({}, obj1, obj2);;



- 3. Using custom function to merge objects in a single object: We can  create custom function to merge two or more objects.

const merged=(...rest)=>{

 const mergedObject= rest.reduce((acc,curr)=>{
   for(let x in curr){
     acc[x] = curr[x]
   }
   return acc
 },{})


 return mergedObject
}


let merge = merged(obj1, obj2);


// - 4. we can do this bt using forEach method as well.
const merged=(...rest)=>{
     let mergedObject ={}

     rest.forEach((item)=>{
       mergedObject={...mergedObject,...item}
     })
 return mergedObject
}


let merge = merged(obj1, obj2);
console.log(merge);
```

### 51. Create a Flat version of a nested Object | Breadcrumbs Computation.

- Suppose, you are given a nested object from the backend and you need to create a flat version of the object that can be used for breadcrumbs.

```ts
const data = {
  name: "Devtools Tech",
  channel: {
    youtube: {
      link: "bit.ly/devtools-yt",
      name: "Devtools Tech",
      subscribe: "true",
    },
    platform: {
      link: "devtools.tech",
      resources: {
        pages: ["/questions", "/resources"],
      },
    },
  },
};

const transform = (object, prefixKey, sufixKey) => {
  let newObject = {};
  let prefix = prefixKey;

  for (let x in object) {
    let value = object[x];
    let newKey = sufixKey ? sufixKey + "_" + x : prefix + "_" + x;

    if (typeof value === "object") {
      if (Array.isArray(value)) {
        newObject = { ...newObject, [newKey]: value };
      } else {
        let flattedObject = transform(value, prefix, newKey);
        newObject = { ...newObject, ...flattedObject };
      }
    } else {
      newObject[newKey] = value;
    }

    //                   OR

    // const isObject = typeof value === "object" && !Array.isArray(value);
    // if (isObject) {
    //   let flattedObject = transform(value, prefix, newKey);
    //   newObject = { ...newObject, ...flattedObject };
    // } else {
    //   newObject[newKey] = value;
    // }
  }

  return newObject;
};

//                                                      OR

function transform(input, prefix, response = {}) {
  const keys = Object.keys(input);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const currentValue = input[key];
    const isObject = typeof currentValue === "object" && !Array.isArray(currentValue);

    if (isObject) {
      transform(currentValue, `${prefix}_${key}`, response);
    } else {
      response[`${prefix}_${key}`] = currentValue;
    }
  }

  return response;
}

const output = transform(data, "data");

/**  Output :
  {
    data_name: 'Devtools Tech',
    data_channel_youtube_link: 'bit.ly/devtools-yt',
    data_channel_youtube_name: 'Devtools Tech',
    data_channel_youtube_subscribe: 'true',
    data_channel_platform_link: 'devtools.tech',
    data_channel_platform_resources_pages: [ '/questions', '/resources' ]
  }
**/
```

### 52. capitalize first letter of each word and rest letters in smaller case.

```ts
const name = "sHaIK sALmaN";

function capitalize(givenName) {
  const splitName = givenName.split(" ").map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());

  return splitName;
}

const result = capitalize(name);
//  o/p : Shaik Salman
```

### 53. convert the url into query param by using object : 'www.abc.com/search' into 'www.abc.com/search?name=john&id=007&place=USA'

```ts
const urls = "www.abc.com/search";

const obj = { name: "john", id: 71, place: "USA" };

function queryParam(urls, obj) {
  const keys = Object.keys(obj);
  let newUrl = urls + "?";
  let keyLength = keys.length;
  for (let x = 0; x < keyLength; x++) {
    x === keyLength - 1 ? (newUrl = newUrl + keys[x] + "=" + obj[keys[x]]) : (newUrl = newUrl + keys[x] + "=" + obj[keys[x]] + "&");
  }
  return newUrl;
}

//    OR We can do by this as well

function queryParam(urls, obj) {
  let queryString = "";

  Object.keys(obj).forEach((item, index) => {
    let query = `${item}=${obj[item]}`;

    queryString = index === 0 ? queryString + "?" + query : queryString + "&" + query;
  });

  return urls + queryString;
}

const result = queryParam(urls, obj);
console.log(result, "result");

//  O/P  :   'www.abc.com/search?name=john&id=007&place=USA'
```

### 54. find if arrayOne 's items are lowercase version of arrayTwo items. put it in an object

```ts
const arrayOne = ["pancakes", "bacon", "juice", "eggs", "toast"];
const arrayTwo = ["PANCAKES", "BACON", "juice", "EGGS", "toast"];

function lowerCaseVersion(itemOne, itemTwo) {
  const lowerCasePresent = {};
  const lowerCaseNotPresent = {};

  for (let x of itemOne) {
    if (itemTwo.includes(x.toUpperCase())) {
      lowerCasePresent[x] = x.toUpperCase();
    } else {
      lowerCaseNotPresent[x] = x;
    }
  }

  return { lowerCasePresent, lowerCaseNotPresent };
}

const result = lowerCaseVersion(arrayOne, arrayTwo);

console.log(result, "result");
```

### 55. write a function to give chunk of item in an array based on K value

```ts
const arr = [1, 2, 3, 4, 5];
const k = 1;

function chunk(array, k) {
  let len = array.length;

  const chunkData = [];

  let initialValue = 0;
  let nextValue = k;
  for (let x = 0; x < len; x++) {
    if (array.slice(initialValue, nextValue).length === 0) {
      break;
    }
    chunkData.push(array.slice(initialValue, nextValue));
    initialValue = nextValue;
    nextValue = nextValue + k;
  }

  return chunkData;
}

const result = chunk(arr, k);

// O/P:
// 1 . when k is 1 :  [[1], [2], [3], [4], [5]]
// 2.  when k is 2  : [[1, 2], [3, 4], [5]]
// 3.  when k is 3  : [[1, 2, 3], [4, 5]]
// 4.  when k is 4  : [[1, 2, 3, 4], [5]]
// 5.  when k is 5 : [[1, 2, 3, 4, 5]]
console.log(result, "result");
```

### 56. write a function to give this output : Given a string "abcd", the desired output is "Aa-Bbb-Cccc-Ddddd".

```ts
const stringValue = "abcde";

function changeString(stringValue) {
  const splitString = stringValue.split("");
  let len = splitString.length;
  let newStringValue = "";

  function combineStrings(value, limit) {
    let combinedValue = "";
    for (let x = 0; x < limit; x++) {
      combinedValue = combinedValue + value;
    }
    return combinedValue.charAt(0).toUpperCase() + combinedValue.slice(1);
  }

  for (let x = 0; x < len; x++) {
    let result = combineStrings(splitString[x], x + 2);
    newStringValue = x === 0 ? newStringValue + result : newStringValue + "-" + result;
  }

  return newStringValue;
}

const result = changeString(stringValue);

//  OR instead of calling two for loop, we simply call one for loop and use repeat method.

//                                                         NOTE :
// The repeat() method of String values constructs and returns a new string which contains the specified number of copies of this string, concatenated together.

function changeString(stringValue) {
  const splitString = stringValue.split("");
  let len = splitString.length;
  let newStringValue = "";

  for (let x = 0; x < len; x++) {
    let repeatedWord = splitString[x].repeat(x + 2);
    let modifiedWord = repeatedWord.charAt(0).toUpperCase() + repeatedWord.slice(1);

    newStringValue = x === 0 ? newStringValue + modifiedWord : newStringValue + "-" + modifiedWord;
  }

  return newStringValue;
}

const result = changeString(stringValue);

console.log(result, "result");

### Other Way : using for loop only.


let str = "abcd"
function strings(str){

  let newStr = ''
  let len = str.length

  for(let x=0;x<len;x++){
    let strs =''

    for(let j=0;j<x+2;j++){
      strs = strs +str[x]
    }

    let newValue = strs.charAt(0).toUpperCase()+strs.slice(1)
    newStr =  newStr ? newStr+"-"+newValue : newStr+newValue
  }

  return newStr
}

console.log(strings(str))

```

### 57. Find the solution of following query.

```ts
// Suppose you have input like:

var skillsArray = [
  { skill: "css", user: "Bill" },
  { skill: "javascript", user: "Chad" },
  { skill: "javascript", user: "Bill" },
  { skill: "css", user: "Sue" },
  { skill: "javascript", user: "Sue" },
  { skill: "html", user: "Sue" },
];

// Answer >>>>>>>>>>              Convert it into result of the following form:
// [
//   { skill: 'javascript', user: [ 'Chad', 'Bill', 'Sue' ], count: 3 },
//   { skill: 'css', user: [ 'Sue', 'Bill' ], count: 2 },
//   { skill: 'html', user: [ 'Sue' ], count: 1 }
// ]

function convert(skillsArray) {
  const groupedValue = skillsArray.reduce((acc, curr) => {
    acc[curr.skill] = acc[curr.skill] ? [...acc[curr.skill], curr] : [curr];
    return acc;
  }, {});

  let newObject = [];

  for (let x in groupedValue) {
    let object = groupedValue[x].reduce((acc, curr) => {
      if (acc["skill"]) {
        acc = { ...acc, user: [...acc["user"], curr.user], count: acc["user"].length + 1 };
      } else {
        acc = { skill: curr.skill, user: [curr.user], count: curr.user ? 1 : 0 };
      }

      return acc;
    }, {});

    newObject.push(object);
  }

  return newObject.sort((a, b) => b.count - a.count); // sorting in descending order based on count
}
const result = convert(skillsArray);
console.log(result, "result");

//               By Using reduce method
function groupBySkill(array) {
  let newObject = array.reduce((result, { skill, user }) => {
    if (!result[skill]) {
      return { ...result, [skill]: { skill, user: [user], count: 1 } };
    }
    const obj = result[skill];
    return { ...result, [skill]: { ...obj, user: obj.user.concat(user), count: obj.count + 1 } };
  }, {});

  return Object.values(newObject);
}
console.log(groupBySkill(skillsArray));

//              By using reduce amd filter method
function groupBySkill(array) {
  return array
    .reduce((result, { skill, user }) => {
      const skillExists = result.filter((res) => res.skill === skill).length;

      if (!result.length || !skillExists) {
        return result.concat({ skill, user: [user], count: 1 });
      }
      return result.map((res) => {
        return skill === res.skill ? { ...res, user: res.user.concat(user), count: res.count + 1 } : res;
      });
    }, [])
    .sort((a, b) => (a.count < b.count ? 1 : -1));
}

console.log(groupBySkill(skillsArray));
```

### 58. implement infiniteCurrying with single arguments

```ts
function infiniteCurrying(func) {
  function recursiveCurry(...args) {
    return function (a) {
      if (!a) {
        return args.reduce((result, value) => result + value, 0);
      }
      return recursiveCurry(...args, a);
    };
  }

  return recursiveCurry();
}

const fn = infiniteCurrying();
console.log(fn(7)(8)(9)(6)());

//                           OR by using call method and a function passed as an arguments
function infiniteCurrying(func) {
  function recursiveCurry(...args) {
    return function (a) {
      if (!a) {
        return args.reduce((result, value) => {
          return func.call(func, result, value);
        });
      }
      return recursiveCurry(...args, a);
    };
  }
  return recursiveCurry();
}
const fn = infiniteCurrying((a, b) => a + b);
console.log(fn(7)(8)(9)());
```

### 59. implement infiniteCurrying with multiple arguments.

```ts
//  1.                               By using reduce method.
function infiniteCurryingWithVariableArg() {
  function recursiveCurry(...args) {
    return function (...a) {
      if (!a.length) {
        return args.reduce((result, value) => {
          return args.reduce((result, value) => result + value, 0);
        });
      }
      return recursiveCurry(...args, ...a);
    };
  }

  return recursiveCurry();
}

const fn = infiniteCurryingWithVariableArg();
console.log(fn(7, 2)(7, 8)(9, 7)());

// 2.                                 OR by using call method and a function passed as an arguments.
function infiniteCurryingWithVariableArg(func) {
  function recursiveCurry(...args) {
    return function (...a) {
      if (!a.length) {
        return args.reduce((result, value) => {
          return func.call(func, result, value);
        });
      }
      return recursiveCurry(...args, ...a);
    };
  }
  return recursiveCurry();
}

const fn2 = infiniteCurryingWithVariableArg((a, b) => a + b);
console.log(fn2(7, 2)(7, 8)(9, 7)());
```

### 60. build a hierarchical object tree.each node can only have one parent and can have any number of children.

A visualization of an example tree we can work with is as follows :

<p align="center">
  <img src="../Assests/Tree_structure.png.webp" height="584" width="700" background='rgba(0, 255, 0, 1)' loading="lazy"/>
</p>

```ts
const flatArray = [
  { id: 1, parentId: 3 },
  { id: 3, parentId: 8 },
  { id: 4, parentId: 6 },
  { id: 6, parentId: 3 },
  { id: 7, parentId: 6 },
  { id: 8, parentId: null },
  { id: 10, parentId: 8 },
  { id: 13, parentId: 14 },
  { id: 14, parentId: 10 },
];

//  NOTE: Here we are directly manipulating the flatArray by using forEach.
flatArray.forEach((f) => {
  //  Here we are first adding child property to each item and assigning values to it.
  f.children = flatArray.filter((g) => g.parentId === f.id);
});

//  Here we are getting the parent node only (Node which does not have any parent).
var resultArray = flatArray.filter((f) => f.parentId == null);
console.log(resultArray);

//                                  Method 2
// Create root for top-level node(s)
const root = [];

flatArray.forEach((node) => {
  // No parentId means top level
  if (!node.parentId) return root.push(node);

  // Insert node as child of parent in flatArray array
  const parentIndex = flatArray.findIndex((el) => el.id === node.parentId);
  if (!flatArray[parentIndex].children) {
    return (flatArray[parentIndex].children = [node]);
  }

  flatArray[parentIndex].children.push(node);
});

console.log(root);



//                                             optimization  way of method 2, above example :

The findIndex function we use each time through the loop isn’t a big deal for the small example tree, but this could actually get expensive if we’re working with a large tree. Let’s create an object to cache found parent locations.

// Create root for top-level node(s)
const root = [];
// Cache found parent index
const map = {};

flat.forEach(node => {
  // No parentId means top level
  if (!node.parentId) return root.push(node);

  // Insert node as child of parent in flat array
  let parentIndex = map[node.parentId];
  if (typeof parentIndex !== "number") {
    parentIndex = flat.findIndex(el => el.id === node.parentId);
    map[node.parentId] = parentIndex;
  }

  if (!flat[parentIndex].children) {
    return flat[parentIndex].children = [node];
  }

  flat[parentIndex].children.push(node);
});

console.log(root);


//   3rd  Way
const createDataTree = dataset => {
  const hashTable = Object.create(null);
  dataset.forEach(aData => hashTable[aData.id] = {...aData, childNodes: []});
  const dataTree = [];
  dataset.forEach(aData => {
    if(aData.parentId) hashTable[aData.parentId].childNodes.push(hashTable[aData.id])
    else dataTree.push(hashTable[aData.id])
  });
  return dataTree;
};

const result = createDataTree(flatArray)
console.log(result,'result')



//  4Th Way

// There is an efficient solution if you use a map-lookup. If the parents always come before their children you can merge the two for-loops. It supports multiple roots. It gives an error on dangling branches, but can be modified to ignore them. It doesn't require a 3rd-party library. It's, as far as I can tell, the fastest solution.

function list_to_tree(list) {
  var map = {}, node, roots = [], i;

  for (i = 0; i < list.length; i++) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  //   after initializing
  for (i = 0; i < list.length; i++) {
    node = list[i];
    if (node.parentId) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}


console.log(list_to_tree(flatArray));


- The Logic

We can simply iterate through the array and assign each object to the children array of its parent object. This may not make intuitive sense, but consider this logic:

1. Object 3 is assigned to the children array of object 8
2. Object 6 is assigned to the children array of object 3
3. The Object 3 that was assigned to the children array of object 8 is really just a reference to Object 3 in memory… meaning its children array will have the Object 6 reference.
4. This logic extends to the entire array, meaning we just need to go through the array once to build out our tree!
```

### 61. Reverse Strings

```ts
-1. Reverse String.

1. Soulution.
const str = "JavaScript is awesome"

function reverseString(str){
  let reverse=''
  for(let x of str){
    reverse = x+reverse
  }
  return reverse
}
const result = reverseString(str)

//          OR
function reverseString(str){
  let reverse=''
  let len = str.length-1
  for(let x=len;x>=0;x--){
    reverse = reverse+str[x]
  }
  return reverse
}

const result = reverseString(str)
console.log(result)

```

### 62. String Casing

```ts
// ---------------------------- capitalize -------------------------

function capitalize(string) {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : string;
}
console.log(capitalize("javascript is awesome!"));

// ---------------------------- toUpperCase -------------------------
const toUpperCase = (value) => {
  return typeof value === "string" ? value.toUpperCase() : value;
};
//                                 OR
function toUpperCase(string) {
  let resultString = "";
  for (let char of string) {
    const charCode = char.charCodeAt();
    console.log(charCode, "charCode");
    if (97 <= charCode && charCode <= 122) {
      resultString += String.fromCharCode(charCode - 32);
    } else {
      resultString += char;
    }
  }
  return resultString;
}
console.log(toUpperCase("javascript is awesome!"));

// ---------------------------- toLowerCase -------------------------

const toLowerCase = (value) => {
  return typeof value === "string" ? value.toLowerCase() : value;
};
//                            OR
function toLowerCase(string) {
  let resultString = "";
  for (let char of string) {
    const charCode = char.charCodeAt();
    if (65 <= charCode && charCode <= 90) {
      resultString += String.fromCharCode(charCode + 32);
    } else {
      resultString += char;
    }
  }
  return resultString;
}
console.log(toLowerCase("JAVASCRIPT IS AWESOME!"));

// ---------------------------- toSnakeCase -------------------------
const toSnakeCase = (value) => {
  return value.toLowerCase().split(" ").join("_");
};
console.log(toSnakeCase("JAVASCRIPT IS AWESOME!"));

// ---------------------------- toStartCase -------------------------
const toStartCase = (value) => {
  return value
    .toUpperCase()
    .split(" ")
    .map((item) => item.charAt(0) + item.slice(1).toLowerCase())
    .join(" ");
};

console.log(toStartCase("javascript is awesome!"));
```

### 63. Take number from the user, reverse it and add it to itself. If the sum is not a palindrome then repeat the procedure until you get a palindrome. and return its count

```ts
let value = 37; // 2 count
let value2 = 7325; // 5 count
let value = 78; // 4 count

function reverse(value, itValue = 0) {
  let iteration = itValue;
  let revNumber = Number([...String(value)].reverse().join(""));
  let totalSum = String(Number(value) + Number(revNumber));

  let palindrome = [...totalSum].reverse().join("");

  if (palindrome === totalSum) {
    iteration = iteration + 1;
    return `${iteration} ${totalSum}`;
  } else {
    iteration++;
    let data = reverse(totalSum, iteration).split(" ");
    iteration = Number(data[0]);
    totalSum = Number(data[1]);
  }

  return `${iteration} ${totalSum}`;
}

const result = reverse(value);
console.log(result, "result");

- For example, If 7325 is input number, then
1. 7325 (Input Number) + 5237 (Reverse Of Input Number) = 12562
2. 12562 + 26521 = 39083
3. 39083 + 38093 = 77176
4. 77176 + 67177 = 144353
5. 144353 + 353441 = 497794 (Palindrome)

In this particular case, we got a palindrome (497794) after 5th addition. This method gives palindrome in few steps for almost all of the integers.
```

### 64. Implement a function to read a field inside a nested object.In this question, you need to implement a function read that takes two parameters:

- read(collection, property)

1. collection: The top level parent object in which we need to find the field.
2. property: The path of the field we need to find/read.
3. Expected Output: field value if field exists else undefined.

```ts
const collection = {
  a: {
    b: {
      c: {
        d: {
          e: 2,
        },
      },
    },
  },
};

//                         Method.1 By first deep flatting the object.

function read(objects, stringValue) {
  const flatNestedObject = (objects, prefix) => {
    let newObject = {};

    for (let key in objects) {
      let value = objects[key];
      let newKey = prefix ? prefix + "." + key : key;

      if (typeof value === "object") {
        let flatData = flatNestedObject(value, newKey);

        newObject = { ...newObject, ...flatData };
      } else {
        newObject = { ...newObject, [newKey]: value };
      }
    }

    return newObject;
  };

  const nestedObject = flatNestedObject(objects);

  return nestedObject[stringValue];
}

// should return 2
let result = read(collection, "a.b.c.d.e");

// should return undefined
let result = read(collection, "a.b.c.f");

console.log(result, "result >>>>>>");

//     Method 2.  By using built-in reduce method.

function read(collection, property) {
  return property.split(".").reduce((acc, current) => {
    return acc ? acc[current] : undefined;
  }, collection);
}

// should return 2
let result = read(collection, "a.b.c.d.e");

// should return undefined
let result = read(collection, "a.b.c.f");

console.log(result, "result >>>>>>");

//              Method 3. By using for loop.  One possible implementation could be:

function read(collection, property) {
  const isCollectionInvalid = !collection || typeof collection !== "object";
  const isPropertyInvalid = !property || !property.trim().length || typeof property !== "string";

  if (isCollectionInvalid || isPropertyInvalid) {
    return undefined;
  }
  let path = property.split(".").filter(Boolean);

  for (let key of path) {
    let currentItem = collection[key];

    if (currentItem) {
      //  Changing the existing object.
      collection = currentItem;
    } else {
      return undefined;
    }
  }

  return collection;
}

let result = read(collection, "a.b.c.d.e");

console.log(result, "result");

//   OR
//  This approach is very good as compared to all above solution, because if user give input = "a.b.c.d.[e]" then above approaches will throw error or undefined
//  But this below solution handled all those solution.

function read(collection, property) {
  const isCollectionInvalid = !collection || typeof collection !== "object";
  const isPropertyInvalid = !property || !property.trim().length || typeof property !== "string";

  if (isCollectionInvalid || isPropertyInvalid) {
    return undefined;
  }

  // cleaning the property and splitting it
  let path = property.replaceAll("[", ".");

  path = path.replaceAll("]", ".");
  path = path.split(".").filter(Boolean);

  let i;
  let currentKey;
  let currentItem = collection;

  for (i = 0; i < path.length; i++) {
    currentKey = path[i];

    // escape condition
    // if the currentKey doesn't exists in the currentItem
    // then return undefined
    if (!Object.prototype.hasOwnProperty.call(currentItem, currentKey)) {
      currentItem = undefined;
      break;
    }

    // updating currentItem
    currentItem = currentItem[currentKey];
  }

  // return the value
  return currentItem;
}

let result = read(collection, "a.b.c.d.e");
let result2 = read(collection, "a.b.c.d.[e]");
let result3 = read(collection, "a.[b].c.[d].[e]");

console.log(result, result2, result3);
//  O/P : 2
```

### 65. convert this string "a.b.c.d.e" into object of tree.

```ts
// const output = {
//   a: {
//     b: {
//       c: {
//         d: {
//           e: 2
//         }
//       }
//     }
//   }
// }

//                       Method 1.

const keys = "a.b.c.d.e";
const firsName = 2;
var tempObject = {};
var container = tempObject;
keys.split(".").forEach((k, i, values) => {
  container = container[k] = i == values.length - 1 ? firsName : {};
});
console.log(tempObject, "container");

//                                         Method 2.
// const output = {
//   a: {
//     b: {
//       c: {
//         d: {
//           e: {}
//         }
//       }
//     }
//   }
// }
function createObject(...pathes) {
  return pathes.reduce(function (obj, path) {
    path.split(".").reduce((obj, key) => (obj[key] = obj[key] || {}), obj);
    return obj;
  }, {});
}

// Some tests
console.log(createObject("a.b.c.d.e"));

//                                      Method 3.

var str = "a.b.c.d.e",
  obj = {};

str.split(".").reduce(function (r, a) {
  r[a] = r[a] || {};
  return r[a];
}, obj);

console.log(obj, "obj");

//                                                For understanding use this,
//  Here we are passing the reference of {a:{}} to obj.
// we have three variables: d, obj, and t. Let's break down what's happening:
// let d = {};: An empty object {} is created and assigned to the variable d.
// let obj = d;: The variable obj is assigned the value of d, which is the empty object {}. This means that obj now points to the same object as d.
// let t = obj["a"] = {};: This line is where the magic happens.
// Here's what's happening in this line:

// obj["a"] is trying to access the property a of the object obj. Since obj is an empty object, it doesn't have a property a yet.
// The assignment obj["a"] = {} creates a new property a on the object obj and assigns it an empty object {} as its value. This is equivalent to doing obj.a = {}.
// The expression obj["a"] = {} returns the assigned value, which is the empty object {}.
// The variable t is assigned the result of the expression, which is the empty object {}.

let d = {};
let obj = d;

let t = (obj["a"] = {});
console.log(t, "t", d);
obj = t;

//  obj.game='hh'
//  so now after passing reference of object {a:{}} to obj
//  which means obj is now {a:{}}, if we do some changes likes this
//  obj.game='gta' then output will come like =  a:{game:'gta'}

console.log(obj, "obj", d);

//  Now here as obj is {a:{}} (object),if we add anything to obj
//  then it means we are adding to {a:{}}. so if do like  obj['b']={} then
//  it means we are adding b:{} inside {a:{}}.it will look like =  { a:{ b:{} } }
let ta = (obj["b"] = {});
console.log(ta, "ta", d);
//  and now here again we passing the reference of  { a:{ b:{} } } to obj.
//  so if we add anything then it will add inside b:{} which is inside {a:{}}.
//  and it is something like
// obj['a']={}
// obj['a']['b']={}
// obj['a']['b']['c']={}}
// so on. Remember a:{} is an object that's why are able to add b inside it. its value has to be an object.

obj = ta;
console.log(obj, "obj", d);

###
- Below Is An Example.
let d={}
let obj=d

obj = obj['a']= (obj['a'] || {} )
//  Note : Here obj will return as empty {} object which is a reference a:{} object and d will return {a:{}}.
console.log(obj,'obj 11111111111111',d)
console.log(obj===d.a)// true
console.log(obj===d)// false
//  So now if you change like : then d will return {a:{b:{}}} and obj will return {b:{}} because obj was holding the reference of a:{}.
// so change in a.b={} will reflect in obj as b:{}
d.a.b={}
console.log(obj,'<<<<<<d >>>>>',d)

// when you assigned c = c["a"] = {}, you created a new object and assigned it to the property a of c (which was still pointing to the original object d). This created a new reference to the nested object, which is still held by d.

// In other words, d still has a reference to the nested object because it was created as a property of d itself, not because c is still pointing to it. The assignment c = c["a"] only updated the c variable to point to the new object, but didn't change the fact that d still holds a reference to it.


###
obj = obj['b']= (obj['b'] || {} )
console.log(obj,'obj 2222222222222',d)
###

obj = obj['c']= (obj['c'] || {} )
console.log(obj,'obj 33333333333333333',d)

### Exaplanation.
// 1. let d = {}: Creates an empty object d.
// 2. let obj = d: Assigns the reference to d to obj. Both d and obj now point to the same empty object.
// 3. obj = obj['a'] = (obj['a'] || {}): This line is a bit tricky. It's using the OR operator (||) to create a new object if obj['a'] is falsy (i.e., undefined). If obj['a'] is already an object, it will be assigned to itself, effectively doing nothing. The assignment obj = obj['a'] then updates the obj variable to point to the newly created object (or the existing one if it was already there). So, obj now points to the object at d.a.
// 4. obj = obj['b'] = (obj['b'] || {}): Same logic as above. obj now points to the object at d.a.b.
// 5. obj = obj['c'] = (obj['c'] || {}): Same logic again. obj now points to the object at d.a.b.c.
// 6. Finally, when you log obj and d, you'll see that obj points to the innermost object d.a.b.c, while d still points to the original empty object.
// 7. And obj points to the innermost object d.a.b.c, which is an empty object {}.
//  So, to summarize: the code creates a nested object structure by assigning new objects to properties of the original object, and the obj variable is updated to point to the innermost object at each step.
```

### 66. Zipping two or more arrays refers to combining their elements into a single array of arrays.

```ts
function zipArrray(...arrays) {
  let zipped = [];

  const maxLength = Math.max(...arrays.map((x) => x.length));
  const arraysLength = arrays.length;

  for (let x = 0; x < maxLength; x++) {
    let newArray = [];

    for (let y = 0; y < arraysLength; y++) {
      newArray.push(arrays[y][x]);
    }

    zipped.push(newArray);
  }

  return zipped;
}

const result = zipArrray(["a", "b"], [1, 2], [true, "false"]); // OutPut :  [['a', 1, true], ['b', 2, false]]
const result2 = zipArrray(["a"], [1, 2], [true, false]); // OutPut :  [['a', 1, true], [undefined, 2, false]]

//                                   By 2nd Method.
const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map((x) => x.length));
  return Array.from({ length: maxLength }).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
  });
};

zip(["a", "b"], [1, 2], [true, false]); // [['a', 1, true], ['b', 2, false]]
zip(["a"], [1, 2], [true, false]); // [['a', 1, true], [undefined, 2, false]]

//                                   By Using Reduce Method.
function zipArrray(...arrays) {
  const maxLength = Math.max(...arrays.map((x) => x.length));

  const zipped = Array(maxLength)
    .fill(1)
    .reduce((acc, curr, index) => {
      acc.push(
        arrays.reduce((accumulator, current) => {
          accumulator.push(current[index]);
          return accumulator;
        }, [])
      );

      return acc;
    }, []);
  return zipped;
}

const result = zipArrray(["a", "b"], [1, 2, 3], [true, "false"]);
```

### 67. UnZipping two or more arrays. It is just reverse of above question.

```ts
const zipped = [
  ["a", 1, true],
  ["b", 2, "false"],
]; // O/P : [["a", "b"], [1, 2], [true, "false"]]

const zippedTwo = [
  ["a", 1, true],
  ["b", 2, 3, 5],
]; // O/P : [["a", "b"], [1, 2], [true, 3], [undefined, 5]]

- Using For Loop
function unZippedArray(zipped) {
  const maxLength = Math.max(...zipped.map((x) => x.length));
  let zippedLength = zipped.length;
  let UnZipped = [];

  for (let x = 0; x < maxLength; x++) {
    let newArray = [];

    for (let y = 0; y < zippedLength; y++) {
      newArray.push(zipped[y][x]);
    }

    UnZipped.push(newArray);
  }

  return UnZipped;
}

const result = unZippedArray(zippedTwo);
console.log(result, "result");

- By Using Reduce Method.

function unZippedArray(zipped) {
  const maxLength = Math.max(...zipped.map((x) => x.length));

  const zippedArray = Array(maxLength)
    .fill(1)
    .reduce((acc, curr, index) => {
      const array = zipped.reduce((accumulator, current) => {
        accumulator.push(current[index]);
        return accumulator;
      }, []);

      acc.push(array);
      return acc;
    }, []);

  return zippedArray;
}

const result = unZippedArray(zipped);
console.log(result, "result");

- By 3rd Way

const unzip = (arr) =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map((x) => x.length)),
    }).map((x) => [])
  );

const result = unzip([
  ["a", 1, true],
  ["b", 2, false],
]); // [['a', 'b'], [1, 2], [true, false]]
const resultTwo = unzip([
  ["a", 1, true],
  ["b", 2],
]); // [['a', 'b'], [1, 2], [true]]
```

### 68. Zip array into an object.

```ts
let array1 = ["a", "b", "c"];
let array2 = [1, 2];

let data1 = ["a", "b"];
let data2 = [1, 2, 3];

//    Method 1. Buy using for loop.
function zippingObject(...array) {
  let zippObject = {};

  const maxLength = Math.max(...array.map((x) => x.length));
  let arrayLength = array.length;
  for (let x = 0; x < maxLength; x++) {
    for (let y = 1; y < arrayLength; y++) {
      zippObject[array[0][x]] = array[y][x];
    }
  }

  return zippObject;
}

const result = zippingObject(array1, array2); // O/P : {a: 1, b: 2, c: undefined}
console.log(result, "resultresult");

//                                                Method 2. By using Reduce method.
function zippingObject(...array) {
  const maxLength = Math.max(...array.map((x) => x.length));
  let arrayLength = array.length;
  const zipped = Array(maxLength)
    .fill(1)
    .reduce((acc, curr, index) => {
      for (let y = 1; y < arrayLength; y++) {
        acc[array[0][index]] = array[y][index];
      }
      return acc;
    }, {});

  return zipped;
}

const result = zippingObject(data1, data2); // O/P : {a: 1, b: 2,undefined:3}
console.log(result, "resultresult");

//                               3RD Way . paasing

const zipObject = (props, values) => props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {});

zipObject(["a", "b", "c"], [1, 2]); // {a: 1, b: 2, c: undefined}
zipObject(["a", "b"], [1, 2, 3]); // {a: 1, b: 2}
```

### 69. Unzip object into array. Reverse of above example.

```ts
let object1 = { a: 1, b: 2, c: 3 }; // O/P :  [['a', 'b', 'c'], [1, 2, 3]]

let object2 = { a: 1, b: 2 }; //  O/P : [['a', 'b'], [1, 2]]

//                     1. Way
function unzipObject(object) {
  let keys = Object.keys(object);
  let values = Object.values(object);

  return [keys, values];
}
console.log(unzipObject(object1));

//                     2. Way
const unzipObject = (obj) => [Object.keys(obj), Object.values(obj)];

console.log(unzipObject(object2));
```

### 70. Get All the name of tree object in an array.

```ts
//  Use Recurssion
const tree = {
  name: "John",
  children: [
    {
      name: "Sohn",
      children: [],
    },
    {
      name: "Kohn",
      children: [
        {
          name: "Rohn",
          children: [],
        },
        {
          name: "Pohn",
          children: [
            {
              name: "Michael",
              children: [],
            },
            {
              name: "Cena",
              children: [{ name: "Japan", children: [] }],
            },
          ],
        },
      ],
    },
  ],
};

function childrenName(obj) {
  let newObje = [];

  for (let child in obj) {
    if (Array.isArray(obj[child]) && obj[child].length !== 0) {
      for (let childs of obj[child]) {
        if (childs.children.length === 0) {
          newObje.push(childs.name);
        } else {
          let data = childrenName(childs);

          newObje.push(...data);
        }
      }
    } else {
      newObje.push(obj["name"]);
    }
  }

  return newObje;
}

const result = childrenName(tree);

console.log(result, "result");
```

### 71. Print all the childrens of John

```ts
//                         Using Recurssion.

function printChildrenRecursive(t) {
  if (t.children.length === 0) {
    return;
  }
  t.children.forEach((child) => {
    console.log(child.name);
    printChildrenRecursive(child);
  });
}

const tree = {
  name: "John",
  children: [
    {
      name: "Jim",
      children: [],
    },
    {
      name: "Zoe",
      children: [
        { name: "Kyle", children: [] },
        { name: "Sophia", children: [] },
      ],
    },
  ],
};

printChildrenRecursive(tree);
```

### 72. Write a function to get the sum of all salaries.

```ts
let company = {
  sales: [
    {
      name: "John",
      salary: 1000,
    },
    {
      name: "Alice",
      salary: 1600,
    },
  ],

  development: {
    sites: [
      {
        name: "Peter",
        salary: 2000,
      },
      {
        name: "Alex",
        salary: 1800,
      },
    ],

    internals: [
      {
        name: "Jack",
        salary: 1300,
      },
    ],
  },
};

1 - Way by using total variable inside function
  function sumOfAllSalaries(companies) {
    let total = 0;

    for (let x in companies) {
      if (Array.isArray(companies[x])) {
        for (let y of companies[x]) {
          total = total + y.salary;
        }
      } else {
        let data = sumOfAllSalaries(companies[x]);
        total = total + data;
      }
    }

    return total;
  };

let result = sumOfAllSalaries(company);
console.log(result, "result");

- 2.  by putting total as paramter in function.

function sumOfAllSalaries(companies,total=0){
  for(let x in companies){
    if(Array.isArray(companies[x])){
      for(let y of companies[x]){
        total = total+y.salary
      }
    }else{
     return sumOfAllSalaries(companies[x],total)
    }
  }
  return total

}

let resultTwo = sumOfAllSalaries(company)
console.log(resultTwo,'resultTwo')

- 3 By using Reduce method.

// The function to do the job
function sumSalaries(department) {
  if (Array.isArray(department)) { // case (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
  } else { // case (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
    }
    return sum;
  }
}

console.log(sumSalaries(company)); // 7700
```

### 73. Find The Right Product.

```ts
//  We are finding right product of every element. Ex:  right product of 1 is [2,3,4,5] which is 120
const arr = [1, 2, 3, 4, 5];

//  O/P :  [120, 60, 20, 5, 1]

const findRightProduct = (arrays = []) => {
  let product = [];

  arrays.forEach((item, index, arr) => {
    product.push(index < arr.length - 1 ? arr.slice(index + 1).reduce((acc, curr) => acc * curr) : 1);
  });

  return product;
};

const result = findRightProduct(arr);
console.log(result, "result >>>>");

//   Method 2 . By Using For Loop.

const findRightProduct = (arrays = []) => {
  let product = 1;
  let length = arrays.length;
  let res = new Array(length);

  res[length - 1] = 1;

  for (let i = length - 2; i >= 0; i--) {
    product = product * arr[i + 1];

    res[i] = product;
  }
  return res;
};

const result = findRightProduct(arr);

console.log(result, "result >>>>");
```

### 74. Get object value from string path

- Implement a method in Javascript that will take an object and a string or array of strings as a path and return the value at that path. If nothing is found return undefined.
  `We can implement this method using the following steps.`

1. Check the type of path, if it is an array of strings, concatenate it and form a string.
2. Traverse the string and get the actual values from it ignoring the special characters like [, ], and ..
3. Once we have the exact path, deeply traverse the input nested object to find the value.

```ts
const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

const get = (obj, path) => {
  // if path is not a string or array of string
  if (path === "" || path.length == 0) return undefined;

  // if path is an array, concatenate it and form a string
  // to handle a single case of string
  if (Array.isArray(path)) path = path.join(".");

  // filter out the brackets and dot
  let exactPath = [];
  for (let i = 0; i < path.length; i++) {
    if (path[i] !== "[" && path[i] !== "]" && path[i] !== ".") {
      exactPath.push(path[i]);
    }
  }

  // get the value of the path in the sequence
  const value = exactPath.reduce((source, path) => source[path], obj);

  // if not found return undefined
  return value ? value : undefined;
};

console.log(get(obj, "a.b.c"));
console.log(get(obj, "a.b.c.0"));
console.log(get(obj, "a.b.c[1]"));
console.log(get(obj, ["a", "b", "c", "2"]));
console.log(get(obj, "a.b.c[3]"));
console.log(get(obj, "a.c"));

// Output:
// A. [1,2,3]
// B. 1
// C. 2
// D. 3
// E. undefined
// F. 'undefined'
```

### 75. Write a function printList(list) that outputs list items in an array.

```ts
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

function printList(list) {
  //  Note: here we have assign the reference of list object to temp, so any changes in temp will reflect in list as well.
  //  but inside while loop we are assigning new objects to temp so now list object will not reflect any changes, As it losed its refernce.
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }
}
printList(list);

//   Using Recursion
function printList(list) {
  let arr = [];
  for (let x in list) {
    if (typeof list[x] === "object") {
      let objectValue = printList(list[x]);
      arr.push(...objectValue);
    } else {
      arr.push(list[x]);
    }
  }

  return arr;
}

console.log(printList(list));
```

### 76. Have the function ArithGeo(arr) take the array of numbers \*

- stored in arr and return the string "Arithmetic" if the \*
- sequence follows an arithmetic pattern or return "Geometric" \*
- if it follows a geometric pattern. If the sequence doesn't \*
- follow either pattern return -1. An arithmetic sequence is \*
- one where the difference between each of the numbers is \*
- consistent, where as in a geometric sequence, each term after\*
- the first is multiplied by some constant or common ratio. \*
- Arithmetic example: [2, 4, 6, 8] and \*
- Geometric example: [2, 6, 18, 54]. Negative numbers may be \*
- entered as parameters, 0 will not be entered, and no array \*
- will contain all the same elements. \*

```ts
const Input1 = [5, 10, 15];
// Output 1: Arithmetic

const Input2 = [2, 4, 16, 24];
// Output 2: -1

const Input3 = [2, 4, 6, 8];
//  Output 3: "Arithmetic"

const Input4 = [2, 6, 18, 54];
//  Output 4: "Geometric"

const array = [2, 4, 16, 24];

const ArithGeo = (array) => {
  let Arithmetic = array[1] - array[0];
  let Geometric = array[1] / array[0];

  let lengthOfArray = array.length;
  for (let x = 2; x < lengthOfArray; x++) {
    if (array[x] - array[x - 1] !== Arithmetic) {
      Arithmetic = 0;
    }

    if (array[x] / array[x - 1] !== Geometric) {
      Geometric = 0;
    }
  }

  if (Geometric) {
    return "Geometric";
  } else if (Arithmetic) {
    return "Arithmetic";
  } else {
    return -1;
  }
};

const result1 = ArithGeo(Input1);
const result2 = ArithGeo(Input2);
const result3 = ArithGeo(Input3);
const result4 = ArithGeo(Input4);
```

### 77. Have the function StringChanges(str) take the str parameter \*

- being passed, which will be a string containing letters from \*
- the alphabet, and return a new string based on the following \*
- rules. Whenever a capital M is encountered, duplicate the \*
- previous character (then remove the M), and whenever a \*
- capital N is encountered remove the next character from the \*
- string (then remove the N). All other characters in the \*
- string will be lowercase letters. \*
- For example: "abcNdgM" should return "abcgg". \*
- The final string will never be empty. \*

```ts


const Input1 "MrtyNNgMM"
// - Output 1: rtyggg
-
const  Input2 ="oMoMkkNrrN"
// - Output 2: ooookkr

const Input3 = "abcNdgM"
// - Output 3 : "abcgg"


function StringChanges(string) {
    let splitCharacters = string.split("");
    for(let i=0; i<splitCharacters.length; i++){

        if(splitCharacters[i] === "N") {
            splitCharacters.splice(i, 2);
            i = i - 2;
        }else if(splitCharacters[i] === "M") {

            if(i === 0) {
                splitCharacters.splice(i, 1)
                i--
            }else {
                let j = i;

                //  NOTE : WE can use this while loop to handle more edge cases but for the time being we can also go without while loop.

                // while(splitCharacters[j-1] === 'M'){
                //    j--;
                //    if(j<=0){
                //      continue;
                //    }
                // }

                 splitCharacters[i] = splitCharacters[j-1]
            }
        }
    }

    return splitCharacters.join("");
}

console.log(StringChanges(Input1);
console.log(StringChanges(Input2);
```

### 78. Comparing only arrays (Single and Multi dimensional).

We will create our own custom function which will compare only two different arrays.

In this, we will check

If both the inputs are array or not.
If the current element is array (muti-dimensional) then recursively check its elements with the corresponding element.
Else compare both the elements and return the result.

```js
let a = [1, 2, 3, 4, 4];
let b = [1, 2, 3, 4, 4];

//  1st method.

function compareArray(a, b) {
  if (a === undefined || a === null || b === undefined || b === null) {
    return false;
  }
  if (!Array.isArray(a) && !Array.isArray(b)) {
    console.log(Array.isArray(a), "a");
    console.log(Array.isArray(b), "b");
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }
  let isCondition = a.sort((a, b) => a - b).toString() === b.sort((a, b) => a - b).toString();

  if (isCondition) {
    return true;
  } else {
    return false;
  }
}

let result = compareArray(a, b);

console.log(result, "result");

// =================================================================================

//            2nd method

let a = [1, 2, [3, 4, 5]];
let b = [1, 2, [5, 4, 3]];

function compareArray(a, b) {
  if (a === undefined || a === null || b === undefined || b === null) {
    return false;
  }
  if (!Array.isArray(a) && !Array.isArray(b)) {
    console.log(Array.isArray(a), "a");
    console.log(Array.isArray(b), "b");
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  const flatA = a
    .toString()
    .split(",")
    .map((item) => parseInt(item))
    .sort((a, b) => a - b);
  const flatB = b
    .toString()
    .split(",")
    .map((item) => parseInt(item))
    .sort((a, b) => a - b);

  if (flatA.toString() !== flatB.toString()) {
    return false;
  }

  return true;
}

let result = compareArray(a, b);

console.log(result, "result");

// =======================================================================

//            3rd method  using recursion

let a = [2, 1, [3, 4, 5]];
let b = [1, 2, [5, 4, 3]];

function compareArray(a, b) {
  if (a === undefined || a === null || b === undefined || b === null) {
    return false;
  }
  if (!Array.isArray(a) && !Array.isArray(b)) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  let result;

  for (let x = 0; x < a.length; x++) {
    if (Array.isArray(a[x] || Array.isArray(b[x]))) {
      result = compareArray(
        a[x].sort((a, b) => a - b),
        b[x].sort((a, b) => a - b)
      );
    } else if (a[x] === b[x]) {
      result = true;
    } else {
      result = false;
    }
    if (!result) {
      break;
    }
  }

  return result;
}

let result = compareArray(a.sort((a, b) => a - b), b.sort((a, b) => a - b));

console.log(result, "result");


`NOTE:` This method works great if you only have arrays and nested arrays. If it will contain an object or function then it will fail.
```

- So To Solve This Issue we can use Method :

This is a much more robust way to check if two different arrays or objects are equal or not.
With this method, we will be comparing more complex arrays. Something like this where an array can have any value possible.

- To perfectly compare an array or object we need to check multiple things.

1. If they are same type (Object or Array).
2. They have the same number of elements.
3. Each element is equal to the other element which we are comparing with.
4. They are of same type (array, object, string, number, function).
5. They have same value.
6. If the element itself is an array or object then we need to compare all its items with the items of the corresponding array or object.

```js
let compare = (current, other) => {
  // Get the inputs  type
  let currentType = Object.prototype.toString.call(current);

  // Get the other type
  let otherType = Object.prototype.toString.call(other);

  //First check if the inputs are either array or object.  If items are not an object or array, return false
  if (["[object Array]", "[object Object]"].indexOf(currentType) < 0 || ["[object Array]", "[object Object]"].indexOf(otherType) < 0) return false;

  // If one value is of type array and another value is of type object then they are not equal so eliminate them. If the two inputs are not the same type, return false
  if (currentType !== otherType) return false;

  // Compare the length of the length of the two items
  let currentLen = currentType === "[object Array]" ? current.length : Object.keys(current).length;
  let otherLen = otherType === "[object Array]" ? other.length : Object.keys(other).length;
  if (currentLen !== otherLen) return false;

  //Helper function to check the equality . Check if both inputs are of same type or not.
  let equal = (item1, item2) => {
    // Get the object type
    let itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
      if (!compare(item1, item2)) return false;
    } else {
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;

      // If it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === "[object Function]") {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }
    }
  };

  // Compare properties
  if (currentType === "[object Array]") {
    for (var i = 0; i < currentLen; i++) {
      // Compare the item
      if (equal(current[i], other[i]) === false) return false;
    }
  } else {
    for (var key in current) {
      if (current.hasOwnProperty(key)) {
        // Compare the item
        if (equal(current[key], other[key]) === false) return false;
      }
    }
  }

  //If all tests are passed then
  return true;
};

//   Calling

let arr1 = [1, 2, 3, 4, 5];
let arr2 = [1, 3, 2, 4, 5];
console.log(compare(arr1, arr2));
// returns false

let arrObj1 = [
  1,
  2,
  {
    a: 1,
    b: 2,
    c: 3,
    d: function () {
      console.log("abcd");
    },
  },
  4,
  5,
];
let arrObj2 = [
  1,
  2,
  {
    c: 3,
    b: 2,
    a: 1,
    d: function () {
      console.log("abcd");
    },
  },
  4,
  5,
];
console.log(compare(arrObj1, arrObj2));
// returns true

let arr4 = [
  [1, 2],
  [3, 4, 5],
];
let arr3 = [
  [1, 2],
  [3, 4, 5],
];
console.log(compare(arr4, arr3));
// returns true
```

### 79. Find the only repetitive element between 1 to N-1

let a = [1, 3, 2, 3, 4]

<!-- Output: 3 -->
<!-- Explanation: The number 3 is the only repeating element. -->

let b= [1, 5, 1, 2, 3, 4]

<!-- Output: 1 -->

```js
### METHOD 1. Use two nested loops. The outer loop traverses through all elements and the inner loop check if the element picked by the outer loop appears anywhere else.

//Javascript program to find the only repeating
// element in an array where elements are
// from 1 to N-1.
function findRepeating(arr, N){
	for (let i = 0; i <N; i++) {
			for (let j = i + 1; j < N; j++) {
				if (arr[i] == arr[j])
					return arr[i];
			}
}
}
			// Driver code
let arr= [ 9, 8, 2, 6, 1, 8, 5, 3, 4, 7 ];
let N = arr.length;

// Function call
console.log(findRepeating(arr, N));
// This code is contributed by aarohirai2616.


### METHOD 2: Find the only repetitive element using sorting:

//Javascript program to find the only repeating
// element in an array where elements are
// from 1 to N-1.
function findRepeating(arr, N){
	arr.sort();
	for (let i = 0; i < N; i++) {

	// compare array element with its index
		if (arr[i] != i + 1) {
			return arr[i];
			}
		}
		return -1;
}
		// Driver code
let arr= [ 9, 8, 2, 6, 1, 8, 5, 3, 4, 7 ];
let N = arr.length;

// Function call
console.log(findRepeating(arr, N));

// This code is contributed by aarohirai2616.


### METHOD 3:
const result = a.find((item,index,arr)=>{

  return index !== arr.indexOf(item)
})

console.log(result,'result')

```

### 80. Function that nests properties of an object based on a given separator.

```js

const obj = {
 "user.name": "Alice",
 "user.age": 30,
 "user.place.state.id":'007',
 "user.place.state.country":'Germany',
 "user.place.state.place.game":'GTA 6',
 "movie.genre.action.name":'John Wick'
};

const separator = ".";

Expected Output: {user: {name: 'Alice', age: 30, place:{state:{country: 'Germany',id: '007',type:{game:'GTA 6'}}}}, movie:{genre:{action:{name:'John Wick'}}}}


### 1. By Assigning property directly to an object.

const nestProperties=(objects,separator)=>{
  let result = {}
  for(let key in objects){
    let value = objects[key]
    let splittedItems = key.split(separator)
    let userObject  = result

    for(let item=0;item<splittedItems.length;item++){
       userObject = userObject[splittedItems[item]] =item>=splittedItems.length-1 ? value : userObject[splittedItems[item]] || {}
    }
  }

  return result
}

const nestedObj = nestProperties(obj, separator);
console.log(nestedObj,'nestedObj')


### 2. By using for loop.
const nestProperties=(objects,separator)=>{
  let result = {}

  for(let key in objects){
    let splittedKeys = key.split(separator)
    let splittedValues = objects[key]
    let currentObj = result;

     for (let i = 0; i < splittedKeys.length; i++) {
        const nestedKey = splittedKeys[i];
       if(!currentObj[nestedKey]){
         if(i>=splittedKeys.length-1){
           currentObj[nestedKey] = splittedValues
         }else{
           currentObj[nestedKey] ={}
         }
       }
       currentObj = currentObj[nestedKey]
     }
  }

  return result
}
const nestedObj = nestProperties(obj, separator);
console.log(nestedObj,'nestedObj')


### 3. By Using forEach loop.

const nestProperties = (objects, separator) => {
  const result = {};

  Object.keys(objects).forEach(key => {
   const splittedKeys = key.split(separator);
   const value = objects[key];
   let currentObj = result;

   splittedKeys.forEach((nestedKey, index) => {
    if (!currentObj[nestedKey]) {
      currentObj[nestedKey] = index === splittedKeys.length - 1 ? value : {};
    }
    currentObj = currentObj[nestedKey];
   });
  });

  return result;
};
const nestedObj = nestProperties(obj, separator);
console.log(nestedObj,'nestedObj')

```

### 81. Chop string into chunks of given length

Write a function to chop string into chunks of given length and return it as array.

```js
let strs = "javascript";
let num = 3;

//  Method 1.
function chopString(strs, num) {
  let choppedString = [];
  let index = num;
  let len = strs.length;
  for (let i = 0; i < len; i++) {
    choppedString.push(strs.substring(i, i + index));
    i--;
    i = i + index;
  }

  return choppedString;
}

console.log(chopString(strs, num));

//  Method 2.

const chop = (str, size = str.length) => {
  const arr = [];
  let i = 0;

  //iterate the string
  while (i < str.length) {
    //slice the characters of given size
    //and push them in output array
    arr.push(str.slice(i, i + size));
    i = i + size;
  }

  return arr;
};
```

### 82. Finding pairs that sum to a target value:

```js
function findPairs(array, targetSum) {
  let pairs = [];

  // Check every possible pair
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === targetSum) {
        pairs.push([array[i], array[j]]);
      }
    }
  }
  return pairs;
}

const numbers = [2, 4, 6, 8, 10];
console.log(findPairs(numbers, 12));
// Output: [[2, 10], [4, 8]]
```

### 83. Finding all possible combinations of a string:

```js
function generateCombinations(str) {
  let combinations = [];

  // Start from length 1 to string length
  for (let i = 0; i < str.length; i++) {
    let temp = "";
    // Generate combinations starting from each character
    for (let j = i; j < str.length; j++) {
      temp += str[j];
      combinations.push(temp);
    }
  }
  return combinations;
}

console.log(generateCombinations("dog"));
// Output: ['d', 'do', 'dog', 'o', 'og', 'g']
```

### 84. Find the most frequent element in an array.

Given an array of elements, we have to find the element with most frequent or count. If there are two elements with most occurrence then return the first.

```js
let input1 = [1, 1, 1, 2, 2, 2, 3, 34];
let input2 = [2, 2, 2, 3, 3, 3, 4, 4, 4, 2, 5, 5, 5, 6, 6];

//  Method 1.
function mostFrequent(input) {
  let frequentElements = input.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
  let max = 0;
  let element = "";

  for (let item in frequentElements) {
    let value = frequentElements[item];
    if (max < value) {
      max = value;
      element = item;
    }
  }

  return element;
}

console.log(mostFrequent(input2));

//  Method 2.

function mostFrequent(input) {
  // Early return for empty array
  if (!input || input.length === 0) return null;

  // If array has only one element
  if (input.length === 1) return input[0].toString();

  // Use Map instead of object for better performance with numeric keys
  const frequencyMap = new Map();
  let maxFreq = 0;
  let mostFreqElement = input[0];

  // Single pass through the array
  for (const num of input) {
    const count = (frequencyMap.get(num) || 0) + 1;
    frequencyMap.set(num, count);

    // Update max frequency and element in the same pass
    if (count > maxFreq) {
      maxFreq = count;
      mostFreqElement = num;
    }
  }

  return mostFreqElement.toString();
}

// Test cases
const input1 = [1, 1, 1, 2, 2, 2, 3, 34];
const input2 = [2, 2, 2, 3, 3, 3, 4, 4, 4, 2, 5, 5, 5, 6, 6];

console.log(mostFrequent(input1)); // Output: "2"
```

### 85. Put attach first letter of of word with last letter of next word

```js
### Method 1.

const data = ["cat", "dog", "ball"];

function getData(data) {
  let length = data.length;
  let newData = [];
  let firstElem = data[0].charAt(length - 1);
  let lastElem = data[length - 1].charAt(0);

  for (let x = 0; x < length - 1; x++) {
    let itemOne = data[x];
    let itemTwo = data[x + 1];
    newData.push(itemOne.charAt(0) + itemTwo.charAt(itemTwo.length - 1));
  }
  newData.push(lastElem + firstElem);
  return newData;
}

console.log(getData(data));

### Method 2.

function getWordPairs(words) {
  // Handle edge cases
  if (!words || words.length === 0) return [];
  if (words.length === 1) return [words[0].charAt(0)];

  // Process all consecutive word pairs
  const pairs = words.slice(0, -1).map((word, index) => {
    const nextWord = words[index + 1];
    return word.charAt(0) + nextWord.charAt(nextWord.length - 1);
  });

  // Add the connection between last word and first word to complete the circle
  pairs.push(words[words.length - 1].charAt(0) + words[0].charAt(0));

  return pairs;
}

console.log(getWordPairs(data)); // Output: ["cg", "dl", "bc"]
// Test with edge cases
console.log(getWordPairs([])); // Output: []
console.log(getWordPairs(["single"])); // Output: ["se"]
console.log(getWordPairs(["hello", "world"])); // Output: ["hd", "wh"]

```

### 86. Find the leftmost and rightmost index of a target in a sorted array.

```ts

### 1. Method. By Using Inbuilt Methods.

const arr = [1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 8, 9];
const target = 5;

function findIndexOfElement(arr,target){

  const firstIndex = arr.indexOf(target)
  const lastIndex= arr.lastIndexOf(target)

  return [firstIndex,lastIndex]
}

console.log(findIndexOfElement(arr,target))



### 2. Method.

To find the leftmost (first) and rightmost (last) index of a given target in a sorted array using JavaScript, the most efficient approach is to use binary search twice—once to find each index. This gives you O(logn) time complexity, which is optimal for sorted arrays.

function findFirst(arr, target) {
    let left = 0, right = arr.length - 1, first = -1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            first = mid;
            right = mid - 1; // Keep searching to the left
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return first;
}

function findLast(arr, target) {

    let left = 0, right = arr.length - 1, last = -1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            last = mid;
            left = mid + 1; // Keep searching to the right
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return last;
}

function findFirstAndLast(arr, target) {
    return [findFirst(arr, target), findLast(arr, target)];
}

// Example usage:
const arr = [1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 8, 9];
const target = 5;
console.log(findFirstAndLast(arr, target)); // Output: [4, 6]

```

### 87. 1. Pair With Sum in a Sorted Array

Find if there is any pair of numbers in a sorted array that add up to a given target sum.

```ts
function hasPairWithSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) {
      return true; // Found a pair
    } else if (sum < target) {
      left++; // Move left pointer right to increase sum
    } else {
      right--; // Move right pointer left to decrease sum
    }
  }
  return false; // No such pair
}

// Example Usage:
const arr = [10, 20, 35, 50, 75, 80];
console.log(hasPairWithSum(arr, 70)); // Output: true (20+50=70)
console.log(hasPairWithSum(arr, 1150)); // Output: false

Explanation:

Start with two pointers at each end.

If the sum is too small, move the left pointer right to make the sum bigger.

If the sum is too large, move the right pointer left to make the sum smaller.
```

### 88 . Finding the First Occurrence Greater Than a Target.

```ts
function findFirstGreater(arr, target) {
  let left = 0,
    right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    console.log(`left: ${left}, right: ${right}, mid: ${mid}, arr[mid]: ${arr[mid]}`);

    if (arr[mid] > target) {
      result = mid; // Potential answer
      right = mid - 1; // Search left half for earlier candidate
    } else {
      left = mid + 1; // Discard left half including mid
    }
  }
  return result;
}

const arr = [1, 3, 5, 6, 8, 12];
// Try with different targets:
console.log(findFirstGreater(arr, 5)); // Output: 3  (arr[3] = 6)
console.log(findFirstGreater(arr, 8)); // Output: 5  (arr[5] = 12)
console.log(findFirstGreater(arr, 12)); // Output: -1 (none greater)
```
