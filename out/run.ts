const baseURL = ""
let headers = {
  'Content-Type': 'application/json-patch+json',
  'accept': 'text/plain'
}
export const initApiInstance = (accessToken?) => {
  if (accessToken) {
    headers['Authorization'] = accessToken
    // ws.connect(baseURL, accessToken)
  }
}

export const rq = (params: {
  method: string,
  path: string,
  queryParams: any,
  body: any,
  pathParams: any,
}) => {
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

