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
