import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

class Child extends Component {
  clickHandle() {
    this.props.onChange()
  }
  render() {
    return (
      <View>
        <Button onClick={this.clickHandle}>点击修改</Button>
        <View>{this.props.name}</View>
      </View>
    )
  }
}

Child.defaultProps = {
  name: '123',
}

export default Child
