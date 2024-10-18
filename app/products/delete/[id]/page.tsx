'use client'

// ruta: app/products/delete/[...id]/page.tsx

import Layout from "@/components/layout";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductType } from "@/app/types/product";

const DeleteProductPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [productInfo, setProductInfo] = useState<ProductType | undefined>(undefined);

    useEffect(() => {

        if(!id){
            return;
        }
        axios.get(`/api/product?id=${id}`).then(response => {
            const productData: ProductType = response.data;
            setProductInfo(productData);
        });
    }, [id]);

    async function deleteProduct() {
        await axios.delete(`/api/product?id=${id}`);
        router.push('/products')
    }

    return (
        <Layout>
            <h1>Do you really want to delete "{productInfo?.title}"?</h1>
            <div className="flex flex-row justify-center mt-4">
            <button onClick={deleteProduct} className="rounded bg-red-600 p-1 px-4 mx-4 ring-1 ring-black text-white">YES</button>
            <button className="rounded bg-gray-600 p-1 px-4 mx-4 ring-1 ring-black text-white">NO</button>
            </div>
        </Layout>
    );
};

export default DeleteProductPage;