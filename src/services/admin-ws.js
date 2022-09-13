import {api} from  './api';
import {successStatus,internalServerError} from '../utils/format-response'

//login
export const getAllAssets = ()=> api.get("/admin/finances/getAssets")
.then(successStatus)
.catch(internalServerError)