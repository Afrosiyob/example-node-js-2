const express = require( "express" )
const config = require( "config" )
const serveIndex = require( "serve-index" );
const morgan = require( "morgan" );
const { connectMongoDB } = require( "../services/connects" );
const { userRouter } = require( "../src/routes/user.routes" );
const { logger } = require( "../src/logger/logger" );
const winston = require( "winston" );


// Create App server
const app = express()

// Access json
app.use( express.json( { extended: true } ) );
app.use( express.urlencoded( { extended: false } ) );

// Static files
app.use(
    "/public",
    express.static( "public" ),
    serveIndex( "public", { icons: true } )
);

// Show Requests to console
if ( app.get( "env" ) === "development" ) {
    app.use( morgan( "tiny" ) );
    // Write log 
    logger.add(
        new winston.transports.Console( {
            format: winston.format.simple(),
        } )
    );
}

// Api Routes

app.use( "/api/v1/user", userRouter )

// Create PORT
const PORT = config.get( "PORT" ) || process.env.PORT || 5000

app.listen( PORT, connectMongoDB )