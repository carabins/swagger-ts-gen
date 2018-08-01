import {writeModules} from "./write-module";
import {parseType, writeDefinitions} from "./write-definitions";
import {Action} from "./Action";

const fs = require("fs");
const path = require("path");
const https = require("https");


let headersTypes: string[] = [];

const yaml = require('js-yaml');


// Get document, or throw exception on error
try {
  var doc = yaml.safeLoad(fs.readFileSync('./api.yaml', 'utf8'));
  //console.log(doc);
  gen(doc)
} catch (e) {
  console.log(e);
}

//
function gen(data) {
  let definitions = writeDefinitions(data.definitions);

  let modules = {}
  Object.keys(data.paths).forEach(path => {
    let actionData = data.paths[path]
    Object.keys(actionData).forEach(method => {
      const actionObject = actionData[method]
      let action = new Action()
      action.path = path
      action.method = method
      action.setInfo(actionObject.operationId, actionObject.summary)
      Object.keys(actionObject.responses).forEach(code => {
        let v = actionObject.responses[code]
        if (parseInt(code) < 400) {
          if (v.schema)
            action.responseType = parseType(v.schema)
          else
            action.responseType = 'any'
        }
      })

      if (actionObject.parameters)
        actionObject.parameters.forEach(param => {
          switch (param.in) {
            case 'header':
              break
            case 'body' :
              action.bodyParams.push(param)
              break
            case 'path' :
              action.pathParams.push(param)
              break
            case 'query' :
              action.queryParams.push(param)
              break
          }
        })
      action.init()
      let m = modules[action.module]
      if (!m) m = modules[action.module] = []
      m.push(action)
    })
  });
  // console.log(modules)
  writeModules(modules, definitions)
}
