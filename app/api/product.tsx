// import { NextApiRequest, NextApiResponse } from 'next';
// import { Product } from '@/models/products';
// import { mongooseConnect } from '@/lib/mongoose';

// export default async function handle(req: NextApiRequest, res: NextApiResponse) {
//     const { method } = req;
//     console.log('antes de post')
//     await mongooseConnect();
//     //mongoose.Promise = clientPromise

//     if (method === 'GET') {
        
//         res.json(await Product.find());
//     }

//     if (method === 'POST') {
//         console.log('post recibido')
//         const { title, description, price } = req.body
//         const productDoc = await Product.create({
//             title, description, price,
//         })
//         res.status(200).json({ message: 'Conectado a MongoDB y solicitud POST recibida.' });
//         res.json(productDoc);
//     }
// }

//ruta: app/api/product.tsx