//Module imports
const dotenv = require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');

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
app.use(express.urlencoded({extended:true}));
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
        "error":false,
        "message": "...Welcome",
        "data": null
    });
});

//middleware that catches and returns an error for all undefined routes
app.use('*', (req, res, next) => {
    return res.status(404).json({
        "error":true,
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

app.listen(port, () => {
    console.log("Just touch down on " + port);
});


