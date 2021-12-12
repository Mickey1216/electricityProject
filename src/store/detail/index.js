//detail模块的小仓库
import { reqGoodsInfo,reqAddOrUpdateShopCart } from '../../api'
import { getUUID } from '../../utils/uuid_token'

//state：仓库存储数据的地方
const state = {
    goodsInfo:{},
    uuid_token:getUUID(),  //游客临时身份
}
//mutations：修改state的唯一手段
const mutations = {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    },
}
//action：处理，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取产品信息
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code === 200){
            commit('GETGOODSINFO',result.data)
        }
    },
    //将产品添加到购物车中|修改某一个产品的个数
    async addOrUpdateShopCart({commit},{skuId,skuNum}){ //当前这个函数如果执行则返回一个Promise
        //加入购物车之后，前台将参数带给服务器；服务器写入数据成功，并没有返回其它数据，只是返回code=200，表明这次操作成功。
        //因为服务器没有返回其余数据，因此不需要三连环存储数据。
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failure'))
        }
    }
}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    //路径导航数据
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },
    //产品信息数据
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
    //产品售卖属性数据
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}