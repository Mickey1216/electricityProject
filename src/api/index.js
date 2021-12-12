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

//将产品添加到购物车中（获取更新某一个产品的个数） URL:/api/cart/addToCart/{ skuId }/{ skuNum } 请求方式：post 
export const reqAddOrUpdateShopCart = (skuId,skuNum)=> requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车列表数据接口 URL:/api/cart/cartList 请求方式：get
export const reqCartList = ()=> requests({url:'/cart/cartList',method:'get'})

//删除购物车产品的接口 URL:/api/cart/deleteCart/{skuId} 请求方式：delete
export const reqDeleteCartById = (skuId)=> requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品选中的状态 URL:/api/cart/checkCart/{skuID}/{isChecked} 请求方式：get
export const reqUpdateCheckedById = (skuId,isChecked)=> requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码  URL:/api/user/passport/sendCode/{phone} 请求方式：get
export const reqGetCode = (phone)=> requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册  URL：/api/user/passport/register  请求方式：post 参数：data（phone，code，password）
export const reqUserRegister = (data)=> requests({url:'/user/passport/register',data,method:'post'})

//登录  URL:/api/user/passport/login  请求方式：post 参数：phone，password
export const reqUserLogin = (data)=> requests({url:'/user/passport/login',data,method:'post'})

//获取用户信息，需要带着用户的token向服务器要用户的信息 URL:/api/user/passport/auth/getUserInfo 请求方式：get
export const reqUserInfo = ()=> requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录 URL:/api/user/passport/logout 请求方式：get
export const reqLogout = ()=> requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息 URL:/api/user/userAddress/auth/findUserAddressList 请求方式：get
export const reqAddressInfo = ()=> requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取商品清单 URL:/api/order/auth/trade 请求方式：get
export const reqOrderInfo = ()=> requests({url:'/order/auth/trade',method:'get'})

//提交订单 URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  请求方式：post
export const reqSubmitOrder = (tradeNo,data)=> requests({url:`order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取支付信息 URL:/api/payment/weixin/createNative/{orderId} 请求方式：get
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})