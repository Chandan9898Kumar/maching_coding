# Getting Started with Create React App

- This Repository consists of machine coding, javaScript questions along with Design Pattern and Solid Principles.

### What is compiling ?

- Compiling is the process of converting a high-level programming language to a low-level programming language.

# But why do we need to compile our code?

As you already know, the computer understands low-level language, so in order to actually make our program run, we need to convert our language to something which the computer can understand.

Sometimes it’s compiled in multiple steps, each step optimizing the code and getting it closer to machine code.

For example, Java, C#, and C are a few examples of the high-level languages that are needed to be compiled.

### What is transpiling?

- Transpiling is converting one high-level language to another high-level language.

# But why do we need to transpile a high-level language?

You’ve probably heard about CoffeeScript and TypeScript. Anything you can write in JavaScript, you can write in CoffeeScript or TypeScript.

But the problem is, JavaScript environments only understand … Well, JavaScript.

Enter _drumrolls_ — Transpilers. They read CoffeeScript, TypeScript, and ES2015, and spit out JavaScript guaranteed to work anywhere.

A common example of a transpiler is Babel. It is used to convert ES6+ code into backward-compatible versions of Javascript.

### Using Pre-Commit and Pre-Push Git Hooks in a React Project.

- Husky
  husky, which claims to be “git hooks made easy.” (Accurate!). Since it’s only necessary in the dev environment, only install it as a dev dependency.
  `Install` : npm install husky --save-dev

We actually end up needing one additional dev dependency called `cross-env`, which will allow us to `configure a CI environment variable` in whatever environment we’re currently in.

`Install` : npm install cross-env --save-dev

Finally, let’s make some modifications to our package.json file to accomplish a few things:

1. Reconfigure jest tests to be run in Continuous Integration mode (otherwise, running npm test will hang)
2. Add a linting command (we didn’t have to install eslint separately as it bootstraps with create-react-app)
3. Configure our husky hooks to first lint and then test

- Outcome
  Now, whenever you try to commit or push your code, you will be prevented from doing so if linting or testing fails.
