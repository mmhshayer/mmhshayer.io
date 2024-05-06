---
author: "Mohammad Mustakim Hassan"
title: "Stack Data Structure"
date: "2023-02-14"
description: "Notes on Stack Data Structure"
tags: ["data structure", "stack"]
ShowToc: true
---

## Introduction
A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. It consists of a collection of elements with two main operations: push (adding an element to the top) and pop (removing the top element).

## Operations
Stacks support various operations, including:
- **Push**: Adding an element to the top of the stack.
- **Pop**: Removing the top element from the stack.
- **Peek**: Viewing the top element of the stack without removing it.
- **isEmpty**: Checking if the stack is empty.
- **Size**: Getting the number of elements in the stack.

## Example
Consider a stack representing a stack of plates:
```javascript
const plateStack = [];
```

**Push**: Adding an element to the top of the stack.
```javascript
plateStack.push('Plate 1');
plateStack.push('Plate 2');
plateStack.push('Plate 3');
```

**Pop**: Removing the top element from the stack.
```javascript
const removedPlate = plateStack.pop(); // Output: 'Plate 3'
```

**Peek**: Viewing the top element of the stack without removing it.
```javascript
const topPlate = plateStack[plateStack.length - 1]; // Output: 'Plate 2'
```

**isEmpty**: Checking if the stack is empty.
```javascript
const isEmpty = plateStack.length === 0; // Output: false
```

**Size**: Getting the number of elements in the stack.
```javascript
const stackSize = plateStack.length; // Output: 2
```

## Advantage
- **Simple and Efficient**: Stacks are easy to implement and provide efficient operations for adding and removing elements, making them suitable for scenarios requiring a last-in, first-out data structure.
- **Memory Management**: Stacks are used in programming languages for function call management, managing local variables, and tracking execution contexts, contributing to efficient memory management.
- **Undo Mechanism**: Stacks can be used to implement undo functionalities in applications by storing the previous states or actions.

## Disadvantage
- **Limited Access**: Stacks offer limited access to elements, as only the top element is accessible for modification or removal. Accessing elements at arbitrary positions requires popping elements until the desired element is reached.
- **Static Size**: In some implementations, stacks may have a fixed size, leading to stack overflow errors when attempting to push elements beyond the capacity.
- **No Random Access**: Unlike arrays, stacks do not support random access to elements, which can be limiting in certain scenarios requiring random element retrieval.

## Application
Stacks find applications in various scenarios, including:
- **Function Call Management**: Tracking function calls and managing local variables in programming languages using the call stack.
- **Expression Evaluation**: Evaluating arithmetic expressions, parsing infix expressions to postfix or prefix notations, and performing expression validation using stacks.
- **Backtracking Algorithms**: Implementing backtracking algorithms in combinatorial problems, such as maze solving, Sudoku solving, and N-queens problem.
- **Memory Management**: Managing memory allocation and deallocation in operating systems using the system stack and heap.

## Example JavaScript Implementation
```javascript
class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.pop();
    }

    peek() {
        return this.isEmpty() ? "Stack is empty" : this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

// Example usage
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek()); // Output: 30
console.log(stack.pop()); // Output: 30
console.log(stack.size()); // Output: 2
console.log(stack.isEmpty()); // Output: false
```
