import React from 'react'
import PropTypes from 'prop-types'
import CellTypeHighchartsWheel from './CellTypeHighchartsWheel'
import LoadingOverlay from './LoadingOverlay'
import CalloutAlert from './CalloutAlert'

import URI from 'urijs'
import _ from 'lodash'

class CellTypeWheelView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      selectedClusterId: null,
      isLoading: true,
      hasError: null
    }

    this.constructHighchartsData = this.constructHighchartsData.bind(this)
  }

  async _fetchAndSetState({resource, host}) {
    this.setState({
      isLoading: true
    })

    const url = `https://gist.githubusercontent.com/lingyun1010/88d85552d440d34ffec81b6e0eb6f469/raw/9e3033ab421dbe197ed29bbc380f30cf87263731/cellTypeWheelJsonPayload.json`
    //const url = URI(resource, host).toString()

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`${url} => ${response.status}`)
      }

      const jsonData = await response.json()
      this.setState({
        data: await jsonData.cellTypeWheel,
        selectedClusterId: null,
        isLoading: false,
        hasError: null
      })
    } catch(e) {
      this.setState({
        data: null,
        isLoading: false,
        hasError: {
          description: `There was a problem communicating with the server. Please try again later.`,
          name: e.name,
          message: e.message
        }
      })
    }
  }

  constructHighchartsData(data) {
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
      }
      )
    }
    )

    return wheelData

  }

  componentDidMount() {
    this._fetchAndSetState(this.props)
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resource !== this.props.resource) {
      this._fetchAndSetState(this.props)
    }
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: {
        description: `There was a problem rendering this component.`,
        name: error.name,
        message: `${error.message} – ${info}`
      }
    })
  }

  render() {
    const { data, isLoading, hasError } = this.state
    const { wrapperClassName, plotWrapperClassName } = this.props

    const wheelData = data.cellTypes && this.constructHighchartsData(data)

    console.log(wheelData)

    return (
      hasError ?
        <CalloutAlert error={hasError}/> :
        <div>
          <div className={wrapperClassName}>
            <div className={plotWrapperClassName} style={{position: `relative`}}>
              <CellTypeHighchartsWheel data={wheelData}/>
              {/*<LoadingOverlay*/}
              {/*  show={isLoading}*/}
              {/*/>*/}
            </div>
          </div>
        </div>
    )
  }
}

CellTypeWheelView.propTypes = {
  host: PropTypes.string,
  resource: PropTypes.string,
  wrapperClassName: PropTypes.string,
  plotWrapperClassName: PropTypes.string,
  defaultHeatmapHeight: PropTypes.number,
  hasDynamicHeight: PropTypes.bool,
  heatmapRowHeight: PropTypes.number
}

CellTypeWheelView.defaultProps = {
  wrapperClassName: `row`,
  plotWrapperClassName: `small-12 columns`,
  defaultHeatmapHeight: 300,
  hasDynamicHeight: true,
  heatmapRowHeight: 20
}

export default CellTypeWheelView
