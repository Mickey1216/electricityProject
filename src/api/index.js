//当前这个模块的作用：对API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'

//发请求：axios发请求返回结果是Promise对象
//三级联动的接口 地址：/api/product/getBaseCategoryList 请求方式：get 无参数
export const reqCategoryList = ()=> requests.get("/product/getBaseCategoryList")
    
//获取banner数据（Home首页轮播图接口）
export const reqBannerList = ()=> mockRequests.get('/banner')
     
//获取floor数据
export const reqFloorList = ()=> mockRequests.get('/floor')

//获取搜索模块数据 地址：/api/list 请求方式：post 
/**
参数：
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
//给服务器传递params参数，至少是一个空对象
export const reqGetSearchInfo = (params)=> requests({url:'/list',method:'post',data:params})

//获取产品详细信息的接口 URL:/api/item/{ skuId } 请求方式：get 
export const reqGoodsInfo = (skuId)=> requests({url:`/item/${skuId}`,method:'get'})
