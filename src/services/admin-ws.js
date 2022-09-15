import {api} from  './api';
import {successStatus,internalServerError} from '../utils/format-response'

//login
export const getAllAssets = ()=> api.get("/admin/finances/getAssets")
.then(successStatus)
.catch(internalServerError)

export const addCash = (data)=> api.post("/admin/finances/addCash",data)
.then(successStatus)
.catch(internalServerError)

export const addInventory = (data)=> api.post("/admin/inventory/buy",data)
.then(successStatus)
.catch(internalServerError)