//user模块的小仓库
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo,reqLogout } from '../../api'
import { setToken,getToken,removeToken } from '../../utils/token'
//state：仓库存储数据的地方
const state = {
    code: '',
    token: getToken('TOKEN'),
    userInfo:{}
}
//mutations：修改state的唯一手段
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(){ 
        //把仓库中关于用户信息清空
        state.token = ''
        state.userInfo = {}
        //本地存储token清空
        removeToken()
    }
}
//action：处理，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //获取验证码这个接口：把验证码直接返回，但是正常情况下，应该是后台把验证码发送到用户手机上。
        let result = await reqGetCode(phone)
        if (result.code === 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)

        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    //用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code === 200) {
            //服务器下发token，用户唯一标识，将来经常通过带token找服务器要用户信息进行展示
            commit('USERLOGIN', result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code === 200) {
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('failure'))
        }
    },
    //退出登录
    async userLogout({ commit }){
        //这一步只是向服务器发起一次请求，通知服务器清除token
        let result = await reqLogout()
        if(result.code === 200){
            //清除本地用户信息
            commit('CLEAR')
            return 'ok'
        }else {
            return Promise.reject(new Error('failure'))
        }
    },
}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
//项目当中getters主要作用是：简化仓库中的数据；可以把我们将来在组件当中需要用的数据简化一下
const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}




