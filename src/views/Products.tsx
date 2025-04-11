import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import { Product } from "../types";
import ProductDetails from "../components/ProductDetails";
import ProductDetailsMovile from "../components/ProductDetailsMovile";

export const loader = async () => {
    const products = await getProducts();
    return products;
};

export default function Products() {
    const products = useLoaderData() as Product[];

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-500">
                    Products
                </h2>
                <Link
                    className="bg-indigo-600 text-sm text-white text-center font-bold px-4 py-2 md:p-3 rounded-lg shadow-md hover:bg-indigo-500 transition-colors"
                    to="/products/new"
                >
                    Add Product
                </Link>
            </div>

            {products.length === 0 ? (
                <p className="text-center text-gray-500 mt-7 text-lg">
                    No products available
                    <span className="font-bold block">
                        Star by adding one!
                    </span>
                </p>
            ) : (
                <>
                    {/* Vista tipo Card para móviles */}
                    <div className="md:hidden mt-5 space-y-4">
                        {products.map((product) => (
                            <ProductDetailsMovile
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>

                    {/* Tabla para pantallas medianas o mayores */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full mt-5 table-auto">
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="p-2">Product</th>
                                    <th className="p-2">Price</th>
                                    <th className="p-2">Availability</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <ProductDetails
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>           
            )}
        </>
    );
}
