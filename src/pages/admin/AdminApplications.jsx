import { useCrmData } from "../../context/CrmDataContext";
import "./AdminApplications.css";

export default function AdminApplications() {
    const { applications, approveApplication, rejectApplication } = useCrmData();
    const sorted = [...applications].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    return (
        <div className="AdminApplications card">
            <h3>Kelgan arizalar</h3>
            <p className="AdminApplications-desc">
                Har bir ariza tasdiqlansa, CRM avtomatik tarzda asosiy bog‘cha yaratadi va direktor sifatida mas’ul shaxsni belgilaydi.
            </p>
            <div className="AdminApplications-table">
                <div className="AdminApplications-row AdminApplications-head">
                    <span>Mas’ul shaxs</span>
                    <span>Farzand</span>
                    <span>Hudud</span>
                    <span>Status</span>
                    <span>Amal</span>
                </div>
                {sorted.map((app) => (
                    <div className="AdminApplications-row" key={app.id}>
                        <span>
                            <strong>{app.guardian}</strong>
                            <small>{app.phone}</small>
                        </span>
                        <span>{app.childName}</span>
                        <span>{app.location || "Ko‘rsatilmagan"}</span>
                        <span>
                            <span className={`AdminApplications-badge ${app.status}`}>
                                {app.status === "pending" && "Kutilmoqda"}
                                {app.status === "approved" && "Tasdiqlandi"}
                                {app.status === "rejected" && "Rad etildi"}
                            </span>
                        </span>
                        <span className="AdminApplications-actions">
                            <button onClick={() => approveApplication(app.id)} disabled={app.status !== "pending"}>Tasdiqlash</button>
                            <button onClick={() => rejectApplication(app.id)} disabled={app.status !== "pending"} className="danger">
                                Rad etish
                            </button>
                        </span>
                    </div>
                ))}
                {sorted.length === 0 && <div className="AdminApplications-empty">Hozircha arizalar yo‘q</div>}
            </div>
        </div>
    );
}
