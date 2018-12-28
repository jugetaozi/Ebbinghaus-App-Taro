import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtProgress, AtSwipeAction } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getPercentage, getCurrentDate } from '../utils/forget'
import './cardItem.less'

@connect(
  ({ counter }) => ({}),
  dispatch => ({})
)
class CardItem extends Component {
  componentWillReceiveProps(nextProps) {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  onReviewTask(timestamp) {
    Taro.navigateTo({ url: '/pages/review-task/review-task?timestamp=' + timestamp })
  }
  render() {
    const { reviewTime, context, updateTime, fileList, timestamp, isCompleted } = this.props.cardContext
    const percentage = getPercentage(updateTime)
    // console.log(percentage, reviewTime, 'percentage-reviewTime')
    const colorCompute = percentage => {
      if (percentage <= 25) {
        return '#FF4949'
      } else if (percentage <= 50) {
        return '#FFC82C'
      } else if (percentage <= 75) {
        return ''
      } else {
        return '#13CE66'
      }
    }
    return <View onClick={this.onReviewTask.bind(this, timestamp)} className={isCompleted ? 'CardItem Disabled' : 'CardItem'}>
        <View className="reviewTime">{getCurrentDate(timestamp)}</View>
        <View className="context">
          <Text>{context}</Text>
        </View>
        <View className="percentage">
          <AtProgress isHidePercent className="percentage" percent={percentage} color={colorCompute(percentage)} />
        </View>
        <View className="imgContainer">
          {fileList.length && (
            <Image className="img" mode="aspectFit" src={fileList[0].url} background-size="cover" />
          )}
        </View>
      </View>
  }
}
CardItem.defaultProps = {
  cardContext: {
    reviewTime: '',
    context: '',
    percentage: 0.4,
  },
}

export default CardItem
