import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";
import axios from "axios";
import getErrorMessage from "../../utils/getErrorMessage";
import { toast } from "react-toastify";


export default function Players() {
  const [loading,setLoading] = useState(false)
  const [search, setSearch] = useState("");
  const [topPlayers, setTopPlayers] = useState([]);
  const [location, setLocation] = useState<string>("global");
  

  useEffect(()=> {
    setLoading(true)
    setLocation("india")
      getTopPlayers(location)
      .then((data) => {
        setTopPlayers(data);
      })
      .catch((error) => {
        console.error("Error fetching top players:", error);
        const errMsg = getErrorMessage(error)
        toast.error(errMsg);
      })
      .finally(() => {
        setLoading(false)
      })
      
  },[])



  



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
        {!!topPlayers && topPlayers.length > 0 ? (
          topPlayers.map((player: any,index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-secondary text-text p-4 rounded-lg flex justify-between items-center shadow-md"
            >
              <div>
                <p className="text-lg font-semibold">{player?.name}</p>
                {/* <p className="text-sm text-gray-400">Clan: {player?.clan}</p> */}
              </div>
              <p className="text-yellow-400 font-bold">{player?.trophies} 🏆</p>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">{loading ? "Getting Top Players....." : "No players found."}</p>
        )}
      </motion.div>
    </div>
  );
}


//helper functions
async function getTopPlayers(location: string) {
  try {
    const {data} = await axios.post("/api/coc/topplayers", {location})
    return data
    
  } catch (error) {
    let errMsg = getErrorMessage(error)
    console.log(errMsg)
    console.error(error);

  }
}
