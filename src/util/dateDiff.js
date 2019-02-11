export default function (time) {
  var dateBegin = new Date(time) // 转化为Date对象的形式
  var dateEnd = new Date() // 当前时间数据
  var dateDiff = dateEnd.getTime() - dateBegin.getTime() // 时间差的毫秒数
  var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) // 计算出相差天数
  var leave1 = dateDiff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))// 计算出小时数
  // 计算相差分钟数
  var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))// 计算相差分钟数
  // 计算相差秒数
  var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  // return {
  //   dayDiff,
  //   hours,
  //   minutes,
  //   seconds
  // }
  if (dayDiff !== 0) {
    return { diff: dayDiff + '天前', sec: dateDiff }
  } else if (hours !== 0) {
    return { diff: hours + '小时前', sec: dateDiff }
  } else if (minutes !== 0) {
    return { diff: minutes + '分钟前', sec: dateDiff }
  } else if (seconds !== 0) {
    return { diff: seconds + '秒前', sec: dateDiff }
  } else {
    return { diff: '刚刚', sec: dateDiff }
  }
}
