'use client'
//ruta: app/products/page.tsx

import Layout from "@/components/layout"
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductType } from "../types/product";

const ProductsPage = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    useEffect(() => {
        console.log('antes de axios.get')
        axios.get('/api/product').then(response => {
            console.log(response.data);
            setProducts(response.data);
        });
    }, []);

    return (
        <Layout>
            <Link className="bg-blue-400 p-1 m-2 rounded-md" href="/products/new">
                Add new product
            </Link>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>
                            Product Name
                        </td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td><Link href={'/products/edit' + product._id}>Edit</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default ProductsPage;