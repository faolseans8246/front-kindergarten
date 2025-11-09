import { useAuth } from "../../context/AuthContext";
import { useCrmData } from "../../context/CrmDataContext";
import "./Profile.css";

export default function Profile() {
    const { user, role } = useAuth();
    const { stats } = useCrmData();

    return (
        <div className="Profile card">
            <h2>Profil ma’lumotlari</h2>
            <div className="Profile-grid">
                <div>
                    <h3>Foydalanuvchi</h3>
                    <p><b>Ism familiya:</b> {user?.fullName || "Anonim"}</p>
                    <p><b>Telefon:</b> {user?.phoneNumber || "—"}</p>
                    <p><b>Rol:</b> {role || "—"}</p>
                </div>
                <div>
                    <h3>CRM statistikasi</h3>
                    <p><b>Asosiy bog‘chalar:</b> {stats.totalMain}</p>
                    <p><b>Filiallar:</b> {stats.totalBranches}</p>
                    <p><b>Kutilayotgan arizalar:</b> {stats.pendingApplications}</p>
                </div>
            </div>
        </div>
    );
}
