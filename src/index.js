// import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import environment from '../environment';
import mongoose from './config/mongoose';
import error from './middlewares/error';
import routes from './app/routes/';
import path from 'path';
// require('./config/user.passport')(passport);
import mqtt from './utils/mqtt';
import sensorDataModel from './app/models/sensorData.model'
// getting application environment
const env = process.env.NODE_ENV;
// getting application config based on environment
const envConfig = environment[env];
console.log('envConfig', envConfig);

// setting port value
const PORT = envConfig.port || 3000;
/**
 * Express instance
 * @public
 */
const app = express();

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

});


if (!global.status_codes)
    global.status_codes = require('./utils/statusCode');

if (!global.custom_message)
    global.custom_message = require('./config/message');

if (!global.Response)
    global.Response = require('./utils/responce');

if (!global.config)
    global.config = require('./config/config');



// open mongoose connection
mongoose.connect(envConfig, env);

// request logging. dev: console | production: file
app.use(morgan(envConfig.logs));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

// app.use(bodyParser.multipart());
app.use(express.static(path.join(__dirname, '/public')));


// CORS configuration 
// app.use(cors({ 'origin': '*' }));

app.get('/check123', (req, res) => {
    // console.log("in request ",req)
    res.status(status_codes.OK).send(Response.sendResponse(status_codes.OK, "Server is good now !!!!!!", [], []));

})



// mount api routes
app.use('/', routes);
// if error is not an instanceOf APIError, convert it.
app.use(error.converter);
// app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJson));
// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);
//
// app.use(passport.initialize());

app.listen(PORT, () => {
    console.log("server listen on port:-", PORT)
});

//app.listen(PORT);
module.exports = app;