### JavaScript Inheritance.

JavaScript inheritance is the method through which the objects inherit the properties and the methods from the other objects. It enables code reuse and structuring of relationships between objects, creating a hierarchy where a child object can access features of its parent object. Inheritance in JavaScript can be achieved in the following ways:

- Table of Content :

  1. Prototypal Inheritance
  2. Classical Inheritance
  3. Functional Inheritance

### Prototypal Inheritance

Objects inherit from other objects through their prototypes. Each object has a prototype, properties, and methods inherited from that prototype. The methods through which prototypal inheritance is achieved in JavaScript are as follows.

Example: The below code example demonstrates Inheritance and method overriding in JavaScript :

```js

1. Example

In this example,the Dog class inherits properties and methods from the Animal class. The Object.create() method is used to create a new object that inherits from the Animal.prototype object, and the constructor property is reset to the Dog class.

function Animal(name) {
  this.name = name;
}

Animal.prototype.sound = function () {
  console.log("Some generic sound");
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.sound = function () {
  console.log("Woof! Woof!");
};

const myDog = new Dog("Buddy", "Labrador");
myDog.sound();
// Outputs: Woof! Woof!


2. Example

// Creating a prototype object
const personPrototype = {
  introduce: function() {
    console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`);
  }
};

// Creating a new object that inherits from the personPrototype
const john = Object.create(personPrototype);
john.name = 'John';
john.age = 30;

// Calling the introduce method on the john object
john.introduce();
// Outputs: Hi, my name is John and I am 30 years old.


`NOTE :` Object.create is a method in JavaScript that creates a new object with the specified prototype object and properties. It allows you to create an object that inherits from a prototype without the need to define a constructor function. This method is commonly used to set up the prototype chain for objects, enabling prototype-based inheritance.
```

### Classical Inheritance.

Introduced in ECMAScript6 (ES6) with the class keyword. Uses a class-based approach similar to other programming languages like Java or C++. Following are the methods through which class-based inheritance is achieved in JavaScript:

1. Inheritance using extend keyword
2. JavaScript ES6 classes support the extended keyword to perform class inheritance.

Example: Demonstrating class inheritance and method overloading in JavaScript :

```js
The following example defines the Animal and Bird classes and establishes the inheritance through the extends and super keywords.

1. Example

class Animal {
    constructor(legs) {
        this.legs = legs;
    }
    walk() {
        console.log('walking on ' + this.legs + ' legs');
    }
}

class Bird extends Animal {
    constructor(legs) {
        super(legs);
    }
    fly() {
        console.log('flying');
    }
}


let bird = new Bird(2);

bird.walk();
bird.fly();

Explanations:
1. extends keyword to make the Bird class inheriting from the Animal class.

2. The Animal class is called a base class or parent class while the Bird class is known as a derived class or child class. By doing this, the Bird class inherits all methods and properties of the Animal class.

3. in the Bird‘s constructor, call super() to invoke the Animal‘s constructor with the legs argument.

4. JavaScript requires the child class to call super() if it has a constructor.

5.  the super() initializes the this object, you need to call the super() before accessing the this object. Trying to access this before calling super() also results in an error.



2. Example


// Inheritance using super keyword in JS
class Automobile {
	constructor(name) {
		this.name = name;
	}

	engine() {
		console.log(this.name,
			"has ", this.cc, "cc engine");
	}
}

class Car extends Automobile {
	constructor(name, cc) {
		super(name);

		// Additional properties for
		// the Car class
		this.cc = cc;
	}

	engine() {
		// the 'engine' method of the parent
		// class using 'super'
		super.engine();

		console.log(this.name,
			"has ", this.cc, "cc engine");
	}
}

let carz = new Car('Rexton', '1500');
carz.engine();

`NOTE :` Super keyword is used in classes to call the properties and methods of the parent class.



3.
- Inheritance in static members

Static members belong to their own class and not to their instances because inheritance also applies to the static members of the class.

// Inheritance in static members
class Automobile {
	static staticMethod() {
		return 'Automobile static method';
	}
}

class car extends Automobile {
	static staticMethod() {
		return 'Car static method';
	}
}

console.log(Automobile.staticMethod());
console.log(car.staticMethod());


```

### Functional Inheritance

Objects inherit properties and methods from other objects through function constructors. It uses functions to create objects and establish relationships between them. The methods through which functional inheritance is achieved in JavaScript are as follows:

```js
function Animal(name) {
  const obj = {};
  obj.name = name;

  obj.sound = function () {
    console.log("Some generic sound");
  };

  return obj;
}

