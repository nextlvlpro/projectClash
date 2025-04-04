import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";

const mockPlayers = [
  { id: 1, name: "King Slayer", clan: "Warriors", trophies: 3200 },
  { id: 2, name: "Shadow Ninja", clan: "Dark Legion", trophies: 2950 },
  { id: 3, name: "Mighty Thor", clan: "Asgardians", trophies: 3400 },
  { id: 4, name: "Dragon Lord", clan: "Fireborn", trophies: 3100 },
];

export default function Players() {
  const [search, setSearch] = useState("");

  const filteredPlayers = mockPlayers.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-[60vh] px-6 bg-gradient-to-b from-gray-900 to-gray-800">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-bold"
        >
          Top <span className="text-yellow-400">Clashers ⚔️</span> Worldwide
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 text-lg text-gray-400 max-w-xl"
        >
          Browse the best players in Clash of Clans. Find top clans, compare
          stats, and see who's dominating the leaderboards.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-6"
        >

          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outline"
            size="md"
          />
        </motion.div>
      </section>

      {/* Player List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-3xl mx-auto space-y-4"
      >
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <motion.div
              key={player.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-secondary text-text p-4 rounded-lg flex justify-between items-center shadow-md"
            >
              <div>
                <p className="text-lg font-semibold">{player.name}</p>
                <p className="text-sm text-gray-400">Clan: {player.clan}</p>
              </div>
              <p className="text-yellow-400 font-bold">{player.trophies} 🏆</p>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No players found.</p>
        )}
      </motion.div>
    </div>
  );
}
