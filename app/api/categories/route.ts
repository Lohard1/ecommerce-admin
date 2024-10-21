'use server'
// ruta: app/api/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/categories';

export async function POST(req: NextRequest) {
    
    try {
        await mongooseConnect();
        const { categoryName } = await req.json();
        const categoryDoc = await Category.create({ name: categoryName });
        console.log(categoryName);
        console.log(categoryDoc);
        
        return NextResponse.json(categoryDoc, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al crear la categoria', error }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {

    try {
        await mongooseConnect();

        const categories = await Category.find();
        
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener las categorias', error }, { status: 500 });
    }
}

// export async function PUT(req: NextRequest) {

//     try {
//         await mongooseConnect();
//         console.log ('Connect success')
//         const { title, description, price, _id, images } = await req.json();
//         await Product.updateOne({_id}, {title, description, price, images})
//         console.log ('after update')
//         return NextResponse.json(true);
//     } catch (error) {
//         return NextResponse.json({ message: 'Error al editar los productos', error }, { status: 500 });
//     }
// }

// export async function DELETE(req: NextRequest) {

//     try {
//         await mongooseConnect();

//         const {searchParams} = new URL(req.url);
//         const id = searchParams.get('id')

//         let product;

//         if(id){
//             product = await Product.deleteOne({_id:id});
//         }
//         // const products = await Product.find();
//         return NextResponse.json(true);
//     } catch (error) {
//         return NextResponse.json({ message: 'Error al eliminar el producto', error }, { status: 500 });
//     }
// }