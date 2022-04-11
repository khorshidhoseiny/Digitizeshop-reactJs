import http from "./httpService";

export const LoginUsers=(data)=>{
    return http.post("/user/login",data)
}