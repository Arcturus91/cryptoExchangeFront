import {api} from  './api';

//login
export const loginWs = (data)=> api.post("/auth/login",data)
//signup
export const signupWs = (data) => api.post("/auth/signup",data)
//logout
export const logoutWs = () => api.get("/auth/logout")
