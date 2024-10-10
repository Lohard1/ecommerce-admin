import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const {method} = req;
    if(method ==='POST'){
        
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