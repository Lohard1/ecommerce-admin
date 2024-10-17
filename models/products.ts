//ruta models/products.ts

import { model, Schema, models } from "mongoose"

const ProductSchema = new Schema({
    title: {type: String, require: true},
    description: String,
    price: {type: Number, required: true}
});

export const Product = models.Product || model('Product', ProductSchema);
