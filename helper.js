
// Generates a 6 digit access code
function getAccessCode(){
    var min = 100000;
    var max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ValidateEmail(mail) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return (true)
    }
    return (false)
}

function IsString(str){
    if (typeof str === 'string' || str instanceof String)
    {
        return (true)
    }
    return (false)
}

module.exports = 
{
    getAccessCode,
    ValidateEmail,
    IsString
}