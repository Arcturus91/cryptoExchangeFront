import {api} from  './api';
import {successStatus,internalServerError} from '../utils/format-response'

//login
export const createBankAccWs = (data)=> api.post("/user/my-profile/create-bank-account",data)
.then(successStatus)
.catch(internalServerError)

export const createBTCwalletWs = (data)=> api.post("/user/my-profile/add-btc-wallet",data)
.then(successStatus)
.catch(internalServerError)

export const createETHwalletWs = (data)=> api.post("/user/my-profile/add-eth-wallet",data)
.then(successStatus)
.catch(internalServerError)

