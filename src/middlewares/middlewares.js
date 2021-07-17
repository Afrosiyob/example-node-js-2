const { validationResult } = require( "express-validator" );
const { ApiError } = require( "../errors/apiError" );
const config = require( "config" );
const jwt = require( "jsonwebtoken" );


const validationError = async ( req, res, next ) => {
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        next( ApiError.BadRequestError( errors.array(), "badrequest error" ) )
    } else {
        await next();
    }
};


const checkAuthToken = async ( req, res, next ) => {
    if ( req.method === 'OPTIONS' ) {
        await next()
    } else {
        try {
            let token;
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith( "Bearer" )
            ) {
                token = req.headers.authorization.split( " " )[ 1 ]; // "Bearer TOKEN"
            }
            if ( !token ) {
                await res.status( 401 ).json( { message: "auth error try middleware" } );
            } else {
                let decoded = jwt.verify( token, config.get( "jwtSecret" ) );
                req.user = decoded;
                res.setHeader( "Last-Modified", new Date().toUTCString() );
                await next();
            }
        } catch ( error ) {
            return ApiError.UnauthorizedError( error, "auth error" )
        }
    }
}



module.exports = {
    validationError,
    checkAuthToken
}