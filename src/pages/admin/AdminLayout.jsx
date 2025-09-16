import { NavLink, Outlet } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
    return (
        <div className="AdminLayout">
            <h2>Admin panel</h2>
            <div className="AdminLayout-tabs">
                <NavLink to="directors">Direktorlar</NavLink>
                <NavLink to="kindergartens">Bog‘chalar</NavLink>
            </div>
            <Outlet />
        </div>
    );
}
