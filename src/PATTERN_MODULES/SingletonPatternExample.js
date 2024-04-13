let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;

/**
 *                                                                      Using a regular object

Let’s use the same example as we saw previously. However this time, the counter is simply an object containing:

    a count property
    an increment method that increments the value of count by one
    a decrement method that decrements the value of count by one

 let count = 0;


const counter = {

  increment() {

    return ++count;

  },

  decrement() {

    return --count;

  }
  getCount() {
    return counter;
  }

};


Object.freeze(counter);

export { counter };
 */

/**
 *                                                                  Global behavior

1. A Singleton instance should be able to get referenced throughout the entire app. Global variables essentially show the same behavior: 
    since global variables are available on the global scope, we can access those variables throughout the application.

2. Having global variables is generally considered as a bad design decision. Global scope pollution can end up in accidentally overwriting the value of a global variable,
    which can lead to a lot of unexpected behavior.

3. In ES2015, creating global variables is fairly uncommon. The new let and const keyword prevent developers from accidentally polluting the global scope,
    by keeping variables declared with these two keywords block-scoped. The new module system in JavaScript makes creating globally accessible values easier
    without polluting the global scope, by being able to export values from a module, and import those values in other files.

4. However, the common useCase for a Singleton is to have some sort of global state throughout your application.
    Having multiple parts of your codebase rely on the same mutable object can lead to unexpected behavior.

5. Usually, certain parts of the codebase modify the values within global state, whereas others consume that data. 
    The order of execution here is important: we don’t want to accidentally consume data first, when there is no data to consume (yet)! Understanding the data flow
    when using a global state can get very tricky as your application grows, and dozens of components rely on each other.
 */



/**                                                               State management in React

1. In React, we often rely on a global state through state management tools such as Redux or React Context instead of using Singletons.
    Although their global state behavior might seem similar to that of a Singleton, these tools provide a read-only state rather than the mutable state of the Singleton.
    When using Redux, only pure function reducers can update the state, after a component has sent an action through a dispatcher.

2. Although the downsides to having a global state don’t magically disappear by using these tools, 
    we can at least make sure that the global state is mutated the way we intend it, since components cannot update the state directly.
 */