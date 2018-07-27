import {writeModules} from "./write-module";
import {writeDefinitions} from "./write-definitions";
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
  writeDefinitions(data.definitions);

  let actions = []
  Object.keys(data.paths).forEach(path => {
    let actionData = data.paths[path]
    Object.keys(actionData).forEach(method => {
      const actionObject = actionData[method]
      let action = new Action()
      action.path = path
      if (actionObject.parameters)
        actionObject.parameters.forEach(param=>{
          switch (param.in) {
            case 'header': break
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
    })




  });


  // writeModules(modules);

  // console.log(definitions)

}
