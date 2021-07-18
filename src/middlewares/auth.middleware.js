const { authLogin, authMe } = require( "../controllers/auth.controller" );
const { authLoginValidation } = require( "../validations/auth.validation" );
const { validationError, checkAuthToken, setPermissions } = require( "./middlewares" );

const authLoginMiddleware = [
    ...authLoginValidation,
    validationError,
    authLogin
]

const authMeMiddleware = [
    checkAuthToken,
    setPermissions( "admin" ),
    authMe
]

module.exports = {
    authLoginMiddleware,
    authMeMiddleware
}