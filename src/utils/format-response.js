export function internalServerError(err){
if(err.response && err.response.data && err.response.data.errorMessage){
    return {
        status:false,
        errorMessage:err.response.data.errorMessage
    }
}
return {
    status:false,
    errorMessage:"Internal server error. Please check your server"
}
}

export function successStatus(res){
    return{
        status:true,
        data:res.data
    }
}