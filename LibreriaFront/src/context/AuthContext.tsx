import { createContext, useContext, useEffect, useState } from "react";

export interface Usuario {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  rol: "cliente" | "administrador";
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (token: string, usuario: Usuario) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    const usuarioGuardado = localStorage.getItem("usuario");

    if (tokenGuardado && usuarioGuardado) {
      setToken(tokenGuardado);
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = (token: string, usuario: Usuario) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setToken(token);
    setUsuario(usuario);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        login,
        logout,
        isAuthenticated: !!usuario,
        isAdmin: usuario?.rol === "administrador",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
