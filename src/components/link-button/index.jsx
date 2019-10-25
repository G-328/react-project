import React from 'react'
import './index.less'

//组件标签体的内容以children自动传递给组件内部

export default function LinkButton (props){
  return <button className='link-button' {...props}/>
}
