'use client'

import Layout from "@/components/layout"
import { useEffect, useState } from "react"
import axios from "axios"
import { CategoryType } from "../types/product"

const CategoriesPage = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [categoryName, setCategoryName] = useState<string>('');

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories(){
        axios.get('/api/categories').then(response =>{
            setCategories(response.data)
        })
    }

    async function saveCategory(ev: React.FormEvent){
        ev.preventDefault();
        const data = { categoryName }
        const response = await axios.post('/api/categories', data);
        console.log('Category created successfully', response.data);
        setCategoryName('');
        fetchCategories();
    }
    return (
        <Layout>
            <h1>Categories</h1>
            <label>New category name</label>
            <form onSubmit={saveCategory} className=''>
            <input type="text" placeholder="Category name" onChange={ev => setCategoryName(ev.target.value)} value={categoryName}>
            </input>
            <label>Parent Category</label>
            <div>
            <select>
                <option value={0}> No parent category</option>
                {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
                </select>
                </div>
            <button className="btn-primary" type="submit"> Save </button>
            </form>

            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>
                            Categories
                        </td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>











        </Layout>
    );
}

export default CategoriesPage;