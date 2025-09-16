import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireRole({ role, children }) {
    const { token, role: myRole } = useAuth();
    const loc = useLocation();
    if (!token) return <Navigate to="/" state={{ from: loc }} replace />;
    if (role && myRole !== role) return <Navigate to="/" replace />;
    return children;
}
