'use server'
// ruta: app/api/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/models/products';
import { mongooseConnect } from '@/lib/mongoose';

export async function POST(req: NextRequest) {
    
    try {
        await mongooseConnect();
        
        const { title, description, price } = await req.json();
        const productDoc = await Product.create({ title, description, price });
        
        return NextResponse.json(productDoc, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al crear el producto', error }, { status: 500 });
    }
}

export async function GET() {
    try {
        await mongooseConnect();
        const products = await Product.find();
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener los productos', error }, { status: 500 });
    }
}