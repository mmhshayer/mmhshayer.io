---
author: "Mohammad Mustakim Hassan"
title: "Tree Data Structure"
date: "2023-05-06"
description: "Notes on Tree Data Structure"
tags: ["data structure", "tree"]
ShowToc: true
draft: true
---

## Introduction
A tree is a hierarchical data structure that consists of nodes connected by edges. It is composed of a root node and zero or more subtrees, where each subtree itself is a tree. Trees are widely used for representing hierarchical relationships and organizing data in a hierarchical manner.

## Operations
Trees support various operations, including:
- **Insertion**: Adding nodes to the tree.
- **Deletion**: Removing nodes from the tree.
- **Traversal**: Visiting all nodes of the tree in a specific order.
- **Search**: Finding nodes with a specific value or key in the tree.
- **Height Calculation**: Calculating the height of the tree.
- **Balancing**: Balancing the tree to maintain optimal performance.

## Advantage
- **Hierarchical Organization**: Trees provide a hierarchical organization of data, making them suitable for representing relationships such as parent-child, ancestor-descendant, and containment.
- **Efficient Searching**: Trees offer efficient searching operations, with average-case time complexities often better than linear search, especially in balanced trees like binary search trees.
- **Ordered Access**: Trees can maintain elements in sorted order, facilitating efficient traversal and search operations, which is essential in applications requiring ordered data retrieval.

## Disadvantage
- **Complexity**: Tree operations can be more complex than linear data structures, requiring careful handling of insertion, deletion, and traversal, especially in balanced or self-adjusting trees.
- **Memory Overhead**: Trees may consume more memory compared to linear data structures, especially in balanced trees, due to additional pointers or metadata required for maintaining the tree structure.
- **Balancing Overhead**: Maintaining balance in self-adjusting trees like AVL trees or red-black trees may incur additional overhead in terms of computational complexity and memory usage.

## Application
Trees find applications in various scenarios, including:
- **File Systems**: Organizing files and directories in file systems using hierarchical tree structures, facilitating efficient file retrieval and management.
- **Database Indexing**: Implementing indexing structures like B-trees and binary search trees in databases for efficient data retrieval and query processing.
- **Syntax Trees**: Representing the syntactic structure of programs or expressions in compilers and interpreters using abstract syntax trees (ASTs) for parsing and analysis.
- **Hierarchical Data Representation**: Storing and managing hierarchical data such as organizational charts, XML/JSON documents, and network routing tables using tree structures.

## Example JavaScript Implementation & Operations demonstration
```javascript
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else if (value > current.value) {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            } else {
                return; // Do not allow duplicate values
            }
        }
    }

    search(value) {
        let current = this.root;
        while (current) {
            if (value === current.value) {
                return true;
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    getHeight(node) {
        if (!node) return 0;
        const leftHeight = this.getHeight(node.left);
        const rightHeight = this.getHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    delete(value) {
        this.root = this._deleteNode(this.root, value);
    }

    _deleteNode(node, value) {
        if (!node) {
            return null;
        }

        if (value < node.value) {
            node.left = this._deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._deleteNode(node.right, value);
        } else {
            if (!node.left && !node.right) {
                return null;
            }

            if (!node.left) {
                return node.right;
            }

            if (!node.right) {
                return node.left;
            }

            const minRightNode = this._findMinNode(node.right);
            node.value = minRightNode.value;
            node.right = this._deleteNode(node.right, minRightNode.value);
        }

        return node;
    }

    _findMinNode(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    inOrderTraversal(node, callback) {
        if (node) {
            this.inOrderTraversal(node.left, callback);
            callback(node.value);
            this.inOrderTraversal(node.right, callback);
        }
    }

    balance() {
        const sortedValues = [];
        this.inOrderTraversal(this.root, (value) => {
            sortedValues.push(value);
        });
        this.root = this._buildBalancedBST(sortedValues, 0, sortedValues.length - 1);
    }

    _buildBalancedBST(sortedValues, start, end) {
        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const newNode = new TreeNode(sortedValues[mid]);

        newNode.left = this._buildBalancedBST(sortedValues, start, mid - 1);
        newNode.right = this._buildBalancedBST(sortedValues, mid + 1, end);

        return newNode;
    }
}

// Example usage
const bst = new BinarySearchTree();

// Insertion
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(12);
bst.insert(20);

// Search
const found = bst.search(10); // Output: true

// Height Calculation
const height = bst.getHeight(bst.root); // Output: 3

// Deletion
bst.delete(15);

// Traversal
bst.inOrderTraversal(bst.root, (value) => {
    console.log(value); // Output: 3, 5, 7, 10, 12, 20 (in-order traversal)
});

// Balancing
bst.balance();
```
