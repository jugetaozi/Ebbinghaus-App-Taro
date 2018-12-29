import Taro, { Component } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { View, Picker, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './create-plan.less'

class CreatePlan extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      hasUserInfo: false,
      userInfo: {}
    }
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}
  componentDidMount() {}

  componentDidShow() {}
  componentDidHide() {}
  createTask() {
    if (this.state.hasUserInfo) {
      Taro.navigateTo({ url: '/pages/new-task/new-task' })
    } else {
      return
    }
  }
  getUserInfo(data) {
    console.log(data)
    if (this.state.hasUserInfo) {
      Taro.navigateTo({ url: '/pages/new-task/new-task' })
    } else {
      return
    }
  }
  bindGetUserInfo(data) {
    if (data.detail.rawData) {
      //用户按了允许授权按钮
      Taro.navigateTo({ url: '/pages/new-task/new-task' })
      this.setState({ userInfo: data.detail.userInfo, hasUserInfo: true })
      getApp().mtj.trackEvent('getuserinfosuccess', {
        userInfo: data.detail.userInfo,
        rawData: data.detail.rawData,
        nickName: data.detail.userInfo.nickName,
      })
    } else {
      getApp().mtj.trackEvent('getuserinfofail', { event: 'fail' })
      //用户按了拒绝按钮
      Taro.navigateTo({ url: '/pages/new-task/new-task' })
      return
    }
  }
  render() {
    return (
      <View className="container2">
        <AtButton
          openType="getUserInfo"
          onGetUserInfo={this.bindGetUserInfo.bind(this)}
          className="taskBtn"
          type="primary"
          size="normal">
          新建一个任务
        </AtButton>
        <Text className="tips">
          小tips：&nbsp;&nbsp;&nbsp;
          研究表明，当一件事情在第1、3、7、20天重复深度记忆，那么这件事情你一辈子都不会忘记了。
        </Text>
        <Text className="tips">赶紧记录你想要记住的事情吧 &nbsp;๑乛◡乛๑</Text>
      </View>
    )
  }
}

export default CreatePlan
