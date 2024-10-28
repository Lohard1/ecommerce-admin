'use client'

import Layout from "@/components/layout"
import { useEffect, useState } from "react"
import axios from "axios"
import { CategoryType } from "../types/product"

const CategoriesPage = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [categoryName, setCategoryName] = useState<string>('');
    const [parentCategoryName, setParentCategoryName] = useState<string>('');
    const [editedCategory, setEditedCategory] = useState<CategoryType | null>(null);
    const [properties, setProperties] = useState<CategoryType['properties'] | null>([]) ;

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
        const data = { categoryName, parentCategoryName, properties }
        console.log('data: ',data)

        if (editedCategory){
            const response = await axios.put('/api/categories', {...data, _id: editedCategory._id});
            console.log('Category edited successfully', response.data);
            setCategoryName('');
            setProperties(null);
            setEditedCategory(null);
            fetchCategories();

        } else {
            const response = await axios.post('/api/categories', data);
            console.log('Category created successfully', response.data);
            setCategoryName('');
            setProperties(null);
            setEditedCategory(null);
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
        console.log(category);
        setEditedCategory(category);
        setCategoryName(category.name);
        if (category.parent?._id){
            setParentCategoryName(category.parent._id);
        } else {
            setParentCategoryName('');
        }
        if (category.properties){
            setProperties(category.properties);
        } 
    }

    function addProperty() {
        setProperties(prev => [...(prev ?? []), {name: '', value:''}])
    }

    function handlePropertyNameChange(index:any, property:any, newName:any){
        setProperties(prev => {
            const properties = [...(prev ?? [])];
            properties[index].name = newName;
            return properties;
        });
        console.log({index,property,newName})
    }

    function handlePropertyValueChange(index:any, property:any, newValue:any){
        setProperties(prev => {
            const properties = [...(prev ?? [])];
            properties[index].value = newValue;
            return properties;
        });
        console.log({index,property,newValue})
    }

    function removeProperty(index: any){
        setProperties(prev => {
            const newProperties = [...(prev ?? [])].filter((p, pIndex)=>{
                return pIndex !== index ;
            });
            return newProperties;
        })

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
                <div>
                    <label>Properties</label>
                    <button type="button" className="btn-primary mb-4 text-sm" onClick={addProperty}> Add new property</button>
                    {(properties ?? []).length > 0 && properties?.map((property, index) => (
                        <div className="flex gap-1">
                            <input type="text" value={property.name} onChange={ev => handlePropertyNameChange(index, property, ev.target.value)} placeholder="property name (example:color)"></input>
                            <input type="text" value={property.value} onChange={ev => handlePropertyValueChange(index, property, ev.target.value)} placeholder="values, comma separated"></input>
                            <button type="button" className="btn-primary text-sm mb-1" onClick={ () => removeProperty(index)}>Remove</button>
                        </div>
                    ))}
                </div>
                {editedCategory && (
                    <button type="button" className="btn-primary" onClick={() => {
                        setEditedCategory(null);
                        setProperties(null);
                        setParentCategoryName('');
                    }}> Cancel </button>
                ) }
                <button className="btn-primary" type="submit"> Save </button>
            </form>

            {!editedCategory && (
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
            )}
        </Layout>
    );
}

export default CategoriesPage;