import axios from 'axios';
//import qs from 'qs';
import { SUCCESS_CODE } from './config';

export default function myAjax(url = '', params = {}, type = 'GET', headers = {}) {
    let myPromise;
    return new Promise((resolve, reject) => {
        // 判断请求类型
        if (type.toUpperCase() === 'GET'){
            let paramsStr = '';
            // 将参数对象转为url参数字符串
            Object.keys(params).forEach(key => {
                paramsStr += key + '=' + params[key] + '&';
            });
            // 删除最后的'&'
            if (paramsStr){
                paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'));
                url += '?' + paramsStr;
            }
            // 发起get请求
            myPromise = axios.get(url);
        }else if (type.toUpperCase() === 'POST'){
            // 发起post请求
            myPromise = axios.post(url, params, headers);
        }
        // 处理请求结果并返回
        myPromise.then(res => {
            if (res.data.status === SUCCESS_CODE){
                resolve(res.data.data);
            }else {
                //code为不成功状态值时抛出
                throw new Error('服务器返回错误状态');
            }
        }).catch(err => {
            if (err){
                console.log('服务器响应错误');
                console.log(err);
            }
            reject(err);
        });
    });
}