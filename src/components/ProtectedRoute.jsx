import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../utils/roles';
import './ProtectedRoute.css';

export function PrivateRoute() {
    const { user, loading } = useAuth();
    if (loading) return <div className="ProtectedRoute-loading">Yuklanmoqda...</div>;
    return user ? <Outlet/> : <Navigate to="/" replace/>;
}

export function AdminRoute() {
    const { user, loading } = useAuth();
    if (loading) return <div className="ProtectedRoute-loading">Yuklanmoqda...</div>;
    return (user && user.roles === ROLES.ADMIN) ? <Outlet/> : <Navigate to="/" replace/>;
}

export function DirectorRoute() {
    const { user, loading } = useAuth();
    if (loading) return <div className="ProtectedRoute-loading">Yuklanmoqda...</div>;
    return (user && user.roles === ROLES.DIRECTOR) ? <Outlet/> : <Navigate to="/" replace/>;
}