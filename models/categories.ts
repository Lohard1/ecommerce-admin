//ruta models/categories.ts

import { model, Schema, models } from "mongoose"
import mongoose from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, require: true },
    parent: { type: mongoose.Types.ObjectId, ref: 'Category'},
    properties: [{name: String, values: [String]}],
});

export const Category = models.Category || model('Category', CategorySchema);