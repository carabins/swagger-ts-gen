import { writeModules } from "./write-module";
import { writeDefinitions } from "./write-definitions";


const fs = require("fs");

const path = require("path");

//TODO add swagger.json url here
let swaggerJsonUrl = "..../swagger/v1/swagger.json";

const https = require("https");

https.get(swaggerJsonUrl, (resp) => {
  let data = "";
  resp.on("data", (chunk) => {
    data += chunk;
  });
  resp.on("end", () => {
    gen(JSON.parse(data));
  });
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
    let v = data.definitions[k];
    definitions[k] = v;
  });
  Object.keys(data.paths).forEach(p => {
    let [a0, a1, a2, moduleName, actionName] = p.split("/");
    module = modules[moduleName] = modules[moduleName] ? modules[moduleName] : {};
    let v = data.paths[p];
    let method = Object.keys(v).reduce(x => x);
    let actionData = v[method];
    let h = actionData.consumes;
    let headersTypeId = -1;
    if (h.length >= 1) {
      let headerString = v[method].consumes.toString();
      headersTypeId = headersTypes.indexOf(headerString);
      if (headersTypeId == -1) {
        headersTypes.push(headerString);
        headersTypeId = headersTypes.indexOf(headerString);
      }
    }
    if (actionData.parameters) {
      actionData.parameters.forEach(param => {
        let schema = param.schema;
        if (schema) {
          param.type = schema.$ref.replace("#/definitions/", "");
        } else {
          if (param.format) {
            // param.type = param.format
            param.type = "number";
          } else {
            param.type = "string";
          }
        }
      });
    }
    let action = module[actionName] = {
      method,
      headersTypeId,
      params: actionData.parameters
    };
  });


//   let headersSource = `
//   export const headers = new Headers()
// ${headersTypes[0].split(",").map(h =>
//     `  headers.append('Content-Type', '${h}')`
//   ).join("\n")}
//   `
  // fs.writeFileSync(path.resolve('./apilib/headers.ts'), headersSource)


  writeModules(modules);

  writeDefinitions(definitions);

}
