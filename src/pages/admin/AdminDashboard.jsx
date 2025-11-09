import { useMemo } from "react";
import { useCrmData } from "../../context/CrmDataContext";
import "./AdminDashboard.css";

export default function AdminDashboard() {
    const { stats, kindergartens, applications } = useCrmData();

    const latestKindergartens = useMemo(
        () => kindergartens.filter((item) => item.status === "MAIN").slice(0, 3),
        [kindergartens]
    );

    const pendingApplications = useMemo(
        () => applications.filter((item) => item.status === "pending").slice(0, 4),
        [applications]
    );

    return (
        <div className="AdminDashboard card">
            <header className="AdminDashboard-header">
                <div>
                    <h2>Admin boshqaruv paneli</h2>
                    <p>CRM barcha jarayonlarni bir joyda to‘plab, arizadan filialgacha bo‘lgan bosqichlarni avtomatlashtiradi.</p>
                </div>
                <div className="AdminDashboard-pill">Telegram OTP ➜ 4444 | Doimiy PIN ➜ 666666</div>
            </header>

            <section className="AdminDashboard-stats">
                <article>
                    <strong>{stats.totalMain}</strong>
                    <span>Asosiy bog‘cha</span>
                </article>
                <article>
                    <strong>{stats.totalBranches}</strong>
                    <span>Filiallar</span>
                </article>
                <article>
                    <strong>{stats.totalChildren}</strong>
                    <span>Bolalar soni</span>
                </article>
                <article>
                    <strong>{stats.pendingApplications}</strong>
                    <span>Kutilayotgan ariza</span>
                </article>
            </section>

            <section className="AdminDashboard-grid">
                <div>
                    <h3>Oxirgi asosiy bog‘chalar</h3>
                    <p className="AdminDashboard-muted">
                        Ariza tasdiqlanganda asosiy bog‘cha avtomatik yaratiladi. Istasangiz, shu yerdan filial qo‘shish mumkin.
                    </p>
                    <div className="AdminDashboard-list">
                        {latestKindergartens.map((item) => (
                            <article key={item.id}>
                                <h4>{item.name}</h4>
                                <p><b>Direktor:</b> {item.director}</p>
                                <p><b>Hudud:</b> {item.address}</p>
                            </article>
                        ))}
                        {latestKindergartens.length === 0 && <div className="AdminDashboard-empty">Hozircha ma’lumot yo‘q</div>}
                    </div>
                </div>

                <div>
                    <h3>Tasdiqlash kutilayotgan arizalar</h3>
                    <p className="AdminDashboard-muted">Tasdiqlash tugmasini bosishingiz bilan bog‘cha tizimda yaratiladi.</p>
                    <div className="AdminDashboard-list">
                        {pendingApplications.map((item) => (
                            <article key={item.id}>
                                <h4>{item.guardian}</h4>
                                <p><b>Farzand:</b> {item.childName}</p>
                                <p><b>Hudud:</b> {item.location || "Ko‘rsatilmagan"}</p>
                            </article>
                        ))}
                        {pendingApplications.length === 0 && <div className="AdminDashboard-empty">Barcha arizalar ko‘rib chiqildi</div>}
                    </div>
                </div>
            </section>
        </div>
    );
}
