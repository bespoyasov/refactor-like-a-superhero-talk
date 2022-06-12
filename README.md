# Refactor Like a Superhero

> Read this [in Russian](./docs/ru.md).

Refactoring code takes effort and resources. It isn't always possible to find time for it. In this talk, I want to share technics I use that help me find time for refactoring and search for problems in the code.

From this talk you will learn:

- How to sell the idea of refactoring to the business;
- How to spot problems in the code and start “feeling” them intuitively;
- What buzzwords from the development world are most useful in refactoring code.

In this repository, I've collected code examples that I've used in the slides. You can find links to the slides and additional materials in the list below:

- [Slides from the talk](https://bespoyasov.me/slides/refactor-like-a-superhero/)
- [Sources and useful links](https://bespoyasov.me/slides/refactor-like-a-superhero/sources-en.html)

## Commit History

Each commit in this repository is one step in the refactoring of an application. The entire commit history reflects the refactoring process as a whole.

The commit messages describe _what_ was done. Here I'll go into more detail about _why_ these changes were made and _what their benefits_ are.

### [Add “Dirty” Source Code](https://github.com/bespoyasov/refactor-like-a-superhero/commit/2c277c71e9bbd1204d1055c5eee934dd0ba79b94)

Add an application with “dirty” source code. Our application is the cart of an online store. The cart contains a list of products, a field for entering a discount coupon and a button for sending the order.

This commit will be the starting point. We will clean up the code starting from here.

### Define Refactoring Boundaries

Before we start refactoring, it's worth determining the scope of code and functionality that we're going to refactor.

This is necessary for two reasons:

- we want to stay within the time and resource budget that we have;
- with small changes, it's easier to manage them and keep track of what exactly broke the code.

We can refactor a function, a module, a subsystem, or even the whole system. But as a rule of thumb, it's better to move in _small steps_. Several small refactoring sessions are better than a single big one.

In our case, the refactoring scope is the checkout case.

### [Cover Use Case with Tests](https://github.com/bespoyasov/refactor-like-a-superhero/commit/68877aa0fc67fd27f8ca2d432f77d78331478579)

When refactoring, it's important to make sure that we haven't broken anything. To do this, before doing _anything_, we cover with tests the part of the code we're going to refactor.

When we write tests, we examine the code. It's worth testing as many edge cases as possible and seeing how the code behaves in them. The information on how the application behaves with different inputs will be useful in the future.

In our case, the checkout use case is a slice of the entire application, so we need an end-to-end test. The type of tests isn't as important during refactoring as their _existence_. We can use unit tests too, if they cover the whole refactoring scope.

We can also test the app manually, but we'd better automate it. We should check the code's work often—after each, even the smallest, change. In this way, we'll be able to find out more quickly what exactly has broken the code. We'll get tired of testing everything manually very quickly 😃

### [Apply Prettier](https://github.com/bespoyasov/refactor-like-a-superhero/commit/67dcaeeb429356518a626a9025c17d742bac5c1b)

Let's start with a simple one: formatting. The more unified the code base is, the easier it's to navigate on it.

In this project, let's say we decided to use Prettier as a set of formatting rules. Let's apply it.

Sometimes Prettier breaks code when it wraps something onto a new line, for example. To make sure this doesn't happen, we check to see if the tests we wrote earlier pass.

### [Remove “Dead” Code](https://github.com/bespoyasov/refactor-like-a-superhero/commit/803d6b54bd1528ce72efb6188cd92b524bc0e572)

We can also use linters, such as ESLint, for code hygiene.

Linters will point out unreachable or unused code, as well as practices that the industry considers bad.

Unused code we can remove. After each step, we'll check to see if the tests pass. In the future, I will stop emphasizing this. We'll just keep in mind that we test _every_ change.

### [Rename `d` to `discount`](https://github.com/bespoyasov/refactor-like-a-superhero/commit/72661edb6c7c754b5553eafa504526db49381d4e)

For entities with unclear names, we should find out what they are responsible for.

As a rule, an “obscure name” is a signal of a poor understanding of the domain, or problems with code separation and abstraction layers (more on this later).

Too short names and abbreviations are bad because they hide information about the domain. Sooner or later such a name will be misread because all the “knowledgeable” developers have left the project.

We can reduce the [bus factor](https://en.wikipedia.org/wiki/Bus_factor) by passing all the necessary information directly in the entity name. (As a last resort, in the documentation, but it gets outdated quickly, which can lead to multiple sources of information. It can become unclear which to trust: docs or the code.)

### [Use Domain Term (`User`) as Entity Name](https://github.com/bespoyasov/refactor-like-a-superhero/commit/b84ba8460b6702f89b7e42735e95c18665cf4d82)

To make sure that everyone in the project understands each other, you can use ubiquitous language.

This language consists of domain terms. The domain is an area of knowledge that the project is modelling. These terms should be used everywhere in the design and development of the system.

In our case, we call the variable `User`. This way anyone involved in the project will be able to interpret the code and its purpose correctly.

### [Declare `_userId` Closer to Where It's Used](https://github.com/bespoyasov/refactor-like-a-superhero/commit/03f879ae9e2bb24117d150e697a14978b278d277)

When the code is “scattered” throughout the file, it becomes difficult to read and “scan” with your eyes during an eye-scanning.

In this case, we have to keep in mind everything that happened to the `_userId` variable before we started using it. There are two problems with this:

- The variable is used _too far_ from where it's declared;
- It can be changed anywhere in the code, we have to keep in mind all such changes.

We'll talk more about immutability later. With this commit we will solve the first problem by declaring the variable closer to where it is used.

### [Declare `products` Closer to Where It's Used](https://github.com/bespoyasov/refactor-like-a-superhero/commit/1bf8fb1d980ee19fa6f448c098bdf1e87ac2f6e9)

For the same reasons as last time, we “defragment” this part of the code as well.

### [Make Total Amount Calculation Declarative](https://github.com/bespoyasov/refactor-like-a-superhero/commit/63cb8917f653eeed98b81fd72fd9170f8c35c762)

A declarative code is one that tells you _what_ it does. An imperative code, on the other hand, that tells you _how_ it does something.

Declarative code expresses the _intent_. It's easier to read because it hides unnecessary implementation details under clear function and variable names. Declarative code helps to express itself in terms of the level of abstraction at which the reader of the code is at that point in time.

### [Rename `price` to Avoid Identical Names for Different Entities](https://github.com/bespoyasov/refactor-like-a-superhero/commit/86dea9d987af5aa0beb780efa916c6c0070b2929)

Different entities can be called by the same name if they're in different contexts or if the interaction with them is separated in time.

In other cases, it's better to use different names for different entities. This prevents from confusion when reading and errors when executing code.

(Identical names are especially dangerous if the code is mutable. Changing one variable may accidentally affect another with the same name.)

### [Use `onSubmit` to Submit the Form](https://github.com/bespoyasov/refactor-like-a-superhero/commit/16313564ad6d9dc954230bba1a612b087b6482e0)

One of the “low-hanging fruit” in refactoring is code that can be replaced by language or environment features.

We can, for example, replace the helper that imitated the `.includes()` method with the method itself. Or, as in our case, don't handle two separate events (clicking on the button and pressing Enter in the field), but use the form submission event.

### [Use `FormData` for Form Serialization](https://github.com/bespoyasov/refactor-like-a-superhero/commit/62d16cb554ffe9d708b40cdafef7e957f260b4b2)

The standard `FormData` saves us from writing a bunch of unnecessary code. (And probably solves the problem better than us.)

It's also a data structure that was specifically invented for the task of serializing forms. Using the right data structures can often determine what kind of algorithm we should use, and how effective the algorithm will be.

### [Split Business Logic and Side Effects](https://github.com/bespoyasov/refactor-like-a-superhero/commit/aca4619f4e76526ab7b467a0cb366065a75d2193)

The business logic is the most important thing in an application. The simpler it's written, the easier it is to test, validate, and modify.

I prefer to use pure functions and a functional approach to write it. Interacting with the outside world, however, is always associated with side effects.

To avoid mixing business logic and side effects, I use a code organization principle called “Functional Kernel in an Imperative Shell”. (Or as Mark Seemann calls it, [Impureim Sandwich](https://blog.ploeh.dk/2020/03/02/impureim-sandwich/).)

The principle is to keep the logic pure and keep the side effects _around_ it. For example:

- Side effect to get data from the outer world;
- Functional core for transforming data;
- Side effect to store data in the outer world.

This commit groups the code so that everything related to business logic is in the center of the function and all of the side effects are around it. We will also use this grouping later on.

### [Decouple UI and Use Case](https://github.com/bespoyasov/refactor-like-a-superhero/commit/5fe6e1f3c459f98ff633ae04fdeb12b17c6f7ad6)

We apply the “Separation of Concerns” principle and separate the use case function from the component rendering. These are two different tasks, so they should be handled by different entities.

We'll also reduce the coupling between “checkout” and “displaying information on the screen” functionality. This will help us make the use case independent of the framework and libraries. It'll be easier for us to test it and check whether it meets our requirements.

### [Clarify the Data Provider Name](https://github.com/bespoyasov/refactor-like-a-superhero/commit/cbb7a5033af28fd04b54bd01d2a6d9d2077c41c5)

Refine the name of the user data provider by adding the missing details needed for this level of abstraction.

Since we use data providers for different entities in the component, it's worth specifying which entity each one refers to. A name that is too abstract can be a problem to read: we'll have to keep the missing details in mind.

### [Shorten Form Submission Handler Name](https://github.com/bespoyasov/refactor-like-a-superhero/commit/80ebc00bb9bfbf7e0a2cc3e8051ec037a99f0e07)

We have abstracted the checkout into a function. We can now use the name of this function as a _term_ to explain ourselves at the current level of abstraction.

We now can avoid duplication of the details contained in the name of the checkout function in the name of the form submit handler.

### [Extract API](https://github.com/bespoyasov/refactor-like-a-superhero/commit/7475ae2e4acfbe5ee6b2bd2735dacacfd759c90e)

Here we separate the “service” code from the rest.

Working with the API is a utility task that isn't directly related to the checkout process. We can call it “service” code, and the entity that performs it—a service.

The checkout function doesn't need to know the details of how the “data sending service” sends the data. The only thing it _needs_ to know is that when the `makePurchase` function is called, the data is sent.

This way we abstract the details, separate the responsibility between the entities and further—reduce coupling between the modules.

### [Reduce Duplication](https://github.com/bespoyasov/refactor-like-a-superhero/commit/832b7d83e4b3cf66115298e4c1c2aebcefb25756)

A set of identical actions that _have the same goal_ is duplication. We should pay attention to such repetitive actions and put them in functions, calling them by understandable names.

Not all the duplication is pure evil. Sometimes, especially in the early stages of the project, we simply may not have enough data about the domain. Then it's better to mark the duplicates with special labels in the code and return to them later—when there's more information about the domain.

It often happens that two “seemingly identical” entities behave “almost the same”, but in fact they are completely different. It's better to observe them first and merge them later, if necessary.

In this case, we see two sets of identical operations with the same goal, which can be called by the same name. These operations can be extracted into a function.

### [Extract Discount Calculation into a Function](https://github.com/bespoyasov/refactor-like-a-superhero/commit/822a36732d9d07a62b788c60ec4bea3d0e147bf1)

Abstract the details by giving a clear name. This name is explained in terms understandable to the level of abstraction where the function is used.

### [Replace Ternary Operator with `Math.min`](https://github.com/bespoyasov/refactor-like-a-superhero/commit/17e20dfc2c02823e9f97f4dba4737bdac1e09766)

We improve the declarativeness of the code by using `Math.min`.

It isn't important for us to know _how_ exactly we define the minimum value of the listed ones. But it's easier to read the intention from the function name than from the body of the ternary operator.

### [Extract Cart Emptiness Check into a Function](https://github.com/bespoyasov/refactor-like-a-superhero/commit/403504bfd9e645b6d548f5b83c0e1e92784d21a2)

Abstract the details by giving a clear name. This name is explained in terms understandable to the level of abstraction where the function is used.

### [Extract Money Amount Check into a Function](https://github.com/bespoyasov/refactor-like-a-superhero/commit/2612d459bf32c8080d127e1b974f3a492ae5d19f)

Abstract the details by giving a clear name. This name is explained in terms understandable to the level of abstraction where the function is used.

### [Extract Order Creation into a Function](https://github.com/bespoyasov/refactor-like-a-superhero/commit/cbdda6146cf7738b07bc16e43fc47bf078b574d0)

An order is a domain entity. Each domain entity has a lifecycle of one or more states. By putting the creation of an order into a function, we focus on the states of the domain entity lifecycle and its further transformations.

Entity states and transformations are dictated by business processes and events in them. Working with such functions, it's easier for us to relate real-world processes and code transformations.

Also, we get rid of all side effects in the order creation and make it so that the `createOrder` function now only returns a new order. Thus, we differentiate between functions that _return values_ and functions that _produce side effects_. This is called Command-Query Separation and it helps making code behave more expectedly and controllably.

### [Fix “Lying” Names](https://github.com/bespoyasov/refactor-like-a-superhero/commit/6aa493589e8287418b7debd14eb0758db5e9960c)

When we have enough information about the business processes and the application as a whole, we can infer incorrect variable names.

Sometimes it happens that the name is inaccurate or even false. In this case, the variable contains a user name, but is called `_userId`. Maybe this project once used names as identifiers, but not now.

Variable names must be truthful, otherwise they will greatly confuse developers. With documentation, incorrect names can become a second “source of truth” from which developers will get the wrong information.

### [Extract Total Price Calculation into a Module](https://github.com/bespoyasov/refactor-like-a-superhero/commit/138ccd221aca453b60b242552efd89288e4aa390)

Here we decouple the functionality of “checkout” and “products” modules. (And if we don't decouple them, we at least make the coupling more noticeable with the direct imports).

Now we don't need to refer to the module `Order` to calculate the total amount for a list of, for example, products from the promotional newsletter.

### [Extract Cart Emptiness Check into a Module](https://github.com/bespoyasov/refactor-like-a-superhero/commit/e3b760c8c2dc3d2b3890667512ff86b8b562a60a)

Again we decouple the functionality of different modules: “cart” and “order”.

### [Simplify Extracted Function Name](https://github.com/bespoyasov/refactor-like-a-superhero/commit/1e368520a9bb204132d44048f588ad915cfbc7b5)

Since the information about the “shopping cart” is now available from the module context, we can remove the extra prefix from the function name.

### [Extract Discount Applying into a Function](https://github.com/bespoyasov/refactor-like-a-superhero/commit/8e4858eddbb2bae523c5c99ed77d7dfe353cf659)

We work through the lifecycle of the “order” entity.

An order may be in different states: “created”, “prepared”, “shipped”, etc. One of these states in our case is “discount applied”. In business processes, this state can appear not only after the order has been created, but also in other cases.

If we're dealing with a _separate state_, it's better to make the transformation to it a separate function. Then we can test this state in isolation and use the composition to apply a discount to completely different orders.

In this case, all our data transformation functions are made as _queries_ from CQS.

We don't update the created `order` object to avoid unexpected or uncontrolled side effects on that object. Instead, we _transform_ data into the new state, “discounted order”, and return a new object. This prevents application data from going into an invalid state and causing errors.

### [Make Discount Selection Declarative](https://github.com/bespoyasov/refactor-like-a-superhero/commit/9a06c8e4e9ef3cd20d629f00bfe99dda199ae983)

Instead of `switch` we use a dictionary in which the key is the coupon and the value is the discount value.

When written this way, we pass more information about the subject area in names: the dictionary name, the name of the value fallback. The extensibility of the code doesn't suffer, because a new coupon can be added by adding a new key-value pair to the dictionary.

(This code is also more reliable, because it's impossible to make a mistake with a missing `break` in the dictionary.)

### [Extract Repetitive Conditions in Variables](https://github.com/bespoyasov/refactor-like-a-superhero/commit/83087e073fb5197b84db429190b266eb10e4277c)

When we check the status, we compare it a couple of times with `idle` and a couple of times with `loading`. It'll be easier for us to see the patterns in the conditions if we put these checks into variables and name them clearly.

### [Use Early `return` in Render in Case of Error](https://github.com/bespoyasov/refactor-like-a-superhero/commit/77698649c7b24e6756ec86dc53899786b99bcf68)

The simplified condition helped us see that we can turn the condition inside out and handle the `else`-branch first.

To avoid keeping too many conditions in mind, we can use an early `return` and “filter out” unnecessary checked condition branches.

This is especially good for the render function: we can check all “problematic” cases, and then work with the main markup of the component.

### [Use Early `return` in Render for Loading State](https://github.com/bespoyasov/refactor-like-a-superhero/commit/562d6251aaaad5b339da2cb8abebf2072e1954e6)

The previous early `return` helped “pull” the nested condition to the top level. Now we see that it can be applied again, this time to the processing of the loading condition.

### [Use Direct Status Comparison](https://github.com/bespoyasov/refactor-like-a-superhero/commit/7bc70ea6f8a0cec8bd10d39e6ee9e1ff856fc56c)

When we unraveled the condition, it became clear that the remaining check can be replaced by a single unchecked status. We check the list of possible states of this component and make sure that this is the case.

### [Compactify Condition by Changing Check Order](https://github.com/bespoyasov/refactor-like-a-superhero/commit/576fe79895dac904055d0cbdfeb010f5ad4e66d5)

In this way we unravel the condition to the end and make it flat.

### [Abstract “Service” Error Catching Code](https://github.com/bespoyasov/refactor-like-a-superhero/commit/3ad5cf8a5e71a65dbc1e6405f61002b9699b6faa)

Error handling is also a functionality whose implementation details are not important to the business logic. We can bring error catcher into “service”. This will make the checking declarative, decouple functionality, and reduce possible duplication.

We can also make sure that the use of this code is convenient within the functional pipelines. This way we make the code flat, which in turn makes it easier to understand.

We'll use the result container to make it easier to handle failures. Now we'll know exactly in what format to expect a response from "unsafe" functions.

### [Use Anti-Corruption Layer for API](https://github.com/bespoyasov/refactor-like-a-superhero/commit/37e22983809bfd6ac9e7aadc09614d791a7eee3e)

We use dependency inversion, so that the use case depends not on a particular implementation of the API service, but on the interface—the contract on the behavior of such a service.

This decouples the code even further and allows you to replace the service with another service in production, as well as with mocks during tests.

### [Split UI Logic and Use Case Logic](https://github.com/bespoyasov/refactor-like-a-superhero/commit/adf63312b71d1df9877a6050be4952fce1d928ec)

When processing and submitting a form, we not only need to call the use case function, but also perform some operations related to the UI. The latter are UI logic, which should not be mixed up with the former.

With this commit, we decouple the UI and the use case call by adding a command and its handler. This way we divide the responsibility between the component (responsible for the UI) and the command handler (responsible for handling the use case and providing it with all the necessary data).

### [Check if Use Case is Now Easier to Test](https://github.com/bespoyasov/refactor-like-a-superhero/commit/c1d1e766594695c6b9652a2b7ba277618845cde7)

Here we write tests independent of React and UI. The use case function can now be tested like a regular asynchronous function. We don't need any additional technology or special infrastructure to do this.

We can also change the data sending service without using global mocks or complex testing setup.

## Conclusion

In this example, I've collected examples of most of the techniques that I use in my daily work. But this is far from all that's useful in refactoring.

I've gathered a complete list of all the techniques, useful books, posts, and other talks in the links below:

- [Main Heuristics](https://bespoyasov.me/slides/refactor-like-a-superhero/?full#takes)
- [Technics and How-Tos](https://bespoyasov.me/slides/refactor-like-a-superhero/?full#conclusion)
- [Complete List of Sources](https://bespoyasov.me/slides/refactor-like-a-superhero/sources-en.html)

## About Author

Alex Bespoyasov, consultant at [0+X](https://0x.se). Been writing code for more than 10 years. Have a [technical blog](bespoyasov.me), teach and mentor other developers.

- [0x.se](https://0x.se)
- [bespoyasov.me](https://bespoyasov.me)
- [Twitter](https://twitter.com/bespoyasov)
- [Telegram](https://t.me/bespoyasov)
