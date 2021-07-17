const { authLogin } = require( "../controllers/auth.controller" );
const { authLoginValidation } = require( "../validations/auth.validation" );
const { validationError, checkAuthToken } = require( "./middlewares" );

const authLoginMiddleware = [
    ...authLoginValidation,
    validationError,
    authLogin
]

module.exports = {
    authLoginMiddleware
}