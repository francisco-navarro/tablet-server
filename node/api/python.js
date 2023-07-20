const spawn = require("child_process").spawn;
const DEBUG_PYTHON = false;

let process;

function start(req, res) {
    // start python simconnect server
    process = spawn('python', ["./python/src/api.py"]);

    if (DEBUG_PYTHON) {
        process.stdout.on('data', function (data) {
            console.log(data.toString());
        });
        process.stderr.on('data', function (data) {
            console.warn(data.toString());
        });
    }
    res.send('started');
}

function stop() {
    //TODO
}

function init(app) {
    app.get('python/start', start);
}

module.exports = {
    init
};
