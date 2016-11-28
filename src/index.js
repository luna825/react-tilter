import React from 'react'
import ReactDOM from 'react-dom'

import Tilter from './components/tilter'
import ImagesLoader from './components/imagesLoader'

ReactDOM.render(
  <ImagesLoader>
    <Tilter />
  </ImagesLoader>
  ,document.getElementById('app'))