const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const webSocket = require('../ws/webSocket.js');

const vjoy = require('./vjoy.js');
const python = require('./api/python.js');


const path = require('path');


const app = express()
const port = 3000;

vjoy.init();

function init() {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  app.use(express.json());

  app.use('/', express.static('frontend-tablet/dist'));

  app.use(favicon(__dirname + '/../public/img/favicon.ico'));

  app.get('/api', (req, res) => {
    console.log('api get request');
    res.send("GET Request Called");
  })
  app.post('/push-button', (req, res) => {

    if (req.body.button) {
      vjoy.pushButton(req.body.button);
    }
    res.send({});
  })

  python.init(app);

  // Middleware para servir el cliente Angular
  app.use(express.static(path.join(__dirname, 'public')));


  app.listen(port, () => {
    console.log(`App start on port ${port}\nhttp://localhost:3000/`)
  })
}

module.exports = {
  init
};
