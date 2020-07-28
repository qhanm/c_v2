const GetDateCurrent = () => {
    let date = new Date();
    
    let day = date.getDate();
    if(day < 10){
        day = '0' + day;
    }

    let month = date.getMonth();
    if(month < 10){
        month = '0' + month;
    }

    return date.getFullYear() + '-' + month + '-' + day;
}

const GetFullDateCurrent = () => {
    let date = new Date();
    
    let day = date.getDate();
    if(day < 10){
        day = '0' + day;
    }

    let month = date.getMonth();
    if(month < 10){
        month = '0' + month;
    }

    return date.getHours() + 'h:' + date.getMinutes() + "' - " + day + '-' + month + '-' + date.getFullYear();
}

const Guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    }) + '-' + (new Date()).getTime();
}

const Helpers = {
    GetDateCurrent: GetDateCurrent,
    GetFullDateCurrent: GetFullDateCurrent,
    Guid: Guid,
}

export default Helpers;