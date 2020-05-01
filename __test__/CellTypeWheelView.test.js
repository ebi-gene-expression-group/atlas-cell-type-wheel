import React from 'react'
import Enzyme from 'enzyme'
import {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import '@babel/polyfill'

import CellTypeWheelView from '../src/CellTypeWheelView'
import CellTypeHighchartsWheel from '../src/CellTypeHighchartsWheel'
import { cellTypeWheelHighchartsData, cellTypeWheelJson } from './TestUtils'

Enzyme.configure({ adapter: new Adapter() })

describe(`CellTypeWheelView`, () => {

  const props = cellTypeWheelJson

  test(`Renders a cell type wheel`, () => {
    const wrapper = shallow(<CellTypeWheelView {...props} />)
    expect(wrapper).toContainExactlyOneMatchingElement(CellTypeHighchartsWheel)
    expect(wrapper).toHaveState({ data: cellTypeWheelHighchartsData })
  })

})