function Dog(name, breed) {
  const obj = Animal(name);
  obj.breed = breed;

  obj.sound = function () {
    console.log("Woof! Woof!");
  };

  return obj;
}

const myDog = Dog("Buddy", "Labrador");
myDog.sound(); // Outputs: Woof! Woof!
```

### Example of using call method

```js
So here we have created two constructor functions, Baddie and Spider. The important line here is Baddie.call(this); which executes Baddie in the context of Spider - adding those properties to the Spider instance. Using this technique you can chain as many constructors together as you like.



function Baddie(f1, f2) {
  var id = "abc";
  const Book = "SST";
  const Data = "100GB";

  // Code removed for brevity

  this.getId = function () {
    console.log(this.id);
  };
  this.getBook = function (newVal) {
    console.log(Book); // O/p : SST
    console.log(this.Book); // undefined because this keyword here is referring to Spider object.
    console.log(this.game);
    console.log(this);
  };
  this.food = f1;
  this.flight = f2;
}

function Spider(a, b) {
  Baddie.call(this, a, b);
  (this.game = "GTA"), (this.place = "UK");
}

const spiderOne = new Spider("JalPan", "Germany");
console.log(spiderOne, "spiderOne");

//  O/P
flight: "Germany"
food: "JalPan"
game:"GTA"
getBook: (newVal)
getId:()
place:"UK"

//  Note here you will not see id,Book,Data because those are private variables.

So, specifically to return these variables See below Examples.

function Baddie(f1, f2) {
  var id = "abc";
  const Book = "SST";
  const Data = "100GB";

  this.getId = function () {
    console.log(this.id);
  };
  this.getBook = function (newVal) {
    console.log(Book); // O/p : SST
    console.log(this.Book); // undefined because this keyword here is referring to Spider object.
    console.log(this.game);
    console.log(this);
  };
  this.food = f1;
  this.flight = f2;

  return {id,Book,Data}  // Here we can return this as well, this is referring to Spider constructor function.
}

function Spider(a, b) {
  let result = Baddie.call(this, a, b);
  console.log(result,'result')
  this.result = result
  this.game = "GTA"
  this.place = "UK"
}

const spiderOne = new Spider("JalPan", "Germany");
console.log(spiderOne, "spiderOne");


//  O/P
flight:"Germany"
food:"JalPan"
game: "GTA"
getBook:(newVal)
getId: ()
place:"UK"
result: {id: 'abc', Book: 'SST', Data: '100GB'}

//  NOTE : In constructor function it itself return this. so no need to explicitly return this.
```

### Encapsulation in JavaScript.

Encapsulation is a fundamental concept in object-oriented programming that refers to the practice of hiding the internal details of an object and exposing only the necessary information to the outside world. Or encapsulation is the bundling of data with the methods that operate on that data.

Encapsulation can be achieved using two techniques: Encapsulation in javascript is achieved using closures or using private fields in Class.

1. Using Closures
2. Using Classes

- 1. Using Closures.

In JavaScript, closures are functions that have access to variables in their outer lexical environment, even after the outer function has returned. Private variables and methods can be created using closures.

`JavaScript uses closures to implement encapsulation, which allows developers to create private variables and methods that cannot be accessed from outside the object.`

`Example:`
In this example, we have created a BankAccount object using a closure. The object has three private variables: \_accountNumber, \_accountHolderName, and \_balance. These variables are only accessible within the BankAccount function and cannot be accessed from outside. The showAccountDetails function is a private method that displays the account details. The deposit and withdrawal methods are public methods that can be accessed from outside the object. When these methods are called, they update the \_balance variable and call the showAccountDetails function to display the updated account details.

```js

1. Example
function BankAccount(accountNumber, accountHolderName, balance) {
  let _accountNumber = accountNumber;
  let _accountHolderName = accountHolderName;
  let _balance = balance;

  function showAccountDetails() {
    console.log(`Account Number: ${_accountNumber}`);
    console.log(`Account Holder Name: ${_accountHolderName}`);
    console.log(`Balance: ${_balance}`);
  }

  function deposit(amount) {
    _balance += amount;
    showAccountDetails();
  }

  function withdraw(amount) {
    if (_balance >= amount) {
      _balance -= amount;
      showAccountDetails();
    } else {
      console.log("Insufficient Balance");
    }
  }

  return {
    deposit: deposit,
    withdraw: withdraw,
  };
}

