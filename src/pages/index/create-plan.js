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
    return <View className="container2">
        <AtButton onClick={this.createTask} className="taskBtn" type="primary" size="normal">
          新建一个任务
        </AtButton>
        <Text className="tips">
          小tips：&nbsp;&nbsp;&nbsp; 研究表明，当一件事情在第1、3、7、20天重复深度记忆，那么这件事情你一辈子都不会忘记了。 赶紧记录你想要记住的事情吧， 不用谢我 &nbsp;๑乛◡乛๑
        </Text>
      </View>
  }
}

export default CreatePlan
