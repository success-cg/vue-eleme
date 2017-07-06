export function formateDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').slice(4 - RegExp.$1.length))
    /* RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串 */
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份是从0开始计算的，所以要加1
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (let k in o) {
    // console.log('kkkkk', `(${k})`)
    // console.log('RegExp', new RegExp(`(${k})`))
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      // console.log('$1', RegExp.$1)
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }

  // console.log('fmt', fmt)
  return fmt
}

// 左边补零，比如9补成09，而12还是12
function padLeftZero(str) {
  return ('00' + str).slice(str.length)
}
