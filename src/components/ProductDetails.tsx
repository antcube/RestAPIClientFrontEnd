import { ActionFunctionArgs, redirect, useFetcher, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";
import Swal from "sweetalert2";
import { FormEvent } from "react";

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
    const fetcher = useFetcher();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#30476d",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
    
        if (result.isConfirmed) {
            await Swal.fire({
                title: "Deleted!",
                text: "The product has been deleted.",
                icon: "success",
                confirmButtonColor: "#30476d",
            })
            fetcher.submit(e.target as HTMLFormElement)
        } else {
            await Swal.fire({
                title: "Cancelled",
                text: "The product is safe.",
                icon: "error",
                confirmButtonColor: "#30476d",
            });
        }
    }

    return (
        <tr className="border-b border-slate-200">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800 text-center">
                <span className={`text-white font-bold text-sm px-3 py-1 rounded-md ${isAvailable}`}>
                    {product.availability ? "Available" : "Unavailable"}
                </span>
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
