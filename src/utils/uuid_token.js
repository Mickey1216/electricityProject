//游客身份模块uuid--要生成一个随机字符串，且每次执行不能发生变化，游客身份持久化存储
import {v4 as uuidv4} from 'uuid'
export const getUUID = ()=> {
    //先从本地存储获取uuid（看一下本地存储里面是否有uuid了）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    
    if(!uuid_token){  //如果没有则生成一个
        uuid_token = uuidv4()
        //本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }

    return uuid_token
}