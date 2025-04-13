import { useEffect } from "react";
import { useLocation, useNavigate, useRouteError } from "react-router-dom";

type ErrorBoundaryProps = {
    message?: string;
    description?: string;
}

export default function ErrorBoundary({ message, description }: ErrorBoundaryProps) {
    const error = useRouteError() as Error | any;
    const navigate = useNavigate();
    const location = useLocation();

    const isIndex = location.pathname === "/";

    useEffect(() => {
        if(!isIndex) {
            const timer = setTimeout(() => {
                navigate("/");
            }, 3000);
    
            return () => clearTimeout(timer);
        }
    }, [navigate, isIndex])

    return (
        <div className="flex flex-col items-center justify-center gap-4 h-full p-4 rounded-2xl">
            <h1 className="text-4xl font-bold text-slate-800">Error</h1>
            <p className="text-lg text-gray-700">
                {error ? error.statusText : message || "An unexpected error occurred."}
            </p>
            <p className="text-sm text-gray-500">
                Redirecting to the homepage in 3 seconds...
            </p>
            <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors"
                onClick={() => navigate("/")}
            >
                Go to Homepage
            </button>
            <p className="text-sm text-gray-500">
                {description || "If the problem persists, please contact support."}
            </p>    
        </div>
    );
}
