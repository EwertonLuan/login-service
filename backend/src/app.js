import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import routes from './api';
import config from './config'

// import expressJWT from 'express-jwt'


const app = express();

// app.use(expressJWT({ secret: config.JWT_KEY }).unless({ path: ['/api/users/']})) 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
//   });

//auth route
// app.use('/auth', auth)
//link to connect with mongodb
mongoose.connect(config.MONGOOSE_KEY, { useNewUrlParser: true },(err) => {
    if(!err){
        console.log('Connection established to MongoDB.');
        
        
    } else {
        console.log('Not possible to established the connection to MongoDB.')
    }

});
routes(app);


app.listen(4000, () => console.log('Express server started...'));
