import api from "./axios";
import { unwrap } from "./unwrap";

export async function login(username, password) {
    const res = await api.post("/api/auth/login", { username, password });
    return unwrap(res); // {accessToken, refreshToken}
}
