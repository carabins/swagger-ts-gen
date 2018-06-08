import {writeModules} from "./write-module";
import {writeDefinitions} from "./write-definitions";

const fs = require("fs");
const path = require("path");
const https = require("https");

//TODO add swagger.json url here
let swaggerJsonUrl = "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/uber.json";

https.get(swaggerJsonUrl, (resp) => {
  let data = "";
  resp.on("data", (chunk) => data += chunk);
  resp.on("end", () => gen(JSON.parse(data)));
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

let headersTypes: string[] = [];

function gen(data) {
  let modules = {};
  let definitions = {};
  let sh = {
    definitions
  };

  Object.keys(data.definitions).forEach(k => {
    definitions[k] = data.definitions[k]
  });


  Object.keys(data.paths).forEach(p => {
    let moduleName, actionName, arp = p.split('/')
    if (arp.length > 2) {
    //   moduleName = arp[1]
    //   actionName = arp.slice(2)
    // } else {
    //   moduleName = ''
    }

    //DODO write code here
    console.log(arp)

    // let v = data.paths[p]
    // let method = Object.keys(v).reduce(x => x)
    // let actionData = v[method]

    // console.log(Object.keys(actionData.description))

    // let [a0, a1, a2, moduleName, actionName] = p.split("/");
    // console.log()
    //
    // module = modules[moduleName] = modules[moduleName] ? modules[moduleName] : {};
    // let v = data.paths[p];


    // console.log(actionName)

    // headers
    // let h = actionData.consumes;
    // let headersTypeId = -1;
    // if (h.length >= 1) {
    //   let headerString = v[method].consumes.toString();
    //   headersTypeId = headersTypes.indexOf(headerString);
    //   if (headersTypeId == -1) {
    //     headersTypes.push(headerString);
    //     headersTypeId = headersTypes.indexOf(headerString);
    //   }
    // }

    // if (actionData.parameters) {
    //
    //   actionData.parameters.forEach(param => {
    //     let schema = param.schema;
    //     if (schema) {
    //       param.type = schema.$ref.replace("#/definitions/", "");
    //     } else {
    //       if (param.format) {
    //         // param.type = param.format
    //         param.type = "number";
    //       } else {
    //         param.type = "string";
    //       }
    //     }
    //   });
    // }
    // let action = module[actionName] = {
    //   method,
    //   params: actionData.parameters
    // };
  });


  // writeModules(modules);

  writeDefinitions(definitions);

}
