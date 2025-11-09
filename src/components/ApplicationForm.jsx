import { useState } from "react";
import { useCrmData } from "../context/CrmDataContext";
import { useI18n } from "../context/I18nContext";
import "./ApplicationForm.css";

export default function ApplicationForm() {
    const { submitApplication } = useCrmData();
    const { t } = useI18n();
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
            setError(t("application.error"));
            return;
        }
        submitApplication(form);
        setSent(true);
        setError(null);
        setForm({ guardian: "", phone: "", childName: "", location: "", notes: "" });
    };

    return (
        <div className="ApplicationForm card">
            <h3>{t("application.title")}</h3>
            <p className="ApplicationForm-desc">{t("application.description")}</p>
            <form onSubmit={handleSubmit} className="ApplicationForm-form">
                <label>{t("application.labels.guardian")}</label>
                <input value={form.guardian} onChange={handleChange("guardian")} placeholder={t("application.placeholders.guardian")} />
                <label>{t("application.labels.phone")}</label>
                <input value={form.phone} onChange={handleChange("phone")} placeholder={t("application.placeholders.phone")} />
                <label>{t("application.labels.child")}</label>
                <input value={form.childName} onChange={handleChange("childName")} placeholder={t("application.placeholders.child")} />
                <label>{t("application.labels.location")}</label>
                <input value={form.location} onChange={handleChange("location")} placeholder={t("application.placeholders.location")} />
                <label>{t("application.labels.notes")}</label>
                <textarea value={form.notes} onChange={handleChange("notes")} rows={4} placeholder={t("application.placeholders.notes")} />
                {error && <div className="ApplicationForm-error">{error}</div>}
                {sent && <div className="ApplicationForm-success">{t("application.success")}</div>}
                <button type="submit">{t("application.submit")}</button>
            </form>
        </div>
    );
}
