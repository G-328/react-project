//操作登录用户信息收据的action creator

import {reqLogin} from '../../api'
import { message } from 'antd'
import {SAVE_USER_TOKEN,REMOVE_USER_TOKEN} from '../action-types'
import storage from '../../utils/storage'

//保存user和action的同步action creator

const saveUserToken = (user,token) => ({type:SAVE_USER_TOKEN,data:{user,token}})
 
export const removeUserToken = () => {
  //local中的user和token
 /*  localStorage.removeItem('user_key')
  localStorage.removeItem('token_key') */

  storage.remove(storage.KEYS.USER_KEY)
  storage.remove(storage.KEYS.TOKEN_KEY)

  return {type:REMOVE_USER_TOKEN}
}


//用于登录请求的异步action creator

export function loginAsync(username,password) {
  return async dispatch => {
    //1.执行异步请求
    const result = await reqLogin({username,password}) //调用接口请求函数发ajax请求
    //2.根据结果分发同步action
    if (result.status===0) {
      const {user,token} = result.data
      //将user和token保存在local中
      /*localStorage.setItem('user_key',JSON.stringify(user))
      localStorage.setItem('token_key',token) */

      storage.set(storage.KEYS.USER_KEY,user)
      storage.set(storage.KEYS.TOKEN_KEY,token)

      //分发保存user和token信息的同步action
      dispatch (saveUserToken(user,token))
    }else{
      message.error(result.msg )
      return
    }
  }
}