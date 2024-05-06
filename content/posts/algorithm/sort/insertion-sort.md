---
author: "Mohammad Mustakim Hassan"
title: "Insertion Sort"
date: "2023-05-06"
description: "Notes on Insertion Sort"
tags: ["algorithm", "sort"]
ShowToc: true
---

## Introduction
Insertion Sort is a simple sorting algorithm that builds the final sorted array one element at a time. It iterates over the input elements and inserts each element into its correct position within the sorted array.

## Algorithm
1. Start with the second element (index 1) of the array.
2. Compare the current element with the elements before it.
3. If the current element is smaller, shift the larger elements to the right.
4. Repeat steps 2 and 3 until the correct position for the current element is found.
5. Insert the current element into its correct position.
6. Repeat the process for the remaining elements in the array.

## Example
Suppose we have an unsorted array: [5, 3, 8, 2, 7].
1. Start with the second element (3) and compare it with the first element (5). Since 3 < 5, shift 5 to the right.
   Result: [3, 5, 8, 2, 7]
2. Compare 3 with the previous elements (none) and insert it at the beginning.
   Result: [3, 5, 8, 2, 7]
3. Move to the next element (8) and insert it into its correct position among the sorted elements.
   Result: [3, 5, 8, 2, 7]
4. Repeat the process for the remaining elements (2 and 7) to obtain the sorted array: [2, 3, 5, 7, 8].

## JavaScript Implementation
```javascript
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = current;
    }
    return arr;
}

// Example usage
const unsortedArray = [5, 3, 8, 2, 7];
const sortedArray = insertionSort(unsortedArray);
console.log('Sorted Array:', sortedArray);
// Sorted Array: [2, 3, 5, 7, 8]
```

## Complexity Analysis
The time complexity of Insertion Sort is O(n^2) for the worst-case scenario, where n is the number of elements in the array. 
The space complexity is O(1) as it only requires a constant amount of extra memory.

## Advantage and Disadvantage

### Advantage:
- **Simple Implementation**: Insertion Sort is straightforward to implement and understand.
- **Efficient for Small Data Sets**: It performs well for small arrays or nearly sorted arrays.
In-Place Sorting: It sorts the array in-place, requiring only a constant amount of extra memory.

### Disadvantage:
- **Inefficient for Large Data Sets**: Insertion Sort becomes inefficient for large datasets due to its quadratic time complexity.
Not Suitable for Large-Scale Applications: It is not suitable for large-scale applications where sorting large datasets efficiently is crucial.
**Not Stable**: Insertion Sort may not preserve the relative order of equal elements.

## Application
Insertion Sort finds applications in scenarios where simplicity and efficiency for small datasets are more important than sorting large datasets quickly. Some common applications include:
- **Small Data Sets**: Sorting small arrays or lists efficiently, such as sorting a hand of cards.
- **Online Sorting**: Sorting streaming data or continuously growing datasets where elements are added incrementally.
- **Nearly Sorted Data**: Sorting nearly sorted arrays or lists efficiently with minimal comparisons.