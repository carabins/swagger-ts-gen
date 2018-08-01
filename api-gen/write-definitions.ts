import {writeFile, writeFileSync} from "fs";

export const refToName = v => v.split("/").pop() as string
export const parseType = v => {
  if (v['$ref']) {
    return refToName(v['$ref'])
  }
  if (v.type) {
    switch (v.type) {
      case "integer":
        return "number"
      case "array" :
        return `${parseType(v.items)}[]`
      default :
        return v.type
    }
  }
}
export const writeDefinitions = definitions => {
  console.log("definitions")
  let source = ''


  Object.keys(definitions).forEach(name => {
    let def = definitions[name]
    switch (def.type) {
      case 'string':
        if (def.enum) {
          source += `
export enum ${name} {
${def.enum.map(v => "\t" + v + " = '" + v).join("',\n")}',
}`
        } else {
          source += `
export type ${name} = string`
        }
        break
      case "array":
        if (def.items.type === "integer")
          source += `
export type ${name} = number[]`
        break
      case "object":
        writeObj(def)
        break
      // case "object":
      default :
        if (def.allOf) {
          let refs: string[] = []
          let o
          def.allOf.forEach(i => {
            if (i['$ref']) refs.push(refToName(i['$ref']))
            else o = i
          })
          writeObj(o, refs)
        } else {
          throw "need write code"
        }
    }

    function writeObj(v, ext?) {
      if (v.properties) {
        let p = Object.keys(v.properties).map(c => {
          let prop = v.properties[c]
          let type
          type = parseType(prop)
          return c + ":" + type
        })
        source += `

export interface ${name} ${ext ? 'extends '+ext.join(","):''} {
  ${p.join(',\n\t')}
}`
      } else {
        console.error(v)
      }

    }

//

  })
  // console.log(source)

  return source
}