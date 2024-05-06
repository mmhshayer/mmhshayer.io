---
author: "Mohammad Mustakim Hassan"
title: "Binary Search"
date: "2023-03-06"
description: "Notes on Binary search"
tags: ["algorithm", "search", "graph"]
ShowToc: true
---

## Introduction
Binary Search is a searching algorithm used in a sorted array by repeatedly dividing the search interval in half. The idea is to use the information that the array is sorted and reduce the time complexity to O(log N).

## Algorithm steps
- Divide the search space into two halves by finding the middle index “mid”. 
- Compare the middle element of the search space with the key. 
- If the key is found at middle element, the process is terminated.
- If the key is not found at middle element, choose which half will be used as the next search space.
    - If the key is smaller than the middle element, then the left side is used for next search.
    - If the key is larger than the middle element, then the right side is used for next search.
- This process is continued until the key is found or the total search space is exhausted.

## Example
Suppose we have an array of sorted integers: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]. We want to search for the element 11 in this array using binary search.
1. Start with the entire array: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19].
2. Determine the middle element: 9 (at index 4).
3. Compare the middle element (9) with the target (11).
4. Since 11 > 9, we discard the left half and continue searching in the right half: [11, 13, 15, 17, 19].
5. Determine the new middle element: 15 (at index 7).
6. Compare the middle element (15) with the target (11).
7. Since 11 < 15, we discard the right half and continue searching in the left half: [11, 13].
8. Determine the new middle element: 13 (at index 6).
9. Compare the middle element (13) with the target (11).
10. Since 11 < 13, we discard the right half and continue searching in the left half: [11].
11. Determine the new middle element: 11 (at index 5).
12. Compare the middle element (11) with the target (11).
13. We found the target. Return the index 5.

The element 11 is found at index 5 in the array.

## JavaScript Implementation
```javascript
// find index of an element (target) in a sorted array(arr) using binary search
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Example usage
const array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 11;
const index = binarySearch(array, target);
console.log(`Element ${target} found at index ${index}`);
// Element 11 found at index 5
```

## Complexity Analysis
Binary search has a time complexity of O(log N) where N is the number of elements in the sorted array. 

Space complexity is O(1) as it uses a constant amount of extra space.

## Advantage and Disadvantage

### Advantage:
- **Efficiency**: Binary search is highly efficient due to its logarithmic time complexity. It drastically reduces the search space with each comparison, making it ideal for large datasets.
- **Applicability**: It works well with sorted arrays, making it suitable for a wide range of applications where data is organized in a sorted manner.
- **Deterministic**: Binary search has a deterministic nature, ensuring that it will always find the target element if it exists in the array.

### Disadvantage:
- **Requirement of Sorted Array**: Binary search requires the array to be sorted beforehand. If the array is not sorted, either a sorting step is needed (which increases the overall time complexity) or a different search algorithm must be used.
- **Limited Applicability**: It cannot be directly applied to data structures other than arrays, such as linked lists, where sequential access is not efficient.
- **No Handling of Duplicates**: Binary search may not handle duplicates efficiently, especially if the application requires finding all occurrences of a particular element.

## Application
Binary search finds application in various domains where efficiency in searching large datasets is crucial. Some common applications include:
- **Database Systems**: Binary search is used in database systems to quickly locate records based on indexed columns.
- **Information Retrieval**: Search engines utilize binary search to efficiently retrieve relevant information from a large corpus of documents.
- **Game Development**: Binary search is employed in game development algorithms, such as pathfinding and collision detection, to optimize performance.
- **Genetics and Bioinformatics**: It is used in genetic and bioinformatic algorithms to search and analyze large datasets of DNA sequences or protein structures.
- **Sorting Algorithms**: Binary search is a fundamental component of various sorting algorithms like quicksort and mergesort, enhancing their efficiency.
