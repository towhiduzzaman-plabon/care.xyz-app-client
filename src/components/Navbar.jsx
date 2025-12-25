import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-semibold"
      : "hover:text-yellow-300";

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold">
        Care<span className="text-yellow-400">.xyz</span>
      </Link>

      {/* LINKS */}
      <div className="flex items-center space-x-5">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>

        <NavLink to="/services" className={navLinkClass}>
          Services
        </NavLink>

        {user && (
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        )}

        {user && (
          <NavLink to="/my-bookings" className={navLinkClass}>
            My Bookings
          </NavLink>
        )}

        {user ? (
          <button
            onClick={logout}
            className="ml-4 px-4 py-1 bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="ml-4 px-4 py-1 bg-green-600 rounded hover:bg-green-700"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
