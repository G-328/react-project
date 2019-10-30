import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { setHeaderTitle } from '../../../redux/action-creators/header-title'
import menuList from '../../../config/menu-config'
import logo from '../../../assets/images/logo.png'
import './index.less'

const { SubMenu, Item } = Menu;

@connect(state => ({ headerTitle: state.headerTitle }), { setHeaderTitle })
@withRouter
class LeftNav extends Component {

  /*
 根据指定菜单数据列表产生<Menu>的子节点数组
 使用 reduce() + 递归
 */
  getMenuNodes = (menuList) => {
    // 得到当前请求的path
    const path = this.props.location.pathname

    return menuList.reduce((pre, item) => {
      if (!item.children) {
        if (path.indexOf(item.key)===0 && this.props.headerTitle !== item.title) {
          this.props.setHeaderTitle(item.title)
        }
        pre.push((
          <Item key={item.key}>
            <Link to={item.key} onClick={() => {
              if (path === item.key && this.props.headerTitle !== item.title) {
                this.props.setHeaderTitle(item.title)
              }
            }}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        ))
      } else {
        const cItem = item.children.find(item => path.indexOf(item.key)===0)
        if (cItem) {
          this.openKey = item.key
        }

        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )

        // 如果当前请求路由与当前菜单的某个子菜单的key匹配, 将菜单的key保存为openKey
        // if(item.children.find(cItem => path.indexOf(cItem.key)===0)) {
        //   this.openKey = item.key
        // }
      }
      return pre
    }, [])
  }

  /*
  根据指定菜单数据列表产生<Menu>的子节点数组
  使用 map() + 递归
  */
  getMenuNodes2 = (menuList) => {
    return menuList.map(item => {
      /*  {
         title: '首页', // 菜单标题名称
         key: '/home', // 对应的path
         icon: 'home', // 图标名称
       }, */
      //返回<Item></Item>
      if (!item.children) {
        return (
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else {   //返回<SubMenu></SubMenu>
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)} {/* 进行递归调用 */}
          </SubMenu>
        )
      }
    })
  }

  render() {
    console.log(1111)
    const menuNodes = this.getMenuNodes(menuList)
    let selectedkey = this.props.location.pathname
    if (selectedkey.indexOf('/product') === 0) {
      selectedkey = '/product'
    }

    return (
      <div className="left-nav">
        <header className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </header>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedkey]}
          defaultOpenKeys={[this.openKey]}
        >
          {menuNodes}
          {/* <Item key="/home">
            <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Item>
          <SubMenu
            key="/product"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Item key="/category">
              <Link to="/category">
                <Icon type="pic-left" />
                <span>分类管理</span>
              </Link>
            </Item>
            <Item key="/product">
              <Link to="/product">
                <Icon type="home" />
                <span>商品管理</span>
              </Link>
            </Item>
          </SubMenu> */}
        </Menu>
      </div>
    )
  }
}

export default LeftNav
