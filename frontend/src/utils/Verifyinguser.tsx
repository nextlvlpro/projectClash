import { motion } from "framer-motion";

export default function Verifyinguser() {
  return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center h-screen"
      >
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
      </motion.div>
  )
}
