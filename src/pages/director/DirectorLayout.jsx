import { NavLink, Outlet } from "react-router-dom";
import "./DirectorLayout.css";

export default function DirectorLayout() {
    return (
        <div className="DirectorLayout">
            <h2>Direktor panel</h2>
            <div className="DirectorLayout-tabs">
                <NavLink to="staff">Xodimlar</NavLink>
                <NavLink to="groups">Guruhlar</NavLink>
                <NavLink to="children">Bolalar</NavLink>
            </div>
            <Outlet />
        </div>
    );
}
