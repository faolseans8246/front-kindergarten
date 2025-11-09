import { useMemo, useState } from "react";
import { useCrmData } from "../../context/CrmDataContext";
import { useI18n } from "../../context/I18nContext";
import "./AdminKindergartens.css";

export default function AdminKindergartens() {
    const { kindergartens, createMainKindergarten, createBranch, toggleKindergartenBlock } = useCrmData();
    const { t } = useI18n();
    const mainKindergartens = useMemo(() => kindergartens.filter((item) => item.status === "MAIN"), [kindergartens]);
    const branchKindergartens = useMemo(() => kindergartens.filter((item) => item.status === "BRANCH"), [kindergartens]);

    const [mainForm, setMainForm] = useState({ name: "", director: "", phone: "", address: "", notes: "" });
    const [branchForm, setBranchForm] = useState({ name: "", parentId: "", phone: "", address: "" });
    const [feedback, setFeedback] = useState(null);

    const handleMainSubmit = (event) => {
        event.preventDefault();
        if (!mainForm.name || !mainForm.director || !mainForm.phone) {
            setFeedback({ type: "error", text: t("admin.kindergartens.messages.mainMissing") });
            return;
        }
        createMainKindergarten(mainForm);
        setMainForm({ name: "", director: "", phone: "", address: "", notes: "" });
        setFeedback({ type: "success", text: t("admin.kindergartens.messages.mainCreated") });
    };

    const handleBranchSubmit = (event) => {
        event.preventDefault();
        if (!branchForm.name || !branchForm.parentId) {
            setFeedback({ type: "error", text: t("admin.kindergartens.messages.branchMissing") });
            return;
        }
        createBranch(branchForm);
        setBranchForm({ name: "", parentId: "", phone: "", address: "" });
        setFeedback({ type: "success", text: t("admin.kindergartens.messages.branchCreated") });
    };

    return (
        <div className="AdminKindergartens">
            <header>
                <div>
                    <h2>{t("admin.kindergartens.title")}</h2>
                    <p>{t("admin.kindergartens.description")}</p>
                </div>
            </header>

            <div className="AdminKindergartens-forms">
                <form onSubmit={handleMainSubmit}>
                    <h3>{t("admin.kindergartens.mainForm.title")}</h3>
                    <input value={mainForm.name} onChange={(e) => setMainForm({ ...mainForm, name: e.target.value })} placeholder={t("admin.kindergartens.mainForm.name")} />
                    <input value={mainForm.director} onChange={(e) => setMainForm({ ...mainForm, director: e.target.value })} placeholder={t("admin.kindergartens.mainForm.director")} />
                    <input value={mainForm.phone} onChange={(e) => setMainForm({ ...mainForm, phone: e.target.value })} placeholder={t("admin.kindergartens.mainForm.phone")} />
                    <input value={mainForm.address} onChange={(e) => setMainForm({ ...mainForm, address: e.target.value })} placeholder={t("admin.kindergartens.mainForm.address")} />
                    <textarea value={mainForm.notes} onChange={(e) => setMainForm({ ...mainForm, notes: e.target.value })} rows={3} placeholder={t("admin.kindergartens.mainForm.notes")} />
                    <button type="submit">{t("common.actions.create")}</button>
                </form>

                <form onSubmit={handleBranchSubmit}>
                    <h3>{t("admin.kindergartens.branchForm.title")}</h3>
                    <input value={branchForm.name} onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })} placeholder={t("admin.kindergartens.branchForm.name")} />
                    <select value={branchForm.parentId} onChange={(e) => setBranchForm({ ...branchForm, parentId: e.target.value })}>
                        <option value="">{t("admin.kindergartens.branchForm.parent")}</option>
                        {mainKindergartens.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <input value={branchForm.phone} onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })} placeholder={t("admin.kindergartens.branchForm.phone")} />
                    <input value={branchForm.address} onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })} placeholder={t("admin.kindergartens.branchForm.address")} />
                    <button type="submit">{t("common.actions.add")}</button>
                </form>
            </div>

            {feedback && <div className={`AdminKindergartens-feedback ${feedback.type}`}>{feedback.text}</div>}

            <div className="AdminKindergartens-lists">
                <section>
                    <h3>{t("admin.kindergartens.lists.mains")}</h3>
                    <div className="AdminKindergartens-grid">
                        {mainKindergartens.map((item) => (
                            <article key={item.id}>
                                <header>
                                    <strong>{item.name}</strong>
                                    <button type="button" onClick={() => toggleKindergartenBlock(item.id)}>
                                        {item.blocked ? t("admin.kindergartens.actions.unblock") : t("admin.kindergartens.actions.block")}
                                    </button>
                                </header>
                                <p><b>{t("kindergartens.director")}:</b> {item.director}</p>
                                <p><b>{t("kindergartens.phone")}:</b> {item.phone}</p>
                                <p><b>{t("kindergartens.address")}:</b> {item.address}</p>
                                <footer>
                                    <span>{item.children} {t("admin.dashboard.childrenLabel")}</span>
                                    <span>{item.staff} {t("admin.dashboard.staffLabel")}</span>
                                </footer>
                            </article>
                        ))}
                        {mainKindergartens.length === 0 && <div className="AdminKindergartens-empty">{t("admin.kindergartens.lists.emptyMain")}</div>}
                    </div>
                </section>

                <section>
                    <h3>{t("admin.kindergartens.lists.branches")}</h3>
                    <div className="AdminKindergartens-grid">
                        {branchKindergartens.map((item) => (
                            <article key={item.id}>
                                <header>
                                    <strong>{item.name}</strong>
                                    <button type="button" onClick={() => toggleKindergartenBlock(item.id)}>
                                        {item.blocked ? t("admin.kindergartens.actions.unblock") : t("admin.kindergartens.actions.block")}
                                    </button>
                                </header>
                                <p><b>{t("kindergartens.parent")}:</b> {item.parentId || "—"}</p>
                                <p><b>{t("kindergartens.phone")}:</b> {item.phone || "—"}</p>
                                <p><b>{t("kindergartens.address")}:</b> {item.address || "—"}</p>
                            </article>
                        ))}
                        {branchKindergartens.length === 0 && <div className="AdminKindergartens-empty">{t("admin.kindergartens.lists.emptyBranch")}</div>}
                    </div>
                </section>
            </div>
        </div>
    );
}
