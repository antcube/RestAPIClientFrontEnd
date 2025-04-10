import { useState, useEffect } from "react";
import {
    ActionFunctionArgs,
    Form,
    Link,
    redirect,
    useActionData,
} from "react-router-dom";
import { addProduct } from "../services/ProductService";
import { Error } from "../types";
import ProductForm from "../components/ProductForm";

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    let errors: Error = {
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

    await addProduct(data);

    return redirect("/");
};

export default function NewProduct() {
    const actionErrors = useActionData() as Error | null;

    const [formValues, setFormValues] = useState({
        name: "",
        price: "",
    });

    const [serverErrors, setServerErrors] = useState<Error>({
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
                    Register Product
                </h2>
                <Link
                    className="bg-indigo-600 text-sm text-white text-center font-bold px-4 py-2 md:p-3 rounded-lg shadow-md hover:bg-indigo-500 transition-colors"
                    to="/"
                >
                    Back to Products
                </Link>
            </div>

            <Form className="mt-10" method="post">
                <ProductForm
                    formValues={formValues}
                    serverErrors={serverErrors}
                    handleChange={handleChange}
                />
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Register Product"
                />
            </Form>
        </>
    );
}
