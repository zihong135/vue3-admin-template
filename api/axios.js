import axios from "axios";
import config from "../config/index.js"
//对当前环境进行判断
const baseUrl = process.env.NODE_ENV === 'development'?config.baseUrl.dev:config.baseUrl.pro

//构造类
class HttpRequest {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    getInsideConfig(){
        const config = {
            baseUrl:this.baseUrl,
            //请求头
            header:{}
        }
        return config
    }
    interceptors(instance){
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            console.log(config);
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            console.log(error)
            return Promise.reject(error);
        });
            }
        request(options){
            //创建axios实例
            const instance = axios.create();
            //加入配置
            options = {...this. getInsideConfig,...options}
            //添加拦截器配置
            this.interceptors(instance)
            return instance(options)
        }
        }
export default new HttpRequest