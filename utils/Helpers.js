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

const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};

const Helpers = {
    GetDateCurrent: GetDateCurrent,
    GetFullDateCurrent: GetFullDateCurrent,
    Guid: Guid,
    formatMoney: formatMoney
}

export default Helpers;