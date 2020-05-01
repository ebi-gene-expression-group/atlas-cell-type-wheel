import React from 'react'
import PropTypes from 'prop-types'
import CellTypeHighchartsWheel from './CellTypeHighchartsWheel'

class CellTypeWheelView extends React.Component {
  constructor(props) {
    super(props)

    const constructHighchartsData = (data) => {
      let wheelData = []
      wheelData.push({
        id: `0.0`,
        parent: ``,
        name: data.gene
      })

      let cellTypeId = 0, organId = 0

      const dataFormat = (id, parent, name) => {
        return {
          id: id,
          parent: parent,
          name: name
        }
      }

      Object.keys(data.cellTypes).forEach((species, speciesIndex) => {
        wheelData.push(dataFormat(`1.${speciesIndex + 1}`, `0.0`, species))
        Object.keys(data.cellTypes[species]).forEach(organ => {
          wheelData.push(dataFormat(`2.${++organId}`, `1.${speciesIndex + 1}`, organ))
          Object.values(data.cellTypes[species][organ]).forEach(cellType => {
            let cellTypeData  =dataFormat(`3.${++cellTypeId}`, `2.${organId}`, cellType)
            cellTypeData.value = 1
            wheelData.push(cellTypeData)
          })
        })
      })

      return wheelData
    }

    this.state = {
      data: this.props.cellTypeWheel.cellTypes && constructHighchartsData(this.props.cellTypeWheel)
    }
  }

  render() {
    const { data } = this.state
    const { wrapperClassName, plotWrapperClassName } = this.props

    return <div className={wrapperClassName}>
      <div className={plotWrapperClassName} style={{position: `relative`}}>
        <CellTypeHighchartsWheel data={data}/>
      </div>
    </div>


  }
}

CellTypeWheelView.propTypes = {
  host: PropTypes.string,
  resource: PropTypes.string,
  wrapperClassName: PropTypes.string,
  plotWrapperClassName: PropTypes.string,
  defaultHeatmapHeight: PropTypes.number,
  hasDynamicHeight: PropTypes.bool,
  heatmapRowHeight: PropTypes.number,
  cellTypeWheel: PropTypes.object.isRequired
}

CellTypeWheelView.defaultProps = {
  wrapperClassName: `row`,
  plotWrapperClassName: `small-12 columns`,
  defaultHeatmapHeight: 300,
  hasDynamicHeight: true,
  heatmapRowHeight: 20
}

export default CellTypeWheelView
