---
author: "Mohammad Mustakim Hassan"
title: "Depth First Search"
date: "2023-05-06"
description: "Notes on Depth First Search (DFS)"
tags: ["algorithm", "search", "graph"]
ShowToc: true
draft: true
---

## Introduction
Depth First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It traverses a graph or tree recursively, visiting all the vertices of a node before moving to the next branch.

## Algorithm Steps
- Start at the initial vertex (source node).
- Visit the initial vertex and mark it as visited.
- Explore an adjacent unvisited vertex.
- Repeat the process recursively until all vertices are visited.
- If there are no unvisited adjacent vertices, backtrack to the previous vertex.

## Example
Consider the following graph:
```
     A
   / | \
  B  |  C
 / \ | / \
D   E F   G
```
Starting from vertex A, a depth-first traversal would visit vertices in the order: A -> B -> D -> E -> C -> F -> G.

## JavaScript Implementation
```javascript
class Graph {
    constructor() {
        this.vertices = {};
    }

    addVertex(vertex) {
        if (!this.vertices[vertex]) {
            this.vertices[vertex] = [];
        }
    }

    addEdge(source, destination) {
        this.vertices[source].push(destination);
    }

    depthFirstSearch(start) {
        const visited = {};
        const traversalOrder = [];

        const dfs = (vertex) => {
            visited[vertex] = true;
            traversalOrder.push(vertex);

            this.vertices[vertex].forEach((neighbor) => {
                if (!visited[neighbor]) {
                    dfs(neighbor);
                }
            });
        };

        dfs(start);
        return traversalOrder;
    }
}

// Example usage
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('C', 'G');

const traversalOrder = graph.depthFirstSearch('A');
console.log('Depth First Search Traversal Order:', traversalOrder);
// Depth First Search Traversal Order: [ 'A', 'B', 'D', 'E', 'C', 'F', 'G' ]
```
## Complexity Analysis
The time complexity of Depth First Search is O(V + E), where V is the number of vertices and E is the number of edges in the graph. 
The space complexity is O(V) due to the recursive nature of the algorithm.

## Advantage and Disadvantage

### Advantage:
- **Simplicity**: Depth First Search is simple to implement and understand.
- **Memory Efficiency**: It requires less memory compared to Breadth First Search as it explores a single branch of the graph as deeply as possible before backtracking.

### Disadvantage:
- **Non-Optimal for Finding Shortest Path**: DFS may not find the shortest path between two vertices in the presence of cycles.
- **Potential for Stack Overflow**: In deeply recursive graphs, DFS may cause stack overflow due to excessive recursion.

## Application
Depth First Search finds applications in various fields, including:
- **Graph Theory**: Used for graph traversal, cycle detection, and topological sorting.
- **Maze Solving**: DFS can be used to solve mazes by exploring paths until a solution is found.
- Puzzle Games: Used to solve puzzles like Sudoku and crossword puzzles.
- **Network Analysis**: DFS is used to discover and explore networks, such as social networks and computer networks.
- **Artificial Intelligence**: In AI algorithms like backtracking and constraint satisfaction problems, DFS is employed to search through possible solutions.
