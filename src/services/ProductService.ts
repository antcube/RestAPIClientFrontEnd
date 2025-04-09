import { safeParse } from "valibot";
import { DraftProductSchema, ProductsSchema } from "../types";
import axios from "axios";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export const addProduct = async (data: ProductData) => {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price,
        });
        
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price,
            })
        } else {
            throw new Error("Data validation failed");
        }
    } catch (error) {
        console.error("Error adding product:", error);
    }
}

export const getProducts = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios.get(url);

        const result = safeParse(ProductsSchema, data.data)

        if(result.success) {
            return result.output;
        } else {
            throw new Error("Data validation failed");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}