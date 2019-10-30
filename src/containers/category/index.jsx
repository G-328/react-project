import React, { useState, useEffect, useRef } from 'react'
import { Card, Button, Icon, Table, Modal, message } from 'antd'
import LinkButton from '../../components/link-button'
import { connect } from 'react-redux'
import { getCateorysAsync, addCateorysAsync, updateCateorysAsync } from '../../redux/action-creators/categorys'
import AddUpdateForm from './add-update-form'


function Category(props) {

  const [loading, setLoading] = useState()
  const [isShowAdd, setShowAdd] = useState()
  const [isShowUpdate, setShowUpdate] = useState()

  const categoryRef = useRef({})
  const formRef = useRef(null)
  const columnsRef = useRef(
    [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        width: 300,
        title: '操作',
        //如果没有指定dataIndex，接受数据对象参数，如果指定了，接受对应值的参数
        render: (category) => <LinkButton onClick={() => { showUpdate(category) }}>修改分类</LinkButton>
      },
    ]
  )

  async function getCategorys() {
    //显示login
    setLoading(true)

    const msg = await props.getCateorysAsync()
    //隐藏login
    setLoading(false)

    if (msg) { //获取数据成功
      message.error(msg)
    }
  }

  useEffect(() => {
    getCategorys()
  }, [])


  //添加分类
  function addCategory() {
    //进行输入验证
    formRef.current.validateFields(async (error, values) => {
      if (!error) {
        //得到输入数据
        const { categoryName } = values
        const msg = await props.addCateorysAsync(categoryName)
        if (msg) {
          message.error(msg)
        } else {
          setShowAdd(false)
          message.success('添加分类成功')
        }
      }
    })
  }

  //隐藏添加界面
  function hideAdd() {
    formRef.current.resetFields()//重置输入数据
    setShowAdd(false)
  }

  //显示更新的界面
  function showUpdate(category) {
    //保存分类
    categoryRef.current = category
    //显示
    setShowUpdate(true)
  }

  //更新分类
  function updateCategory() {
    //进行输入验证
    formRef.current.validateFields(async (error, values) => {
      if (!error) {
        //得到输入数据
        const { categoryName } = values
        const categoryId = categoryRef.current._id
        const msg = await props.updateCateorysAsync({ categoryId, categoryName })
        if (msg) {
          //更新失败显示提示
          message.error(msg)
        } else {
          setShowUpdate(false)
          message.success('更新分类成功')
        }
      }
    })
  }

  //隐藏更新界面
  function hideUpdate() {
    //删除前面添加的属性
    categoryRef.current = null
    //重置输入
    formRef.current.resetFields()
    //隐藏更新界面
    setShowUpdate(false)
  }



  const { categorys } = props
  const category = categoryRef.current

  //右上角界面
  const extra = (
    <Button type="primary" onClick={() => setShowAdd(true)}>
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
        columns={columnsRef.current}
        rowKey="_id"
        pagination={{ pageSize: 5, showQuickJumper: true }}
      />

      <Modal
        title="添加分类"
        visible={isShowAdd}
        onOk={addCategory}
        onCancel={hideAdd}
      >
        <AddUpdateForm setForm={(form) => formRef.current = form} />
      </Modal>
      <Modal
        title="修改分类"
        visible={isShowUpdate}
        onOk={updateCategory}
        onCancel={hideUpdate}
      >
        <AddUpdateForm setForm={(form) => formRef.current = form} categoryName={category.name} />
      </Modal>
    </Card>
  )
}

export default connect(
  state => ({ categorys: state.categorys }),
  { getCateorysAsync, addCateorysAsync, updateCateorysAsync }
)(Category)
