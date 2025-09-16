import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth() {
    const { token } = useAuth();
    const loc = useLocation();
    if (!token) return <Navigate to="/" state={{ from: loc }} replace />;
    return <Outlet />;
}
