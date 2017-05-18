var rndArray = (size, maxVal) => {
    var array = [];
    for(var i = 0; i < size; i++){
        var val = Math.random() * (maxVal*2) - maxVal;
        val = Math.round(val * 1000) / 1000;
        array.push(val);
    }
    return array;
}
var copy = (xv) => {
    var val = JSON.parse(JSON.stringify(xv))
    return val;
}
var makeIterator = (max) => {
    var nextIndex = 0;
    return {
       next: () => {
           var val = nextIndex < max;
           nextIndex++;
           return val;
       },
       getIt: () => {
           return nextIndex;
       }
    };
}
var toBinary = (dec) => {
    return (dec >>> 0).toString(2);
}
var toDecimal = (bin) => {
    return parseInt(bin, 2);
}
var toCharArray = (string) => {
    return string.split('');
}
var sizeOf = (array) => {
    return Object.keys(array).length;
}

module.exports = { 
    rndArray: rndArray, 
    copy:copy, 
    makeIterator: makeIterator, 
    toBinary:toBinary,
    toDecimal:toDecimal,
    toCharArray: toCharArray,
    sizeOf:sizeOf
}