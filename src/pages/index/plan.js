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
      dateSel: new Date().toLocaleDateString().replace(new RegExp('/', 'g'), '-'),
       taskList: [] }
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}
  componentDidMount() {


    let taskList = Taro.getStorageSync('taskList')
    taskList = taskList ? JSON.parse(taskList) : []
    this.setState({ taskList: taskList })

  }

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
    const { taskList } = this.state
    const cardItem = taskList.map((item, index) => <CardItem cardContext={item} key={index} />)
    return (
      <View className="container">
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
        <AtTabBar
          className="bottomBar"
          fixed
          fontSize="14"
          tabList={[
            { title: '计划', iconType: 'bullet-list' },
            { title: '拍照', iconType: 'camera' },
            { title: '新建', iconType: 'folder' },
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    )
  }
}

export default Plan
