import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
//页面查询
export const page_list=(size,page,params)=>{
  //请求查询服务接口
  // let queryPageRequest=JSON.stringify(params);
  let queryPageRequest=querystring.stringify(params);
  return http.requestQuickGet(apiUrl+"/cms/page/list/"+page+"/"+size+"?"+queryPageRequest);
}
//站点查询
export const site_list=()=>{
  //请求站点查询服务接口
  return http.requestQuickGet(apiUrl+"/cms/page/siteList");
}
//模板查询
export const template_list=()=>{
  //请求模板查询服务接口
  return http.requestQuickGet(apiUrl+"/cms/page/templateList");
}

//添加页面
export const site_add=(pageForm)=>{
  //添加页面服务接口
  return http.requestPost(apiUrl+"/cms/page/add",pageForm);
}
//修改页面
export const site_edit=(pageId)=>{
  //修改页面服务接口
  return http.requestQuickGet(apiUrl+"/cms/page/edit"+"/"+pageId);
}
//更新页面
export const site_update=(pageId,params)=>{
  //更新页面服务接口
  return http.requestPost(apiUrl+"/cms/page/update/"+pageId,params);
}
//删除页面
export const page_delete=(pageId)=>{
  //更新页面服务接口
  return http.requestPost(apiUrl+"/cms/page/delete/"+pageId);
}

export const page_preview=(pageId)=>{
  return http.requestQuickGet(apiUrl+"/cms/preview/"+pageId);
}
//发布页面
export const page_postPage=(pageId)=> {
  return http.requestPost(apiUrl+"/cms/page/postPage/"+pageId)
}
