import {api} from  './api';
import {successStatus,internalServerError} from '../utils/format-response'

//binance socket
export const binanceSocket = ()=> api.get("/")
.then(successStatus)
.catch(internalServerError)