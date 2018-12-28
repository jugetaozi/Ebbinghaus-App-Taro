import Taro, { Component } from '@tarojs/taro'
import { AtIcon, AtTabBar, AtDivider } from 'taro-ui'
import { View, Picker, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import CardItem from '../../components/card-item.js'

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
    this.taskList = Taro.getStorageSync('taskList')

    this.state = {
      dateSel: new Date().toLocaleDateString().replace(new RegExp('/', 'g'), '-'),
      taskList: [],
    }
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}
  componentDidMount() {
    //需要处理复习逻辑
    this.taskList = this.taskList ? JSON.parse(this.taskList) : []
    this.cardShowRule()
  }
  cardShowRule() {
    this.setState({ taskList: this.taskList })
    console.log(this.taskList)
    let _tempArr = []
    const _this = this
    this.taskList.forEach(item => {
      // console.log(item.reviewTime,new Date(item.reviewTime).toLocaleDateString(), new Date(_this.state.dateSel).toLocaleDateString())
      if (new Date(item.reviewTime).toLocaleDateString() === new Date(_this.state.dateSel).toLocaleDateString()) {
        _tempArr.push(item)
      }
    })
    _tempArr.sort((a, b) => {
      //根据time排序
      return a.reviewTime - b.reviewTime
    })
    let _tempArr1 = []
    let _tempArr2 = []
    _tempArr.forEach(item => {
      if (!item.isCompleted) {
        _tempArr1.push(item)
      } else {
        _tempArr2.push(item)
      }
    })
    _tempArr = _tempArr1.concat(_tempArr2)
    this.setState({ taskList: _tempArr })
  }
  componentDidShow() {}
  componentDidHide() {}
  onDateChange = e => {
    this.setState(
      {
        dateSel: e.detail.value,
      },
      () => {
        this.cardShowRule()
      }
    )
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
        {taskList.length ? cardItem : <Text className="tips">当天没有要复习的计划了~~</Text>}
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
