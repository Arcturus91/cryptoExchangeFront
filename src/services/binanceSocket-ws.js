import {api} from  './api';
import {successStatus,internalServerError} from '../utils/format-response'

//binance socket
export const binanceSocketETH = ()=> api.get("/ETH")
.then(successStatus)
.catch(internalServerError)

export const binanceSocketBTC = ()=> api.get("/BTC")
.then(successStatus)
.catch(internalServerError)