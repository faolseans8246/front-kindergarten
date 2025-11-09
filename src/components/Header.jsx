import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useThemeMode } from "../context/ThemeContext";
import { useI18n } from "../context/I18nContext";
import { useMemo, useState } from "react";
import LoginModal from "./LoginModal";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import "./Header.css";

export default function Header() {
    const { user, role, logout } = useAuth();
    const { mode, setMode } = useThemeMode();
    const { locale, setLocale, t, translations } = useI18n();
    const [open, setOpen] = useState(false);
    const nav = useNavigate();

    const languageOptions = useMemo(() => ([
        { value: "uz", label: translations.common.languages.uz },
        { value: "ru", label: translations.common.languages.ru },
        { value: "en", label: translations.common.languages.en }
    ]), [translations]);

    const toggleMode = () => {
        setMode(mode === "dark" ? "light" : "dark");
    };

    return (
        <header className="Header">
            <div className="Header-inner container">
                <div className="Header-brand">
                    <Link to="/" className="Header-logo">{t("header.brand")}</Link>
                    <span className="Header-tagline">{t("common.tagline")}</span>
                </div>
                <nav className="Header-nav">
                    <NavLink to="/kindergartens" className={({ isActive }) => `Header-navLink${isActive ? " active" : ""}`}>
                        {t("header.navigation.kindergartens")}
                    </NavLink>
                    {role === "ADMIN" && (
                        <NavLink to="/admin" className={({ isActive }) => `Header-navLink${isActive ? " active" : ""}`}>
                            {t("header.navigation.admin")}
                        </NavLink>
                    )}
                    {role === "DIRECTOR" && (
                        <NavLink to="/director" className={({ isActive }) => `Header-navLink${isActive ? " active" : ""}`}>
                            {t("header.navigation.director")}
                        </NavLink>
                    )}
                </nav>

                <div className="Header-actions">
                    <select className="Header-lang" value={locale} onChange={(event) => setLocale(event.target.value)}>
                        {languageOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>

                    <button className="Header-themeToggle" onClick={toggleMode} aria-label="Toggle theme">
                        {mode === "dark" ? <MdDarkMode size={18} /> : <MdLightMode size={18} />}
                    </button>

                    {/* Auth */}
                    {!user ? (
                        <button className="Header-signin" onClick={()=>setOpen(true)}>{t("header.login")}</button>
                    ) : (
                        <div className="Header-avatarWrap">
                            <button className="Header-avatarBtn">
                                <FaUserCircle size={24} />
                            </button>
                            <div className="Header-menu">
                                <button onClick={()=>nav("/profile")}>{t("header.menu.profile")}</button>
                                <button onClick={()=>nav("/kindergartens")}>{t("common.actions.viewKindergartens")}</button>
                                {role === "ADMIN" && <button onClick={()=>nav("/admin")}>{t("header.menu.admin")}</button>}
                                {role === "DIRECTOR" && <button onClick={()=>nav("/director")}>{t("header.menu.director")}</button>}
                                <button onClick={logout}>{t("header.menu.logout")}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {open && <LoginModal onClose={()=>setOpen(false)} />}
        </header>
    );
}
