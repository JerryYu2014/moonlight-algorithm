
/**
 * 简单的 Virtual DOM 算法
 */
import { el, diff, patch } from '../lib/vdom/index';

var AGE = 'age'
var REPUTATION = 'reputation'

var sortKey = AGE
var sortType = 1

var list = [
  { username: 'Jerry', age: 12, reputation: 200, uid: 'user1' },
  { username: 'Pony', age: 33, reputation: 3000, uid: 'user4' },
  { username: 'Lucy', age: 21, reputation: 99, uid: 'user2' },
  { username: 'Tomy', age: 20, reputation: 20, uid: 'user3' },
  { username: 'Funky', age: 49, reputation: 521, uid: 'user5' }
]

// render table
function renderTree() {
  var rows = renderRows()
  return el('div', [
    el('b', ['sortKey: ' + sortKey, ' | sortType: ' + (sortType ? 'up' : 'down')]),
    el('table', [
      el('thead', [
        el('tr', [
          el('th', ['UID']),
          el('th', ['NAME']),
          el('th', { 'id': 'sort-head1', sortKey: 'age' }, ['AGE']),
          el('th', { 'id': 'sort-head2', sortKey: 'reputation' }, ['REPUTATION'])
        ])
      ]),
      el('tbody', rows)
    ])
  ])
}

function renderRows() {
  var rows = []
  for (var i = 0, len = list.length; i < len; i++) {
    var item = list[i]
    rows.push(
      el('tr', { key: item.uid }, [
        el('td', [item.uid]),
        el('td', [item.username]),
        el('td', [item.age]),
        el('td', [item.reputation]),
      ])
    )
  }
  return rows
}

function sortData() {
  list.sort(function (a: any, b: any) {
    if (sortType) {
      return a[sortKey] - b[sortKey]
    } else {
      return b[sortKey] - a[sortKey]
    }
  })
}

export default function SimpleVirtualDom() {
  var tree = renderTree()
  var dom = tree.render()
  document.body.appendChild(dom)

  var sortTriggers = [
    document.getElementById('sort-head1'),
    document.getElementById('sort-head2')
  ]
  for (var i = 0, len = sortTriggers.length; i < len; i++) {
    var trigger = sortTriggers[i];
    (function (_trigger: any) {
      _trigger.onclick = function () {
        var key = _trigger.getAttribute('sortKey')
        if (key === sortKey) {
          (sortType as any) = !sortType
        } else {
          sortKey = key
          sortType = 1
        }
        sortData()
        var newTree = renderTree()
        var patches = diff(tree, newTree)
        patch(dom, patches)
        tree = newTree
      }
    })(trigger)
  }
}