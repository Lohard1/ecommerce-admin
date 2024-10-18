//ruta: component/ProductForm.tsx

import Layout from "@/components/layout"
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductType } from "@/app/types/product";
import IconUpload from "./svg/IconUpload";

const ProductForm = ( {product}: {product?: ProductType} ) => {
    const[title, setTitle] = useState( product?.title || '');
    const[description, setDescription] = useState(product?.description || '');
    const[price, setPrice] = useState(product?.price || '');
    const router = useRouter()
    console.log(product?._id)
    
    async function saveProduct(ev: React.FormEvent) {
        ev.preventDefault();
        const data = { title, description, price };
        if (product?._id) {
            try {
            await axios.put('/api/product', {...data, _id: product._id})
            console.log('Product edit success');
            
        } catch (error){
            console.error('Error editing product:', error);
        }
        } else {
            try {
                const response = await axios.post('/api/product', data);
                console.log('Product created successfully', response.data);
                
            } catch (error) {
                console.error('Error creating product:', error);
            }
        }
        router.push('/products')
    }

    function uploadImage(ev: React.FormEvent<HTMLInputElement>){
        const target = ev.target as HTMLInputElement;
        const files = target.files;
        if (files && files.length>0){
            const filesArray = Array.from(files);
            const data = new FormData();
            filesArray.forEach(file => {data.append('file',file)});
            console.log(data);
        };
        console.log(ev);

    }
  
    return (
            <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <input type="text" placeholder="Product Name" value={title} onChange={ev => setTitle(ev.target.value)}>
            </input>
            <label> Photos </label>
            <div>
                <label className="cursor-pointer w-24 h-24 border flex items-center justify-center bg-gray-100 rounded-lg"><IconUpload/> 
                <div>Upload</div>
                <input type="file" className="hidden" onChange={uploadImage}></input>
                </label>
                {!product?.images?.length && (
                    <div>No photos in this product</div>
                )}
            </div>
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
    );
}

export default ProductForm;