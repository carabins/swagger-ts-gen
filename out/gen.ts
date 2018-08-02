 
import {rq} from "./api";  


export interface Credentials  {
  username:string,
	password:string
}

export interface JWT  {
  access_token:string
}

export interface Token  {
  id:number,
	text:string,
	concepts:string[],
	operator:boolean,
	hidden:boolean,
	size:number,
	share:number
}
export type MergeTokens = number[]

export interface SourceTemplate  {
  tokenId:number
}

export interface PartialTemplate  {
  id:number,
	name:string,
	state:TemplateState,
	solverType:SolverType,
	bot:boolean
}

export interface Template  {
  id:number,
	name:string,
	concepts:string[],
	bot:boolean,
	state:TemplateState,
	solverType:SolverType
}

export interface PartialTemplateMessage  {
  text:string
}

export interface TemplateMessage extends PartialTemplateMessage {
  id:number
}

export interface TemplateRule  {
  rule:string,
	wrapper:string
}

export interface Pagination  {
  limit:number,
	offset:number,
	amount:number
}
export enum TemplateState {
	draft = 'draft',
	test = 'test',
	public = 'public',
}
export enum SolverType {
	message = 'message',
	rule = 'rule',
}
export enum TipSource {
	dialog = 'dialog',
	chain = 'chain',
	template = 'template',
	rule = 'rule',
}

export interface TipQuestion  {
  text:string,
	public:boolean
}

export interface TipAnswer  {
  text:string,
	source:TipSource,
	confidence:number,
	bot:boolean,
	sourceId:number
}

export interface Question  {
  text:string,
	contextId:UUID,
	public:boolean
}

export interface Answer  {
  text:string,
	contextId:UUID,
	bot:boolean,
	source:TipSource
}
export type UUID = string

export interface Report  {
  contextId:UUID,
	tips:TipAnswer[],
	comment:string
}

export interface TemplateTestResult  {
  id:number,
	name:string,
	failed:boolean,
	questions:object[]
}

export interface PartialPlaceholder  {
  name:PlaceholderName,
	value:string,
	description:string
}

export interface Placeholder extends PartialPlaceholder {
  id:number,
	templates_count:number
}
export type PlaceholderName = string

export interface ErrorResponse  {
  message:string
}

export interface InvalidTokenResponse  {
  description:string,
	error:string,
	status_code:number
}

export interface InvalidFileTokenResponse  {
  detail:string,
	status:number,
	title:string,
	type:string
}

