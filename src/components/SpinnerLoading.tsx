export default function SpinnerLoading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <svg
                className="animate-spin h-10 w-10 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="status"
                aria-live="polite"
                aria-busy="true"
                aria-label="Loading"
            >
                <circle cx="12" cy="12" r="10" className="opacity-25" />
                <path d="M4 12a8 8 0 1 1 16 0" className="opacity-75" />
            </svg>
            <p className="text-slate-500 text-lg font-semibold ml-4">
                Loading products...
            </p>
        </div>
    );
}
