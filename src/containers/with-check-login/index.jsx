//封装一个用于检查用户登录的高阶组件

import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export default function WithCheckLogin(WrappedComponent) {

  @connect(state => ({ hasLogin: state.user.hasLogin }))
  class HocComponent extends React.Component {
    render() {
      const path = this.props.location.pathname
      const { hasLogin, ...rest } = this.props

      //如果请求的是login，但已经登陆，自动跳转到admin
      if (path === '/login' && hasLogin) {
        return <Redirect to="/" />
      }
      //如果请求的不是login，但没有登录，自动跳转到login
      if (path !== '/login' && !hasLogin) {
        return <Redirect to="/login" />
      }
      // 将所有接受的属性传递给被包装的组件
      return <WrappedComponent {...rest} />
    }
  }
  return HocComponent
}