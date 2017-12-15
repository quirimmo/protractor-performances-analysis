class PerformanceAnalysisPlugin {

    constructor() {
    }

    setup() {
        console.log('Setting up the protractor plugin!');
    }
}

module.exports.PerformancesAnalysisPlugin = new PerformanceAnalysisPlugin();