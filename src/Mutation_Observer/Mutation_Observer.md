# Mutation observer

`MutationObserver` is a built-in object that observes a DOM element and fires a callback when it detects a change.

We'll first take a look at the syntax, and then explore a real-world use case, to see where such thing may be useful.

# Definition :

The Mutation Observer allows you to monitor any changes that are made to the DOM, and run your own code if needed. This code could be used if any elements are added, removed or attributes are added or changed. The Mutation Observer is one of the Web APIs that we get for free from the browser.

- Constructor

1. MutationObserver()
   Creates and returns a new MutationObserver which will invoke a specified callback function when DOM changes occur.

- Instance methods

1. disconnect()
   Stops the MutationObserver instance from receiving further notifications until and unless observe() is called again.

2. observe()
   Configures the MutationObserver to begin receiving notifications through its callback function when DOM changes matching the given options occur.

3. takeRecords()
   Removes all pending notifications from the MutationObserver's notification queue and returns them in a new Array of MutationRecord objects.

`NOTE :`DOM observation does not begin immediately; the observe() method must be called first to establish which portion of the DOM to watch and what kinds of changes to watch for.

## Syntax

`MutationObserver` is easy to use.

First, we create an observer with a callback-function:

```js
let observer = new MutationObserver(callback);

- callback
A function which will be called on each DOM change that qualifies given the observed node or subtree and options.

The callback function takes as input two parameters:

1. An array of MutationRecord objects, describing each change that occurred.
2. The MutationObserver which invoked the callback. This is most often used to disconnect the observer using MutationObserver.disconnect().
```

And then attach it to a DOM node:

```js
observer.observe(targetNode, config);

- targetNode
This is the element on which the observer will keep watch when any changes are detected. It is the root of the subtree of nodes to monitor for changes.
```

`config` is an object with boolean options "what kind of changes to react on":

- `childList` -- changes in the direct children of `node`,
- `subtree` -- in all descendants of `node`,
- `attributes` -- attributes of `node`,
- `attributeFilter` -- an array of attribute names, to observe only selected ones.
- `characterData` -- whether to observe `node.data` (text content),

Few other options:

- `attributeOldValue` -- if `true`, pass both the old and the new value of attribute to callback (see below), otherwise only the new one (needs `attributes` option),
- `characterDataOldValue` -- if `true`, pass both the old and the new value of `node.data` to callback (see below), otherwise only the new one (needs `characterData` option).

Then after any changes, the `callback` is executed: changes are passed in the first argument as a list of [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects, and the observer itself as the second argument.

[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects have properties:

- `type` -- mutation type, one of
  - `"attributes"`: attribute modified
  - `"characterData"`: data modified, used for text nodes,
  - `"childList"`: child elements added/removed,
- `target` -- where the change occurred: an element for `"attributes"`, or text node for `"characterData"`, or an element for a `"childList"` mutation,
- `addedNodes/removedNodes` -- nodes that were added/removed,
- `previousSibling/nextSibling` -- the previous and next sibling to added/removed nodes,
- `attributeName/attributeNamespace` -- the name/namespace (for XML) of the changed attribute,
- `oldValue` -- the previous value, only for attribute or text changes, if the corresponding option is set `attributeOldValue`/`characterDataOldValue`.

For example, here's a `<div>` with a `contentEditable` attribute. That attribute allows us to focus on it and edit.

```html run
<div contenteditable id="elem">Click and <b>edit</b>, please</div>

<script>
  let observer = new MutationObserver((mutationRecords) => {
    console.log(mutationRecords); // console.log(the changes)
  });

  // observe everything except attributes
  observer.observe(elem, {
    childList: true, // observe direct children
    subtree: true, // and lower descendants too
    characterDataOldValue: true, // pass old data to callback
  });
</script>
```

If we run this code in the browser, then focus on the given `<div>` and change the text inside `<b>edit</b>`, `console.log` will show one mutation:

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
  // other properties empty
}];
```

If we make more complex editing operations, e.g. remove the `<b>edit</b>`, the mutation event may contain multiple mutation records:

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
  // other properties empty
}, {
  type: "characterData"
  target: <text node>
  // ...mutation details depend on how the browser handles such removal
  // it may coalesce two adjacent text nodes "edit " and ", please" into one node
  // or it may leave them separate text nodes
}];
```

