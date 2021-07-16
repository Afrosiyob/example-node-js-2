const { Router } = require( "express" )

const router = Router()

router.post( "/create", createUser )
router.get( "/", getUsers )
router.get( "/:userId", getUser )
router.put( "/:userId", updateUser )
router.delete( "/:userId", deleteUser )

module.exports = {
    userRouter: router
}