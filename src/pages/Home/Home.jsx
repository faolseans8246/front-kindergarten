import ApplicationForm from "../../components/ApplicationForm";
import { useCrmData } from "../../context/CrmDataContext";
import "./Home.css";

const heroHighlights = [
    {
        title: "Bir xil platforma",
        description: "Admin, direktor, ustoz va ota-onalar uchun yagona boshqaruv oynasi"
    },
    {
        title: "Avtomatik jarayon",
        description: "Ariza tasdiqlansa, CRM o‘zi asosiy bog‘chani yaratadi"
    },
    {
        title: "Statistik nazorat",
        description: "Bolalar, guruhlar va filiallar soni real vaqt rejimida"
    }
];

const timeline = [
    "Telefon raqamingizni yuborasiz va Telegram orqali 4444 kodini tasdiqlaysiz",
    "Admin panelga kirib, mavjud arizalarni birgina tugma bilan tasdiqlaysiz",
    "Tasdiqlangan ariza CRM’da avtomatik asosiy bog‘cha sifatida yaratiladi",
    "Kerak bo‘lsa, shu yerdan filiallar ochasiz va video qo‘llanmalardan foydalanasiz"
];

const roleGuides = [
    {
        role: "Admin",
        text: "Asosiy bog‘cha va filiallarni yaratish, arizalarni tasdiqlash, statistikani kuzatish"
    },
    {
        role: "Direktor",
        text: "Guruhlar, tarbiyachilar va bolalar ustidan nazorat"
    },
    {
        role: "Ustoz",
        text: "Dars jadvali va kunlik hisobotlarni kiritish"
    },
    {
        role: "Ota-onalar",
        text: "Farzandingizning davomati va rivojlanishi bo‘yicha ma’lumotlarni olish"
    }
];

export default function Home() {
    const { stats, applications } = useCrmData();
    const pending = applications.filter((item) => item.status === "pending").slice(0, 3);

    return (
        <div className="Home">
            <section className="Home-hero card">
                <div className="Home-heroText">
                    <span className="Home-badge">Bolalar bog‘chasi uchun maxsus CRM</span>
                    <h1>
                        Arizadan tortib filialgacha — barchasi <span>bir joyda</span>
                    </h1>
                    <p>
                        Demo versiyada admin bo‘lib kirish uchun +998953900004 raqamini kiriting, Telegram orqali 4444 kodini tasdiqlang va
                        666666 PIN yordamida tizimga kiring. Keyingi barcha jarayonlar — ariza tasdiqlash, bog‘cha yaratish, filial qo‘shish
                        — avtomatik ishlaydi.
                    </p>
                    <div className="Home-heroGrid">
                        {heroHighlights.map((item) => (
                            <div className="Home-heroCard" key={item.title}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="Home-stats">
                    <div>
                        <strong>{stats.totalMain}</strong>
                        <span>Asosiy bog‘cha</span>
                    </div>
                    <div>
                        <strong>{stats.totalBranches}</strong>
                        <span>Filial</span>
                    </div>
                    <div>
                        <strong>{stats.totalChildren}</strong>
                        <span>Tarbiya oluvchilar</span>
                    </div>
                    <div>
                        <strong>{stats.pendingApplications}</strong>
                        <span>Kutilayotgan ariza</span>
                    </div>
                </div>
            </section>

            <section className="Home-application">
                <ApplicationForm />
                <div className="Home-timeline card">
                    <h3>Jarayon qanday ishlaydi?</h3>
                    <ol>
                        {timeline.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                    <div className="Home-infoBox">
                        Demo rejimida kiritilgan har bir ariza admin panelida darhol ko‘rinadi va tasdiqlansa avtomatik asosiy bog‘cha yaratiladi.
                    </div>
                </div>
            </section>

            <section className="Home-pending card">
                <h3>So‘nggi arizalar</h3>
                <p className="Home-muted">Admin panelida mana shu arizalar tasdiqlanishini kutmoqda.</p>
                <div className="Home-pendingGrid">
                    {pending.map((item) => (
                        <article key={item.id}>
                            <h4>{item.guardian}</h4>
                            <p><b>Hudud:</b> {item.location || "Ko‘rsatilmagan"}</p>
                            <p><b>Farzand:</b> {item.childName}</p>
                            <span className="Home-tag">Status: {item.status}</span>
                        </article>
                    ))}
                    {pending.length === 0 && (
                        <div className="Home-empty">Hozircha yangi arizalar yo‘q.</div>
                    )}
                </div>
            </section>

            <section className="Home-guides card">
                <h3>Video qo‘llanmalar kimlar uchun?</h3>
                <div className="Home-guidesGrid">
                    {roleGuides.map((item) => (
                        <div key={item.role}>
                            <h4>{item.role}</h4>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
                <p className="Home-muted">
                    Admin panelida har bir rol uchun alohida video qo‘llanma bloklari mavjud — kerakli yo‘riqnoma linkini joylash va yangilash mumkin.
                </p>
            </section>
        </div>
    );
}
