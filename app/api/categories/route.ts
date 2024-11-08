'use server'
// ruta: app/api/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/categories';

export async function POST(req: NextRequest) {

    try {
        await mongooseConnect();
        const { categoryName, parentCategoryName, properties } = await req.json();
        console.log({ categoryName, parentCategoryName, properties });

        if (parentCategoryName === ''){
            const categoryDoc = await Category.create( {name: categoryName, properties});
            return NextResponse.json(categoryDoc, { status: 200 });
        } else {
            const categoryDoc = await Category.create( {name: categoryName , parent: parentCategoryName, properties});
            return NextResponse.json(categoryDoc, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ message: 'Error al crear la categoria', error }, { status: 500 });
    }
}

export async function GET() {
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
        const { categoryName, parentCategoryName, _id, properties } = await req.json();
        console.log(properties)

        if (parentCategoryName) {
            await Category.updateOne(
                { _id },
                { name: categoryName, parent: parentCategoryName, properties }
            );
        } else {
            // Si `parentCategoryName` no tiene un valor, eliminamos el campo `parent`
            await Category.updateOne(
                { _id },
                { name: categoryName, properties, $unset: { parent: '' } }
            );
        }

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