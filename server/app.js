const express = require( "express" )
const config = require( "config" )
const serveIndex = require( "serve-index" );
const morgan = require( "morgan" );
const { connectMongoDB } = require( "../services/connects" );

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
}

// Create PORT
const PORT = config.get( "PORT" ) || process.env.PORT || 5000

app.listen( PORT, connectMongoDB )