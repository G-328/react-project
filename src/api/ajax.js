//使用axios对ajax进行二次封装

import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../redux/store'
import { removeUserToken } from '../redux/action-creators/user'

const instance = axios.create({
  //超时时间
  timeout: 10000
})
//添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // console.log(config)
    console.log('request interceptors')
    //显示请求进度
    NProgress.start()

    const {data} = config
    if (data instanceof Object){
      config.data=qs.stringify(data) 
    }
    const token = store.getState().user.token
    if(token){
      // 当前请求的配置
      config.headers['Authorization'] = 'atguigu_ ' + token
    }

      //必须返回config ，要不然不能发请求了
      return config
  })
//添加响应拦截器
instance.interceptors.response.use(
  response => {
    console.log('response interceptors',response)
    //隐藏请求进度
    NProgress.done()

    const result=response.data
    /* if(result.status===0){//操作成功
      return result.data || {}
    }else{//操作失败
      return Promise.reject(result.msg || '操作失败，未知原因')
    } */
    return result
  }, error => {
    console.log('response interceptors onRejected()')
    //隐藏请求进度
    NProgress.done()

    //如果status为401，token有问题
    const {status,data:{msg}={}} = error.response
    if(status===401){
      message.error(msg)
      //删除用户信息，自动跳转到登录页面
      store.dispatch(removeUserToken())
    }else if (status===404) {
      message.error('请求资源不存在')
    }else{
    message.error('请求出错'+error.message)      
    }

    //显示请求错误的提示
    return new Promise(()=>{}) 
    // throw error
    // return Promise.reject(error)
  })

export default instance