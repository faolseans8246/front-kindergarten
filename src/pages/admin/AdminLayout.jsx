import { NavLink, Outlet } from "react-router-dom";
import "./AdminLayout.css";

const links = [
    { to: "dashboard", label: "Umumiy ko‘rinish" },
    { to: "applications", label: "Arizalar" },
    { to: "kindergartens", label: "Bog‘chalar" },
    { to: "videos", label: "Video qo‘llanmalar" }
];

export default function AdminLayout() {
    return (
        <div className="AdminLayout">
            <h2>Admin panel</h2>
            <div className="AdminLayout-tabs">
                {links.map((link) => (
                    <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
                ))}
            </div>
            <Outlet />
        </div>
    );
}
