import http from "./httpService";

export const signUpUsers=(data)=>{
    return http.post("/user/register",data)
}