import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <header className="bg-slate-800">
                <div className="w-[90%] max-w-7xl mx-auto py-10">
                    <h1 className="text-white font-extrabold text-4xl text-center md:text-left">
                        Administrador de Productos
                    </h1>
                </div>
            </header>

            <main className="w-[90%] max-w-7xl mx-auto my-10 bg-white shadow-md rounded-lg p-5 sm:p-10">
                <Outlet />
            </main>
        </>
    );
}
