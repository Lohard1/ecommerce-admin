'use client'

import Layout from "@/components/layout"
import { useEffect, useState } from "react"
import axios from "axios"
import { CategoryType } from "../types/product"

const CategoriesPage = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [categoryName, setCategoryName] = useState<string>('');
    const [parentCategoryName, setParentCategoryName] = useState<string>('');
    const [editedCategory, setEditedCategory] = useState<CategoryType>();

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        axios.get('/api/categories').then(response => {
            setCategories(response.data)
        })
    }

    async function saveCategory(ev: React.FormEvent) {

        ev.preventDefault();
        const data = { categoryName, parentCategoryName }

        if (editedCategory){
            const response = await axios.put('/api/categories', {...data, _id: editedCategory._id});
            console.log('Category edited successfully', response.data);
            setCategoryName('');
            fetchCategories();

        } else {
            const response = await axios.post('/api/categories', data);
            console.log('Category created successfully', response.data);
            setCategoryName('');
            fetchCategories();
        }

    }

    async function deleteCategory(id: string | undefined) {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");

        if (confirmDelete) {
            try {
                const data = { id };
                console.log(data);
                const response = await axios.delete(`/api/categories`, { data });
                console.log("Category deleted successfully:", response.data);
                fetchCategories();
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        } else {
            console.log("Category deletion was cancelled.");
        }
    }

    function editCategory(category: any){
        setEditedCategory(category);
        setCategoryName(category.name);
        if (category.parent?._id){
            setParentCategoryName(category.parent._id);
        } else {
            setParentCategoryName('');
        }
    }


    return (
        <Layout>
            <h1>Categories</h1>
            <label> {editedCategory ? `Edit category ${editedCategory.name}` : 'Create new category'}</label>
            <form onSubmit={saveCategory} className=''>
                <input type="text" placeholder="Category name" onChange={ev => setCategoryName(ev.target.value)} value={categoryName}>
                </input>
                <label>Parent Category</label>
                <div>
                    <select value={parentCategoryName} onChange={ev => setParentCategoryName(ev.target.value)} className="m-2 mb-3 p-0.5 ml-0">
                        <option value=''> No parent category</option>
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
                        <td>Categories</td>
                        <td>Parent Category</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category.parent?.name}</td>
                            <td className="flex"> 
                                <button className="btn-primary" onClick={() => deleteCategory(category._id)}>Delete</button> 
                                <button className="btn-primary" onClick={() => editCategory(category)}>Edit</button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>











        </Layout>
    );
}

export default CategoriesPage;