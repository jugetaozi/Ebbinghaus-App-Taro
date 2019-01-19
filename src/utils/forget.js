export const getCurrentDate = data => {
  // return data.toLocaleString()
  const now = Date.now()
  const dateGap = (now - data) / (60 * 60 * 1000) //小时
  const todayHour = new Date().getHours()
  // console.log(todayHour, dateGap, now, data)
  if (dateGap > todayHour + 24) {
    return new Date(data).toLocaleDateString().replace(new RegExp('/', 'g'), '-')
  } else if (todayHour < dateGap && dateGap <= todayHour + 24) {
    return `昨天`
  } else {
    return `今天`
  }
}

/**
 *
 * @param {Array 毫秒} updateTime
 * 返回值:毫秒数
 */
export const getReviewDate = updateTime => {
  if (Object.prototype.toString.call(updateTime) === '[object Array]') {
    const times = updateTime.length
    let _dateGap
    switch (times) {
      case 1:
        _dateGap = 1 //天
        break
      case 2:
        _dateGap = 3
        break
      case 3:
        _dateGap = 7
        break
      default:
        _dateGap = 1
        break
    }
    const shouldReviewTime = updateTime[updateTime.length - 1] + 1000 * 24 * 60 * 60 * _dateGap
    if (times < 4) {
      if (shouldReviewTime < Date.now()) {
        //如果已经过了 则提到当前复习
        return Date.now()
      } else {
        return shouldReviewTime
      }
    } else {
      return updateTime[updateTime.length-1]
    }
  }
}

export const getPercentage = updateTime => {
  if (Object.prototype.toString.call(updateTime) === '[object Array]') {
    const times = updateTime.length
    const now = Date.now()
    const currentTime = updateTime[updateTime.length - 1]
    const dateGap = (now - currentTime) / (60 * 1000 * 60) //小时
    let forgetFactor = 1
    switch (times) {
      case 1:
        forgetFactor = 1
        break
      case 2:
        forgetFactor = 0.7
        break
      case 3:
        forgetFactor = 0.3
        break
      case 4:
        forgetFactor = 0.1
        break
      default:
        forgetFactor = 1
        break
    }
    if (times >=4){
      return -0.002 * dateGap + 100
    }else{
      if (dateGap <= 0.5) {
        //0-30M
        return -84 * dateGap * forgetFactor + 100
      } else if (dateGap <= 1) {
        //30M-60M
        return -28 * dateGap * forgetFactor + 72
      } else if (dateGap <= 24) {
        //1-24H
        return -0.826 * dateGap * forgetFactor + 44.826
      } else if (dateGap <= 300) {
        //1-10天
        return -0.02315 * dateGap * forgetFactor + 25.556
      } else {
        return -0.0001 * dateGap * forgetFactor + 18
      }
    }

  } else {
    return 0
  }
  // const now = Date.now()
  // const dateGap = (now - data) / (60 * 60 * 24 * 1000)
  // console.log(dateGap);
  // // if (dateGap >= 1) {
  // //   return `${Math.floor(dateGap)}天前`
  // // } else {
  // //   return `今天`
  // // }
  // return Math.random()
}
