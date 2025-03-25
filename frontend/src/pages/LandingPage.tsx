import { motion } from "framer-motion";

const troops:string[] = ["Barbarian", "Archer", "Giant"];

const LandingPage= () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-yellow-400"
      >
        Welcome to Clash of Clans
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-4 text-lg text-gray-300"
      >
        Build, battle, and dominate the battlefield!
      </motion.p>

      {/* Troop Cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {troops.map((troop, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gray-800 p-6 rounded-xl text-center shadow-lg"
          >
            <img
              src={`/images/${troop.toLowerCase()}.png`} // Update with real images
              alt={troop}
              className="w-24 h-24 mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold">{troop}</h3>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-10 px-6 py-3 bg-red-600 text-white font-bold text-lg rounded-lg shadow-lg"
      >
        Join the Battle
      </motion.button>
    </div>
  );
};

export default LandingPage;
