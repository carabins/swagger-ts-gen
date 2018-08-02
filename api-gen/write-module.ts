import {Action, capitalize} from "./Action";
import {parseType, refToName} from "./write-definitions";

const fs = require("fs")
const path = require("path")

export const writeModules = (modules, definitions) => {
  let map = ` 
import {rq} from "./api";  
${definitions}
  `
  Object.keys(modules).forEach(m => {
    let actions: Action[] = modules[m]
    let source = `
export const Api${capitalize(m)} = {`
    actions.forEach(action => {

      let pathParams: any[] = []
      if (action.pathParams)
        pathParams = action.pathParams.map(p =>
          `${p.name}:${parseType(p)}`
        )
      let body: any[] = []
      if (action.bodyParams)
        body = action.bodyParams.map(p =>
          `${p.name}${p.required ? '' : '?'}:${parseType(p.schema)}`
        )
      let query: any[] = []
      if (action.queryParams) {
        query = action.queryParams.map(p =>
          `${p.name}?:${parseType(p)}`
        )
      }
      let queryStr = query.length > 0 ? `query?:{${query}}` : ""
      let args = pathParams.concat(body)
      if (queryStr) args.push(queryStr)
      const getName = v => v.name
      let optsParam = ""
      if (action.bodyParams.length){
        optsParam +=`body,`
      }
      if (action.queryParams.length){
        optsParam +=`query,`
      }
      if (action.pathParams.length){
        optsParam +=`pathParams:{${action.pathParams.map(getName).join(",")}},`
      }
      const getOptions = () => `"${action.path}", "${action.method.toUpperCase()}",{${optsParam}}`
      source += `
    ${action.name}:(${args.join(',')}) => 
     rq(${getOptions()}
     ) as Promise<${action.responseType}>, 
`
    })
    source += `
}`
    map += source

  })
  fs.writeFileSync(path.resolve(`./out/gen.ts`), map)
}