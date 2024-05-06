---
author: "Mohammad Mustakim Hassan"
title: "Quick Sort"
date: "2023-03-06"
description: "Notes on Quick Sort"
tags: ["algorithm", "sort", "recursive"]
ShowToc: true
---

## Introduction
Quick Sort is a divide-and-conquer sorting algorithm that divides the input array into smaller subarrays, partitions those subarrays based on a pivot element, and recursively sorts each partition.

## Algorithm
1. Choose a pivot element from the array (usually the last element).
2. Partition the array into two subarrays: elements less than the pivot and elements greater than the pivot.
3. Recursively apply Quick Sort to the subarrays.
4. Combine the sorted subarrays with the pivot element to produce the final sorted array.

## Example
Suppose we have an unsorted array: [5, 3, 8, 2, 7].
1. Choose the last element (7) as the pivot.
2. Partition the array into two subarrays: [5, 3, 2] and [8].
3. Recursively apply Quick Sort to the subarrays [5, 3, 2] and [8].
4. For the subarray [5, 3, 2]:
   - Choose the last element (2) as the pivot.
   - Partition the subarray into two subarrays: [2] and [5, 3].
   - Recursively apply Quick Sort to the subarrays [2] and [5, 3].
   - Combine the sorted subarrays [2] and [5, 3] with the pivot 2 to get [2, 3, 5].
5. For the subarray [8]:
   - Since it has only one element, it is already sorted.
6. Combine the sorted subarrays [2, 3, 5] and [8] with the pivot 7 to produce the final sorted array: [2, 3, 5, 7, 8].

## JavaScript Implementation
```javascript
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Example usage
const unsortedArray = [5, 3, 8, 2, 7];
const sortedArray = quickSort(unsortedArray);
console.log('Sorted Array:', sortedArray);
// Sorted Array: [2, 3, 5, 7, 8]
```

## Complexity Analysis
The time complexity of Quick Sort is O(n log n) on average and O(n^2) in the worst-case scenario, where n is the number of elements in the array. 

The space complexity is O(log n) due to the recursive nature of the algorithm.

## Advantage and Disadvantage

### Advantage:
- **Efficiency**: Quick Sort is highly efficient, especially for large datasets, due to its average-case time complexity of O(n log n).
- **In-Place Sorting**: Quick Sort sorts the array in-place, requiring only a constant amount of extra memory.
- **Tailored for Modern Processors**: Quick Sort's cache-friendly nature and minimal memory overhead make it well-suited for modern computer architectures.

### Disadvantage:
- **Worst-Case Performance**: Quick Sort may exhibit poor performance in the worst-case scenario (e.g., already sorted arrays or arrays with many duplicates), leading to quadratic time complexity.
- **Unstable Sorting**: Quick Sort is not stable, meaning it may change the relative order of equal elements.

## Application
Quick Sort finds applications in various scenarios where efficient sorting of large datasets is crucial. Some common applications include:
- **Sorting Large Databases**: Sorting large databases or datasets efficiently in database management systems.
- **Language Libraries**: Quick Sort is often used as the default sorting algorithm in programming language libraries due to its efficiency.
- **Computer Graphics**: Sorting objects based on their properties (e.g., depth) in computer graphics rendering.
- **Operating Systems**: Sorting processes or threads based on their priority levels in operating systems scheduling algorithms.
