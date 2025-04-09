import { Link } from "react-router-dom";
import { ProductDetailsProps } from "./ProductDetails";
import { formatCurrency } from "../utils";

export default function ProductDetailsMovile({product}: ProductDetailsProps) {
    return (
        <div
            className="bg-white rounded-xl shadow p-4 sm:p-8 border border-slate-200 flex justify-between gap-4"
        >
            <div className="flex flex-col gap-2">
                <p className="text-xl font-bold text-slate-700">{product.name}</p>
                <p className="text- text-gray-600 font-bold">
                    Price:
                    <span className="font-normal">{formatCurrency(product.price)}</span>
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
                <Link
                    to={`/products/${product.id}/edit`}
                    className="bg-indigo-600 text-white text-sm font-bold px-3 py-2 rounded hover:bg-indigo-500 transition w-full text-center"
                >
                    Edit
                </Link>
                <button
                    onClick={() => {
                        // Aquí colocas la lógica de eliminar
                        console.log("Eliminar producto:", product.id);
                    }}
                    className="bg-red-600 text-white text-sm font-bold px-3 py-2 rounded hover:bg-red-500 transition w-full text-center"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
