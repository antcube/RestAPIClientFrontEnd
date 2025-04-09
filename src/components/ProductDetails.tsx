import { Product } from "../types";
import { formatCurrency } from "../utils";

export type ProductDetailsProps = {
    product: Product
}

export default function ProductDetails({product}: ProductDetailsProps) {
    const isAvailable = product.availability ? "bg-green-500" : "bg-red-500";

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
                    <button className="bg-indigo-600 text-white text-xs w-full uppercase font-bold p-2 rounded-lg cursor-pointer hover:bg-indigo-500 transition-colors">
                        Editar
                    </button>
                    <button className="bg-red-600 text-white text-xs w-full uppercase font-bold p-2 rounded-lg cursor-pointer hover:bg-red-500 transition-colors">
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    );
}
