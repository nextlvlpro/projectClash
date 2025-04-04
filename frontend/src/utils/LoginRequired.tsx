import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LoginRequired() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl font-bold text-primary">Login Required</h1>
        <p className="text-2xl text-secondary mt-4">
          You need to login to access this page.
        </p>
        <Link to="/auth/login">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-8 px-6 py-2 text-lg font-semibold bg-accent text-text rounded-md"
          >
            Login
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

