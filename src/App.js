import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {increment,decrement} from './redux/action-creators'

export default class App extends Component{
  
  static propTypes={
    store:PropTypes.object.isRequired
  }
  //创建一个ref容器，保存到组件对象上
  numberRef=React.createRef()

  incremet=()=>{
    const number =this.numberRef.current.value*1
    this.props.store.dispatch(increment(number))
  }
  decremet=()=>{
    const number =this.numberRef.current.value*1
    this.props.store.dispatch(decrement(number))

  }
  incremetIfOdd=()=>{
    const number =this.numberRef.current.value*1
    const count=this.props.store.getState()
    if(count%2===1){
    this.props.store.dispatch(increment(number))     
    }  
  }
  decremetAsync=()=>{
    const number =this.numberRef.current.value*1
    setInterval(() => {
      this.props.store.dispatch(increment(number))
    }, 1000);
  }
  render(){
    const count =this.props.store.getState()
    return (
      <div>
        <p>click {count} times</p>
        <div>
          <select ref={this.numberRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={this.incremet}>+</button>
          <button onClick={this.decremet}>-</button>
          <button onClick={this.incremetIfOdd}>increment if odd</button>
          <button onClick={this.decremetAsync}>increment async</button>
        </div>
      </div>
    )
  }
}