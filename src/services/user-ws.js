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

export const buyCripto = (data)=> api.post("/user/my-profile/buy",data)
.then(successStatus)
.catch(internalServerError)

export const sellCripto = (data)=> api.post("/user/my-profile/sell",data)
.then(successStatus)
.catch(internalServerError)

export const registerReceipt = (data)=> api.post("/user/my-profile/uploadReceipt",data)
.then(successStatus)
.catch(internalServerError)

export const getOperations = ()=> api.get("/user/my-profile/getOperations")
.then(successStatus)
.catch(internalServerError)

export const getProfileWs = ()=> api.get("/user/my-profile")


