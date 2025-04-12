import { ActionFunctionArgs, redirect, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";
import { FormEvent } from "react";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

export type ProductDetailsProps = {
    product: Product
}
export const action = async ({params}: ActionFunctionArgs) => {
    if(params.id !== undefined) {
        await deleteProduct(+params.id);
        return redirect("/");
    }
}

export default function ProductDetails({product}: ProductDetailsProps) {
    const isAvailable = product.availability ? "bg-green-500" : "bg-red-500";

    const navigate = useNavigate();
    const { confirmAndDelete, fetcher } = useDeleteProduct();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await confirmAndDelete(e.currentTarget);
    }

    return (
        <tr className="border-b border-slate-200">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800 text-center">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800 text-center">
                <fetcher.Form
                    method="post"
                >
                    <button
                        className={`text-white font-bold text-sm px-3 py-1 rounded-md cursor-pointer ${isAvailable}`}
                        type="submit"
                        name="id"
                        value={product.id}
                    >
                        {product.availability ? "Available" : "Unavailable"}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex items-center gap-2">
                    <button 
                        className="bg-indigo-600 text-white text-xs w-full uppercase font-bold p-2 rounded-lg cursor-pointer hover:bg-indigo-500 transition-colors text-center" 
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                    >
                        Edit
                    </button>
                    <fetcher.Form
                        className="w-full" 
                        method="post"
                        action={`/products/${product.id}/delete`}
                        onSubmit={handleSubmit}
                    >
                        <button 
                            className="bg-red-600 text-white text-xs w-full uppercase font-bold p-2 rounded-lg cursor-pointer hover:bg-red-500 transition-colors"
                        >
                            Delete
                        </button>
                    </fetcher.Form>
                </div>
            </td>
        </tr>
    );
}
