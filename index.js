class PerformanceAnalysisPlugin {

    constructor() {
        console.log('Exported!');
    }

    setup() {
        console.log('Setting up the protractor plugin!');
    }
}

module.exports = new PerformanceAnalysisPlugin();
module.exports.PerformanceAnalysisPlugin = PerformanceAnalysisPlugin;