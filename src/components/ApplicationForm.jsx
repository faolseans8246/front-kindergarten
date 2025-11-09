import { useState } from "react";
import { useCrmData } from "../context/CrmDataContext";
import "./ApplicationForm.css";

export default function ApplicationForm() {
    const { submitApplication } = useCrmData();
    const [form, setForm] = useState({
        guardian: "",
        phone: "",
        childName: "",
        location: "",
        notes: ""
    });
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!form.guardian || !form.phone || !form.childName) {
            setError("Ilova qoldirish uchun ota-ona ismi, telefon raqami va farzand ismi majburiy");
            return;
        }
        submitApplication(form);
        setSent(true);
        setError(null);
        setForm({ guardian: "", phone: "", childName: "", location: "", notes: "" });
    };

    return (
        <div className="ApplicationForm card">
            <h3>Bog‘cha ochish bo‘yicha ariza</h3>
            <p className="ApplicationForm-desc">
                CRM orqali bog‘cha ochish istagi bo‘lsa, quyidagi ma’lumotlarni yuboring. Admin tasdiqlaganidan so‘ng, sizning
                bog‘changiz tizimda asosiy bog‘cha sifatida yaratiladi va filiallar qo‘shish imkoniga ega bo‘lasiz.
            </p>
            <form onSubmit={handleSubmit} className="ApplicationForm-form">
                <label>Mas’ul shaxs</label>
                <input value={form.guardian} onChange={handleChange("guardian")} placeholder="Ism familiyangiz" />
                <label>Telefon raqami</label>
                <input value={form.phone} onChange={handleChange("phone")} placeholder="+998 9X XXX XX XX" />
                <label>Farzand yoki guruh nomi</label>
                <input value={form.childName} onChange={handleChange("childName")} placeholder="Masalan, Imron" />
                <label>Hudud</label>
                <input value={form.location} onChange={handleChange("location")} placeholder="Qaysi tuman/shahar" />
                <label>Qo‘shimcha izoh</label>
                <textarea value={form.notes} onChange={handleChange("notes")} rows={4} placeholder="Maqsadingiz yoki talablaringiz" />
                {error && <div className="ApplicationForm-error">{error}</div>}
                {sent && <div className="ApplicationForm-success">Arizangiz qabul qilindi. Admin tasdiqlashi bilan sizga bildirishnoma yuboriladi.</div>}
                <button type="submit">Ariza yuborish</button>
            </form>
        </div>
    );
}
