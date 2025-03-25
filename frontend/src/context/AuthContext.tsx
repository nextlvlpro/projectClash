import { createContext, useState } from "react";

interface User {
    username: string;
    email: string;
    cocToken: string;
    playerTag: string;
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
   const [user, setUser] = useState<User | null>(null);


  return (
    <AuthContext.Provider value={{ user,setUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}