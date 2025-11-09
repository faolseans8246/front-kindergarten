import { useCrmData } from "../../context/CrmDataContext";
import { useI18n } from "../../context/I18nContext";
import "./AdminApplications.css";

export default function AdminApplications() {
    const { applications, approveApplication, rejectApplication } = useCrmData();
    const { t } = useI18n();
    const sorted = [...applications].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    return (
        <div className="AdminApplications">
            <header>
                <div>
                    <h2>{t("admin.applications.title")}</h2>
                    <p>{t("admin.applications.description")}</p>
                </div>
            </header>
            <div className="AdminApplications-table">
                <div className="AdminApplications-head">
                    <span>{t("admin.applications.columns.guardian")}</span>
                    <span>{t("admin.applications.columns.child")}</span>
                    <span>{t("admin.applications.columns.location")}</span>
                    <span>{t("admin.applications.columns.status")}</span>
                    <span>{t("admin.applications.columns.actions")}</span>
                </div>
                {sorted.map((app) => (
                    <div className="AdminApplications-row" key={app.id}>
                        <span>
                            <strong>{app.guardian}</strong>
                            <small>{app.phone}</small>
                        </span>
                        <span>{app.childName}</span>
                        <span>{app.location || "—"}</span>
                        <span>
                            <span className={`AdminApplications-badge ${app.status}`}>
                                {app.status === "pending" && t("common.statuses.pending")}
                                {app.status === "approved" && t("common.statuses.approved")}
                                {app.status === "rejected" && t("common.statuses.rejected")}
                            </span>
                        </span>
                        <span className="AdminApplications-actions">
                            <button onClick={() => approveApplication(app.id)} disabled={app.status !== "pending"}>{t("common.actions.approve")}</button>
                            <button onClick={() => rejectApplication(app.id)} disabled={app.status !== "pending"} className="danger">
                                {t("common.actions.reject")}
                            </button>
                        </span>
                    </div>
                ))}
                {sorted.length === 0 && <div className="AdminApplications-empty">{t("admin.applications.empty")}</div>}
            </div>
        </div>
    );
}