So, `MutationObserver` allows to react on any changes within DOM subtree.

## Usage for integration

When such thing may be useful?

Imagine the situation when you need to add a third-party script that contains useful functionality, but also does something unwanted, e.g. shows ads `<div class="ads">Unwanted ads</div>`.

Naturally, the third-party script provides no mechanisms to remove it.

Using `MutationObserver`, we can detect when the unwanted element appears in our DOM and remove it.

There are other situations when a third-party script adds something into our document, and we'd like to detect, when it happens, to adapt our page, dynamically resize something etc.

`MutationObserver` allows to implement this.

## Usage for architecture

There are also situations when `MutationObserver` is good from architectural standpoint.

Let's say we're making a website about programming. Naturally, articles and other materials may contain source code snippets.

Such snippet in an HTML markup looks like this:

```html
...
<pre class="language-javascript"><code>
  // here's the code
  let hello = "world";
</code></pre>
...
```

For better readability and at the same time, to beautify it, we'll be using a JavaScript syntax highlighting library on our site, like [Prism.js](https://prismjs.com/). To get syntax highlighting for above snippet in Prism, `Prism.highlightElem(pre)` is called, which examines the contents of such `pre` elements and adds special tags and styles for colored syntax highlighting into those elements, similar to what you see in examples here, on this page.

When exactly should we run that highlighting method? Well, we can do it on `DOMContentLoaded` event, or put the script at the bottom of the page. The moment our DOM is ready, we can search for elements `pre[class*="language"]` and call `Prism.highlightElem` on them:

```js
// highlight all code snippets on the page
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

Everything's simple so far, right? We find code snippets in HTML and highlight them.

Now let's go on. Let's say we're going to dynamically fetch materials from a server. We'll study methods for that [later in the tutorial](info:fetch). For now it only matters that we fetch an HTML article from a webserver and display it on demand:

```js
let article = /* fetch new content from server */ (articleElem.innerHTML = article);
```

The new `article` HTML may contain code snippets. We need to call `Prism.highlightElem` on them, otherwise they won't get highlighted.

**Where and when to call `Prism.highlightElem` for a dynamically loaded article?**

We could append that call to the code that loads an article, like this:

```js
let article = /* fetch new content from server */
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

...But, imagine if we have many places in the code where we load our content - articles, quizzes, forum posts, etc. Do we need to put the highlighting call everywhere, to highlight the code in content after loading? That's not very convenient.

And what if the content is loaded by a third-party module? For example, we have a forum written by someone else, that loads content dynamically, and we'd like to add syntax highlighting to it. No one likes patching third-party scripts.

Luckily, there's another option.

We can use `MutationObserver` to automatically detect when code snippets are inserted into the page and highlight them.

So we'll handle the highlighting functionality in one place, relieving us from the need to integrate it.

### Dynamic highlight demo

Here's the working example.

If you run this code, it starts observing the element below and highlighting any code snippets that appear there:

```js run
let observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    // examine new nodes, is there anything to highlight?

    for (let node of mutation.addedNodes) {
      // we track only elements, skip other nodes (e.g. text nodes)
      if (!(node instanceof HTMLElement)) continue;

      // check the inserted element for being a code snippet
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // or maybe there's a code snippet somewhere in its subtree?
      for (let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }
});

let demoElem = document.getElementById("highlight-demo");

observer.observe(demoElem, { childList: true, subtree: true });
```

Here, below, there's an HTML-element and JavaScript that dynamically fills it using `innerHTML`.

