import { Error } from "../types";
import ErrorMessage from "./ErrorMessage";

type ProductFormProps = {
    formValues: {
        name: string;
        price: string;
    }
    serverErrors: Error
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export default function ProductForm({formValues, serverErrors, handleChange}: ProductFormProps) {
    return (
        <>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                    Product Name:
                </label>
                <input
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Product Name. ej. Laptop, Phone"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                />
                {serverErrors.name && (
                    <ErrorMessage>{serverErrors.name}</ErrorMessage>
                )}
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="price">
                    Price:
                </label>
                <input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Product Price. ej. 1000, 199.99"
                    name="price"
                    value={formValues.price}
                    onChange={handleChange}
                />
                {serverErrors.price && (
                    <ErrorMessage>{serverErrors.price}</ErrorMessage>
                )}
            </div>
        </>
    );
}
