/* 
后台管理的一级路由组件
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {removeUserToken} from '../../redux/action-creators/user'
import {reqUsers} from '../../api'
import WithChenkLogin from '../with-check-login'

@connect(
  state => ({user: state.user.user}),
  {removeUserToken}
)
@WithChenkLogin
class Admin extends Component {
  logout = () => {
    this.props.removeUserToken()
  }
  getUsers = async () => {
    reqUsers()
    const result = await reqUsers()
    console.log('result',result)
  }

  render() {
    return (
      <div>
        <p>Hello,{this.props.user.username}</p>
        <button onClick={this.logout}>退出登录</button>
        <button onClick={this.getUsers}>获取用户列表</button>
      </div>
    )
  }
}

export default Admin