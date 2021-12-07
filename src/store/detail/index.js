//detail模块的小仓库
import { reqGoodsInfo } from '../../api'

//state：仓库存储数据的地方
const state = {
    goodsInfo:{}
}
//mutations：修改state的唯一手段
const mutations = {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    }
}
//action：处理，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code === 200){
            commit('GETGOODSINFO',result.data)
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