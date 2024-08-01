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



4. Multiple Inheritance:

`Explanation:`
Multiple inheritance allows a class to inherit properties and behaviors from more than one superclass. While JavaScript does not support multiple inheritance in the traditional sense, it can be simulated using mixins or object composition techniques.


// Mixin for Student-related functionalities
const StudentMixin = {
  data:'GST',
  study() {
    console.log("Studying...");
  },
};

// Mixin for Athlete-related functionalities
const AthleteMixin = {
  game:'GTA 6',
  exercise() {
    console.log("Exercising...");
  },
};

// Class representing a Student Athlete
class StudentAthlete {
  constructor(name) {
    this.name = name;
  }
}

// Object composition to simulate multiple inheritance
Object.assign(StudentAthlete.prototype, StudentMixin, AthleteMixin);

const studentAthlete = new StudentAthlete("Mahdi");

console.log(studentAthlete,'studentAthlete')
studentAthlete.study(); // Outputs: Studying...
studentAthlete.exercise(); // Outputs: Exercising...


- A scenario where a class StudentAthlete inherits from both Student and Athlete classes, thereby inheriting attributes and methods related to academic performance as well as athletic abilities.
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

### What is Polymorphism?

Polymorphism is one of the core concepts of object-oriented programming languages where poly means many and morphism means transforming one form into another. Polymorphism means the same function with different signatures is called many times. In real life, for example, a boy at the same time may be a student, a class monitor, etc. So a boy can perform different operations at the same time. This is called polymorphism.

- Features of Polymorphism:

1. Programmers can use the same method name repeatedly.
2. Polymorphism has the effect of reducing the number of functionalities that can be paired together.

- polymorphism is achieved by using `function overloading` and `function overriding`.

1. `Function overloading` refers to the ability of a function to have multiple implementations based on the number and/or types of arguments passed to it. JavaScript does not support function overloading natively, however, you can achieve similar functionality by using the arguments object and checking the number and/or types of arguments passed to the function.

2. `Function overriding` refers to the ability of a subclass to provide a different implementation of a method that is already provided by its superclass. In JavaScript, this can be achieved by reassigning the prototype of the subclass.

Example 1.

```js
class Shape {
  constructor(name) {
    this.name = name;
  }
  draw() {
    console.log(`Drawing a ${this.name}`);
  }
}

class Circle extends Shape {
  draw() {
    console.log(`Drawing a Circle`);
  }
}

class Square extends Shape {
  draw() {
    console.log(`Drawing a Square`);
  }
}

let shape = new Shape("Shape");
let circle = new Circle();
let square = new Square();

shape.draw(); //Drawing a Shape
circle.draw(); //Drawing a Circle
square.draw(); //Drawing a Square


So, Here we can say that :

Despite invoking the same method draw(), each object (shape, circle, square) exhibits different behavior based on its type. This is polymorphism in action, where the method behaves differently depending on the objects actual class.

In this example, the draw() method is overridden in the subclasses Circle and Square, providing a different implementation of the method that is already provided by the superclass Shape.
In conclusion, polymorphism is a fundamental concept in OOP that refers to the ability of different objects to respond to the same method call in different ways.



- Example Two : Polymorphism with Functions and Objects.

It is also possible in JavaScript that we can make functions and objects with polymorphism. In this example, we will make two functions with the same name ‘area’.  We define the area function in class A. In this function, we have two parameters – x and y. Class B is created by extending class A. The area function in class B invoked the area method in class A through super keyword – passing parameters a and b.  To make the area method behave differently in class B, we are going to console log the name of the class inside the method.  This way, it will become clear that the area method will behave differently depending on the object upon which it is called.

class A {
	area(x, y) {
		console.log(x * y);
	}
}
class B extends A {
	area(a, b) {
		super.area(a, b);
		console.log('Class B')
	}
}
let ob = new B();
let output = ob.area(100, 200);
// 20000
// Class B
```

### Types of Polymorphism in JavaScript.

- 1. Ad-hoc Polymorphism:

Ad-hoc polymorphism allows functions to behave differently based on the types or number of arguments passed to them. It is often implemented through method overloading or conditional logic within functions.

```js
`Example :`Consider a function calculateArea() that calculates the area of different shapes based on the number of arguments provided. If two arguments are passed, it calculates the area of a rectangle. If only one argument is passed, it calculates the area of a circle.


function calculateArea(shape, arg1, arg2) {
  if (shape === "rectangle") {
    return arg1 * arg2;
  } else if (shape === "circle") {
    return Math.PI * Math.pow(arg1, 2);
  } else {
    throw new Error("Unsupported shape");
  }
}

console.log(calculateArea("rectangle", 5, 3)); // Outputs: 15 (Area of rectangle)
console.log(calculateArea("circle", 4)); // Outputs: 50.26548245743669 (Area of circle)


`In this example:`

1. The calculateArea() function behaves differently based on the value of the shape parameter.
2. If shape is 'rectangle', the function calculates the area of a rectangle using two arguments (arg1 and arg2).
3. If shape is 'circle', the function calculates the area of a circle using one argument (arg1).

`Advantages:`
1. Simplicity: Provides a straightforward way to define multiple behaviors within a single function based on input parameters.
2. Flexibility: Allows for versatile function usage with different argument combinations, enhancing code adaptability.
3. Readability: Promotes code readability by encapsulating conditional logic within the function, making it easier to understand and maintain.
```

