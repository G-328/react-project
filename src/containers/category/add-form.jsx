import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const  {Item} = Form
//添加分类的Form组件

@Form.create()
class AddForm extends Component {

  static propTypes = { //给AddForm函数添加
    setForm:PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    //将form对象交给Category组件
    this.props.setForm(this.props.form)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName',{
              initialValue:'',
              rules:[
                {required:true,message:'分类名称必须输入'}
              ]
            })(
              <Input placeholder="请输入分类名字"/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default AddForm
