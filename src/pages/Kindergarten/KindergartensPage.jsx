import { useMemo } from "react";
import { useCrmData } from "../../context/CrmDataContext";
import { useI18n } from "../../context/I18nContext";
import "./KindergartensPage.css";

export default function KindergartenList() {
    const { kindergartens } = useCrmData();
    const { t } = useI18n();
    const sorted = useMemo(() => [...kindergartens].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), [kindergartens]);

    return (
        <div className="KindergartenList card">
            <h2>{t("kindergartens.title")}</h2>
            <div className="KindergartenList-grid">
                {sorted.map((k) => (
                    <article key={k.id}>
                        <header>
                            <h3>{k.name}</h3>
                            {k.status === "BRANCH" && <span className="KindergartenList-pill">{t("common.statuses.branch")}</span>}
                        </header>
                        <dl>
                            <div>
                                <dt>{t("kindergartens.director")}</dt>
                                <dd>{k.director || "—"}</dd>
                            </div>
                            <div>
                                <dt>{t("kindergartens.phone")}</dt>
                                <dd>{k.phone || "—"}</dd>
                            </div>
                            <div>
                                <dt>{t("kindergartens.address")}</dt>
                                <dd>{k.address || "—"}</dd>
                            </div>
                            {k.parentId && (
                                <div>
                                    <dt>{t("kindergartens.parent")}</dt>
                                    <dd>{k.parentId}</dd>
                                </div>
                            )}
                        </dl>
                    </article>
                ))}
                {sorted.length === 0 && <div className="KindergartenList-empty">{t("kindergartens.empty")}</div>}
            </div>
        </div>
    );
}
