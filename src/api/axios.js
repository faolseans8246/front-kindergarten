import axios from "axios";

export const tokenStore = {
    getAccessToken(){ return localStorage.getItem("accessToken"); },
    setAccessToken(t){ t ? localStorage.setItem("accessToken", t) : localStorage.removeItem("accessToken"); },
    getRefreshToken(){ return localStorage.getItem("refreshToken"); },
    setRefreshToken(t){ t ? localStorage.setItem("refreshToken", t) : localStorage.removeItem("refreshToken"); },
    clear(){ localStorage.removeItem("accessToken"); localStorage.removeItem("refreshToken"); }
};

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8082";

const api = axios.create({ baseURL: BASE_URL, timeout: 15000 });
const raw = axios.create({ baseURL: BASE_URL, timeout: 15000 });

api.interceptors.request.use((config) => {
    const at = tokenStore.getAccessToken();
    if (at) config.headers.Authorization = `Bearer ${at}`;
    return config;
});

let refreshing = false;
let waiters = [];
const flush = (err, token) => { waiters.forEach(p=> err ? p.reject(err) : p.resolve(token)); waiters=[]; };

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const original = err?.config;
        const status = err?.response?.status;

        // 401 -> refresh sinab ko'ramiz
        if (status === 401 && original && !original._retry) {
            original._retry = true;

            const rt = tokenStore.getRefreshToken();
            if (!rt) { tokenStore.clear(); return Promise.reject(err); }

            if (refreshing) {
                return new Promise((resolve, reject)=>{
                    waiters.push({
                        resolve: (newAT) => { if (newAT) original.headers.Authorization = `Bearer ${newAT}`; resolve(api(original)); },
                        reject
                    });
                });
            }

            refreshing = true;
            try {
                const { data } = await raw.post("/api/auth/refresh", { refreshToken: rt });
                const payload = data?.data || data; // ApiResponse(data) yoki to'g'ridan-to'g'ri TokenResponseDto
                const newAT = payload?.accessToken;
                const newRT = payload?.refreshToken;
                if (!newAT || !newRT) {
                    tokenStore.clear(); flush(new Error("Invalid refresh payload"));
                    return Promise.reject(err);
                }
                tokenStore.setAccessToken(newAT);
                tokenStore.setRefreshToken(newRT);

                original.headers.Authorization = `Bearer ${newAT}`;
                flush(null, newAT);
                return api(original);
            } catch (e) {
                tokenStore.clear(); flush(e);
                return Promise.reject(e);
            } finally {
                refreshing = false;
            }
        }

        return Promise.reject(err);
    }
);

export default api;
