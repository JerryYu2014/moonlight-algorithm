
const listDiff = require('list-diff2')

// 每个节点有四种变动
export const REPLACE = 0 // 替换原有节点
export const REORDER = 1 // 调整子节点，包括移动、删除等
export const PROPS = 2 // 修改节点属性
export const TEXT = 3 // 修改节点文本内容

export function diff(oldTree: any, newTree: any) {
  // 节点的遍历顺序
  let index = 0
  // 在遍历过程中记录节点的差异
  let patches = {}
  // 深度优先遍历两棵树
  deepTraversal(oldTree, newTree, index, patches)
  // 得到的差异对象返回出去
  return patches
}

function deepTraversal(oldNode: any, newNode: any, index: any, patches: any) {
  let currentPatch = []
  if (newNode === null) { // 如果新节点没有的话直接不用比较了
    return
  }
  if (typeof oldNode === 'string' && typeof newNode === 'string') {
    // 比较文本节点
    if (oldNode !== newNode) {
      currentPatch.push({
        type: TEXT,
        content: newNode
      })
    }
  } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
    // 节点类型相同
    // 比较节点的属性是否相同
    let propsPatches = diffProps(oldNode, newNode)
    if (propsPatches) {
      currentPatch.push({
        type: PROPS,
        props: propsPatches
      })
    }
    // 递归比较子节点是否相同
    diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
  } else {
    // 节点不一样，直接替换
    currentPatch.push({ type: REPLACE, node: newNode })
  }

  if (currentPatch.length) {
    // 那个index节点的差异记录下来
    patches[index] = currentPatch
  }

}

// 子数的diff
function diffChildren(oldChildren: any, newChildren: any, index: any, patches: any, currentPatch: any) {
  var diffs = listDiff(oldChildren, newChildren)
  newChildren = diffs.children
  // 如果调整子节点，包括移动、删除等的话
  if (diffs.moves.length) {
    var reorderPatch = {
      type: REORDER,
      moves: diffs.moves
    }
    currentPatch.push(reorderPatch)
  }

  var leftNode: any = null
  var currentNodeIndex = index
  oldChildren.forEach((child: any, i: any) => {
    var newChild = newChildren[i]
    // index相加
    currentNodeIndex = (leftNode && leftNode.count) ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1
    // 深度遍历，从左树开始
    deepTraversal(child, newChild, currentNodeIndex, patches)
    // 从左树开始
    leftNode = child
  })
}

// 记录属性的差异
function diffProps(oldNode: any, newNode: any) {
  let count = 0 // 声明一个有没没有属性变更的标志
  const oldProps = oldNode.props
  const newProps = newNode.props
  const propsPatches: any = {}

  // 找出不同的属性
  for (let [key, val] of Object.entries(oldProps)) {
    // 新的不等于旧的
    if (newProps[key] !== val) {
      count++
      propsPatches[key] = newProps[key]
    }
  }
  // 找出新增的属性
  for (let [key, val] of Object.entries(newProps)) {
    if (!oldProps.hasOwnProperty(key)) {
      count++
      propsPatches[key] = val
    }
  }
  // 没有新增 也没有不同的属性 直接返回null
  if (count === 0) {
    return null
  }

  return propsPatches
}