let myBankAccount = BankAccount("123456", "John Doe", 1000);

myBankAccount.deposit(500);
// Output: Account Number: 123456 Account Holder Name:
//John Doe Balance: 1500

myBankAccount.withdraw(2000); // Output: Insufficient Balance

// O/P :
// Account Number: 123456
// Account Holder Name: John Doe
// Balance: 1500
// Insufficient Balance

2. Example

function Person(name, age) {
    let privateAge = age;
    this.name = name;

    this.getAge = function() {
      console.log(this,'this',privateAge)
        return privateAge;
    }
}

let person = new Person("John", 30);
console.log(person.name); // "John"
console.log(person.privateAge); // undefined
console.log(person.getAge()); // 30

- NOTE :
In this example, the privateAge variable is defined inside the constructor function and can only be accessed using the getAge method. This means that the internal state of the object is hidden from other objects and code, providing a level of protection and security.

Access modifiers such as private, public and protected are not natively supported in javascript, but it can be implemented using closures as well. In addition, other libraries and frameworks such as TypeScript provide a way to use access modifiers.
```

- 2. Using Classes
     ES6 introduced the class syntax in JavaScript, which allows us to define classes and objects in a more structured way. Classes can be used to achieve encapsulation in JavaScript.

`Example:`
In this example, we have created a BankAccount class using the class keyword. The class has three private variables: \_accountNumber, \_accountHolderName, and \_balance. These variables are prefixed with an underscore to indicate that they are private variables. The showAccountDetails method is a public method that displays the account details. The deposit and withdrawal methods are also public methods that can be accessed from outside the object. When these methods are called, they update the \_balance variable and call the showAccountDetails method to display the updated account details.

```js
class BankAccount {
  constructor(accountNumber, accountHolderName, balance) {
    this._accountNumber = accountNumber;
    this._accountHolderName = accountHolderName;
    this._balance = balance;
  }

  showAccountDetails() {
    console.log(`Account Number: ${this._accountNumber}`);
    console.log(`Account Holder Name: ${this._accountHolderName}`);
    console.log(`Balance: ${this._balance}`);
  }

  deposit(amount) {
    this._balance += amount;
    this.showAccountDetails();
  }

  withdraw(amount) {
    if (this._balance >= amount) {
      this._balance -= amount;
      this.showAccountDetails();
    } else {
      console.log("Insufficient Balance");
    }
  }
}

let myBankAccount = new BankAccount("123456", "John Doe", 1000);
myBankAccount.deposit(500);
// Output: Account Number: 123456 Account Holder Name:
// John Doe Balance: 150

- NOTE :
This appears to be a standard solution, but if you examine it carefully, you are able to access the properties of this object directly.
1. _accountHolderName:"John Doe"
2. _accountNumber:"123456"
3. _balance:1500


- This is because, unlike most other languages, data hiding is not inherent to the classes in javascript. This means that by default, properties can be accessed and modified from the outer world.

- You should note that properties declared within an object/class are not the same as variables in javascript. You can see this difference in the way object properties are defined (without any var/let/const keyword)

- If we start using variables instead of properties, we might just be able to achieve Encapsulation. Since variables are lexically scoped, they are not accessible from outside the scope they are defined in.

### So To Achieve Encapsulation :

- Example :

class Student {
    constructor(id, name, marks){
        let _id = id;
        let _name = name;
        let _marks = marks
        this.getId = () => _id;
        this.getName = () => _name;
        this.getMarks = ()=> _marks;
        this.setMarks = (marks)=>{
            _marks = marks
        }
    }
}
let s = new Student(1,"harsh", 85)
s.getId() //1
s.getName() //harsh
s.setMarks(90)
s.getMarks() //90


NOTE :

Here, we declare the properties within the scope of the constructor instead of defining them as properties at the object level. We then define the constructor and initialise the object properties as variables within the scope of the constructor.

- ES6 also introduced the “get” keyword, which makes using getters easy. When you initialise the object of the student class in the following example, you are able to access the property using {object instance}.name

- Example :

class Student {
    constructor(id, name, marks){
       let _id = id;
       let _name = name;
       let _marks = marks

       this.getId = () => _id;
       this.getName = () => _name;
       this.getMarks = ()=> _marks;

       this.setMarks = (marks)=>{
            _marks = marks
        }
    }
    get name(){
        return this.getName();
    }
}

