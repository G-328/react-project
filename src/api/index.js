//包含n个接口函数的模块
import ajax from './ajax'
import jsonp from 'jsonp'
// import { resolve } from 'url'
import { message } from 'antd'
//登录的
export const reqLogin = ({username,password}) => ajax({
    url: '/login',
    method: 'POST',
    data:{username,password}
  })

//获取用户列表的
export const reqUsers =() => ajax({
  url:'/manage/user/list',
  method: 'GET'
})

//封装获取指定城市的天气信息
export const reqWeather = (city) => {
  return new Promise((resolve,reject) => {
    const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{},(err,data) => {
      console.log(err,data)
      if(!err && data.status==='success'){
      const {dayPictureUrl,weather} = data.results[0].weather_data[0]
      resolve({dayPictureUrl,weather})
    }else {
      // reject(new Error('获取天气异常!'))
      message.error('获取天气失败!')
      return new Promise(()=>{})
    }
  })
  })
}

// reqWeather('北京')


//获取所有分类的列表
export const reqCategorys = () => ajax('/manage/category/list')