//ruta: component/ProductForm.tsx

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductType } from "@/app/types/product";
import IconUpload from "./svg/IconUpload";
import Spinner from "./loader";
import { CategoryType } from "@/app/types/product";

const ProductForm = ({ product }: { product?: ProductType }) => {
    const [title, setTitle] = useState(product?.title || '');
    const [description, setDescription] = useState(product?.description || '');
    const [price, setPrice] = useState(product?.price || '');
    const [images, setImages] = useState(product?.images || []);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [category, setCategory] = useState(product?.category || '');
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
            console.log('category: ', category)
        })
    }, [category]);


    async function saveProduct(ev: React.FormEvent) {
        ev.preventDefault();
        const data = { title, description, price, images, category };
        if (product?._id) {
            try {
                const response = await axios.put('/api/product', { ...data, _id: product._id })
                console.log('Product edit success');

            } catch (error) {
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

    function uploadImage(ev: React.FormEvent<HTMLInputElement>) {
        setIsUploading(true);
        console.log(isUploading);
        const target = ev.target as HTMLInputElement;
        const files = target.files;
        if (files && files.length > 0) {
            const filesArray = Array.from(files);
            const data = new FormData(); //TODO Solo subir a gcloud si se presiona 'save'
            filesArray.forEach(file => { data.append(`files`, file) });
            axios.post('/api/upload', data).then(response => {
                console.log('Respuesta del servidor: ', response.data);
                const imagesUrl: string[] = response.data.urls;
                setImages(oldImages => { return [...oldImages, ...imagesUrl] })
                setIsUploading(false);
            }).catch(error => {
                console.error('Error al subir la imagen: ', error);
            })
        };
    };

    return (
        <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <input type="text" placeholder="Product Name" value={title} onChange={ev => setTitle(ev.target.value)}>
            </input>
            <label>Category</label>
            <div>
                <select value={category} onChange={ev => setCategory(ev.target.value)} >
                    <option value=''>Uncategorized</option>
                    {categories.length > 0 && categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>


            <label> Photos </label>
            <div className="flex flex-row">
                {!!images?.length && images.map(link => (
                    <div key={link} className="h-24 w-24" >
                        <img src={link} />
                    </div>
                ))}
                {isUploading && (
                    <div className="h-24 w-24 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="cursor-pointer w-24 h-24 border flex items-center justify-center bg-gray-100 rounded-lg">
                    <IconUpload />
                    <div>
                        Upload
                    </div>
                    <input type="file" multiple className="hidden" onChange={uploadImage} />
                </label>
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