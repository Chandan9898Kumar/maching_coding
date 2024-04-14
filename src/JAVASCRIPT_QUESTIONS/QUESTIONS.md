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

### Count repeated number of words in string, exclude empty strings.

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

### Find First word whose count is 1.

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
