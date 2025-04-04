import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
    name: string;
    email: string;
    playerApiKey: string;
}

interface UserContextType {
    user: User | null;
    userVerified: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        // Load user from localStorage if available
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [userVerified, setUserVerified] = useState(false);

    useEffect(() => {
        axios
            .get("/api/auth/login/verify", { withCredentials: true }) // Fetch user using cookies
            .then((res) => {
                setUser(res.data.user);
                setUserVerified(true);
                localStorage.setItem("user", JSON.stringify(res.data.user)); // Store in localStorage
            })
            .catch(() => {
                setUser(null);
                setUserVerified(false);
                localStorage.removeItem("user"); // Clear storage if auth fails
            });
    }, []);

    function logout() {
        axios.post("/api/auth/login/logout", {}, { withCredentials: true }).then(() => {
            setUser(null);
            setUserVerified(false);
            localStorage.removeItem("user"); // Remove from localStorage on logout
        });
    }

    return (
        <UserContext.Provider value={{ user, userVerified, logout, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
