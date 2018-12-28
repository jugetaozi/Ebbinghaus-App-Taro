# Ebbinghaus 遗忘曲线小程序
## 基于taro开发  兼容微信小程序/H5/ReactNative

### [查看demo](http://jugetaozi.gitee.io/ebbinghaus-app/) http://jugetaozi.gitee.io/ebbinghaus-app/

## Ebbinghaus 遗忘曲线 
![mark](https://gitee.com/jugetaozi/picture_bed/raw/master/ebbinghaus.jpg)
>遗忘曲线由德国心理学家艾宾浩斯(H.Ebbinghaus)研究发现，描述了人类大脑对新事物遗忘的规律。人体大脑对新事物遗忘的循序渐进的直观描述，人们可以从遗忘曲线中掌握遗忘规律并加以利用，从而提升自我记忆能力。该曲线对人类记忆认知研究产生了重大影响。

>这条曲线告诉人们在学习中的遗忘是有规律的，遗忘的进程很快，并且先快后慢。观察曲线，你会发现,学得的知识在一天后，如不抓紧复习,就只剩下原来的25%。随着时间的推移,遗忘的速度减慢，遗忘的数量也就减少。有人做过一个实验，两组学生学习一段课文， 甲组在学习后不复习，一天后记忆率36%，一周后只剩13%。乙组按艾宾浩斯记忆规律复习，一天后保持记忆率98%，一周后保持86%， 乙组的记忆率明显高于甲组。

### 此小程序会在特定的时间点提醒使用者 复习快要遗忘的任务 

## Installing
`npm install`

`npm run build:weapp`

`npm run build:swan`

`npm run build:alipay`

`npm run build:tt`

`npm run build:h5`

`npm run build:rn`

`npm run dev:weapp`

`npm run dev:swan`

`npm run dev:alipay`

`npm run dev:tt`

`npm run dev:h5`

`npm run dev:rn`
## New Task 

![mark](https://gitee.com/jugetaozi/picture_bed/raw/master/01201e52b16f45c7f0d0dcc0c4f2fdf.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)



## Review Task
* 提交一个任务后  会分别在 1 3 7 天的事件点通知复习  每次打卡完毕回复熟练度 
![mark](https://gitee.com/jugetaozi/picture_bed/raw/master/164893eb5b301fcbf28af8ed297645d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)


## Plan页面  
![mark](https://gitee.com/jugetaozi/picture_bed/raw/master/d798183ba2d56e48913859346509250.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

## 遇到的一些坑

- 在监听函数时  如果回调函数内有用到this  则需要bind(this)
```
handleClick(value) {
   //有用到this 需要bind   this
    this.setState({
      current: value,
    })
  }

render() {
    const { taskList } = this.state
    const cardItem = taskList.map((item, index) => <CardItem cardContext={item} key={index} />)
    return (
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
            />)
}

```
- 微信全局样式的引入 出现问题