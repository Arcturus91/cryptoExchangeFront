import {api} from  './api';
import {successStatus,internalServerError} from '../utils/format-response'

//binance socket
export const binanceSocketETH = ()=> api.get("/cryptoprice/websocketETH")
.then(successStatus)
.catch(internalServerError)

export const binanceSocketBTC = ()=> api.get("/cryptoprice/websocketBTC")
.then(successStatus)
.catch(internalServerError)

export const btcSpot =() => api.get("/cryptoprice/spotPriceBTC")
.then(successStatus)
.catch(internalServerError)

export const ethSpot =() => api.get("/cryptoprice/spotPriceETH")
.then(successStatus)
.catch(internalServerError)

export const stopWebSocket =() => api.get("/cryptoprice/closeWebSocket")
.then(successStatus)
.catch(internalServerError)




