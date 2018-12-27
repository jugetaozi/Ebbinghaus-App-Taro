import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtProgress, AtSwipeAction } from 'taro-ui'
import { connect } from '@tarojs/redux'
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
    const { reviewTime, context, percentage, fileList, timestamp } = this.props.cardContext
    const colorCompute = percentage => {
      if (percentage <= 25) {
        return '#FF4949'
      } else if (percentage <= 50) {
        return '#13CE66'
      } else if (percentage <= 75) {
        return '#FFC82C'
      } else {
        return ''
      }
    }
    return (
      <View onClick={this.onReviewTask.bind(this, timestamp)} className="CardItem">
        <View className="reviewTime">{reviewTime}</View>
        <View className="context">
          <Text>{context}</Text>
        </View>
        <View className="percentage">
          <AtProgress
            isHidePercent
            className="percentage"
            percent={percentage * 100}
            color={colorCompute(percentage * 100)}
          />
        </View>
        <View className="imgContainer">
          {fileList.length && <Image className="img" mode="aspectFit" src={fileList[0].url} background-size="cover" />}
        </View>
      </View>
    )
  }
}
CardItem.defaultProps = {
  cardContext: {
    reviewTime: '2018-12-26',
    context: '我是context',
    percentage: 0.4,
  },
}

export default CardItem
