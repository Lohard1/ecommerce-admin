'use client'

import Layout from "@/components/layout"
import ProductForm from "@/components/ProductForm";

const NewProductPage = () => {
    return (
        <Layout>
            <h1>New Product</h1>
            <ProductForm ></ProductForm>
        </Layout>
    );
}

export default NewProductPage;

//ruta: app/products/new/page.tsx