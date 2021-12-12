//shopcart模块的小仓库
import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from '../../api'
//state：仓库存储数据的地方
const state = {
    cartList:[]
}
//mutations：修改state的唯一手段
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
//action：处理，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code === 200){
            commit("GETCARTLIST",result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failure'))
        }
    },
    //修改购物车某一产品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failure'))
        }
    },
    //删除全部勾选的商品
    deleteAllCheckedCart({dispatch,getters}){ //context:小仓库，commit--提交mutations修改state
        let promiseAll = []
        //获取购物车中全部的产品
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked === 1 ? dispatch('deleteCartListBySkuId',item.skuId) : ''
            //将每一次返回的promise放入数组中
            promiseAll.push(promise)
        })

        //只要全部的p1|p2...都成功，返回的结果即为成功；如果有一个失败，返回的结果即为失败
        return Promise.all(promiseAll)
    },
    //修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    },
}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
//项目当中getters主要作用是：简化仓库中的数据；可以把我们将来在组件当中需要用的数据简化一下
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}