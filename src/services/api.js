import axios from 'axios';

//validate if app is running on producion or local

const isProduction = process.end.NODE_ENV === 'production';

//2 environment
                                                                        //"http://localhost:5005/api/auth/login"
const baseURL = isProduction ? 'https://alpacaexchange.herokuapp.com/api' : "http://localhost:5005/api";

export const api = axios.create({
    baseURL,
    withCredentials:true,//cookies
timeout:10000,
})