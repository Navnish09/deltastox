// Function to find the nearest number in a sorted array using binary search
export function findNearestNumber(sortedArray: number[], input: number) {
  let left = 0;
  let right = sortedArray.length - 1;
  let nearest;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (sortedArray[mid] === input) {
      return sortedArray[mid]; // Found an exact match
    }

    if (
      nearest === undefined ||
      Math.abs(sortedArray[mid] - input) < Math.abs(nearest - input)
    ) {
      nearest = sortedArray[mid];
    }

    if (sortedArray[mid] < input) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return nearest;
}
