'use client'

// ruta: app/products/edit/[...id]/page.tsx

import Layout from "@/components/layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductType } from "@/app/types/product";

const EditProductPage = () => {
    const [productInfo, setProductInfo] = useState<ProductType | undefined>(undefined);

    const params = useParams();
    const id = params.id;

    useEffect(() => {
        axios.get(`/api/product?id=${id}`).then(response => {
            const productData: ProductType = response.data;
            setProductInfo(productData);
        });
    }, [id]);

    return (
        <Layout>
            <h1>Edit Product</h1>
            {productInfo ? (<ProductForm product={productInfo} />) : (<p>Loading...</p>)}
        </Layout>
    );
};

export default EditProductPage;