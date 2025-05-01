import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav className="bg-gray-800 text-white flex items-center justify-between p-4 gap-4 text-lg font-bold">
        <Link to={"/"}>GameHub+</Link>
        <Link
          to="/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ➕ Add New Game
        </Link>
        <Link to={"game/1"}>Game</Link>
      </nav>
      <main className="p-4 max-w-6xl mx-auto">
        <Outlet></Outlet>
      </main>
    </div>
  );
}
export default Layout;