Please run the previous code (above, observes that element), and then the code below. You'll see how `MutationObserver` detects and highlights the snippet.

<p id="highlight-demo" style="border: 1px solid #ddd">A demo-element with <code>id="highlight-demo"</code>, run the code above to observe it.</p>

The following code populates its `innerHTML`, that causes the `MutationObserver` to react and highlight its contents:

```js run
let demoElem = document.getElementById("highlight-demo");

// dynamically insert content with code snippets
demoElem.innerHTML = `A code snippet is below:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Another one:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

Now we have `MutationObserver` that can track all highlighting in observed elements or the whole `document`. We can add/remove code snippets in HTML without thinking about it.

## Additional methods

There's a method to stop observing the node:

- `observer.disconnect()` -- stops the observation.

When we stop the observing, it might be possible that some changes were not yet processed by the observer. In such cases, we use

- `observer.takeRecords()` -- gets a list of unprocessed mutation records - those that happened, but the callback has not handled them.

These methods can be used together, like this:

```js
// get a list of unprocessed mutations
// should be called before disconnecting,
// if you care about possibly unhandled recent mutations
let mutationRecords = observer.takeRecords();

// stop tracking changes
observer.disconnect();
...
```

```smart header="Records returned by `observer.takeRecords()`are removed from the processing queue"
The callback won't be called for records, returned by`observer.takeRecords()`.

````

```smart header="Garbage collection interaction"
Observers use weak references to nodes internally. That is, if a node is removed from the DOM, and becomes unreachable, then it can be garbage collected.

The mere fact that a DOM node is observed doesn't prevent the garbage collection.
````

## Summary

`MutationObserver` can react to changes in DOM - attributes, text content and adding/removing elements.

We can use it to track changes introduced by other parts of our code, as well as to integrate with third-party scripts.

`MutationObserver` can track any changes. The config "what to observe" options are used for optimizations, not to spend resources on unneeded callback invocations.

### 1. Example To use it In JavaScript.

When someone mouses over our div element, we will get a console.log message that it has been moused over.

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sample</title>
    </head>
    <body>
        <h1>Sample</h1>

        <section id="div_section">

        </section>

        <script type="text/javascript">
            const div_section = document.querySelector('#div_section');

            const observer = new MutationObserver((mutationsList, observer) => {
                for(const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        console.log('A child node has been added or removed.');
                        const nodes = mutation.addedNodes;
                        nodes.forEach(node => {
                            node.addEventListener('mouseover', eventMouseOver);
                        });
                    }
                }
            });

            observer.observe(div_section, {
                attributes: false,
                childList: true,
                subtree: false }
            );

            function eventMouseOver(event) {
                console.log('This element was just moused over');
            }

            (function (){
                const section = document.querySelector('#div_section');
                let my_div_element = document.createElement('div');
                my_div_element.className = 'div_element';
                my_div_element.textContent = `My content goes here`;
                section.appendChild(my_div_element);
            })();
        </script>
    </body>
</html>
```

### 2. Example To use it In JavaScript when user click.

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sample</title>
    </head>
    <body>
        <h1>Sample</h1>

        <div id="div_section">

        </div>

       <script type="text/javascript">
           const div_section = document.querySelector('#div_section');

            const observer = new MutationObserver((mutationsList, observer) => {

                for(const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        const nodes = mutation.addedNodes;
                        nodes.forEach(node => {
                            node.addEventListener('click', eventMouseClick);
                        });
                    }
                }
            });

           //  Call the observe function by passing the node you want to watch with configuration options
            observer.observe(div_section, {
                attributes: true,
                childList: true,
                subtree: true }
            );

            function eventMouseClick(event) {
                console.log('This element was just moused over',event);
            }

            (function (){
                const section = document.querySelector('#div_section');
                let my_div_element = document.createElement('button');
                my_div_element.id = 'div_element';
                my_div_element.textContent = `Add`;
                section.appendChild(my_div_element);
            })();
        </script>
    </body>
</html>


- WE can use this way  as well


// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
   for(const mutation of mutationsList) {
    if (mutation.type === 'childList') {
        const nodes = mutation.addedNodes;
        nodes.forEach(node => {
            node.addEventListener('click', eventMouseClick);
        });
    }
}
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(div_section, config);
```

