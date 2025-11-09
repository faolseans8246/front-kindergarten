import { createContext, useContext, useMemo, useState } from "react";
import { tokenStore } from "../api/axios";

const ADMIN_PHONE = "+998953900004";
const ADMIN_PIN = "666666";

const AuthContext = createContext({ user:null, role:null, token:null, login:async()=>{}, logout:()=>{} });

const STORAGE_KEY = "crmAuthUser";

const loadStoredUser = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

export function AuthProvider({ children }) {
    const storedUser = loadStoredUser();
    const [token, setToken] = useState(storedUser ? storedUser.token : null);
    const [role, setRole] = useState(storedUser ? storedUser.role : null);
    const [user, setUser] = useState(storedUser ? storedUser.user : null);

    const login = async (phoneNumber, pinCode) => {
        if (phoneNumber !== ADMIN_PHONE || pinCode !== ADMIN_PIN) {
            const error = new Error("INVALID_CREDENTIALS");
            error.code = "INVALID_CREDENTIALS";
            throw error;
        }
        const payload = {
            token: "static-admin-token",
            role: "ADMIN",
            user: {
                username: "admin",
                phoneNumber: ADMIN_PHONE,
                fullName: "Bog‘cha CRM Super Admin"
            }
        };
        tokenStore.setAccessToken(payload.token);
        tokenStore.setRefreshToken(payload.token);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        setToken(payload.token);
        setRole(payload.role);
        setUser(payload.user);
    };

    const logout = () => {
        tokenStore.clear();
        localStorage.removeItem(STORAGE_KEY);
        setToken(null); setUser(null); setRole(null);
    };

    const value = useMemo(()=>({ token, user, role, login, logout }),[token,user,role]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
