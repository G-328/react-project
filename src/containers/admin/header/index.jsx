import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import dayjs from 'dayjs'
import { Modal, Button, Icon } from 'antd'
import screenfull from 'screenfull'

import LinkButton from '../../../components/link-button'
import { removeUserToken } from '../../../redux/action-creators/user'
import { reqWeather } from '../../../api'


import './index.less'
// import { isFulfilled } from 'q'

@connect(
  state => ({ username: state.user.user.username, headerTitle: state.headerTitle }),
  { removeUserToken }
)
@withRouter //作用：包装非路由组件使其拥有路由组件的功能，但返回的组件不是路由组件。向组件内部传入三个属性:history、location、match 
class Header extends Component {
  state = {
    currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    dayPictureUrl: '',
    weather: '',
    isFullScreen: false,//当前是否全屏显示
  }

  logout = () => {
    const that = this
    Modal.confirm({
      title: '确认退出吗',
      onOk() {
        that.props.removeUserToken()
      },
      onCancel() {
        console.log('cancel')
      }
    })
  }

  handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  showWeather = async () => {
    //请求数据
    const { dayPictureUrl, weather } = await reqWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }
  componentDidMount() {
    //启动循环定时器,每隔一秒，更新时间
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000);
    //请求获取天气信息
    this.showWeather()

    //给screenfull绑定监听
    screenfull.onchange(() => {
      //切换状态
      this.setState({
        isFullScreen: !this.state.isFullScreen
      })
    })
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const { currentTime, dayPictureUrl, weather, isFullScreen } = this.state
    const {username,headerTitle} = this.props
    return (
      <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.handleFullScreen}>
            <Icon type={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} />
          </Button> &nbsp;
          <span>欢迎，{username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{headerTitle}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header