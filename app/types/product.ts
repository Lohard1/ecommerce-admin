export interface ProductType {
    _id?: string;
    __v?: number; 
    title?: string;
    description?: string;
    price?: number; 
    images?: Array<string>;
    category?: string;
    properties?: Array<{name: string, values: string } > ;
}

export interface CategoryType {
    _id?: string;
    __v?: number;
    name?: string;
    parent?: CategoryType;
    properties?: Array<{name: string, values: Array<string> } > ;
}