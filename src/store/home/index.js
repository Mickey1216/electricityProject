//home模块的小仓库
import {reqCategoryList} from '../../api'

//state：仓库存储数据的地方
const state = {
    //state中的数据默认初始值别瞎写，根据接口返回值进行初始化（服务器返回数组，初始化为空数组；服务器返回对象，初始化为空对象...）
    categoryList:[]
}
//mutations：修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    }
}
//action：处理，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code === 200){
            commit("CATEGORYLIST",result.data)
        }
    }
}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}