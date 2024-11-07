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
    const [categoryId, setcategoryId] = useState(product?.category || '');
    const [productProperties, setProductProperties] = useState<ProductType['properties']>([]);

    const router = useRouter();
    const properties = [];

    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
            console.log('categoryId: ', categoryId)
        })
    }, [categoryId]);

    useEffect(() => {
        if (!product?.properties) {
            const initialProperties = product?.properties?.map(prop => ({
                name: prop.name,
                values: prop.values[0] // Obtiene el primer valor por defecto
            }));
            setProductProperties(initialProperties);
        }
        else {
            setProductProperties(product.properties);
        }
    }, [product]);

    if (categoryId) {
        const selCatInfo = (categories.find(item => item._id === categoryId))
        if (selCatInfo) {
            properties.push(
                ...(selCatInfo.properties || []),
                ...(selCatInfo.parent?.properties || [])
            );
        }
    }

    async function saveProduct(ev: React.FormEvent) {
        ev.preventDefault();
        const data = { title, description, price, images, categoryId, productProperties };
        if (product?._id) {
            try {
                const response = await axios.put('/api/product', { ...data, _id: product._id })
                console.log('Product edit success, data: ',data);

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

    function setProductProp(propName: string, value: string) {
        const updatedProperties = [...productProperties || []];

        const existingPropIndex = updatedProperties.findIndex(prop => prop.name === propName);

        if (existingPropIndex !== -1) {
            updatedProperties[existingPropIndex].values = value;
        } else {
            updatedProperties.push({ name: propName, values: value });
        }
        setProductProperties(updatedProperties);
        console.log(productProperties)
    }

    return (
        <form className="h-full" onSubmit={saveProduct}>
            <label>Product Name</label>
            <input type="text" placeholder="Product Name" value={title} onChange={ev => setTitle(ev.target.value)}>
            </input>
            <label>Category</label>
            <div>
                <select value={categoryId} onChange={ev => {setcategoryId(ev.target.value); setProductProperties([])}} >
                    <option value=''>Uncategorized</option>
                    {categories.length > 0 && categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>

                {properties.length > 0 && productProperties && properties.map((prop, index) => (
                    <div key={index} className="flex">
                        <div>{prop.name}</div>
                        <select value={productProperties.find(p => p.name === prop.name)?.values || ''} onChange={ev => setProductProp(prop.name, ev.target.value)} >
                            {prop.values.map((item,index) => (
                                <option key={index} value={item} >{item}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            <label> Photos </label>
            <div className="flex flex-row contain-content">
                {!!images?.length && images.map(link => (
                    <div key={link} className="flex h-24 w-24" >
                        <img src={link} />
                    </div>
                ))}
                {isUploading && (
                    <div className="h-24 w-24 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="cursor-pointer w-24 h-24 border flex items-center justify-center bg-gray-200 rounded-lg">
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
            <input className="mb-2" type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)}>
            </input>
            <button type="submit" className="btn-primary">
                Save
            </button>
            <button onClick={()=>router.push('/products')} type="button" className="btn-danger ">
                Cancel
            </button>
        </form>
    );
}

export default ProductForm;