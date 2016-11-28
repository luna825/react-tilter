import React from 'react'
import ReactDOM from 'react-dom'

import Tilter from './tilter'
import ImagesLoader from './imagesLoader'

ReactDOM.render(
  <ImagesLoader>
    <Tilter />
  </ImagesLoader>
  ,document.getElementById('app'))