const cellTypeWheelJson = {
  cellTypeWheel: {
    "gene": `ASPA`,
    "cellTypes": {
      "Homo sapiens": {
        "pancreas": [
          `[beta cell]`,
          `[not available]`,
          `[pancreatic A cell]`,
          `[pancreatic PP cell]`
        ],
        "kidney": [
          `[pancreatic ductal cell]`,
          `[endothelial cell]`
        ]
      },

      "Mus musculus": {
        "pancreas": [
          `[B cell]`,
          `[cancer associated fibroblast]`,
          `[CD31-positive endothelial cell]`
        ],
        "kidney": [
          `[CD11b-positive CD11c-positive dendritic cell]`,
          `[CD8-positive T cell]`,
          `[CD11b-positive macrophage/monocyte]`,
          `[innate lymphoid cell]`,
          `[CD11c-positive dendritic cell]`,
          `[CD4-positive T cell]`
        ]
      }
    }
  }
}

const cellTypeWheelHighchartsData = [
  {"id":"0.0","parent":"","name":"ASPA"},
  {"id":"1.1","parent":"0.0","name":"Homo sapiens"},
  {"id":"2.1","parent":"1.1","name":"pancreas"},
  {"id":"3.1","parent":"2.1","name":"[beta cell]","value":1},
  {"id":"3.2","parent":"2.1","name":"[not available]","value":1},
  {"id":"3.3","parent":"2.1","name":"[pancreatic A cell]","value":1},
  {"id":"3.4","parent":"2.1","name":"[pancreatic PP cell]","value":1},
  {"id":"2.2","parent":"1.1","name":"kidney"},
  {"id":"3.5","parent":"2.2","name":"[pancreatic ductal cell]","value":1},
  {"id":"3.6","parent":"2.2","name":"[endothelial cell]","value":1},
  {"id":"1.2","parent":"0.0","name":"Mus musculus"},
  {"id":"2.3","parent":"1.2","name":"pancreas"},
  {"id":"3.7","parent":"2.3","name":"[B cell]","value":1},
  {"id":"3.8","parent":"2.3","name":"[cancer associated fibroblast]","value":1},
  {"id":"3.9","parent":"2.3","name":"[CD31-positive endothelial cell]","value":1},
  {"id":"2.4","parent":"1.2","name":"kidney"},
  {"id":"3.10","parent":"2.4","name":"[CD11b-positive CD11c-positive dendritic cell]","value":1},
  {"id":"3.11","parent":"2.4","name":"[CD8-positive T cell]","value":1},
  {"id":"3.12","parent":"2.4","name":"[CD11b-positive macrophage/monocyte]","value":1},
  {"id":"3.13","parent":"2.4","name":"[innate lymphoid cell]","value":1},
  {"id":"3.14","parent":"2.4","name":"[CD11c-positive dendritic cell]","value":1},
  {"id":"3.15","parent":"2.4","name":"[CD4-positive T cell]","value":1}
]
export { cellTypeWheelHighchartsData, cellTypeWheelJson }