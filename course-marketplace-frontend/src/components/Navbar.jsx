import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
  <h1 className="text-2xl font-bold text-orange-500">EduLine</h1>

      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-700 dark:text-white hover:text-blue-600">Home</Link>
        <Link to="/dashboard" className="text-gray-700 dark:text-white hover:text-blue-600">Dashboard</Link>

        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;