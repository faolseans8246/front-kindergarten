import { useState } from "react";
import { useCrmData } from "../../context/CrmDataContext";
import { useI18n } from "../../context/I18nContext";
import "./AdminVideos.css";

const roles = ["ADMIN", "DIRECTOR", "TEACHER", "PARENT"];

export default function AdminVideos() {
    const { videos, addVideo } = useCrmData();
    const { t } = useI18n();
    const [form, setForm] = useState({ role: "ADMIN", title: "", url: "", duration: "" });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!form.title || !form.url) return;
        addVideo(form.role, { title: form.title, url: form.url, duration: form.duration || "" });
        setForm({ role: form.role, title: "", url: "", duration: "" });
    };

    return (
        <div className="AdminVideos">
            <header>
                <div>
                    <h2>{t("admin.videos.title")}</h2>
                    <p>{t("admin.videos.description")}</p>
                </div>
            </header>

            <form className="AdminVideos-form" onSubmit={handleSubmit}>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    {roles.map((role) => (
                        <option key={role} value={role}>{t(`admin.videos.roles.${role}`)}</option>
                    ))}
                </select>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder={t("admin.videos.form.title")} />
                <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder={t("admin.videos.form.url")} />
                <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder={t("admin.videos.form.duration")} />
                <button type="submit">{t("common.actions.add")}</button>
            </form>

            <div className="AdminVideos-grid">
                {roles.map((role) => (
                    <section key={role}>
                        <header>
                            <h3>{t(`admin.videos.roles.${role}`)}</h3>
                            <span>{t("admin.videos.counts", { count: videos[role]?.length || 0 })}</span>
                        </header>
                        <div className="AdminVideos-list">
                            {(videos[role] || []).map((video) => (
                                <article key={video.id}>
                                    <div>
                                        <h4>{video.title}</h4>
                                        {video.duration && <span className="AdminVideos-tag">{video.duration}</span>}
                                    </div>
                                    <a href={video.url} target="_blank" rel="noreferrer">{t("admin.videos.open")}</a>
                                </article>
                            ))}
                            {(videos[role] || []).length === 0 && (
                                <div className="AdminVideos-empty">{t("admin.videos.empty")}</div>
                            )}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
