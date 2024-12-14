// _layout in /tabs

import { db } from "@/db/db";
import supabase from "@/supabase/config";
import { User } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

interface Children {
  children: ReactNode;
}

export const Authcontext = createContext<any | null>(null);
export default function AuthProvider({ children }: Children) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const Authenticate = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem("user_id");
      if (token === null) {
        console.log("No token provided please log in");
        return;
      }

      const get_user = (await db)
        .getAllSync<User>(`SELECT * FROM users WHERE _id = ?`, token)
        .at(0);

      if (!get_user) {
        console.log("user not found");
        return;
      }
      const users = await supabase.from("users").select().eq("_id", token);
      setCurrentUser(get_user);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Authenticate();
  }, []);

  return (
    <Authcontext.Provider
      value={{
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
        Authenticate
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}
