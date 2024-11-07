'use server'
// ruta: app/api/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/models/products';
import { mongooseConnect } from '@/lib/mongoose';

export async function POST(req: NextRequest) {
    
    try {
        await mongooseConnect();
        const { title, description, price, images, categoryId, productProperties } = await req.json();
        const productDoc = await Product.create({ title, description, price, images, category: categoryId, properties: productProperties });
        
        return NextResponse.json(productDoc, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al crear el producto', error }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {

    try {
        await mongooseConnect();

        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')

        let product;

        if(id){
            product = await Product.findById(id);
        } else {
            product = await Product.find();
        }

        // const products = await Product.find();
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener los productos', error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {

    try {
        await mongooseConnect();
        console.log ('Connect success')
        const { title, description, price, _id, images, categoryId, productProperties } = await req.json();
        console.log(productProperties)
        await Product.updateOne({_id}, {title, description, price, images, category: categoryId, properties: productProperties})
        return NextResponse.json(true);
    } catch (error) {
        return NextResponse.json({ message: 'Error al editar los productos', error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {

    try {
        await mongooseConnect();

        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')

        if(id){
            await Product.deleteOne({_id:id});
        }
        return NextResponse.json(true);
    } catch (error) {
        return NextResponse.json({ message: 'Error al eliminar el producto', error }, { status: 500 });
    }
}