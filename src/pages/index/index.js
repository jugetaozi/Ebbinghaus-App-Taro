import Taro, { Component } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import Plan from './plan'
import CreatePlan from './create-plan'
import './index.less'

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
  componentDidMount() {
    getApp().mtj.trackEvent('enter', {
      product: '进入主页面',
    })
    Taro.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          Taro.authorize({ scope: 'scope.camera' })
        }
      },
    })
  }

  componentDidShow() {}
  componentDidHide() {}
  handleClick(value) {
    if (value === 1) {
      getApp().mtj.trackEvent('camera', { event: '调用照相功能' })
      Taro.createCameraContext()

      let self = this
      Taro.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: function(res) {
          getApp().mtj.trackEvent('enter', {
            event: '拍照成功',
          })
          let imgSorce = res.tempFilePaths[0]
          self.setState(
            {
              imgSorce: imgSorce,
              recognized: !!imgSorce,
            },
            () => {
              Taro.navigateTo({ url: '/pages/new-task/new-task?path=' + imgSorce })
            }
          )
        },
      })
      return
    }
    this.setState({
      current: value,
    })
  }

  render() {
    const { current } = this.state
    return (
      <View className="container">
        {current === 0 && <Plan />}
        {current === 2 && <CreatePlan />}
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
