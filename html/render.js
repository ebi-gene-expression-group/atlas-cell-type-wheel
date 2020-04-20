import React from 'react'
import ReactDOM from 'react-dom'

import CellTypeWheelView from '../src/index.js'

const render = (options, target) => {
  ReactDOM.render(<CellTypeWheelView {...options} />, document.getElementById(target))
}

export {render}