```

- Benefits of encapsulation in JavaScript:

1. Data Security: Encapsulation helps in protecting the data by preventing direct access to private variables. This ensures that the data is not modified inappropriately.
2. Code Reusability: Encapsulation makes it easier to reuse code since objects are self-contained and can be used in different parts of the application.
3. Maintenance: Encapsulation makes it easier to maintain the code since objects are independent of each other and changes made to one object do not affect the others.

### Abstraction.

`DEFINITION :` Abstraction is a fundamental concept in object-oriented programming (OOP) that refers to the practice of hiding the implementation details of an object and exposing only the essential features to the user. In JavaScript, abstraction is achieved by using abstract classes and interfaces or with the help of Abstract Classes and Abstract Methods..
`OR`
An abstract class is a class that cannot be instantiated and is meant to be used as a base class for other classes. Abstract classes typically contain one or more abstract methods, which are methods that have a signature but no implementation. These methods must be implemented by the derived classes.

JavaScript does not support abstract classes natively, but you can achieve similar functionality by using a combination of function constructors and prototypes.

`NOTE : `

- Before we proceed to understand the Abstraction. We need to understand the `Abstract class` and `Abstract method.` So, let's get started with Abstract Method…

1. `Abstract Method:` A type of method that is only declared and has no implementation or “function body” is known as the Abstract method. The abstract method must be declared inside the Abstract Class. Where its definition can be added in its subclass.

2. `Abstract Class:` Abstract class is a type of class for which we can not create the instance and must contain at least one abstract method inside it.

`Example One:`

```js
// Abstract Class
class Person {
  constructor(name) {
    this.name = name;

    //  Can't be instantiated
    if (this.constructor === Person) {
      throw new Error("You can'not create an instance for abstract class ");
    }
  }
  // Abstract Method
  info() {
    throw new Error("Added abstract Method has no implementation");
  }
}

`Looking at the above example, we can outline the need for abstraction.`

1. We cannot instantiate the Abstract class which means this class can only be used by inheritance.

2. The Abstract method definition can be given in its subclass.

3. Extracting the unnecessary information and keeping it inside the Abstraction class, means it ignores the implementation details and only shows the functionality to the user.

4. If we have to create a Person kind of object, we don’t have to bother about the properties of the Person. Its already given in abstract class, you just have to inherit in your class and use it.


`Now Full Implementation`

// Abstract Class
class Person {
  constructor(name) {
    this.name = name;
    this.className= '10 A'

    //  Can't be instantiated
    if (this.constructor === Person) {
      throw new Error("You can'not create an instance for abstract class");
    }
  }
  // Abstract Method
  info() {
    throw new Error("Added abstract Method has no implementation");
  }
}

//  Creating a subclass using Person Class

class Teacher extends Person{
  //  definition inside subclass
  info(){
    console.log('Teacher name is',this.name)
  }
}

//  instantiating subclass after inheriting the props.
const John  = new Teacher('John')
console.log(john)

const myPerson = new Person() // O/P :  You can'not create an instance for abstract class

- Explanation :

the Person class is an abstract class that cannot be instantiated and contains an abstract method info() which throws an error when called. The Teacher class inherits from the Person class and implements the info() method providing a specific implementation.
```

`Example Two :` Abstraction can also be implemented purely with ES5.

```js
function Shape(Ide) {

  this.country='Uk',
  this.game='GTA 6',
  this.IDE = Ide

  if (this.constructor === Shape) {
    throw new Error("Cannot instantiate abstract class Shape");
  }
  this.draw = function () {
    throw new Error("Cannot call abstract method draw from Shape");
  };
}

function Circle() {
  Shape.call(this,'vs-code');
  this.draw = function () {
    console.log("Drawing a Circle");
  };
}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

let circle = new Circle();
console.log(circle,'circle')

circle.draw(); // "Drawing a Circle"

let shape = new Shape(); // Error: Cannot instantiate abstract class Shape

1. In this example, the Shape class is an abstract class that cannot be instantiated and contains an abstract method draw() which throws an error when called. The Circle class inherits from the Shape class and implements the draw() method providing a specific implementation.

2. Interfaces are another way to achieve abstraction in JavaScript, although it's not a native feature of javascript. Some libraries like TypeScript provide interfaces. An interface defines a set of methods that a class must implement but does not provide an implementation for those methods. This allows developers to ensure that a class has the required methods without specifying how those methods should be implemented.
```
