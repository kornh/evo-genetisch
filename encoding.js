var config = require('./config');
var xmin = config.spectrum.interval[0], 
    xmax = config.spectrum.interval[1], 
    eps = config.encoding.eps, 
    k = Math.ceil( Math.log2( (xmax - xmin) / eps ) );

var toZ = (x) => {
    var pow = Math.pow(2, k);
    var diff_1 = x - xmin;
    var diff_2 = xmax - xmin;
    return Math.floor( (diff_1 / diff_2) * pow );
}

var toX = (z) => {
    var val = xmin + (xmax - xmin) * z / (Math.pow(2,k) - 1);
    return Math.round(val * 1000) / 1000;
}

module.exports = { 
    toX: toX, 
    toZ:toZ
};
