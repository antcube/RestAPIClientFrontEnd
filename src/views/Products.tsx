import { Link } from "react-router-dom";

export default function Products() {
  return (
    <div className="flex justify-between items-center">
        <h2 className="text-3xl md:text-4xl font-black text-slate-500">Products</h2>
        <Link 
            className="bg-indigo-600 text-sm text-white text-center font-bold px-4 py-2 md:p-3 rounded-lg shadow-md hover:bg-indigo-500 transition-colors"
            to="/products/new"    
        >
            Add Product 
        </Link>
    </div>
  )
}
