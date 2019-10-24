//包含n个接口函数的模块
import ajax from './ajax'
//登录的
export const reqLogin = ({username,password}) => ajax({
    url: '/login',
    method: 'POST',
    data:{username,password}
  })


