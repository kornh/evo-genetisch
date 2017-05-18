var util = require('./util');

var toG = (array) => {
    var len = util.sizeOf(array);
    var res = [];
    res.push(array[0] ^ 0);

    for(var i = 1; i<len; i++){
        res[i] = array[i-1] ^ array[i];
    }

    return res;
}

var toB = (array) => {
    var len = util.sizeOf(array);
    var res = [];
    
    for(var i = 0; i<len; i++){
        for(var j = 0; j<=i; j++){
            res[i] = res[i] ^ array[j];
        }
    }

    return res;
}

module.exports = {
    toB:toB, 
    toG:toG
}