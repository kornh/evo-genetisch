var config = require('./config');
var a = config.function.a, 
    b = config.function.b, 
    c = config.function.c, 
    d = config.function.d;

var sum = (xv, modify) => {
    var summe = 0;
    for(var i = 0; i < d; i++){
        var item = xv[i];
        summe += modify(item);
    }
    return summe;
}

var geom = (xv) => Math.sqrt( (1/d) * sum(xv, (item) => Math.pow(item,2) ) );

var f = (xv) => {
    var inner_1 =  -b * geom(xv);
    var inner_2 = (1/d) * sum(xv, (item) => Math.cos(c * item) );

    return -a * Math.exp( inner_1 ) - Math.exp( inner_2 ) + a + Math.exp(1);
}

module.exports = f;