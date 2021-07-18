const { Schema, Types, model } = require( "mongoose" )

const schema = new Schema( {
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Types.ObjectId,
        ref: "User"
    }
} )


module.exports = {
    ProductModel: model( "Product", schema )
}