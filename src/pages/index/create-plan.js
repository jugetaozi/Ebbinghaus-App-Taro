import Taro, { Component } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { View, Picker, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './create-plan.less'

class CreatePlan extends Component {
  constructor() {
    super(...arguments)
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}
  componentDidMount() {}

  componentDidShow() {}
  componentDidHide() {}
  createTask(){
    Taro.navigateTo({ url: '/pages/new-task/new-task' })
  }
  render() {
    return (
      <View className="container2">
        <AtButton onClick={this.createTask} className="taskBtn" type="primary" size="normal">
          新建一个任务
        </AtButton>
      </View>
    )
  }
}

export default CreatePlan
