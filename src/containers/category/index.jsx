import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal, message } from 'antd'
import LinkButton from
  '../../components/link-button'
import { reqCategorys,reqAddCategory } from '../../api'
import AddForm from './add-form'


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
    loading: false,
    isShowAdd: false,
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

  //添加分类
  addCategory = () => {
    //进行输入验证
    this.form.validateFields(async (error, values) => {
      if(!error) {
        //得到输入数据
        const {categoryName} = values
        //发添加分类的请求 
        const result = await reqAddCategory(categoryName)
        this.form.resetFields()//重置输入数据
        if (result.status===0) {
        //添加成功了，更新显示列表
         const category = result.data 
         const categorys = this.state.categorys
         this.setState({
           categorys:[category,...categorys],
           isShowAdd:false
         })
         message.success('添加分类成功')
        }else {
        //添加失败，显示提示
        message.error(result.msg)
        }
      }
    })
  }
  //隐藏添加界面
  hideAdd = () => {
    this.form.resetFields()//重置输入数据
    this.setState({
      isShowAdd: false
    })
  }

  componentDidMount() {
    this.getCategorys()
  }

  render() {

    const { categorys, loading, isShowAdd } = this.state

    //右上角界面
    const extra = (
      <Button type="primary" onClick={() => this.setState({ isShowAdd: true })}>
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
          pagination={{ pageSize: 5, showQuickJumper: true }}
        />

        <Modal
          title="添加分类"
          visible={isShowAdd}
          onOk={this.addCategory}
          onCancel={this.hideAdd}
        >
          <AddForm setForm={(form) => this.form = form} />
          {/* <AddUpdateForm setForm={(form) => this.form = form} /> */}
        </Modal>
        {/*  <Modal
          title="修改分类"
          visible={isShowUpdate}
          onOk={this.updateCategory}
          onCancel={this.hideUpdate}
        >
          <AddUpdateForm setForm={(form) => this.form = form} categoryName={category.name} />
        </Modal> */}
      </Card>


    )
  }
}
