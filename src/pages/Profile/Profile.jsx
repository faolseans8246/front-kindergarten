import { useAuth } from "../../context/AuthContext";
import { useCrmData } from "../../context/CrmDataContext";
import { useI18n } from "../../context/I18nContext";
import "./Profile.css";

export default function Profile() {
    const { user, role } = useAuth();
    const { stats } = useCrmData();
    const { t } = useI18n();

    return (
        <div className="Profile card">
            <h2>{t("profile.title")}</h2>
            <div className="Profile-grid">
                <section>
                    <h3>{t("profile.userSection")}</h3>
                    <p><b>{t("profile.fullName")}:</b> {user?.fullName || "—"}</p>
                    <p><b>{t("profile.phone")}:</b> {user?.phoneNumber || "—"}</p>
                    <p><b>{t("profile.role")}:</b> {role || "—"}</p>
                </section>
                <section>
                    <h3>{t("profile.statsSection")}</h3>
                    <p><b>{t("profile.mainCount")}:</b> {stats.totalMain}</p>
                    <p><b>{t("profile.branchCount")}:</b> {stats.totalBranches}</p>
                    <p><b>{t("profile.pendingCount")}:</b> {stats.pendingApplications}</p>
                </section>
            </div>
        </div>
    );
}
