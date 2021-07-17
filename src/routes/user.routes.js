const { Router } = require( "express" )
const { userCreateMiddleware } = require( "../middlewares/user.middleware" )

const router = Router()

router.post( "/create", userCreateMiddleware )
// router.get( "/", getUsers )
// router.get( "/:userId", getUser )
// router.put( "/:userId", updateUser )
// router.delete( "/:userId", deleteUser )

module.exports = {
    userRouter: router
}