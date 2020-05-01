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

Highcharts.SVGRenderer.prototype.symbols.download = (x, y, w, h) => [
  // Arrow stem
  `M`, x + w * 0.5, y,
  `L`, x + w * 0.5, y + h * 0.7,
  // Arrow head
  `M`, x + w * 0.3, y + h * 0.5,
  `L`, x + w * 0.5, y + h * 0.7,
  `L`, x + w * 0.7, y + h * 0.5,
  // Box
  `M`, x, y + h * 0.9,
  `L`, x, y + h,
  `L`, x + w, y + h,
  `L`, x + w, y + h * 0.9
]

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
    exporting: {
      buttons: {
        contextButton: {
          text: `Download`,
          symbol: `download`,
          menuItems: [
            `printChart`,
            `separator`,
            `downloadPNG`,
            `downloadJPEG`,
            `downloadPDF`,
            `downloadSVG`,
            `separator`,
            `downloadCSV`,
            `downloadXLS`
          ]
        }
      }
    },
    tooltip: {
      headerFormat: ``,
      pointFormat: `<b>{point.name}</b>`
    }
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />

}

CellTypeHighchartsWheel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number
  })).isRequired,
  atlasUrl: PropTypes.string
}

export default CellTypeHighchartsWheel
