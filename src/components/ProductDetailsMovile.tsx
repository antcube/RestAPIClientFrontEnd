import { ProductDetailsProps } from "./ProductDetails";
import { formatCurrency } from "../utils";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductDetailsMovile({ product }: ProductDetailsProps) {
    const { confirmAndDelete, fetcher } = useDeleteProduct();
    const navigate = useNavigate();

    const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await confirmAndDelete(e.currentTarget);
    };

    return (
        <div className="bg-white rounded-xl shadow p-4 sm:p-8 border border-slate-200 flex justify-between gap-4">
            <div className="flex flex-col gap-2">
                <p className="text-xl font-bold text-slate-700">
                    {product.name}
                </p>
                <p className="text- text-gray-600 font-bold">
                    Price:
                    <span className="font-normal">
                        {formatCurrency(product.price)}
                    </span>
                </p>

                <button
                    className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        product.availability
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {product.availability ? "Available" : "Unavailable"}
                </button>
            </div>

            <div className="flex flex-col justify-between items-center min-w-1/5">
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
                    onSubmit={handleDelete}
                >
                    <button className="bg-red-600 text-white text-xs w-full uppercase font-bold p-2 rounded-lg cursor-pointer hover:bg-red-500 transition-colors">
                        Delete
                    </button>
                </fetcher.Form>
            </div>
        </div>
    );
}
