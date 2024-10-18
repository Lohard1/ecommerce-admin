import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '@/models/products';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const {method} = req;
    await mongooseConnect();
    //mongoose.Promise = clientPromise
        if (method === 'POST') {
            const {title,description,price} =req.body
            const productDoc = await Product.create({
                title,description,price,
            })
            res.status(200).json({ message: 'Conectado a MongoDB y solicitud POST recibida.' });
            res.json(productDoc);
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