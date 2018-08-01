import {Action, capitalize} from "./Action";
import {parseType, refToName} from "./write-definitions";

const fs = require("fs")
const path = require("path")

export const writeModules = (modules, definitions) => {
  let map = ` 
import {rq} from "./run";  
${definitions}
  `
  Object.keys(modules).forEach(m => {
    let actions: Action[] = modules[m]
    let source = `
export const Api${capitalize(m)} = {`
    actions.forEach(action => {
      const getArguments = () => {
        let path: any[] = []
        if (action.pathParams)
          path = action.pathParams.map(p =>
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
        return path.concat(body).concat(query)
      }
      const getName = v => v.name
      const getOptions = () => `{
          method: "${action.method.toUpperCase()}", ${action.bodyParams.length ? 'body,' : ''}
          path: "${action.path}",
          queryParams:{${action.queryParams.map(getName).join(',')}},          
          pathParams:{${action.pathParams.map(getName).join(',')}},                    
        }`
      source += `
    ${action.name}:(${getArguments()}) => 
     rq(${getOptions()}) as Promise<${action.responseType}>,`
    })
    source += `
}`
    map += source

  })
  fs.writeFileSync(path.resolve(`./out/actions.ts`), map)
}