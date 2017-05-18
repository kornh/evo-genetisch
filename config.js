var config = {
    spectrum:{
        interval:[-40,40],
        max: () => Math.max(Math.abs(config.spectrum.interval[0]),Math.abs(config.spectrum.interval[1]))
    },
    encoding:{
        eps: 0.001
    },
    population:{
        size: 45,
        top: 5
    },
    function:{
        a: 20,
        b: 0.2,
        c: 2 * Math.PI,
        d: 6
    },
    search:{
        generations: 100,
        min_value: 0.001
    }
}
module.exports = config;