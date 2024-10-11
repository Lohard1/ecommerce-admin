"use client"

import Layout from "@/components/layout"
import axios from "axios";
import { useState } from "react";

const NewProductPage = () => {
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[price, setPrice] = useState('');
    async function createProduct(ev:React.FormEvent){
        console.log('Create product')
        ev.preventDefault();
        const data = {title, description,price}
        axios.post('/products/product-detail',data)
        console.log('Create product', data)
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