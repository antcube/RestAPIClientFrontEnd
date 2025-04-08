import { pipe, number, object, string, minLength, minValue } from "valibot";

export type Error = {
    name: string;
    price: string;
};

export const DraftProductSchema = object({
    name: pipe(string(), minLength(3, "Name must be at least 3 characters")),
    price: pipe(number(), minValue(0.01, "Price must be greater than 0")),
})