export const gen = {
  
	auth : {
    checkAuth:() => 
     rq("/auth", "GET",
      {}
     ) as Promise<any>,

    login:(body:Credentials) => 
     rq("/auth", "POST",
      {body,}
     ) as Promise<JWT>,

},
	api : {
    information:() => 
     rq("/api", "GET",
      {}
     ) as Promise<object>,

},
	intent : {
    getIntents:(query?:{withoutTemplate?:boolean,operator?:boolean,rewindToTokenId?:number,limit?:number,offset?:number}) => 
     rq("/intent", "GET",
      {query,}
     ) as Promise<object>,

},
	token : {
    getTokensByChain:(chain:number[],query?:{length?:number,limit?:number,offset?:number,rewindToTokenId?:number}) => 
     rq("/token/chain/{chain}", "GET",
      {query,pathParams:{chain},}
     ) as Promise<object>,

    searchTokens:(query?:{text?:string,limit?:number,offset?:number}) => 
     rq("/token/search", "GET",
      {query,}
     ) as Promise<object>,

    getTokenCluster:(id:number,query?:{limit?:number,offset?:number}) => 
     rq("/token/{id}/cluster", "GET",
      {query,pathParams:{id},}
     ) as Promise<object>,

    searchTokensForMerge:(id:number,query?:{text?:string,threshold?:number,chain?:number[],limit?:number,offset?:number}) => 
     rq("/token/{id}/merge", "GET",
      {query,pathParams:{id},}
     ) as Promise<object>,

    mergeTokens:(id:number,body:MergeTokens) => 
     rq("/token/{id}/merge", "POST",
      {body,pathParams:{id},}
     ) as Promise<Token>,

    updateToken:(id:number,body:Token) => 
     rq("/token/{id}", "PUT",
      {body,pathParams:{id},}
     ) as Promise<Token>,

},
	template : {
    getTemplates:(query?:{placeholder?:string,text?:string,limit?:number,offset?:number}) => 
     rq("/template", "GET",
      {query,}
     ) as Promise<object>,

    createTemplate:(body:SourceTemplate) => 
     rq("/template", "POST",
      {body,}
     ) as Promise<Template>,

    exportTemplates:(query?:{token?:string,format?:string}) => 
     rq("/template/export", "GET",
      {query,}
     ) as Promise<any>,

    getSimilar:(id:number,query?:{sample?:string}) => 
     rq("/template/{id}/similarity", "GET",
      {query,pathParams:{id},}
     ) as Promise<object[]>,

    getTemplate:(id:number) => 
     rq("/template/{id}", "GET",
      {pathParams:{id},}
     ) as Promise<Template>,

    updateTemplate:(id:number,body:PartialTemplate) => 
     rq("/template/{id}", "PATCH",
      {body,pathParams:{id},}
     ) as Promise<Template>,

    deleteTemplate:(id:number) => 
     rq("/template/{id}", "DELETE",
      {pathParams:{id},}
     ) as Promise<any>,

    searchTokensForMergeToTemplate:(id:number,query?:{text?:string,threshold?:number,limit?:number,offset?:number}) => 
     rq("/template/{id}/merge", "GET",
      {query,pathParams:{id},}
     ) as Promise<object>,

    mergeTokensToTemplate:(id:number,body:MergeTokens) => 
     rq("/template/{id}/merge", "POST",
      {body,pathParams:{id},}
     ) as Promise<Template>,

    addQuestion:(id:number,body:PartialTemplateMessage) => 
     rq("/template/{id}/sample", "POST",
      {body,pathParams:{id},}
     ) as Promise<TemplateMessage>,

    getQuestions:(id:number,query?:{limit?:number,offset?:number}) => 
     rq("/template/{id}/sample", "GET",
      {query,pathParams:{id},}
     ) as Promise<object>,

    addAnswer:(id:number,body:PartialTemplateMessage) => 
     rq("/template/{id}/answer", "POST",
      {body,pathParams:{id},}
     ) as Promise<TemplateMessage>,

    getAnswers:(id:number,query?:{limit?:number,offset?:number}) => 
     rq("/template/{id}/answer", "GET",
      {query,pathParams:{id},}
     ) as Promise<object>,

    getAnswerTips:(id:number) => 
     rq("/template/{id}/answer/tips", "GET",
      {pathParams:{id},}
     ) as Promise<string[]>,

    getRule:(id:number) => 
     rq("/template/{id}/rule", "GET",
      {pathParams:{id},}
     ) as Promise<TemplateRule>,

    createOrUpdateRule:(id:number,body:TemplateRule) => 
     rq("/template/{id}/rule", "PUT",
      {body,pathParams:{id},}
     ) as Promise<TemplateRule>,

    deleteRule:(id:number) => 
     rq("/template/{id}/rule", "DELETE",
      {pathParams:{id},}
     ) as Promise<any>,

},
	sample : {
    updateQuestion:(id:number,body:TemplateMessage) => 
     rq("/sample/{id}", "PUT",
      {body,pathParams:{id},}
     ) as Promise<TemplateMessage>,

    deleteQuestion:(id:number) => 
     rq("/sample/{id}", "DELETE",
      {pathParams:{id},}
     ) as Promise<any>,

},
	answer : {
    updateAnswer:(id:number,body:TemplateMessage) => 
     rq("/answer/{id}", "PUT",
      {body,pathParams:{id},}
     ) as Promise<TemplateMessage>,

    deleteAnswer:(id:number) => 
     rq("/answer/{id}", "DELETE",
      {pathParams:{id},}
     ) as Promise<any>,

},
	bot : {
    getTips:(query?:{templates?:number[],limit?:number}) => 
     rq("/bot/tips", "GET",
      {query,}
     ) as Promise<TipQuestion[]>,

    sendQuestion:(body:Question) => 
     rq("/bot/question", "POST",
      {body,}
     ) as Promise<object>,

    sendAnswer:(body:Answer) => 
     rq("/bot/answer", "POST",
      {body,}
     ) as Promise<any>,

    sendReport:(body:Report) => 
     rq("/bot/report", "POST",
      {body,}
     ) as Promise<any>,

    getReports:(query?:{date_from?:string}) => 
     rq("/bot/report", "GET",
      {query,}
     ) as Promise<any>,

},
	test : {
    testTemplates:(query?:{public?:boolean}) => 
     rq("/test/templates", "GET",
      {query,}
     ) as Promise<TemplateTestResult[]>,

},
	file : {
    getDownloadToken:() => 
     rq("/file/token", "GET",
      {}
     ) as Promise<object>,

},
	placeholder : {
    getPlaceholders:(query?:{limit?:number,offset?:number}) => 
     rq("/placeholder", "GET",
      {query,}
     ) as Promise<object>,

    createPlaceholder:(body:PartialPlaceholder) => 
     rq("/placeholder", "POST",
      {body,}
     ) as Promise<Placeholder>,

    updatePlaceholder:(id:number,body:Placeholder) => 
     rq("/placeholder/{id}", "PUT",
      {body,pathParams:{id},}
     ) as Promise<Placeholder>,

    deletePlaceholder:(id:number) => 
     rq("/placeholder/{id}", "DELETE",
      {pathParams:{id},}
     ) as Promise<any>,

},}