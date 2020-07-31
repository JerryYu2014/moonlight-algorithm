// data bidirectional binding

function defineReactive(data: any, key: any, val: any) {
  // 递归遍历所有子属性
  observe(val);

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    // writable: false,
    // value: undefined,
    get: function () {
      return val;
    },
    set: function (newVal) {
      val = newVal;
      // console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
    }
  });
}

/**
 * 
 * @param data 
 */
export function observe(data: any) {
  if (!data || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key]);
  });
};
