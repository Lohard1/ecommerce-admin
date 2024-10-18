'use client'
//ruta: app/products/page.tsx

import Layout from "@/components/layout"
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductType } from "../types/product";
import IconEdit from "@/components/svg/IconEdit";
import IconDelete from "@/components/svg/IconDelete";

const ProductsPage = () => {
    
    const [products, setProducts] = useState<ProductType[]>([]);
    useEffect(() => {

        axios.get('/api/product').then(response => {
            setProducts(response.data);
        });
    }, []);

    return (
        <Layout>
            <div className="flex justify-end">
            <Link className="bg-blue-800 p-1 m-2 rounded-md text-white text-md inline-flex justify-end" href="/products/new">
                Add new product
            </Link>
            </div>
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
                            <td>
                                <Link href={'/products/edit/' + product._id}><IconEdit className="h-4 w-4"/>  Edit</Link>
                                <Link href={'/products/delete/' + product._id} className="!bg-red-700"><IconDelete className="h-4 w-4"/> Delete</Link>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default ProductsPage;