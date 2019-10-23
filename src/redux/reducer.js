/* 

*/
import { INCREEMENT,DECREEMENT } from './action-types'
//用于管理状态数据的函数
//用于管理count数据的reducer函数
export default function count(state=1,action){
  console.log('cout()', state, action)

  switch (action.type) {
    case INCREEMENT:
      return state+action.data
    case DECREEMENT:
      return state-action.data  
    default:
      return state //返回原来的值
  }
}