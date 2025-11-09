import { useMemo } from "react";
import { useCrmData } from "../../context/CrmDataContext";
import { useI18n } from "../../context/I18nContext";
import "./AdminDashboard.css";

export default function AdminDashboard() {
    const { stats, kindergartens, applications } = useCrmData();
    const { t } = useI18n();

    const latestKindergartens = useMemo(
        () => kindergartens.filter((item) => item.status === "MAIN").slice(0, 3),
        [kindergartens]
    );

    const pendingApplications = useMemo(
        () => applications.filter((item) => item.status === "pending").slice(0, 4),
        [applications]
    );

    return (
        <div className="AdminDashboard">
            <section className="AdminDashboard-card">
                <header>
                    <div>
                        <h2>{t("admin.dashboard.latestMainTitle")}</h2>
                        <p>{t("admin.dashboard.latestMainSubtitle")}</p>
                    </div>
                </header>
                <div className="AdminDashboard-grid">
                    {latestKindergartens.map((item) => (
                        <article key={item.id}>
                            <h3>{item.name}</h3>
                            <p><b>{t("kindergartens.director")}:</b> {item.director}</p>
                            <p><b>{t("kindergartens.address")}:</b> {item.address}</p>
                            <footer>
                                <span>{item.children} {t("admin.dashboard.childrenLabel")}</span>
                                <span>{item.staff} {t("admin.dashboard.staffLabel")}</span>
                            </footer>
                        </article>
                    ))}
                    {latestKindergartens.length === 0 && <div className="AdminDashboard-empty">{t("admin.dashboard.emptyMain")}</div>}
                </div>
            </section>

            <section className="AdminDashboard-card">
                <header>
                    <div>
                        <h2>{t("admin.dashboard.pendingTitle")}</h2>
                        <p>{t("admin.dashboard.pendingSubtitle")}</p>
                    </div>
                    <span className="AdminDashboard-pill">{stats.pendingApplications}</span>
                </header>
                <div className="AdminDashboard-grid">
                    {pendingApplications.map((item) => (
                        <article key={item.id}>
                            <h3>{item.guardian}</h3>
                            <p><b>{t("application.labels.child")}:</b> {item.childName}</p>
                            <p><b>{t("application.labels.location")}:</b> {item.location || "—"}</p>
                        </article>
                    ))}
                    {pendingApplications.length === 0 && <div className="AdminDashboard-empty">{t("admin.dashboard.emptyPending")}</div>}
                </div>
            </section>
        </div>
    );
}
