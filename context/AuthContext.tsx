import api from "@/config/axios.instance";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { jwtDecode } from "jwt-decode";
// Create a context object
const AuthContext = createContext({
  loginUser: (email: string, password: string) => {},
  register: (email: string, password: string) => {},
  token: null,
});

// Create a custom hook to use the context
function useAuthContext() {
  return useContext(AuthContext);
}

// Create a component to provide the context to its children
function AuthContextProvider({ children }: any) {
  const router = useRouter();
  const [token, setToken] = useState<any>(null);
  const storeToken = async (token: string) => {
    await AsyncStorage.setItem("token", token);
  };
  
  const removeToken = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    router.replace("/(auth)");
  };

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem("token");
      const decoded: any = jwtDecode(t || "");
      if (decoded) {
        setToken(decoded);
      } else {
        setToken(null);
      }
    })();
  }, []);
 
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      const decoded: any = jwtDecode(token || "");
      storeToken(token);
      setToken(decoded);
      router.replace("/(message)");
      Alert.alert("Login Successful", "You have successfully logged in");
    } catch (error: any) {
      Alert.alert(
        "Login Error",
        error.response.data?.message || "Invalid Credentials"
      );
    }
  };
  const register = async (email: string, password: string) => {
    removeToken();
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
      });
      router.replace("/(auth)");
      Alert.alert(
        "Registration Success",
        "You have successfully registered Please Login"
      );
    } catch (error: any) {
      Alert.alert(
        "Register Error",
        error.response.data?.message || "Somethis went Wrong"
      );
    }
  };
  return (
    <AuthContext.Provider
      value={{
        loginUser,
        register,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, useAuthContext, AuthContextProvider };
