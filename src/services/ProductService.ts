import { minValue, parse, pipe, safeParse, string, transform } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
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

export const getProductById = async (id: Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios.get(url);

        const result = safeParse(ProductSchema, data.data)

        if(result.success) {
            return result.output;
        } else {
            throw new Error("Data validation failed");
        }
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

export const updateProduct = async (id: Product['id'], data: ProductData) => {
    try {
        const NumberSchema = pipe(string(), transform(Number), minValue(0.01, "Price must be greater than 0"));
        const AvailabilitySchema = pipe(string(), transform((value) => value === "true"));

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: parse(AvailabilitySchema, data.availability),
        })
        
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url, result.output);
        } else {
            throw new Error("Data validation failed");
        }
    } catch (error) {
        console.error("Error updating product:", error);
    }
}