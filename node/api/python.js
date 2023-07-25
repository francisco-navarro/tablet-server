const spawn = require("child_process").spawn;
let DEBUG_PYTHON = true;

let process;

function start(req, res) {
    if (process) {
        process.kill('SIGKILL');
    }
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
    process.on('close', (code) => {
        console.log(`Proceso de Python finalizado con código de salida ${code}`);
        process = null;
    });
    res.send('started');
}

function stop(req, res) {
    process.kill('SIGKILL');
    res.send('stopped');
}

function status(req, res) {
    res.send({
        killed: process?.killed,
        pid: process?.pid
    });
}

function init(app) {
    app.get('/python/start', start);
    app.get('/python/stop', stop);
    app.get('/python/status', status);
    app.get('/python/debug', () =>{});
}

module.exports = {
    init
};
