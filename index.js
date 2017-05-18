var population = require('./population'),
    config = require('./config');

var f = require('./function');

var run = () => {
    var P = population.create();
    P = population.fitness(P, f);

    for(var i = 0; i<config.search.generations; i++){
        P = population.recombination(P);
        P = population.mutation(P);
        P = population.fitness(P, f);
        P = population.selection(P);

        var C = population.get_best(P, f);
        console.log(i + ":[" + C.chromosome + "] -> " + C.value)

        if(C.value < config.search.min_value) break;
    }
}

run();