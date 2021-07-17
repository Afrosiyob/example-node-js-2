const { UserModel } = require( "../models/user.model" );
const bcrypt = require( "bcryptjs" )
const _ = require( "lodash" );
const { ApiError } = require( "../errors/apiError" );

const createUser = async ( req, res, next ) => {
    const { username, password } = req.body
    const checkUser = await UserModel.findOne( { username } )
    if ( checkUser ) {
        next( ApiError.BadRequestError( `failed ${ username }`, "please enter other username" ) )
    } else {
        const hashedPassword = await bcrypt.hash( password, 12 )
        const newUser = new UserModel( {
            username,
            password: hashedPassword
        } )
        await newUser.save()
        res.status( 201 ).json( {
            data: _.pick( newUser, [ "username" ] ),
            message: "new user created"
        } )
    }
}

module.exports = {
    createUser
}