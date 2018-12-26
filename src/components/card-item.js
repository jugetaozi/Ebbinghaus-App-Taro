import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtProgress } from 'taro-ui'
import { connect } from '@tarojs/redux'
import './cardItem.less'

@connect(
  ({ counter }) => ({}),
  dispatch => ({})
)
class CardItem extends Component {
  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  render() {
    const { reviewTime, context, percentage } = this.props.cardContext
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
    return <View className="CardItem">
        <View className="reviewTime">{reviewTime}</View>
        <View className="context">
          <Text>{context}</Text>
        </View>
        <View className="percentage">
          <AtProgress isHidePercent className="percentage" percent={percentage * 100} color={colorCompute(percentage * 100)} />
        </View>
      </View>
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
