const { Schema, Types, model } = require( "mongoose" )

const schema = new Schema( {
    username: {
        type: String,
        required: true,
        minimum: 3,
        maximum: 250
    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: true,
        minimum: 6,
        maximum: 50
    },
    product: {
        type: Types.ObjectId,
        ref: "Product"
    }
} )

module.exports = {
    UserModel: model( "User", schema )
}