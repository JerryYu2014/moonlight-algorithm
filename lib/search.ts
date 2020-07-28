
/**
 * Two dimensional ordered array search
 * @param target search target
 * @param array Two dimensional ordered array
 */
export function _2DArraySearch(target: Number, array: Array<Number>): Boolean {
  let i = array.length - 1; // y坐标
  let j = 0; // x坐标
  return compare(target, array, i, j);
}

function compare(target: Number, array: any, i: any, j: any): Boolean {
  if (array[i] === undefined || array[i][j] === undefined) {
    return false;
  }
  const temp = array[i][j];
  if (target === temp) {
    return true;
  }
  else if (target > temp) {
    return compare(target, array, i, j + 1);
  }
  else if (target < temp) {
    return compare(target, array, i - 1, j);
  }
  return false;
}
/**
 * 二分查找
 * @param target search target （搜索目标）
 * @param arr Ordered array（有序一维数组）
 * @param start 搜索范围起始下标
 * @param end 搜索范围结束下标
 */
export function binarySearch(target: Number, arr: Array<Number>, start: number, end: number): Number {
  if (start > end) {
    return -1;
  }
  var mid = Math.floor((end + start) / 2);
  if (target == arr[mid]) {
    return mid;
  } else if (target < arr[mid]) {
    return binarySearch(target, arr, start, mid - 1);
  } else {
    return binarySearch(target, arr, mid + 1, end);
  }
}
