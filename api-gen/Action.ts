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
  queryParams:QueryParam[] = []
  pathParams:PathParam[] = []
  bodyParams:BodyParam[] = []
  type:string
}