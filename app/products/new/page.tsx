'use client'

import Layout from "@/components/layout"
import axios from "axios";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const NewProductPage = () => {
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[price, setPrice] = useState('');
    const router = useRouter()
    async function createProduct(ev: React.FormEvent) {
        ev.preventDefault();
        const data = { title, description, price };
        try {
            const response = await axios.post('/api/product', data);
            console.log('Product created successfully', response.data);
            router.push('/products')
        } catch (error) {
            console.error('Error creating product:', error);
        }
    }
  
    return (
        <Layout>
            <form onSubmit={createProduct}>
            <h1>New Product</h1>
            <label>Product Name</label>
            <input type="text" placeholder="Product Name" value={title} onChange={ev => setTitle(ev.target.value)}>
            </input>
            <label>Description</label>
            <textarea placeholder="Description" value={description} onChange={ev => setDescription(ev.target.value)}>
            </textarea>
            <label>Price</label>
            <input type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)}>
            </input>
            <button type="submit" className="btn-primary">
                Save
            </button>
            </form>
        </Layout>
    );
}

export default NewProductPage;

//ruta: app/products/new/page.tsx