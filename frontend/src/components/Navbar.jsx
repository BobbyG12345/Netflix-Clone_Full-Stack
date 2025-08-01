import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Search, LogOut, Menu } from "lucide-react";
import { useContentStore } from "../store/useContentStore.js";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const contentType = useContentStore((state) => state.contentType);
  const setContentType = useContentStore((state) => state.setContentType);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50">
          <Link to="/">
            <img
              src="/netflix-logo.png"
              alt="Netflix Logo"
              className="w-32 sm:w-40"
            />
          </Link>

          {/* desktop navbar items */}
          <div className="hidden sm:flex gap-5 items-center">
            <Link
              to="/"
              className="hover:underline"
              onClick={() => {
                if (contentType !== "movie") setContentType("movie");
              }}
            >
              Movies
            </Link>
            <Link
              to="/"
              className="hover:underline"
              onClick={() => {
                if (contentType !== "tv") setContentType("tv");
              }}
            >
              TV Shows
            </Link>
            <Link to="/history" className="hover:underline">
              Search History
            </Link>
          </div>
        </div>

        <div className="flex gap-2 items-center z-50">
          <Link to={"/search"}>
            <Search className="size-6 cursor-pointer" />
          </Link>
          <img
            src={user ? user.image : "/favicon.png"}
            alt="Avatar"
            className="h-8 rounded cursor-pointer"
          />
          <LogOut className="size-6 cursor-pointer" onClick={logout} />
          <div className="sm:hidden">
            <Menu
              className="size-6 cursor-pointer"
              onClick={toggleMobileMenu}
            />
          </div>
        </div>

        {/* mobile navbar items */}
        {isMobileMenuOpen && (
          <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
            <Link
              to="/"
              className="block hover:underline p-2"
              onClick={() => {
                toggleMobileMenu();
                setContentType("movie");
              }}
            >
              Movies
            </Link>
            <Link
              to="/"
              className="block hover:underline p-2"
              onClick={() => {
                toggleMobileMenu();
                setContentType("tv");
              }}
            >
              TV Shows
            </Link>
            <Link
              to="/history"
              className="block hover:underline p-2"
              onClick={toggleMobileMenu}
            >
              Search History
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
