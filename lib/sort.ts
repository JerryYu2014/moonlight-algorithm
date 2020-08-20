/**
 * Bubble Sort
 * @param array integer array
 */
export function bubbleSort(array: Array<Number>): Array<Number> {
  for (let j = 0; j < array.length; j++) {
    let complete = true;
    for (let i = 0; i < array.length - 1 - j; i++) {
      // 比较相邻数
      if (array[i] > array[i + 1]) {
        // [array[i], array[i + 1]] = [array[i + 1], array[i]];

        let swap = array[i];
        array[i] = array[i + 1];
        array[i + 1] = swap;

        complete = false;
      }
    }
    // 没有冒泡结束循环
    if (complete) {
      break;
    }
  }
  return array;
}

/**
 * Quick Sort 1
 * @param array integer array
 */
export function quickSort1(array: Array<Number>): Array<Number> {
  if (array.length < 2) {
    return array;
  }
  const target = array[0];
  const left = [];
  const right = [];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < target) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return quickSort1(left).concat([target], quickSort1(right));
}

/**
 * Quick Sort 2
 * @param array integer array
 * @param start The starting index of the array to be sorted
 * @param end End index of array to be sorted
 */
export function quickSort2(array: Array<Number>, start: any, end: any): Array<Number> {
  if (end - start < 1) {
    return [];
  }
  const target = array[start];
  let l = start;
  let r = end;
  while (l < r) {
    while (l < r && array[r] >= target) {
      r--;
    }
    array[l] = array[r];
    while (l < r && array[l] < target) {
      l++;
    }
    array[r] = array[l];
  }
  array[l] = target;
  quickSort2(array, start, l - 1);
  quickSort2(array, l + 1, end);
  return array;
}

export function insertSort(array: any) {
  for (let i = 1; i < array.length; i++) {
    let target = i;
    for (let j = i - 1; j >= 0; j--) {
      if (array[target] < array[j]) {
        [array[target], array[j]] = [array[j], array[target]]
        target = j;
      } else {
        break;
      }
    }
  }
  return array;
}
