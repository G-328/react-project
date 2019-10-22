/* 

*/
import { INCREEMENT,DECREEMENT } from './action-types'
//用于管理状态数据的函数
//用于管理count数据的reducer函数
export default function count(state=1,action){
  switch (action.type) {
    case INCREEMENT:
      return state+action.number
    case DECREEMENT:
      return state-action.number  
    default:
      return state //返回原来的值
  }
}