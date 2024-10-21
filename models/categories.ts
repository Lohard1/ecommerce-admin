//ruta models/categories.ts

import { model, Schema, models } from "mongoose"

const CategorySchema = new Schema({
    name: {type: String, require: true}
});

export const Category = models.Category || model('Category', CategorySchema);
