// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const highlightText = (keyword, text) => {
  // console.log(`highlightText: ${text}`)
  keyword = escapeRegExp(keyword)

  if (!keyword) {
    return text
  }

  const arr = []
  let currentPos = 0
  const re = new RegExp(keyword, 'idg')
  let resultArray
  while ((resultArray = re.exec(text)) !== null) {
    // console.log('--------------')
    // console.log(resultArray)
    const [match] = resultArray
    const [start, end] = resultArray.indices[0]
    if (currentPos != start) {
      // console.log(text, currentPos, start)
      // console.log(text.substring(currentPos, start))
      arr.push(text.substring(currentPos, start))
    }
    arr.push(`<b style='color:red'>${match}</b>`)
    currentPos = re.lastIndex
  }
  if (currentPos != text.lentth) {
    arr.push(text.substring(currentPos))
  }
  const htmlStr = arr.join('')

  // return <span dangerouslySetInnerHTML={{ __html: htmlStr }} />
  return htmlStr
}

export { escapeRegExp }

export default highlightText
