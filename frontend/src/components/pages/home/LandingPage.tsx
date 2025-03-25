import { motion } from "framer-motion";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const tiles: string[] = ["Playes", "Clans"];

const LandingPage = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  console.log(user);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/images/battlefield-bg.jpg')] opacity-20 bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-bold text-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-transparent bg-clip-text"
        >
          Welcome to Clash of Clans
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 text-xl md:text-2xl text-gray-300 text-center max-w-2xl mx-auto"
        >
          Build, battle, and dominate the battlefield!
        </motion.p>

        {/* Troop Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {tiles.map((tile, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl text-center shadow-xl border border-gray-700 backdrop-blur-sm"
            >
              <Link to={"/players"} className="relative group">
                <img
                  src={`https://placehold.co/300x300/2d3748/fcd34d/png?text=${tile}`}
                  alt={tile}
                  className="w-32 h-32 mx-auto object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" /> */}
              </Link>
              <h3 className="mt-6 text-2xl font-bold text-yellow-400">{tile}</h3>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-16 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xl rounded-lg shadow-lg hover:shadow-red-500/30 transition-shadow duration-300 mx-auto block"
        >
          Join the Battle
        </motion.button>
      </div>
    </div>
  );
};

export default LandingPage;
