import Layout from "@/components/layout"
import Link from "next/link";


const ProductsPage = () => {
    return (
        <Layout>
            <Link className="bg-blue-400 p-1 m-2 rounded-md" href="/products/new">
            Add new product
            </Link>
        </Layout>
    );
}

export default ProductsPage;