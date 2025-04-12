import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { loader as productsLoader, action as updateAvailabilityAction } from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import SpinnerLoading from "./components/SpinnerLoading";
import EditProduct, { action as editProductAction, loader as editProductLoader} from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";
import ErrorBoundary from "./components/ErrorBoundary";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction,
                hydrateFallbackElement: <SpinnerLoading />,
            },
            {
                path: "/products/new",
                element: <NewProduct />,
                action: newProductAction,
            },
            {
                path: "/products/:id/edit", // ROA Pattern - Resource-Oriented Architecture
                element: <EditProduct />,
                action: editProductAction,
                loader: editProductLoader,
                errorElement: <ErrorBoundary />,
                hydrateFallbackElement: <SpinnerLoading />,
            },
            {
                path: "/products/:id/delete",
                action: deleteProductAction,
                element: <p>Redirigiendo...</p>
            }
        ]
    }
])