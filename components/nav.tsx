"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import IconGear from "./svg/IconGear";
import IconStore from "./svg/IconStore";
import IconHome from "./svg/IconHome";
import IconProducts from "./svg/IconProducts";
import IconOrders from "./svg/IconOrders";
import IconCategories from "./svg/IconCategories";

export const Nav = ({ }) => {
    const inactiveLink = 'flex gap-1 p-1';
    const activeLink = 'flex gap-1 p-1 bg-gray-50 text-blue-900 rounded-l-lg h-full';
    const router = useRouter();
    const pathname = usePathname();
    
    return (
        <aside className="text-white p-4 pr-0">
            <Link href={'/'} className="flex w-fit space-x-2 mb-4 mr-2">
                <IconStore></IconStore>
                <span className="text-nowrap">
                    Ecommerce Admin
                </span>
            </Link>
            <nav>
                <Link href={'/'} className={(pathname) === '/'? activeLink:inactiveLink}>
                    <IconHome></IconHome> <span>Dashboard</span>
                </Link>
                <Link href={'/products'} className={(pathname).includes('/products')? activeLink:inactiveLink}>
                    <IconProducts></IconProducts>
                    <span>Products</span>
                </Link>
                <Link href={'/categories'} className={(pathname).includes('/categories')? activeLink:inactiveLink}>
                    <IconCategories></IconCategories>
                    <span>Categories</span>
                </Link>
                <Link href={'/orders'} className={(pathname).includes('/orders')? activeLink:inactiveLink}>
                    <IconOrders></IconOrders>
                    <span>Orders</span>
                </Link>
                <Link href={'/settings'} className={(pathname).includes('/settings')? activeLink:inactiveLink} >
                    <IconGear></IconGear>
                    <span>Settings</span>
                </Link>

            </nav>

        </aside>
    )
}
