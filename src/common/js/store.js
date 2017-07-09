/* 点击收藏，保存在localStorage中 */

/* 存储id */
export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__ // __编程风格，表示私有
  if (!seller) { // 如果没有seller就创建
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller) // 如果有了seller就解析
    if (!seller[id]) { // 如果没有seller[id]，就创建
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
  // localStorage存储的是JSON字符串
}

/* 读取id */
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__ // __编程风格，表示私有
  if (!seller) { // 如果没有seller，直接返回默认值def
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def // 如果没有seller[key]，直接返回默认值def
}
