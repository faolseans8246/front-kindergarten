import { createContext, useContext, useMemo, useState } from "react";
import { tokenStore } from "../api/axios";
import { login as loginApi } from "../api/auth";

const AuthContext = createContext({ user:null, role:null, token:null, login:async()=>{}, logout:()=>{} });

function parseJwt(token) {
    try { return JSON.parse(atob(token.split(".")[1])); } catch { return null; }
}

export function AuthProvider({ children }) {
    const initAT = tokenStore.getAccessToken();
    const initClaims = initAT ? parseJwt(initAT) : null;

    const [token, setToken] = useState(initAT || null);
    const [role, setRole] = useState((initClaims?.role || "").replace(/^ROLE_/,"") || null);
    const [user, setUser] = useState(initClaims?.sub ? { username: initClaims.sub } : null);

    const login = async (username, password) => {
        const payload = await loginApi(username, password); // {accessToken, refreshToken}
        tokenStore.setAccessToken(payload.accessToken);
        tokenStore.setRefreshToken(payload.refreshToken);
        setToken(payload.accessToken);
        const claims = parseJwt(payload.accessToken);
        setUser({ username: claims?.sub || username });
        setRole((claims?.role || "").replace(/^ROLE_/,"") || null);
    };

    const logout = () => {
        tokenStore.clear();
        setToken(null); setUser(null); setRole(null);
    };

    const value = useMemo(()=>({ token, user, role, login, logout }),[token,user,role]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
