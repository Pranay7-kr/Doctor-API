import express from 'express';
import swaggger from 'swagger-ui-express';
import { connectToMongoDB } from './src/config/mongodb.js';
import bodyParser from 'body-parser';
import apiDocs from './swagger.json' assert {type: 'json'};
import doctorRouter from './src/doctors/doctor.routes.js';
import ApplicationError from './src/errorHandler/applicationError.js';
import { logger } from './src/midleware.js/logger.midleware.js';


const server = express();

server.use('/api-docs', swaggger.serve, swaggger.setup(apiDocs));

server.use(bodyParser.json());

server.use('/api/doctors', doctorRouter);

server.get('/', (req,res)=>{
    res.send("Welcome to the server");
});

//Error Handler
server.use((err,req,res,next)=>{
    if(err instanceof ApplicationError){
       return res.status(err.code).send(err.message);
    }

    //Server Error
   logger.log({
    level:'error',
    message: `TimeStamp: ${new Date().toString()} ${req.method}: ${req.url}  error message: ${err.message}`
   });
    res.status(500).send('Something went wrong , please try again later');
})


server.listen(8000, ()=>{
    console.log(" server is listening");
    connectToMongoDB();
})