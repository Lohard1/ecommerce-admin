'use server'
// ruta: app/api/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/categories';

export async function POST(req: NextRequest) {

    try {
        await mongooseConnect();
        const { categoryName, parentCategoryName } = await req.json();
        const categoryData: any = { name: categoryName };

        if (parentCategoryName) {
            categoryData.parent = parentCategoryName;
        }

        const categoryDoc = await Category.create(categoryData);

        return NextResponse.json(categoryDoc, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al crear la categoria', error }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {

    try {
        await mongooseConnect();

        const categories = await Category.find().populate('parent');

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener las categorias', error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {

    try {
        await mongooseConnect();
        console.log ('Connect success')
        const { categoryName, parentCategoryName, _id } = await req.json();
        await Category.updateOne({_id}, { name: categoryName, parent: parentCategoryName})
        console.log ('after update')
        return NextResponse.json(true);
    } catch (error) {
        return NextResponse.json({ message: 'Error al editar los productos', error }, { status: 500 });
    }
}



export async function DELETE(req: NextRequest) {
    try {
        await mongooseConnect();

        const { id } = await req.json();

        if (id) {
            await Category.deleteOne({ _id: id });
        }

        return NextResponse.json({ message: 'Categoría eliminada'})
    }
    catch (error) {
        return NextResponse.json({ message: 'Error al eliminar el producto', error }, { status: 500 });
    }
}