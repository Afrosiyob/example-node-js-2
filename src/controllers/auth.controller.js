const bcrypt = require( "bcryptjs" );
const jwt = require( "jsonwebtoken" );
const _ = require( "lodash" );
const config = require( "config" );
const { UserModel } = require( "../models/user.model" );
const { ApiError } = require( "../errors/apiError" );


const authLogin = async ( req, res, next ) => {
    const { username, password } = req.body;
    const checkUser = await UserModel.findOne( { username } );
    if ( !checkUser ) {
        next( ApiError.NotFoundError( "this user not founded" ) )
    } else {
        const isMatchPassword = await bcrypt.compare( password, checkUser.password );
        if ( !isMatchPassword ) {
            next( ApiError.BadRequestError( "failed password", "please enter currect password" ) )
        } else {
            const token = jwt.sign( { userId: checkUser.id },
                config.get( "jwtSecret" ), { expiresIn: "1h" }
            );
            res.status( 200 ).json( {
                data: { token, user_info: _.pick( checkUser, [ "username", "role" ] ) },
                message: "user info ",
            } )
        }
    }
}

module.exports = {
    authLogin
}