- 2. Parametric Polymorphism:

Parametric polymorphism, also known as generic programming, allows functions and classes to operate on values of unspecified types. It is enabled by using type parameters that can be instantiated with various concrete types.

```js
`Example :`
// Generic function to return the length of an array or string
function getLength(input) {
  return input.length;
}

console.log(getLength([1, 2, 3])); // Outputs: 3
console.log(getLength("Hello")); // Outputs: 5


`Advantages:`
1. Reusability: Promotes code reuse by allowing the creation of generic functions and classes that can operate on multiple data types.
2. Type Safety: Enhances type safety by specifying constraints on type parameters, reducing the risk of runtime errors.
3. Abstraction: Encourages abstraction by separating algorithmic logic from specific data types, leading to cleaner and more modular code.
```

- 3. Subtype Polymorphism:

Subtype polymorphism allows objects of different classes to be treated as objects of a common superclass. It is implemented through inheritance and method overriding, where subclasses provide specific implementations for inherited methods.

```js
`Example :`

// Base class representing a Shape
class Shape {
  draw() {
    console.log("Drawing a shape");
  }
}

// Subclass representing a Circle
class Circle extends Shape {
  draw() {
    console.log("Drawing a circle");
  }
}

// Subclass representing a Square
class Square extends Shape {
  draw() {
    console.log("Drawing a square");
  }
}

// Polymorphic behavior
const circle = new Circle();
const square = new Square();

circle.draw(); // Outputs: Drawing a circle
square.draw(); // Outputs: Drawing a square


`Advantages:`
1. Flexibility: Allows for the creation of a unified interface for diverse objects, enabling seamless interchangeability and flexibility in code design.
2. Extensibility: Facilitates easy extension of functionality by adding new subclasses with specialized implementations while maintaining compatibility with existing code.
3. Polymorphic Dispatch: Enables polymorphic dispatch, where the correct method implementation is dynamically chosen at runtime based on the object's actual type, enhancing runtime flexibility and adaptability.
```

- 4. Dynamic Polymorphism:

`Explanation:`

Dynamic polymorphism refers to the ability of an object to decide at runtime which method implementation to invoke based on its actual type. This is achieved through method overriding in subclass implementations.

```js

Consider a scenario where we have a base class Shape with a method draw(), and subclasses Circle and Square that override the draw() method to provide specific implementations. At runtime, the correct draw() method is dynamically chosen based on the type of shape being drawn.


// Base class representing a Shape
class Shape {
  draw() {
    console.log("Drawing a shape");
  }
}

// Subclass representing a Circle
class Circle extends Shape {
  draw() {
    console.log("Drawing a circle");
  }
}

// Subclass representing a Square
class Square extends Shape {
  draw() {
    console.log("Drawing a square");
  }
}

// Dynamic polymorphic behavior
const shapes = [new Circle(), new Square()];

shapes.forEach((shape) => {
  shape.draw(); // Outputs: Drawing a circle, Drawing a square
});


Advantages:
1. Flexibility: Allows for runtime determination of method implementation, enabling adaptable behavior based on object types.
2. Extensibility: Facilitates adding new subclasses with specialized behavior without modifying existing code, enhancing code maintainability and scalability.
3. Dynamic Dispatch: Enables polymorphic dispatch, where the appropriate method implementation is selected dynamically at runtime, promoting runtime flexibility and adaptability.

```

- 5. Polymorphism in Functional Programming:

`Explanation:`

While polymorphism is commonly associated with object-oriented programming, it also exists in functional programming paradigms. In functional programming languages like JavaScript, polymorphism can be achieved through higher-order functions, function composition, and parametric polymorphism.

```js
// Higher-order function to perform an operation on two numbers

function operate(num1, num2, operation) {
  return operation(num1, num2);
}

// Functions representing different operations
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

console.log(operate(3, 4, add)); // Outputs: 7
console.log(operate(3, 4, multiply)); // Outputs: 12


In functional programming, a higher-order function that takes other functions as arguments exhibits polymorphic behavior by accepting functions with different signatures.

`Advantages:`
1. Modularity: Polymorphism in functional programming promotes code modularity by separating concerns and encapsulating reusable behavior within functions.
2. Expressiveness: Enables the creation of concise and expressive programs by abstracting common patterns into higher-order functions and function compositions.
3. Functional Composition: Facilitates function composition, where smaller, reusable functions are combined to create more complex behaviors, promoting code reuse and readability.
```
