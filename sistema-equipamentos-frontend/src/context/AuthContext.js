
import { login } from "@/services/userService";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = Cookies.get("authtoken") ?? "";
    const savedUser = Cookies.get("authuser") ?? "";
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const data = { email, password };
      const response = await login(data);
      Cookies.set('authtoken', response.data.token, { expires: 1 });
      Cookies.set('authuser', JSON.stringify(response.data), { expires: 1 });
      setToken(response.data.token);
      setUser(response.data);
      router.push("/");
    } catch (error) {
      if (error.response?.status === 401) {
        error.treated = true;
        error.message = "Usuário ou senha incorretos.";
        throw error;
      } else {
        error.treated = true;
        error.message =
          "Usuário ou senha incorretos.";
        throw error;
      }
    }
  };

  const signOut = () => {
    try {
      Cookies.remove('authtoken');
      Cookies.remove('authuser');
      router.push("/Login");
    } catch (error) {
      toast.error("Ocorreu um erro ao deslogar. Tente novamente!");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, signed: !!token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
