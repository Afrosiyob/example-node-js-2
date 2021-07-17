const { Router } = require( "express" );
const { authLoginMiddleware } = require( "../middlewares/auth.middleware" );

const router = Router();


router.post( "/login", authLoginMiddleware )
// router.get( "/me" )


module.exports = {
    authRouter: router
}