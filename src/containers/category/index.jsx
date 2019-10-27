import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal, message } from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api'


const columns = [
  {
    title: '分类名称',
    dataIndex: 'name',
  },
  {
    width: 300,
    title: '操作',
    render: () => <LinkButton>修改分类</LinkButton>
  },
];

export default class Category extends Component {

  state = {
    categorys: [],
    loading:false 
  }

  getCategorys = async () => {
    this.setState({
      loading: true
    })
    const result = await reqCategorys()
    this.setState({
      loading: false
    })
    if (result.status === 0) {
      const categorys = result.data
      this.setState({
        categorys
      })
    } else {
      message.error(result.msg)
    }
  }

  componentDidMount() {
    this.getCategorys()
  }

  render() {

    const { categorys,loading } = this.state

    //右上角界面
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加
      </Button>
    )

    return (
      <Card extra={extra}>
        <Table
          bordered
          loading={loading}
          dataSource={categorys}
          columns={columns}
          rowKey="_id"
          pagination={{pageSize:5,showQuickjumper:true}}
        />
      </Card>
    )
  }
}
