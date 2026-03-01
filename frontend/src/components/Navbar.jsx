import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md text-white px-4 sm:px-8 py-4 flex items-center justify-between shadow-lg border-b border-gray-800">
      <div className="flex items-center gap-3 group">
        <div className="bg-green-500/10 p-2 rounded-xl transition-transform group-hover:rotate-12 duration-300">
          <svg
            className="w-6 h-6 text-green-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>
        <Link
          to="/"
          className="font-extrabold text-xl tracking-tight hover:text-green-400 transition-all"
        >
          Cloud Contact<span className="text-green-500"> Hub</span>
        </Link>
      </div>

      <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-400">
        <Link to="/" className="hover:text-white transition-colors">
          Directory
        </Link>
        <Link
          to="/contacts/create"
          className="hover:text-white transition-colors"
        >
          Add Contact
        </Link>
      </div>
    </nav>
  );
}
