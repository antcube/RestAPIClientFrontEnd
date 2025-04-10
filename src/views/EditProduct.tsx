import { useState, useEffect } from "react";
import {ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useActionData, useLoaderData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import { Error as ErrorType, Product } from "../types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    if( params.id !== undefined) {
        const product = await getProductById(+params.id);
        if(!product) {
            throw new Response("Product not found", {
                status: 404,
                statusText: "Product not found",
            });
        }
        return product;
    }
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    let errors: ErrorType = {
        name: "",
        price: "",
    };

    /// Validate name
    if (!data.name || !data.name.toString().trim()) {
        errors.name = "Product name is required";
    } else if (data.name.toString().trim().length < 3) {
        errors.name = "Product name must be at least 3 characters";
    }

    /// Validate price
    if(!data.price) {
        errors.price = "Product price is required";
    } else if (isNaN(Number(data.price))) {
        errors.price = "Product price must be a number";
    } else if (Number(data.price) <= 0) {
        errors.price = "Product price must be greater than 0";
    }

    /// Check if there are errors
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
        return errors;
    }

    if(params.id !== undefined) {
        await updateProduct(+params.id, data);
        return redirect("/");
    }
};

const availabilityOptions = [
    { name: "Available", value: true },
    { name: "Unavailable", value: false },
];

export default function EditProduct() {
    const product = useLoaderData() as Product;
    const actionErrors = useActionData() as ErrorType | null;

    const [formValues, setFormValues] = useState({
        name: product.name,
        price: product.price,
        availability: product.availability,
    });

    const [serverErrors, setServerErrors] = useState<ErrorType>({
        name: "",
        price: "",
    });

    // Update form values with action errors
    useEffect(() => {
        if (actionErrors) {
            setServerErrors(actionErrors);
        }
    }, [actionErrors]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear the error message for the field being changed
        setServerErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-500">
                    Edit Product
                </h2>
                <Link
                    className="bg-indigo-600 text-sm text-white text-center font-bold px-4 py-2 md:p-3 rounded-lg shadow-md hover:bg-indigo-500 transition-colors"
                    to="/"
                >
                    Back to Products
                </Link>
            </div>

            <Form className="mt-10" method="post">
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
                    {serverErrors.name && <ErrorMessage>{serverErrors.name}</ErrorMessage>}
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
                    {serverErrors.price && <ErrorMessage>{serverErrors.price}</ErrorMessage>}
                </div>
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="availability">
                        Availability:
                    </label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        value={formValues.availability.toString()}
                        onChange={handleChange}
                    >
                        {availabilityOptions.map((option) => (
                            <option
                                key={option.name}
                                value={option.value.toString()}
                            >
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Edit Product"
                />
            </Form>
        </>
    );
}
