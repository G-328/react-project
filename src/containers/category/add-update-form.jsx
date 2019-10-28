import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const  {Item} = Form

//添加/修改分类的Form组件
@Form.create()
class AddUpdateForm extends Component {

  static propTypes = { //给AddForm函数添加
    setForm:PropTypes.func.isRequired,
    categoryName:PropTypes.string,  //不是必须的，添加分类没有
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
              //如果手动输入修改了重新指定无效
              initialValue:this.props.categoryName || '',  
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

export default AddUpdateForm
