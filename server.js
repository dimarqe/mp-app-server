//Module imports
const dotenv = require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');

const jwt = require('jsonwebtoken');

const http = require('http');
const webSocket = require('ws');

//Route imports
const studentRoute = require('./routes/studentRoute');
const driverRoute = require('./routes/driverRoute');
const ownerRoute = require('./routes/ownerRoute');
const vehicleRoute = require('./routes/vehicleRoute');
const appointmentRoute = require('./routes/appointmentRoute');
const routeRoute = require('./routes/routeRoute');
const contractRoute = require('./routes/contractRoute');
const paymentRoute = require('./routes/paymentRoute');

//App and port initialization
const app = express();
const port = process.env.PORT || 3000;

//express request body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//enable cors for all routes
app.use(cors());


app.use(studentRoute);
app.use(driverRoute);
app.use(ownerRoute);
app.use(vehicleRoute);
app.use(appointmentRoute);
app.use(routeRoute);
app.use(contractRoute);
app.use(paymentRoute);


//Base url connection route
app.get('/', (req, res, next) => {
    return res.status(200).json({
        "error": false,
        "message": "...Welcome",
        "data": null
    });
});

//middleware that catches and returns an error for all undefined routes
app.use('*', (req, res, next) => {
    return res.status(404).json({
        "error": true,
        "message": "Undefined route",
        "data": null
    });
});

//error handling middleware
app.use((err, req, res, next) => {
    console.log(err);

    if (!res.headersSent) {
        return res.status(err.status || 500).json({
            "error": true,
            "message": err.message,
            "data": null
        });
    }
});

//websocket setup
const server = http.createServer(app);

const webSocketServer = new webSocket.Server({ server: server, autoAcceptConnections: false });


webSocketServer.on('connection', (ws, req) => {
    var token = req.url.split('token=').pop();
    var user;

    try {
        user = jwt.verify(token, process.env.ACCESS_TOKEN);
    }
    catch (err) {
        console.log('closed connection');
        ws.close();
    }

    ws.on('message', function incoming(message) {
        webSocketServer.clients.forEach(function each(client) {
            if (client.readyState === webSocket.OPEN) {
                console.log("id:" + user.id + ",location:" + message);
                client.send("id:" + user.id + ",location:" + message);
            }
        });
    });

    ws.send('Connected');
});

//start our server
server.listen(port, () => {
    console.log('Server started on port ' + port);
});

// app.listen(port, () => {
//     console.log("Just touch down on " + port);
// });


