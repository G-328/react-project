import React,{Component} from 'react';
import PropTypes from 'prop-types'

export default class App extends Component{
  
  static propTypes={
    store:PropTypes.object.isRequired
  }
  numberRef=React.createRef()
  incremet=()=>{
    const number =this.numberRef.current.value*1
    const count=this.state.count+number
    this.setState({
       count
    })
  }
  decremet=()=>{
    const number =this.numberRef.current.value*1
    const count=this.state.count-number
    this.setState({
       count
    })
  }
  incremetIfOdd=()=>{
    const number =this.numberRef.current.value*1
    const count=this.state.count
    if(count%2===1){
      this.setState({
        count:count+number
     })
    }  
  }
  decremetAsync=()=>{
    const number =this.numberRef.current.value*1
    setInterval(() => {
      const count=this.state.count+number
      this.setState({
       count
    })
    }, 1000);
  }
  render(){
    const count =this.porps.store.getState()
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