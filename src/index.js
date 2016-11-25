import React from 'react'
import ReactDOM from 'react-dom'

const isNode = typeof window === 'undefined'
if (!isNode){
  require('./style/index.css')
}

ReactDOM.render(<h1 className='title'>Hello</h1>,document.getElementById('app'))