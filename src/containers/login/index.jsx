/* 
登录的一级路由组件
*/
import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { connect } from 'react-redux'

import { loginAsync } from '../../redux/action-creators/user'
import logo from '../../assets/images/logo.png'
import './index.less'
import WithChenkLogin from '../with-check-login'

/* connect(
  state => ({ hasLogin: state.user.hasLogin }),
  { loginAsync }
)(Form.create()(Login)) */

const { Item } = Form // 必须在所有import的下面

@connect(
  state => ({}),
  { loginAsync }
)
@Form.create()
@WithChenkLogin // CheckLogin = WithChenkLogin(Login)
class Login extends Component {

  handleSubmit = (event) => {
    event.preventDefault()
    //进行统一的表单认证
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values
        console.log('发送ajax请求', { username, password })

        this.props.loginAsync(username, password)

        // axios.post('/login', qs.stringify(values))
        /* ajax.post('/login', values)
           .then(({ user, token }) => {
             console.log(response)
            const result = response.data
            console.log('请求成功', result)
            if (result.status === 0) {
              const { user, token } = result.data
              console.log('登录成功', user, token)
            } else {
              console.log('登陆失败', result.msg)
            } 
            console.log('登录成功', user, token)
          })
          .catch((error) => {//errpr就是result.msg
            console.log('登录失败', error)
          }) */
        /* ajax.post('/login',values)
        .then((result)=>{
          //是继续解构，是默认值
          const {status,data:{user,token}={},msg}=result
          if(status===0){
            console.log('登录成功',user,token)
          }else{
            console.log('登录失败',msg)
          }
        }) */
      } else {

      }
    });
    //读取form收集的数据
    /* const form=this.props.form
    const username=form.getFieldValue('username')
    const password=form.getFieldValue('password')
    const values=form.getFieldsValue()
    console.log('发ajax请求',username,password,values) */
  }

  validatePwd = (rule, value, callback) => {
    // value=value.trim()
    if (value === '') {
      callback('密码必须输入')
    } else if (value.length < 4) {
      callback('密码必须大于4位')
    } else if (value.length > 12) {
      callback('密码必须小于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线')
    } else {
      callback()//不传代表验证通过
    }
  }

  render() {
    // console.log(this.props.form)
  
    const { getFieldDecorator } = this.props.form;
    
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </header>
        <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('username', {
                initialValue: '',
                rules: [
                  { required: true, whitespace: true, message: '用户名必须输入' },
                  { min: 4, message: '用户名不能小于4位' },
                  { max: 12, message: '用户名不能大于12位' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线' }
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
              )}
            </Item>
            <Form.Item>
              {getFieldDecorator('password', {
                initialValue: '',
                rules: [{ validator: this.validatePwd }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

/* export default connect(
  state => ({ hasLogin: state.user.hasLogin }),
  { loginAsync }
)(Form.create()(Login)) */
export default Login