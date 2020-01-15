/**
 * @description: 转换数据键名称
 * @param {type} 需要转换的键名称 array ['value', 'key'], 需转换的数据 array
 * @return: [{value: '', text: ''}]
 */
const transform = function(key, data) {
  let result = []
  for (let i = 0; i < data.length; i++) {
    result.push({
      value: data[i][key[0]],
      text: data[i][key[1]]
    })
  }
  return result
}

export { transform }
