const fs = require("fs")
const path = require("path")

export const writeModules = modules => Object.keys(modules).forEach(m => {
  let filename = m.toLowerCase() + ".ts"
  console.log(filename)
  let source = `
/// <reference path="./definitions.d.ts" />
import {run} from './../run'

export const Api${m} = {`
  Object.keys(modules[m]).forEach(a => {
    let action = modules[m][a]


    const getArguments = () => {
      if (action.params)
        return action.params.map(p =>
          `${p.name}${p.required ? '?' : ''}:${p.type}`
        )
      else return ''
    }
    const getWhere = () => {
      let where = ''
      if (action.params) {
        let w = action.params.map(p => p.in)
        where = `where: "${w[0]}"`
      }
      return where
    }
    const getArgs = () => {
      let arg = ''
      if (action.params) {
        let a = action.params.map(p =>
          `${p.name}`
        )
        arg = `arg:{${a}}`
      }
      return arg.length > 2 ? arg + "," : arg
    }
    const getOptions = () => `{
        method: "${action.method.toUpperCase()}",
        path: "${m}/${a}",
        ${getArgs()}
        ${getWhere()}           
      }`
    source += `
    ${a}:(${getArguments()}) => 
      run(${getOptions()}),`
  })
  source += `
}`
  fs.writeFileSync(path.resolve(`./apilib/gen/${filename}`), source)
})