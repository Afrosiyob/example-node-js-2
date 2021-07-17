const { createUser } = require( "../controllers/user.controller" );
const { userCreateValidation } = require( "../validations/user.validation" );
const { validationError } = require( "./middlewares" );

const userCreateMiddleware = [
    ...userCreateValidation,
    validationError,
    createUser
]

module.exports = {
    userCreateMiddleware
}