import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useThemeMode } from "../context/ThemeContext";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import "./Header.css";

export default function Header() {
    const { user, role, logout } = useAuth();
    const { mode, setMode } = useThemeMode();
    const [open, setOpen] = useState(false);
    const [lang, setLang] = useState("uz");
    const nav = useNavigate();

    return (
        <header className="Header">
            <div className="Header-inner container">
                <Link to="/" className="Header-logo">🌱 Kindergarten</Link>
                <nav className="Header-nav">
                    <Link to="/kindergartens" className="Header-navLink">Bog'chalar</Link>
                    {role === "ADMIN" && <Link to="/admin" className="Header-navLink">Admin</Link>}
                    {role === "DIRECTOR" && <Link to="/director" className="Header-navLink">Direktor</Link>}
                </nav>

                <div className="Header-actions">
                    {/* Language */}
                    <select className="Header-lang" value={lang} onChange={e=>setLang(e.target.value)}>
                        <option value="uz">O‘zbek</option>
                        <option value="ru" disabled>Русский (tez orada)</option>
                        <option value="en" disabled>English (soon)</option>
                    </select>

                    {/* Theme */}
                    <select className="Header-mode" value={mode} onChange={e=>setMode(e.target.value)} title="Mode">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                        <option value="default">Default</option>
                    </select>
                    {mode === "dark" ? <MdDarkMode size={20}/> : <MdLightMode size={20}/>}

                    {/* Auth */}
                    {!user ? (
                        <button className="Header-signin" onClick={()=>setOpen(true)}>Kirish</button>
                    ) : (
                        <div className="Header-avatarWrap">
                            <button className="Header-avatarBtn">
                                <FaUserCircle size={24} />
                            </button>
                            <div className="Header-menu">
                                <button onClick={()=>nav("/profile")}>Profil</button>
                                <button onClick={()=>nav("/kindergartens")}>Bog'chalar</button>
                                {role === "ADMIN" && <button onClick={()=>nav("/admin")}>Admin panel</button>}
                                {role === "DIRECTOR" && <button onClick={()=>nav("/director")}>Direktor panel</button>}
                                <button onClick={logout}>Chiqish</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {open && <LoginModal onClose={()=>setOpen(false)} />}
        </header>
    );
}
