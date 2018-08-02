import {gen} from "./gen";

let baseURL = ""
let headers = {
  'Content-Type': 'application/json-patch+json',
  'accept': 'text/plain'
}

export const api = {
  setBaseUrl(url) {
    baseURL = url
  },
  updateAuthorization(accessToken) {
    if (accessToken) {
      headers['Authorization'] = accessToken
    }
  },
  gen
}

export const rq = (path: string, method: string, params) => {
  let url = params.path
  if (params.pathParams) {
    Object.keys(params.pathParams).forEach(key => {
      url = url.replace(`{${key}}`, params.pathParams[key])
    })
  }
  if (params.queryParams) {
    url += "?"
    Object.keys(params.queryParams).forEach(key => {
      url += key + `=${params.queryParams[key]}&`
    })
  }
  url = baseURL + url
  return new Promise((resolve, reject) => fetch(url,
    {
      headers,
      method: params.method,
      body: JSON.stringify(params.body)
    })
    .then(res =>
        res.json().then(resolve)
      , reject))
}