- NOTE :

let config = {
childList: true,
attributes: true,
characterData: false,
subtree: false,
attributeFilter: ['attr1', 'attr2'],
attributeOldValue: false,
characterDataOldValue: false
};

You don’t need to use all the options. However, to make the MutationObserver works, at least one of childList, attributes, or characterData needs to be set to true, otherwise the observer() method will throw an error.

### 3. Example

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MutationObserver Demo: ChildList</title>
</head>
<body>
    <ul id="language">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>TypeScript</li>
    </ul>

    <button id="btnStart">Start Observing</button>
    <button id="btnStop">Stop Observing</button>
    <button id="btnAdd">Add</button>
    <button id="btnRemove">Remove the Last Child</button>

    <script src="app.js"></script>
</body>
</html>


//  Inside app.js.

(function () {
    // selecting the list
    let list = document.querySelector('#language');

    // selecting the buttons
    let btnAdd = document.querySelector('#btnAdd');
    let btnRemove = document.querySelector('#btnRemove');
    let btnStart = document.querySelector('#btnStart');

    // disable the stop button
    let btnStop = document.querySelector('#btnStop');
    btnStop.disabled = true;

    function log(mutations) {
        for (let mutation of mutations) {
            if (mutation.type === 'childList') {
                console.log(mutation);
            }
        }
    }

    let observer = new MutationObserver(log);


// 1. Start observing the DOM changes to the child nodes of the list element when the Start Observing button is clicked by calling the observe() method with the childList of the options object is set to true:
    btnStart.addEventListener('click', function () {
        observer.observe(list, {
            childList: true
        });

        btnStart.disabled = true;
        btnStop.disabled = false;
    });

    //  4. Finally, stop observing DOM changes when the Stop Observing button is clicked by calling the disconnect() method of the MutationObserver object:
    btnStop.addEventListener('click', function () {
        observer.disconnect();

        // Set the button state
        btnStart.disabled = false;
        btnStop.disabled = true;
    });

    // 2.  add a new list item when the add button is clicked:
    let counter = 1;
    btnAdd.addEventListener('click', function () {
        // create a new item element
        let item = document.createElement('li');
        item.textContent = `Item ${counter++}`;

        // append it to the child nodes of list
        list.appendChild(item);
    });

    //  3. remove the last child of the list when the Remove button is clicked:
    btnRemove.addEventListener('click', function () {
        list.lastElementChild ?
            list.removeChild(list.lastElementChild) :
            console.log('No more child node to remove');
    });

})();


```

### NOTES :

- Observing for changes to attributes.

1. To observe for changes to attributes, you use the following attributes property of the options object:

```js
let options = {
  attributes: true,
};
```

If you want to observe the changes to one or more specific attributes while ignoring the others, you can use the attributeFilter property:

```js
let options = {
  attributes: true,
  attributeFilter: ["class", "style"],
};
```

In this example, the MutationObserver will invoke the callback each time the class or style attribute changes.

- Observing for changes to a subtree

2. To monitor the target node and its subtree of nodes, you set the subtree property of the options object to true:

```js
let options = {
  subtree: true,
};
```

- Observing for changes to character data

3. To monitor the node for changes to its textual contents, you set the characterData property of the options object to true:

```js
let options = {
  characterData: true,
};
```

- Accessing old values

4. To access the old values of attributes, you set the attributeOldValue property of the options object to true:

```js
let options = {
  attributes: true,
  attributeOldValue: true,
};
```

Similarly, you can access the old value of character data by setting the characterDataOldValue property of the options object to true:

```js
let options = {
  characterData: true,
  subtree: true,
  characterDataOldValue: true,
};
```
