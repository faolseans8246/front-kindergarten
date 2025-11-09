import { useState } from "react";
import { useCrmData } from "../../context/CrmDataContext";
import "./AdminVideos.css";

const roles = [
    { key: "ADMIN", label: "Admin" },
    { key: "DIRECTOR", label: "Direktor" },
    { key: "TEACHER", label: "Ustoz" },
    { key: "PARENT", label: "Ota-ona" }
];

export default function AdminVideos() {
    const { videos, addVideo } = useCrmData();
    const [form, setForm] = useState({ role: "ADMIN", title: "", url: "", duration: "" });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!form.title || !form.url) return;
        addVideo(form.role, { title: form.title, url: form.url, duration: form.duration || "" });
        setForm({ role: form.role, title: "", url: "", duration: "" });
    };

    return (
        <div className="AdminVideos card">
            <h3>Video qo‘llanmalar</h3>
            <p className="AdminVideos-desc">
                Har bir rol uchun alohida video qo‘llanma linklarini joylang. Xodimlar tizimdan qanday foydalanishni tezda o‘rganishadi.
            </p>

            <form className="AdminVideos-form" onSubmit={handleSubmit}>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    {roles.map((role) => (
                        <option key={role.key} value={role.key}>{role.label}</option>
                    ))}
                </select>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Video nomi" />
                <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="YouTube yoki boshqa platforma havolasi" />
                <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="Davomiyligi (ixtiyoriy)" />
                <button type="submit">Qo‘shish</button>
            </form>

            <div className="AdminVideos-grid">
                {roles.map((role) => (
                    <section key={role.key}>
                        <header>
                            <h4>{role.label} uchun</h4>
                            <span>{videos[role.key]?.length || 0} ta video</span>
                        </header>
                        <div className="AdminVideos-list">
                            {(videos[role.key] || []).map((video) => (
                                <article key={video.id}>
                                    <h5>{video.title}</h5>
                                    {video.duration && <span className="AdminVideos-tag">{video.duration}</span>}
                                    <a href={video.url} target="_blank" rel="noreferrer">Videoni ochish</a>
                                </article>
                            ))}
                            {(videos[role.key] || []).length === 0 && (
                                <div className="AdminVideos-empty">Hozircha video qo‘llanma yo‘q</div>
                            )}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
