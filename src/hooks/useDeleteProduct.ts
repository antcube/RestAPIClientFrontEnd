import Swal from "sweetalert2";
import { useFetcher } from "react-router-dom";

export function useDeleteProduct() {
    const fetcher = useFetcher();

    const confirmAndDelete = async (form: HTMLFormElement) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#30476d",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            await Swal.fire({
                title: "Deleted!",
                text: "The product has been deleted.",
                icon: "success",
                confirmButtonColor: "#30476d",
            });
            fetcher.submit(form);
        } else {
            await Swal.fire({
                title: "Cancelled",
                text: "The product is safe.",
                icon: "error",
                confirmButtonColor: "#30476d",
            });
        }
    };

    return { fetcher, confirmAndDelete };
}