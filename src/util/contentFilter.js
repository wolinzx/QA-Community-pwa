export default function (myInput) {
  if (myInput) {
    let data = myInput.replace(/<[^>]+>/g, '')
    let data1 = data.replace(/编辑于\s[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}\s·\s著作权归作者所有/ig, '')
    return data1
  }
  return ''
}
