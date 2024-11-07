'use client'
//ruta: app/products/page.tsx

import Layout from "@/components/layout"
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductType } from "../types/product";
import IconEdit from "@/components/svg/IconEdit";
import IconDelete from "@/components/svg/IconDelete";
import { CategoryType } from "../types/product";

const ProductsPage = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }, []);
    
    useEffect(() => {

        axios.get('/api/product').then(response => {
            setProducts(response.data);
        });
    }, []);

    return (
        <Layout>
            
            <h1>Productos</h1>
            <div className="flex justify-start">
            <Link className="bg-blue-500 p-1 my-2 rounded-md text-white text-md inline-flex" href="/products/new">
                Add new product
            </Link>
            </div>
            <table className="basic">
                <thead>
                    <tr>
                        <td>
                            Product Name
                        </td>
                        <td>
                            Category
                        </td>
                        <td>
                            Actions
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td>{ categories.find(item => item._id === product.category)?.name || 'Uncategorized'}</td>
                            <td>
                                <Link href={'/products/edit/' + product._id} className="btn-primary inline-flex items-center "><IconEdit className="h-4 w-4"/>  Edit</Link>
                                <Link href={'/products/delete/' + product._id} className="btn-danger inline-flex items-center"><IconDelete className="h-4 w-4"/> Delete</Link>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default ProductsPage;