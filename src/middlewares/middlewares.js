const { validationResult } = require( "express-validator" );

const validationError = async ( req, res, next ) => {
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        statusError( res, 400, {
            error: errors.array(),
            message: "please check inputs",
        } );
    } else {
        await next();
    }
};



module.exports = {
    validationError
}