# Expression Atlas cell type wheel


## JSON schema
This repository contains a generic React component that renders grids of cards which adhere to the following JSON
schema (defined using [JSONSchema draft-07](http://json-schema.org/specification.html)):

A demo JSON payload could be found in [gist](https://gist.githubusercontent.com/lingyun1010/88d85552d440d34ffec81b6e0eb6f469/raw/9e3033ab421dbe197ed29bbc380f30cf87263731/cellTypeWheelJsonPayload.json).
```
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "title": "Wheel",
    "required": [
        "gene",
        "cellTypes"
    ],
    "properties": {
        "gene": {
            "type": "string",
            "description": "User's search value, could be gene ID or gene symbol."
        },
        "cellTypes": {
            "type": "object",
            "description": "All the cell types, in each organ, in each species based on the gene search.",
            "$ref": "#/definitions/cellTypes"
        }
    },
    "definitions": {
        "cellTypes": {
            "type": "object",
            "title": "cellTypes",
            "properties": {
                "species": {
                    "type": "object",
                    "description": "Species expressed in the gene search results"
                    "properties": {
                        "organ": {
                            "type": "array",
                            "description": "Organ under an specific species"
                            "items": {
                                "cellType": {
                                    "type": "string",
                                    "description": "Cell types list under an specific organ"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

```


## Getting started
Install dependencies
```
npm install
```

Use [webpack-dev-server](https://github.com/webpack/webpack-dev-server) to see the demo page:
```
npx webpack-dev-server -d
```
