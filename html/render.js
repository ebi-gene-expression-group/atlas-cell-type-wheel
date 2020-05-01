import React from 'react'
import ReactDOM from 'react-dom'

import CellTypeWheelView from '../src/index.js'
import { withFetchLoader } from 'atlas-react-fetch-loader'

const CellTypeWheel = withFetchLoader(CellTypeWheelView)

const render = (options, target) => {
  ReactDOM.render(<CellTypeWheel {...options} />, document.getElementById(target))
}

export {render}
