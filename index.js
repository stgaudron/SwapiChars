const db = require('./models/db');
const cors = require('cors');
const express = require('express');
const charController = require('./controllers/charController');
const bodyParser = require('body-parser')

var router = express.Router();
var app = express();
require('events').EventEmitter.prototype._maxListeners = 100;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/char', charController);


app.listen(4000, () => {
    console.log('Express server started at port : 4000');
});
