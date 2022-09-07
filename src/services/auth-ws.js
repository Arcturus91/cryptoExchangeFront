import {api} from  './api';
import {successStatus,internalServerError} from '../utils/format-response'

//login
export const loginWs = (data)=> api.post("/auth/login",data)
.then(successStatus)
.catch(internalServerError)
//signup
export const signupWs = (data) => api.post("/auth/signup",data)
.then(successStatus)
.catch(internalServerError)
//logout
export const logoutWs = () => api.get("/auth/logout")
.then(successStatus)
.catch(internalServerError)
