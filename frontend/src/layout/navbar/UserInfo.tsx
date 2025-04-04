import { useState, useEffect } from "react"
import { useUser } from "../../UserContext";
import UserAvatar from "../../components/ui/UserAvatar";
import getErrorMessage from "../../utils/getErrorMessage";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function UserInfo() {
  const [expandUserInfo, setExpandUserInfo] = useState(false)

  const { user, logout } = useUser()

  function logoutUser() {
    setExpandUserInfo(false)
    try {
      logout();
      toast.success("Logout successful!")
    } catch (error) {
      console.log("Error logging out:", error)
      let errMsg = getErrorMessage(error);
      toast.error(errMsg)
    }
    
  }

  useEffect(() => {
    if (!expandUserInfo) {
      return
    }
    const timer = setTimeout(() => setExpandUserInfo(false), 3000)
    return () => clearTimeout(timer)
  }, [expandUserInfo])

  return (
    <div className="relative">
      <div>
        <UserAvatar userName={user?.name} setExpandUserInfo={setExpandUserInfo} />
      </div>
      <AnimatePresence>
        {expandUserInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute right-0  top-0 bg-background text-text shadow-lg rounded-md p-4 flex flex-col gap-3 items-start justify-start min-w-48"
          >
            {user ? (
              <>
                <h2 className="text-md font-semibold">{user?.name}</h2>
                <p className="text-xs text-gray-600">{user?.email}</p>
                <button className="mt-2 text-red-500 hover:underline" onClick={logoutUser}>Logout</button>
              </>
            ) : (
              <>
                <h2 className="text-md font-semibold">Welcome!</h2>
                <Link to={"/auth/login"} className="text-md font-semibold" onClick={() => setExpandUserInfo(false)}>Login</Link>
                <Link to={"/auth/register"} className="text-md font-semibold" onClick={() => setExpandUserInfo(false)}>Register</Link>
              </>
            )}
            <button className="absolute right-0 pr-4 items-center justify-center rounded-full text-gray-600 hover:text-red-900" onClick={() => setExpandUserInfo(false)}>x</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

