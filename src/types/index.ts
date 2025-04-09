import { pipe, number, object, string, minLength, minValue, boolean, array, InferOutput } from "valibot";

export type Error = {
    name: string;
    price: string;
};

export const DraftProductSchema = object({
    name: pipe(string(), minLength(3, "Name must be at least 3 characters")),
    price: pipe(number(), minValue(0.01, "Price must be greater than 0")),
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean(),
})

export const ProductsSchema = array(ProductSchema);

export type Product = InferOutput<typeof ProductSchema>