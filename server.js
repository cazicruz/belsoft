require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./Config/corsOption');
const { logger } = require('./Middleware/logEvents');
const errorHandler = require('./Middleware/errorHandler');
//const verifyJWT = require('./Middleware/verifyJWT');
const cookieParser = require('cookie-parser');
//const credentials = require('./Middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./Config/dbConfig');
const PORT = process.env.PORT || 3500;
const multer = require('multer');
const {multerConfig} = require('./Config/multerConfig');
const ApiError = require('./Utils/apiError');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc')
const cron = require('node-cron');
const pingServer = require('./Utils/pingServer')
const cronBalanceJob = require('./cronJob/cronJob')
const rateLimit = require('express-rate-limit');
//multer config
const upload = multer({storage: multerConfig});

const options={
    definition:{
        openapi:'3.0.0',
        info:{
            title:`${process.env.NAME_OF_APP}`,
            version:'1.2.0',
            description:`${process.env.DESCRIPTION_OF_APP}`,
        },
        servers:[
            {
                url:`${process.env.SERVER_ROUTE}/api`
            }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-access-token',
                },
            },
        },
    },
    apis:['./Routes/*.js']
}
const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));
// Connect to MongoDB
connectDB();

// Trust proxy for accurate IP detection
app.set('trust proxy', [
    'loopback',
    // Render proxy IPs (verify these with Render's documentation)
    "216.24.57.252",
    '159.203.158.0/23',
    '138.197.224.0/20'
  ]);
  
  // Configure rate limiter
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // Custom key generator that considers forwarded IPs securely
    keyGenerator: (req) => {
      // If you're behind a trusted proxy, use the last forwarded IP
      const realIP = req.ip; // Express will handle this based on trust proxy setting
      return realIP;
    },
    handler: (req, res) => {
      res.status(429).json({
        error: 'Too many requests, please try again later.'
      });
    }
  });

app.use(limiter);

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
//app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors('*'));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/public', express.static(path.join(__dirname, '/public')));

// routes
app.get('/',(req,res)=>{
    res.send('hello')
});
app.use('/api/auth', require('./Routes/auth.route'));
app.use('/api/users', require('./Routes/users.route'));
app.use('/api/books', require('./Routes/books.route'));



app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(async(err, req, res, next) =>{
  errorHandler(err, res)});


process.on("uncaughtException", (error) => {
    errorHandler(error);
    if (!errorHandler.isTrustedError(error)) {
      process.exit(1);
    }
  });

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    cron.schedule('*/30 * * * *', pingServer);
});