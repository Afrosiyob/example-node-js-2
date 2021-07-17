const { UserModel } = require( "../models/user.model" );
const bcrypt = require( "bcryptjs" )
const _ = require( "lodash" );
const { logger } = require( "../logger/logger" );

const createUser = async ( req, res ) => {
    try {
        const { username, password } = req.body
        const checkUser = await UserModel.findOne( { username } )
        if ( checkUser ) {
            logger.error( "same username" );
            res.status( 400 ).json( {
                message: "please enter other username"
            } )
        } else {
            const hashedPassword = await bcrypt.hash( password, 12 )
            const newUser = new UserModel( {
                username,
                password: hashedPassword
            } )
            await newUser.save()
            res.status( 200 ).json( {
                data: _.pick( newUser, [ "username" ] ),
                message: "new user created"
            } )
        }
    } catch ( error ) {
        logger.error( `server error : ${ error }` );
        console.log( error );
        res.status( 500 ).json( { message: "server error" } )

    }
}

module.exports = {
    createUser
}