import { NavLink, Outlet } from "react-router-dom";
import { useCrmData } from "../../context/CrmDataContext";
import { useI18n } from "../../context/I18nContext";
import { FiGrid, FiInbox, FiPlayCircle, FiBell, FiHelpCircle, FiCalendar, FiUsers } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import "./AdminLayout.css";

const primaryLinks = [
    { to: "dashboard", icon: FiGrid, label: "admin.nav.dashboard" },
    { to: "applications", icon: FiInbox, label: "admin.nav.applications" },
    { to: "kindergartens", icon: HiOutlineHome, label: "admin.nav.kindergartens" },
    { to: "videos", icon: FiPlayCircle, label: "admin.nav.videos" }
];

const secondaryLinks = [
    { icon: FiCalendar, label: "admin.nav.calendar" },
    { icon: FiUsers, label: "admin.nav.suppliers" },
    { icon: FiBell, label: "admin.nav.notifications" },
    { icon: FiHelpCircle, label: "admin.nav.help" }
];

export default function AdminLayout() {
    const { stats } = useCrmData();
    const { t } = useI18n();

    const metrics = [
        { key: "kindergartens", value: stats.totalMain + stats.totalBranches, label: t("admin.stats.kindergartens.label"), delta: t("admin.stats.kindergartens.delta") },
        { key: "children", value: stats.totalChildren, label: t("admin.stats.children.label"), delta: t("admin.stats.children.delta") },
        { key: "tuition", value: stats.monthlyTuition, label: t("admin.stats.tuition.label"), delta: t("admin.stats.tuition.delta") },
        { key: "revenue", value: stats.monthlyRevenue, label: t("admin.stats.revenue.label"), delta: t("admin.stats.revenue.delta") }
    ];

    const filterOptions = t("admin.filterOptions");

    return (
        <div className="AdminShell">
            <aside className="AdminShell-sidebar">
                <div className="AdminShell-brand">
                    <span>E-Bog'chilar</span>
                    <small>{t("common.tagline")}</small>
                </div>
                <nav className="AdminShell-nav">
                    {primaryLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <NavLink key={link.to} to={link.to} className={({ isActive }) => `AdminShell-navLink${isActive ? " active" : ""}`}>
                                <Icon size={18} />
                                <span>{t(link.label)}</span>
                            </NavLink>
                        );
                    })}
                </nav>
                <div className="AdminShell-secondary">
                    <span className="AdminShell-label">{t("admin.nav.news")}</span>
                    {secondaryLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <button key={link.label} type="button">
                                <Icon size={18} />
                                <span>{t(link.label)}</span>
                            </button>
                        );
                    })}
                </div>
                <div className="AdminShell-upgrade">
                    <h4>{t("admin.userCard.title")}</h4>
                    <p>{t("admin.userCard.subtitle")}</p>
                    <span>{t("admin.userCard.currentUser")}</span>
                </div>
            </aside>
            <section className="AdminShell-main">
                <header className="AdminShell-header">
                    <div>
                        <h1>{t("admin.panelTitle")}</h1>
                        <p>{t("admin.panelSubtitle")}</p>
                    </div>
                    <div className="AdminShell-controls">
                        <input type="search" placeholder={t("admin.searchPlaceholder")} />
                        <select>
                            <option value="newest">{filterOptions.newest}</option>
                            <option value="popular">{filterOptions.popular}</option>
                            <option value="blocked">{filterOptions.blocked}</option>
                        </select>
                        <button type="button">{t("admin.createAction")}</button>
                    </div>
                </header>
                <div className="AdminShell-metrics">
                    {metrics.map((metric) => (
                        <article key={metric.key}>
                            <strong>{metric.value}</strong>
                            <span>{metric.label}</span>
                            <small>{metric.delta}</small>
                        </article>
                    ))}
                </div>
                <div className="AdminShell-content">
                    <Outlet />
                </div>
            </section>
        </div>
    );
}
