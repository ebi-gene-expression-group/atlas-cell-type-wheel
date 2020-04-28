import React from "react"
import PropTypes from 'prop-types'

import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HC_sunburst from "highcharts/modules/sunburst"

import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'

// init the module
async function addModules() {
  HC_sunburst(Highcharts)
  HighchartsExporting(Highcharts)
  HighchartsExportData(Highcharts)
}

addModules()

// Splice in transparent for the center circle
Highcharts.getOptions().colors.splice(0, 0, `transparent`)

const CellTypeHighchartsWheel= props => {
  const options = {
    chart: {
      height: `100%`
    },

    title: {
      text: `Cell type wheel`
    },
    series: [{
      type: `sunburst`,
      data: props.data,
      allowDrillToNode: true,
      cursor: `pointer`,
      dataLabels: {
        format: `{point.name}`,
        filter: {
          property: `innerArcLength`,
          operator: `>`,
          value: 16
        }
      },
      point: {
        events: {
          click: function () {
            // To do: hyperlink to cell type heatmap with a cell type value and the corresponding species value
            // this.options.value === 1 && alert(this.options.name)
            // location.href = 'https://en.wikipedia.org/wiki/' +
            //   this.options.key;
          }
        }
      },

      levels: [{
        level: 1,
        levelIsConstant: false,
        dataLabels: {
          filter: {
            property: `outerArcLength`,
            operator: `>`,
            value: 64
          }
        }
      }, {
        level: 2,
        colorByPoint: true
      },
      {
        level: 3,
        colorVariation: {
          key: `brightness`,
          to: -0.5
        }
      }, {
        level: 4,
        colorVariation: {
          key: `brightness`,
          to: 0.5
        }
      }]

    }],
    // tooltip: {
    //   headerFormat: ``,
    //   pointFormat: `The number of cell types of <b>{point.name}</b> is <b>{point.value}</b>`
    // }
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />

}

CellTypeHighchartsWheel.propTypes = {
  data: PropTypes.array.isRequired,
  atlasUrl: PropTypes.string
}

export default CellTypeHighchartsWheel
