/* 
后台管理的一级路由组件
*/

import React, { Component } from 'react'
import { Layout } from 'antd'

import LeftNav from './left-nav'
import AdminHeader from './header'
import WithChenkLogin from '../with-check-login'



const { Footer, Sider, Content } = Layout

@WithChenkLogin
class Admin extends Component {

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <AdminHeader />
          <Content style={{ backgroundColor: 'white', margin: '30px 15px 0' }}>
            {
              this.props.children
            }
          </Content>
          <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin