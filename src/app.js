import './utils/mtj-wx-sdk'
import gio from './utils/gio-minp'
gio('init', '88e03498caa6e2d7', 'wx42bb14c772ef7f76', {version: '1.0' })

import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'

import configStore from './store'
import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {
  config = {
    pages: ['pages/index/index', 'pages/new-task/new-task', 'pages/review-task/review-task'],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#ebebeb',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      disableScroll: false,
    },
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
