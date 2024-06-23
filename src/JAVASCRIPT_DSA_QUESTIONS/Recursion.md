### Recursion

- Basic

```ts
function Piyush() {
  return Rehana();
}

function Rehana() {
  return Vadant();
}

function Vadant() {
  return Chirag();
}

function Chirag() {
  return Ajay();
}

function Ajay() {
  // base case
  return true;
}

console.log(Piyush());
```

### Using Recursion , show o/p

```ts
function goToLunch(person) {
  if (person === 5) return true;

  return goToLunch(person + 1);
}

console.log("outcome:", goToLunch(1));
```

### Multiply by using Recursion .

```ts
function multiply(arr) {
  console.log(arr);
  if (arr.length <= 0) {
    return 1;
  } else return arr[arr.length - 1] * multiply(arr.slice(0, arr.length - 1));
}

console.log(multiply([1, 2, 3, 4]));
```

### Factorial of n

```ts
let n = 5;
// Output: 120
function multiply(num) {
  if (num === 1) {
    return 1;
  } else {
    return num * multiply(num - 1);
  }
}

console.log(multiply(n));
```

### Reverse a String

```ts
- A
 function reverseString(str){
    if(str.length===1){
      return str
    }
  return str[str.length-1] + reverseString(str.slice(0,str.length-1))
}

const result = reverseString('hello')
console.log(result,'result')

- B.
function reverseString(str) {
  if (str === "") {
    return "";
  } else return reverseString(str.substr(1)) + str.charAt(0);
}
console.log(reverseString("hello"));

```

### Given an integer x, return true if x is a palindrome, and false otherwise.

```ts
function palindrome(str, newStr = "", static = str) {
  if (str.length === 0) {
    return newStr === static;
  }
  return palindrome(str.slice(0, str.length - 1), newStr + str[str.length - 1], static);
}
const result = palindrome("malayalam");
console.log(result, "result");

//  2nd
function isPalindrome(str) {
  const len = str.length;
  if (len <= 1) {
    return true;
  }
  if (str[0] !== str[len - 1]) {
    return false;
  }
  return isPalindrome(str.slice(1, -1));
}
console.log(isPalindrome("malayalam"));
```

### Create an array, using Recursion .

```ts
let startIndex = 0;
let endIndex = 5;
function Recursion (start, end) {
  if (start > end) {
    return [];
  } else {
    let number = Recursion (start, end - 1);
    number.push(end);
    return number;
  }
}

const result = Recursion (startIndex, endIndex);
console.log(result, "result");

- Explanation :

Order in which each function called.
// 1. rangeOfNumbers(0,5) => [1,2,3,4,5] >6
// 2. rangeOfNumbers(0,4) => [1,2,3,4] >5
// 3. rangeOfNumbers(0,3) => [1,2,3] >4
// 4. rangeOfNumbers(0,2) => [1,2] >3
// 5. rangeOfNumbers(0,1) => [1] >2.
// 6. rangeOfNumbers(0,0) => [0] >1. return order ^

Now till 6 function called, after that function called in reverse order to return.
```
