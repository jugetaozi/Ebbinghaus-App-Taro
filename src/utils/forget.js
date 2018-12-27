export const getReviewTime = data => {
  // return data.toLocaleString()
  const now = Date.now()
  const dateGap = (now - data) / (60 * 60 * 24 * 1000)
  if (dateGap >= 1) {
    return `${Math.floor(dateGap)}天前`
  } else {
    return `今天`
  }
}

export const getPercentage = data => {
  // return data.toLocaleString()
  const now = Date.now()
  const dateGap = (now - data) / (60 * 60 * 24 * 1000)
  // if (dateGap >= 1) {
  //   return `${Math.floor(dateGap)}天前`
  // } else {
  //   return `今天`
  // }
  return Math.random()
}
