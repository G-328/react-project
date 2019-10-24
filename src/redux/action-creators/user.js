//操作登录用户信息收据的action creator

import {reqLogin} from '../../api'
import { message } from 'antd'
import {SAVE_USER_TOKEN} from '../action-types'

//保存user和action的同步action creator

const saveUserToken = (user,token) => ({type:SAVE_USER_TOKEN,data:{user,token}})
 
//用于登录请求的异步action creator

export function loginAsync(username,password) {
  return async dispatch => {
    //1.执行异步请求
    const result = await reqLogin({username,password})
    //2.根据结果分发同步action
    if (result.status===0) {
      const {user,token} = result.data
      //将user和token保存在local中
      
      //分发保存user和token信息的同步action
      dispatch (saveUserToken(user,token))
    }else{
      message.error(result.msg )
    }
  }
}