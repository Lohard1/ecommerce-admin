import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import mongoose from 'mongoose';
import client from '@/lib/db';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const {method} = req;
    

    const mongoUri = 'mongodb+srv://ecommerce:Ej7vUaF9j3WffGMK@cluster0.q003g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

    // Verifica que el URI no sea undefined

    try {
        // Conéctate a MongoDB
        await mongoose.connect(mongoUri);

        if (method === 'POST') {
            // Aquí iría tu lógica para manejar la solicitud POST
            res.status(200).json({ message: 'Conectado a MongoDB y solicitud POST recibida.' });
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Método ${method} no permitido`);
        }
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);;
    } finally {
        // Cierra la conexión al finalizar (opcional)
        await mongoose.connection.close();
    }
    
}


// import Layout from "@/components/layout"
// import Link from "next/link";


// const ProductsDetailPage = () => {
//     return (
//         <Layout>
//             Product detail page
//         </Layout>
//     );
// }

// export default ProductsDetailPage;