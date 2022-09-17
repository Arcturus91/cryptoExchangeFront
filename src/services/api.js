import axios from 'axios';

//validate if app is running on producion or local

const isProduction = process.env.NODE_ENV === 'production';

//2 environment
                                                                        //"http://localhost:5005/api/auth/login"
const baseURL = isProduction ? 'https://alpacaexchange.herokuapp.com/api' : "http://localhost:5005/api";

export const api = axios.create({
    baseURL,
    withCredentials:true,//cookies
timeout:10000,
})

export const uploadURL = `${baseURL}/user/my-profile/singleUpload`

///
//http://localhost:5005/api/user/my-profile/singleUpload