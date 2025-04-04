import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import UserInfo from "./UserInfo";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Players", path: "/players" },
    { label: "Clans", path: "/clans" },
    { label: "Tournaments", path: "/tournaments" },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        className="w-full h-full bg-background text-text flex items-center justify-between px-6 py-4"
      >
        <Link to={"/"} className="text-xl font-semibold tracking-wide">
          ClashHub⚔️
        </Link >

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          {navLinks.map(({ label, path }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.1, color: "var(--color-secondary)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to={path}>{label}</Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            <HiMenu className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop User Info */}
        <div className="hidden md:block text-sm text-text">
          <UserInfo />
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-gray-800 text-white p-6 z-50 md:hidden shadow-lg flex flex-col"
          >
            {/* Close Button */}
            <div className="self-end mb-6">
              <button onClick={toggleMobileMenu}>
                <HiX className="w-6 h-6" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col space-y-6 text-lg font-medium">
              {navLinks.map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setIsMobileOpen(false)}
                  className="hover:text-yellow-400 transition"
                >
                  {label}
                </Link>
              ))}
              <div className="mt-4 text-gray-400 border-t border-gray-600 pt-4">
                User Info
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
