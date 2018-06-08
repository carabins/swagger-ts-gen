import {writeFile, writeFileSync} from "fs";

export const writeDefinitions = definitions => {
  console.log("definitions")
  let source = ''
  Object.keys(definitions).forEach(k => {
    let v = definitions[k]
    let p = Object.keys(v.properties).map(c => {
      let type = v.properties[c].type
      type = type == "integer" ? "number" : type
      type = type == "array" ? "any[]" : type
      return c + ":" + type
    })

    source += `
interface ${k} {${p.join(',')}}    
    `
  })
  writeFileSync("./apilib/gen/definitions.d.ts", source)
}