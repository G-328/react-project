/* 
后台管理的一级路由组件
*/

import React, { Component } from 'react'
import { Layout } from 'antd'
import { Route, Switch, Redirect } from 'react-router-dom'

import LeftNav from './left-nav'
import AdminHeader from './header'
import WithChenkLogin from '../with-check-login'
import Home from '../../components/home'
import Bar from '../../components/charts/bar'
import Line from '../../components/charts/line'
import Pie from '../../components/charts/pie'
import User from '../user'
import Role from '../role'
import ProductList from '../product'
import ProductDetail from '../product/detail'
import ProductAddUpdate from '../product/add-update'
import Category from '../category'


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
            <Switch>
              <Route path="/home" component={Home} exact />
              <Route path="/category" component={Category} exact />
              <Route path="/product/" component={ProductList} exact />
              <Route path="/product/detail/:id" component={ProductDetail} />
              <Route path="/product/addupdate" component={ProductAddUpdate} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin