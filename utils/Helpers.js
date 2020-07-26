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

const Helpers = {
    GetDateCurrent: GetDateCurrent,
    GetFullDateCurrent: GetFullDateCurrent,
}

export default Helpers;