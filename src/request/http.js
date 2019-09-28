import axios from "axios";
import API from "./api.js";

axios.defaults.headers['Content-Type'] = 'application/json';

export function $get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(API[url], {     
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
        })    
    });
}

export function $post(url, params){
    return new Promise((resolve, reject) => {
         axios.post(API[url],params
         ).then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}

