export interface ProductType {
    _id?: string;
    __v?: number; 
    title?: string;
    description?: string;
    price?: number; 
    images?: Array<string>;
}

export interface CategoryType {
    _id?: string;
    __v?: number;
    name?: string;
}