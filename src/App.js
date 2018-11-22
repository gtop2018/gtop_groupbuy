import React, { Component } from 'react';
import './App.css';

// 函数定义组件
// function App(props){
//   return <h1>Hello , {props.name}</h1>
// }
// 类定义组件
// const  es6定义变量
// extends es6的继承
// class   es6的创建类继承于React.Component ，从而获得了render方法
// render  react.Component的方法，将react元素渲染到页面上去。
class App extends React.Component{
  render () {
    return <h1>Hello,{this.props.name}</h1>
  }
}

export default App;
