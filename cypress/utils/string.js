// put all utils related to string manipulation here

export const getIndicesOf = (searchStr, str, caseSensitive) => {
  const searchStrLen = searchStr.length
  if (searchStrLen == 0) {
    return []
  }
  if (!caseSensitive) {
    str = str.toLowerCase()
    searchStr = searchStr.toLowerCase()
  }

  let startIndex = 0,
    index,
    indices = []

  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index)
    startIndex = index + searchStrLen
  }

  return indices
}

export const getSetPasswordUrlFromHtml = html => {
  const focusCueStart = html.indexOf('Thank you for using Brankas!')
  const focusCueEnd = html.indexOf('Set Password')
  const htmlPartToFocus = html.slice(focusCueStart, focusCueEnd)

  const focusCueStart2 = htmlPartToFocus.indexOf('<a')
  const focusCueEnd2 = htmlPartToFocus.indexOf('<button')
  const htmlPartToFocus2 = htmlPartToFocus.slice(focusCueStart2, focusCueEnd2)

  const [dblQuoteIdxStart, dblQuoteIdxEnd] = getIndicesOf('"', htmlPartToFocus2)
  const setPasswordUrl = htmlPartToFocus2.slice(dblQuoteIdxStart + 1, dblQuoteIdxEnd)

  return setPasswordUrl
}
