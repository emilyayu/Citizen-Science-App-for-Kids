
// Generates a 6 digit acess code
function getAccessCode(){
    var min = 100000;
    var max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}