const { Router } = require( "express" );
const { authLoginMiddleware, authMeMiddleware } = require( "../middlewares/auth.middleware" );

const router = Router();


router.post( "/login", authLoginMiddleware )
router.get( "/me", authMeMiddleware )


module.exports = {
    authRouter: router
}