import Taro, { Component } from '@tarojs/taro'
import { AtIcon, AtTabBar } from 'taro-ui'
import { View, Picker, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import CardItem from '../../components/card-item.js'
import { getReviewTime } from '../../utils/forget'

import './Plan.less'

@connect(
  ({ counter }) => ({
    counter,
  }),
  dispatch => ({
    add() {
      dispatch(add())
    },
    dec() {
      dispatch(minus())
    },
    asyncAdd() {
      dispatch(asyncAdd())
    },
  })
)
class Plan extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      dateSel: '2018-04-22',
      cardContextList: [
        {
          id: '',
          updateTime: '',
          reviewTime: getReviewTime(new Date('2018-12-25 12:00:00')),
          context: '我是context',
          percentage: 0.4,
        },
        {
          id: '',
          updateTime: '',
          reviewTime: getReviewTime(new Date()),
          context:
            '我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context我是context',
          percentage: 0.9,
        },
        { id: '', updateTime: '', reviewTime: getReviewTime(new Date()), context: '我是context', percentage: 0.4 },
        { id: '', updateTime: '', reviewTime: getReviewTime(new Date()), context: '我是context2', percentage: 0.2 },
        { id: '', updateTime: '', reviewTime: getReviewTime(new Date()), context: '我是context3', percentage: 0.6 },
        { id: '', updateTime: '', reviewTime: getReviewTime(new Date()), context: '我是context4', percentage: 0.4 },
      ],
    }
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() {}

  componentDidShow() {}
  componentDidHide() {}
  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value,
    })
  }
  handleClick(value) {
    this.setState({
      current: value,
    })
  }
  render() {
    const { cardContextList } = this.state
    const cardItem = cardContextList.map((item, index) => <CardItem cardContext={item} key={index} />)
    return <View className="container">
        <View className="page-body">
          <View className="page-section">
            <Picker mode="date" onChange={this.onDateChange}>
              <View className="picker">
                {this.state.dateSel}
                <AtIcon value="chevron-right" className="rightArrow" size="24" color="#000" />
              </View>
            </Picker>
          </View>
        </View>
        {cardItem}
        <AtTabBar className="bottomBar" fixed fontSize="14" tabList={[{ title: '计划', iconType: 'bullet-list' }, { title: '拍照', iconType: 'camera' }, { title: '新建', iconType: 'folder' }]} onClick={this.handleClick.bind(this)} current={this.state.current} />
      </View>
  }
}

export default Plan
