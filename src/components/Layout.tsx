import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <nav className="bg-gray-800 text-white flex items-center justify-between p-4 gap-4 text-lg font-bold dark:bg-gray-900 dark:text-gray-300 shadow-md">
        <Link to={"/"}>GameHub+</Link>
        <Link
          to="/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition dark:hover:bg-green-800"
        >
          ➕ Add New Game
        </Link>

        {/* Toggle Dark Mode */}
        <button
          onClick={() => {
            const html = document.documentElement;
            const isDark = html.classList.contains("dark");

            // Toggle the .dark class and save it in localStorage
            html.classList.toggle("dark", !isDark);
            localStorage.setItem("theme", !isDark ? "dark" : "light");
          }}
          className="bg-white text-black px-2 py-1 rounded text-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Toggle Dark Mode
        </button>
      </nav>

      <main className="p-4 max-w-6xl mx-auto bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
