var util = require('./util'),
    encoding = require('./encoding'),
    grey = require('./grey'),
    config = require('./config');

var create = () => {
    var top = config.population.top;
    var dimension = config.function.d;
    var spectrum = config.spectrum.max();
    
    var P = [];
    for(var i = 0; i<top; i++){
        var val = util.rndArray(dimension, spectrum);
        var c = {chromosome: val};
        P.push(c);
    }
    return P;
}

var calcFit = (P, fits) => {
    var len = Object.keys(P).length;
    var F = [];
    for(var i = 0; i<len; i++){
        F[i] = fits(P[i]);
    }
    return F;
}

var fitness = (P, f) => {
    var fit_1 = (c) => f(c.chromosome);
    var F = calcFit(P, fit_1);
    var max = Math.max(...F);
    var fit_2 = (c) => max - fit_1(c);
    var Fs = calcFit(P, fit_2);

    var len = util.sizeOf(P);
    for(var i = 0; i<len; i++){
        P[i].value = F[i];
        P[i].fitness = Fs[i];
    }
    return P;
}

var recombination = (P) => {
    var len_1 = util.sizeOf(P);
    var newP = [];
    for(var i = 0; i<len_1; i++){
        var val_1 = P[i].chromosome;
        for(var j = 0; j<len_1; j++){
            if(i==j)continue;
            var val_2 = P[j].chromosome;
            var new_1 = [], new_2 = [];
            var len_2 = util.sizeOf(val_2);

            for(var k = 0; k<len_2; k++){
                var rnd = Math.random();
                if(rnd > 0.5){
                    new_1[k] = val_1[k];
                    new_2[k] = val_2[k];
                }else{
                    new_1[k] = val_2[k];
                    new_2[k] = val_1[k];
                }
            }
            newP.push({chromosome:new_1});
            newP.push({chromosome:new_2});
        }
        newP.push({chromosome:val_1});
    }
    return newP;
}

var selection = (P) => {
    var top = config.population.top;
    P.sort((a,b) => {
        return b.fitness - a.fitness;
    });
    return P.splice(0,top);
}

var mutation = (P) => {
    var len_1 = util.sizeOf(P);
    for(var i = 0; i<len_1; i++){
        var chrom = P[i].chromosome;

        var index_1 = Math.floor(Math.random() * util.sizeOf(chrom));
        var val = chrom[index_1];
        val = encoding.toZ(val);
        val = util.toBinary(val);
        val = util.toCharArray(val);
        val = grey.toG(val);

        var index_2 = Math.floor(Math.random() * util.sizeOf(val));
        val[index_2] = val[index_2]?0:1;
        
        val = grey.toB(val);
        val = val.join('');
        val = util.toDecimal(val);
        val = encoding.toX(val);
        
        chrom[index_1] = val;
        P[i].chromosome = chrom;
    }
    return P;
}

var get_best = (P, f) => {
    var val = util.copy(P);
    val = fitness(val, f);
    val = val.splice(0,1)[0];
    return val;
}

module.exports = {
    create:create,
    fitness: fitness,
    recombination: recombination,
    selection:selection,
    mutation: mutation,
    get_best: get_best
}