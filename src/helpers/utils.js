export function getFormBody(params){
    let formBody = [];
    for(let property in params){
        let encodedkey = encodeURIComponent(property); //user name=>user%20
        let encodedValue = encodeURIComponent(params[property]); //aash123=>aash%20123
        formBody.push(encodedkey+'='+encodedValue)
    }

    return formBody.join('&');
}

export function getAuthTokenFromLocalStorage (){
    return localStorage.getItem('token');
}