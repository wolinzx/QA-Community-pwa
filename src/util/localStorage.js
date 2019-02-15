const LocalEvent = function (item) {
  this.get = () => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : ''
  this.set = (obj) => {
    localStorage.setItem(item, JSON.stringify(obj))
  }
  this.clear = () => {
    localStorage.removeItem(item)
  }
}

export const userInfo = new LocalEvent('userInfo')
export const userHistory = new LocalEvent('userHistory')
export const theme = new LocalEvent('theme')
export const getDate = () => {
  const date = new Date()
  // let mouth = parseInt(date.getMonth()) + 1
  return date.getTime()
}
