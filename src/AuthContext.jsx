import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup

async function login() {
  try {
    const response = await fetch(API + "/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify ({
        username: "emily",
        password: "password",
      }),
    });
    const result = await response.json ();
    setToken (result.token)
    sessionStorage.setItem("token", result.token)
    setLocation("TABLET")

    return token;
  } catch (e) {
    console.error ("oh no");
  }
}

  // TODO: authenticate

async function authenticate() {
  try {
    const response = await fetch(API + "/authenticate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
  });
  const result = await response.json ();
  return result;
  } catch (e) {
    console.error(e);
  }
}
authenticate ();
  
{

  const value = { location };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}}
