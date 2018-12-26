import Taro, { Component } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.less'
import Plan from './plan'

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
class Index extends Component {
  config = {
    navigationBarTitleText: 'Ebbinghaus 记忆法',
  }

  constructor() {
    super(...arguments)
    this.state = { current: 0 }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {}

  componentDidShow() {}
  componentDidHide() {}
  handleClick(value) {
    if(value===2){
      
    }
    this.setState({
      current: value,
    })
  }

  render() {
    return (
      <View>
        <Plan />
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

export default Index
