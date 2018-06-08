import 'url-search-params-polyfill'
import {ws} from "../nuxt/api/ws";

const axios = require("axios")
const qs = require("qs")


let apiInstance

//TODO add api endpoin utl here
const baseURL = ""
export const initApiInstance = (accessToken?) => {
  let headers = {
    'Content-Type': 'application/json-patch+json',
    'accept': 'text/plain'
  }
  if (accessToken) {
    headers['Authorization-Vbtc'] = accessToken
    ws.connect(baseURL, accessToken)
  }


  let protocol = "http:"

  if (!process){
    if (location) {
      protocol = location.protocol
    }
  }

  apiInstance = axios.create({
    baseURL: protocol + "//" + baseURL + "/api/fo/",
    headers
  })
}


export function run(params) {
  let options = {
    method: params.method,
    url: params.path
  } as any
  let arg = params.arg
  if (arg)
    switch (params.where) {
      case "body":
        options.data = arg[Object.keys(arg)[0]]
        break
      default :
        let q = "?"
        Object.keys(arg).forEach(k => {
          let v = arg[k]
          if (v != undefined) {
            q = q + `${k}=${v}&`
          }
          return q
        })
        options.url = options.url + q
    }
  return apiInstance(options)
}