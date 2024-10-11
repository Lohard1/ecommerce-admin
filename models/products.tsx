import { model, Schema } from "mongoose"

const ProductSchema = new Schema({
    title: {type: String, require: true},
    description: String,
    price: {type: Number, required: true}
});

const Product = model('product', ProductSchema)