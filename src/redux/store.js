/* 
redux最核心的管理对象store
*/
import {createStore} from 'redux';
import reducer from './reducer.js'

export default createStore(reducer)