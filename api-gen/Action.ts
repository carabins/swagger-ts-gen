interface QueryParam {
  name,
  type,
  minimum,
}
interface PathParam {
  name,
  type,
  description,
}
interface BodyParam {
  name,
  type,
  required,
  schema
}
export class Action {
  path:string
  method:string
  responseType:string
  queryParams:QueryParam[] = []
  pathParams:PathParam[] = []
  bodyParams:BodyParam[] = []
  module:string
  type:string
  namePath:string
  name:string
  operationId:string
  summary:string

  init(){
    let n:string[] = this.path.split("/")
    this.module = n[1]
    let i = 1
    let name = this.method
    while (i<n.length){

      let v = n[i]
      if (v=="{id}"){
        name += "Id"
      } else {
        name += capitalize(v)
      }
      i++
    }
    this.namePath = name
  }
  setInfo(operationId, summary){
    this.operationId = operationId
    this.summary = summary
    let n = operationId.split("_")
    let name = n[0]
    let i = 1
    while (i<n.length){
      name += capitalize(n[i])
      i++
    }
    this.name = name
  }
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}