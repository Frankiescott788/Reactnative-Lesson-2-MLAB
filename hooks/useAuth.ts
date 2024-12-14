import { Authcontext } from "@/context/auth";
import { db } from "@/db/db";
import supabase from "@/supabase/config";
import { User } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { v4 } from "uuid";

const useAuth = () => {
  const { setIsAuthenticated, setCurrentUser } = useContext(Authcontext);
  const router = useRouter();
  const [errors, setErrors] = useState({
    username : "",
    password : "",
    email : ""
  })

  const sign_up = async (
    username: string,
    email: string,
    password: string
  ): Promise<void> => {

    if(!username || !password || !email) {
        setErrors(() => {
            return {
                username : !username ? "Username is required" : "",
                email : !email ? "Email is required" : "",
                password : !password ? "Password is required" : ""
            }
        });
        return;
    }

    try {

    const id = new Date().toISOString();

      const yey= await supabase.from("users").insert(<User>{
        _id : id,
        username,
        email,
        password
      })
      const res = await (
        await db
      ).runAsync(
        `INSERT INTO users (_id, username, email, password) VALUES (?, ?, ?, ?)`,
        id,
        username,
        email,
        password
      );
      await AsyncStorage.setItem("user_id", id);
      if (res.lastInsertRowId > 0) {
        setIsAuthenticated(true);
        setCurrentUser(<User>{username, email, password});
        router.navigate("/(tabs)");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sign_in = async (email : string, password : string) : Promise<any> => {
    if(!email || !password) {
        setErrors({
            username : "",
            email : !email ? "Email is required" : "",
            password : !password ? "Password is required" : "",
        });
        return;
    }
    setErrors({
        username : "",
        password : "",
        email : ""
    })
    try {
        const select_data = await (await db).getAllAsync<User>(`SELECT * FROM users WHERE email = ?`, email);
        const mapp = select_data.map(user => ({
            ...user
        })).at(0);
        if(!mapp) {
            setErrors({
                ...errors,
                email : "No such email in our system",
                password : ""
            })
            console.log("No such email in our system");
            return;
        }
        
        if(password !== mapp.password) {
            setErrors({
                ...errors,
                email : "",
                password : "Incorrect password"
            })
            console.log("Wrong password");
            return;
        };
        await AsyncStorage.setItem("user_id", mapp._id);
        setCurrentUser(mapp);
        setIsAuthenticated(true);
        router.navigate("/(tabs)");

        

    } catch (error) {
        console.log(error)
    }
  }

  const log_out = async () => {
    try {
      await AsyncStorage.removeItem("user_id");
      setIsAuthenticated(false);
      router.navigate("/(auth)");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    sign_up,
    log_out,
    sign_in,
    errors
  };
};

export default useAuth;
