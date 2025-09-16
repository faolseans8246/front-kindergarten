import "./Home.css";
export default function Home() {
    return (
        <div className="Home card">
            <h2>Xush kelibsiz!</h2>
            <p>Bu tizimda Bog‘chalar, Direktor, O‘qituvchi (Teacher), Ota-ona (Parents) va Bolalar (Child) ma’lumotlari boshqariladi.</p>
            <ul>
                <li>Header orqali <b>Kirish</b> qiling (admin/admin123) → profil ma’lumotlari olinadi.</li>
                <li>“Bog‘chalar” menyusi orqali ro‘yxatni ko‘rish (token talab qiladi).</li>
                <li>ADMIN uchun: <code>/admin</code> — direktor/kindergarten CRUD va statuslar.</li>
                <li>DIREKTOR uchun: <code>/director</code> — staff/group/child CRUD va statuslar.</li>
            </ul>
        </div>
    );
}
