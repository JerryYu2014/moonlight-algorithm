import { REPLACE, REORDER, PROPS, TEXT } from '../diff'
import { setAttr } from '../utils'

export function patch(node, patches) {
  // 也是从0开始
  const step = {
    index: 0
  }
  // 深度遍历
  deepTraversal(node, step, patches)
}

// 深度优先遍历dom结构
function deepTraversal(node, step, patches) {
  // 拿到当前差异对象
  const currentPatches = patches[step.index]
  const len = node.childNodes ? node.childNodes.length : 0
  for (let i = 0; i < len; i++) {
    const child = node.childNodes[i]
    step.index++
    deepTraversal(child, step, patches)
  }
  //如果当前节点存在差异
  if (currentPatches) {
    // 把差异对象应用到当前节点上
    applyPatches(node, currentPatches)
  }
}

// 把差异对象应用到当前节点上
function applyPatches(node, currentPatches) {
  currentPatches.forEach(currentPatch => {
    switch (currentPatch.type) {
      // 0: 替换原有节点
      case REPLACE:
        var newNode = (typeof currentPatch.node === 'string') ? document.createTextNode(currentPatch.node) : currentPatch.node.render()
        node.parentNode.replaceChild(newNode, node)
        break
      // 1: 调整子节点，包括移动、删除等
      case REORDER:
        moveChildren(node, currentPatch.moves)
        break
      // 2: 修改节点属性
      case PROPS:
        for (let [key, val] of Object.entries(currentPatch.props)) {
          if (val === undefined) {
            node.removeAttribute(key)
          } else {
            setAttr(node, key, val)
          }
        }
        break;
      // 3：修改节点文本内容
      case TEXT:
        if (node.textContent) {
          node.textContent = currentPatch.content
        } else {
          node.nodeValue = currentPatch.content
        }
        break;
      default:
        throw new Error('Unknow patch type ' + currentPatch.type);
    }
  })
}

// 调整子节点，包括移动、删除等
function moveChildren(node, moves) {
  let staticNodelist = Array.from(node.childNodes)
  const maps = {}
  staticNodelist.forEach(node => {
    if (node.nodeType === 1) {
      const key = node.getAttribute('key')
      if (key) {
        maps[key] = node
      }
    }
  })
  moves.forEach(move => {
    const index = move.index
    if (move.type === 0) { // 变动类型为删除的节点
      if (staticNodeList[index] === node.childNodes[index]) {
        node.removeChild(node.childNodes[index]);
      }
      staticNodeList.splice(index, 1);
    } else {
      let insertNode = maps[move.item.key]
        ? maps[move.item.key] : (typeof move.item === 'object')
          ? move.item.render() : document.createTextNode(move.item)
      staticNodelist.splice(index, 0, insertNode);
      node.insertBefore(insertNode, node.childNodes[index] || null)
    }
  })
}