import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal, message } from 'antd'
import LinkButton from '../../components/link-button'
import { connect } from 'react-redux'
import { getCateorysAsync, addCateorysAsync, updateCateorysAsync } from '../../redux/action-creators/categorys'
import AddUpdateForm from './add-update-form'


@connect(
  state => ({ categorys: state.categorys }),
  { getCateorysAsync, addCateorysAsync, updateCateorysAsync }
)
class Category extends Component {

  state = {
    loading: false,
    isShowAdd: false,//是否显示添加的对话框
    isShowUpdate: false,
  }

  columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      width: 300,
      title: '操作',
      //如果没有指定dataIndex，接受数据对象参数，如果指定了，接受对应值的参数
      render: (category) => <LinkButton onClick={() => { this.showUpdate(category) }}>修改分类</LinkButton>
    },
  ];

  getCategorys = async () => {
    this.setState({
      loading: true
    })
    const msg = await this.props.getCateorysAsync()
    //隐藏login
    this.setState({
      loading: false
    })

    if (msg) { //获取数据成功
      message.error(msg)
    }

    /*  const result = await reqCategorys()
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
     } */
  }

  //添加分类
  addCategory = () => {
    //进行输入验证
    this.form.validateFields(async (error, values) => {
      if (!error) {
        //得到输入数据
        const { categoryName } = values
        const msg = await this.props.addCateorysAsync(categoryName)
        if (msg) {
          message.error(msg)
        } else {
          this.setState({
            isShowAdd: false
          })
          message.success('添加分类成功')
        }


        /*  //得到输入数据
         const { categoryName } = values
         //发添加分类的请求 
         const result = await reqAddCategory(categoryName)
         this.form.resetFields()//重置输入数据
         if (result.status === 0) {
           //添加成功了，更新显示列表
           const category = result.data
           const categorys = this.state.categorys
           this.setState({
             categorys: [category, ...categorys],
             isShowAdd: false
           })
           message.success('添加分类成功')
         } else {
           //添加失败，显示提示
           message.error(result.msg)
         } */
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

  //显示更新的界面
  showUpdate = (category) => {
    //保存分类
    this.category = category
    //显示
    this.setState({
      isShowUpdate: true
    })
  }

  //更新分类
  updateCategory = () => {
    //进行输入验证
    this.form.validateFields(async (error, values) => {
      if (!error) {
        //得到输入数据
        const { categoryName } = values
        const categoryId = this.category._id
        const msg = await this.props.updateCateorysAsync({categoryId,categoryName})
        if (msg) {
          //更新失败显示提示
          message.error(msg)
        } else {
          this.setState({
            isShowUpdate: false
          })
          message.success('更新分类成功')
        }



        /* //得到输入数据
        const { categoryName } = values
        const categoryId = this.category._id
        //发添加分类的请求 
        const result = await reqUpdateCategory({ categoryId, categoryName })
        this.form.resetFields()//重置输入数据
        if (result.status === 0) {
          //添加成功了，更新显示列表
          const category = { _id: categoryId, name: categoryName }
          const categorys = this.state.categorys
          this.setState({
            //替换数组中的某一个元素还不改变原数组
            categorys: categorys.map(item => {
              if (item._id === category._id) {
                return category
              } else {
                return item
              }
            }),
            isShowUpdate: false
          })
          message.success('更新分类成功')
        } else {
          //更新失败，显示提示
          message.error(result.msg)
        } */
      }
    })
  }

  //隐藏更新界面
  hideUpdate = () => {
    //删除前面添加的属性
    delete this.category
    //重置输入
    console.log(this.form)
    this.form.resetFields()
    //隐藏更新界面
    this.setState({
      isShowUpdate: false
    })
  }



  componentDidMount() {
    this.getCategorys()
  }

  render() {

    const { loading, isShowAdd, isShowUpdate } = this.state
    const { categorys } = this.props
    const category = this.category || {}

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
          columns={this.columns}
          rowKey="_id"
          pagination={{ pageSize: 5, showQuickJumper: true }}
        />

        <Modal
          title="添加分类"
          visible={isShowAdd}
          onOk={this.addCategory}
          onCancel={this.hideAdd}
        >
          <AddUpdateForm setForm={(form) => this.form = form} />
        </Modal>
        <Modal
          title="修改分类"
          visible={isShowUpdate}
          onOk={this.updateCategory}
          onCancel={this.hideUpdate}
        >
          <AddUpdateForm setForm={(form) => this.form = form} categoryName={category.name} />
        </Modal>
      </Card>


    )
  }
}

export default Category
