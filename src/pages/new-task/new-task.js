import Taro, { Component } from '@tarojs/taro'
import { AtTextarea, AtImagePicker, AtButton } from 'taro-ui'
import { View, Picker, Text } from '@tarojs/components'
import { getReviewTime, getPercentage } from '../../utils/forget'
import './new-task.less'
class NewTask extends Component {
  config = {
    navigationBarTitleText: 'New Task',
  }
  constructor() {
    super(...arguments)
    this.state = { context: '', files: null }
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}
  componentDidMount() {
    if (this.$router.params.path) {
      this.setState({ files: [{ url: this.$router.params.path }] })
    }
  }

  componentDidShow() {}
  componentDidHide() {}
  handlecontextChange(event) {
    this.setState({ context: event.target.value })
  }
  onFilesChange(value) {
    this.setState({ files: value })
  }
  onImageClick(e) {
    let _arr = []
    this.state.files.forEach(item => {
      _arr.push(item.url)
    })
    Taro.previewImage({ current: this.state.files[e].url, urls: _arr })
  }
  handleSaveTask() {
    let taskList = Taro.getStorageSync('taskList')
    console.log(taskList)
    taskList = taskList ? JSON.parse(taskList) : []
    console.log(taskList, 'taskList')
    const timestamp = Date.now()
    taskList.push({
      timestamp: timestamp,
      updateTime: [timestamp],
      reviewTime: getReviewTime(timestamp),
      fileList: this.state.files,
      context: this.state.context,
      percentage: getPercentage(timestamp),
    })
    console.log(JSON.stringify(taskList))
    try {
      const value = Taro.setStorageSync('taskList', JSON.stringify(taskList))
      Taro.navigateTo({ url: '/pages/index/index' })
    } catch (e) {
      // Do something when catch error
    }
  }
  render() {
    return (
      <View className="container">
        <View>
          <View className="at-article__h3">任务简述</View>
          <AtTextarea
            className="AtTextarea"
            value={this.state.context}
            onChange={this.handlecontextChange.bind(this)}
            autoFocus
            textOverflowForbidden={false}
            count
            height="500"
            maxLength="1000"
            showConfirmBar
            placeholder="开始记录吧"
          />
        </View>
        <View>
          <View className="at-article__h3">添加照片(可选)</View>
          <AtImagePicker
            multiple
            mode="aspectFit"
            files={this.state.files}
            onChange={this.onFilesChange.bind(this)}
            onFail={this.onFilesFail.bind(this)}
            onImageClick={this.onImageClick.bind(this)}
          />
        </View>
        <AtButton onClick={this.handleSaveTask} className="saveTaskBtn" size="normal">
          完成
        </AtButton>
      </View>
    )
  }
}

export default NewTask
