import { useMemo, useState } from "react";
import { useCrmData } from "../../context/CrmDataContext";
import "./AdminKindergartens.css";

export default function AdminKindergartens() {
    const { kindergartens, createMainKindergarten, createBranch, toggleKindergartenBlock } = useCrmData();
    const mainKindergartens = useMemo(() => kindergartens.filter((item) => item.status === "MAIN"), [kindergartens]);
    const branchKindergartens = useMemo(() => kindergartens.filter((item) => item.status === "BRANCH"), [kindergartens]);

    const [mainForm, setMainForm] = useState({ name: "", director: "", phone: "", address: "", notes: "" });
    const [branchForm, setBranchForm] = useState({ name: "", parentId: "", phone: "", address: "" });
    const [message, setMessage] = useState(null);

    const handleMainSubmit = (event) => {
        event.preventDefault();
        if (!mainForm.name || !mainForm.director || !mainForm.phone) {
            setMessage("Asosiy bog‘cha yaratish uchun nom, direktor va telefon shart");
            return;
        }
        createMainKindergarten(mainForm);
        setMainForm({ name: "", director: "", phone: "", address: "", notes: "" });
        setMessage("Asosiy bog‘cha yaratildi. Endi filial qo‘shishingiz mumkin.");
    };

    const handleBranchSubmit = (event) => {
        event.preventDefault();
        if (!branchForm.name || !branchForm.parentId) {
            setMessage("Filial yaratish uchun nom va asosiy bog‘cha tanlash majburiy");
            return;
        }
        createBranch(branchForm);
        setBranchForm({ name: "", parentId: "", phone: "", address: "" });
        setMessage("Filial qo‘shildi. Statistikalar avtomatik yangilandi.");
    };

    return (
        <div className="AdminKindergartens card">
            <h3>Asosiy bog‘cha va filiallarni boshqarish</h3>
            <p className="AdminKindergartens-desc">
                CRM ariza tasdiqlanganda asosiy bog‘chani avtomatik yaratadi. Istasangiz, qo‘lda ham yaratib, qo‘shimcha filiallar
                qo‘shishingiz mumkin.
            </p>

            <div className="AdminKindergartens-forms">
                <form onSubmit={handleMainSubmit}>
                    <h4>Asosiy bog‘cha yaratish</h4>
                    <input value={mainForm.name} onChange={(e) => setMainForm({ ...mainForm, name: e.target.value })} placeholder="Bog‘cha nomi" />
                    <input value={mainForm.director} onChange={(e) => setMainForm({ ...mainForm, director: e.target.value })} placeholder="Direktor" />
                    <input value={mainForm.phone} onChange={(e) => setMainForm({ ...mainForm, phone: e.target.value })} placeholder="Telefon" />
                    <input value={mainForm.address} onChange={(e) => setMainForm({ ...mainForm, address: e.target.value })} placeholder="Manzil" />
                    <textarea value={mainForm.notes} onChange={(e) => setMainForm({ ...mainForm, notes: e.target.value })} rows={3} placeholder="Qo‘shimcha izoh" />
                    <button type="submit">Asosiy bog‘cha yaratish</button>
                </form>

                <form onSubmit={handleBranchSubmit}>
                    <h4>Filial qo‘shish</h4>
                    <input value={branchForm.name} onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })} placeholder="Filial nomi" />
                    <select value={branchForm.parentId} onChange={(e) => setBranchForm({ ...branchForm, parentId: e.target.value })}>
                        <option value="">Asosiy bog‘chani tanlang</option>
                        {mainKindergartens.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <input value={branchForm.phone} onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })} placeholder="Telefon" />
                    <input value={branchForm.address} onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })} placeholder="Manzil" />
                    <button type="submit">Filial yaratish</button>
                </form>
            </div>

            {message && <div className="AdminKindergartens-message">{message}</div>}

            <section className="AdminKindergartens-lists">
                <div>
                    <h4>Asosiy bog‘chalar</h4>
                    <div className="AdminKindergartens-grid">
                        {mainKindergartens.map((item) => (
                            <article key={item.id}>
                                <header>
                                    <strong>{item.name}</strong>
                                    <button onClick={() => toggleKindergartenBlock(item.id)}>
                                        {item.blocked ? "Blokdan chiqarish" : "Bloklash"}
                                    </button>
                                </header>
                                <p><b>Direktor:</b> {item.director}</p>
                                <p><b>Telefon:</b> {item.phone}</p>
                                <p><b>Manzil:</b> {item.address}</p>
                                <footer>
                                    <span>{item.children} bola</span>
                                    <span>{item.staff} xodim</span>
                                </footer>
                            </article>
                        ))}
                        {mainKindergartens.length === 0 && <div className="AdminKindergartens-empty">Hozircha asosiy bog‘cha yo‘q</div>}
                    </div>
                </div>

                <div>
                    <h4>Filiallar</h4>
                    <div className="AdminKindergartens-grid">
                        {branchKindergartens.map((item) => (
                            <article key={item.id}>
                                <header>
                                    <strong>{item.name}</strong>
                                    <button onClick={() => toggleKindergartenBlock(item.id)}>
                                        {item.blocked ? "Blokdan chiqarish" : "Bloklash"}
                                    </button>
                                </header>
                                <p><b>Asosiy bog‘cha ID:</b> {item.parentId || "—"}</p>
                                <p><b>Telefon:</b> {item.phone || "Ko‘rsatilmagan"}</p>
                                <p><b>Manzil:</b> {item.address || "Ko‘rsatilmagan"}</p>
                            </article>
                        ))}
                        {branchKindergartens.length === 0 && <div className="AdminKindergartens-empty">Filiallar hali qo‘shilmagan</div>}
                    </div>
                </div>
            </section>
        </div>
    );
}
