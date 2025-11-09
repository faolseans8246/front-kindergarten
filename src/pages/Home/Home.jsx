import ApplicationForm from "../../components/ApplicationForm";
import { useCrmData } from "../../context/CrmDataContext";
import { useI18n } from "../../context/I18nContext";
import "./Home.css";

export default function Home() {
    const { t } = useI18n();
    const { stats, applications } = useCrmData();

    const hero = t("home.hero");
    const heroTitle = t("home.hero.title", { highlight: hero.highlight });
    const heroTitleParts = heroTitle.split(hero.highlight);
    const heroCards = hero.cards || [];
    const timeline = t("home.timeline.steps") || [];
    const guides = t("home.guides.roles") || [];
    const pending = applications.filter((item) => item.status === "pending").slice(0, 4);

    return (
        <div className="Home">
            <section className="Home-hero card">
                <div className="Home-heroCopy">
                    <span className="Home-badge">{hero.badge}</span>
                    <h1>
                        {heroTitleParts[0]}
                        <span>{hero.highlight}</span>
                        {heroTitleParts[1] || ""}
                    </h1>
                    <p>{hero.description}</p>
                    <div className="Home-heroCards">
                        {heroCards.map((item) => (
                            <article key={item.title}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
                <div className="Home-statsPanel">
                    <div className="Home-stat">
                        <strong>{stats.totalMain}</strong>
                        <span>{t("home.stats.main")}</span>
                    </div>
                    <div className="Home-stat">
                        <strong>{stats.totalBranches}</strong>
                        <span>{t("home.stats.branches")}</span>
                    </div>
                    <div className="Home-stat">
                        <strong>{stats.totalChildren}</strong>
                        <span>{t("home.stats.children")}</span>
                    </div>
                    <div className="Home-stat">
                        <strong>{stats.pendingApplications}</strong>
                        <span>{t("home.stats.pending")}</span>
                    </div>
                </div>
            </section>

            <section className="Home-application">
                <ApplicationForm />
                <div className="Home-timeline card">
                    <h3>{t("home.timeline.title")}</h3>
                    <ol>
                        {timeline.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                    <div className="Home-infoBox">{t("home.timeline.note")}</div>
                </div>
            </section>

            <section className="Home-pending card">
                <header>
                    <div>
                        <h3>{t("home.pending.title")}</h3>
                        <p>{t("home.pending.subtitle")}</p>
                    </div>
                    <span className="Home-pill">{t("home.pending.status")}</span>
                </header>
                <div className="Home-pendingGrid">
                    {pending.map((item) => (
                        <article key={item.id}>
                            <h4>{item.guardian}</h4>
                            <p>{item.childName}</p>
                            <span>{item.location || "—"}</span>
                        </article>
                    ))}
                    {pending.length === 0 && <div className="Home-empty">{t("home.pending.empty")}</div>}
                </div>
            </section>

            <section className="Home-guides card">
                <h3>{t("home.guides.title")}</h3>
                <p className="Home-muted">{t("home.guides.subtitle")}</p>
                <div className="Home-guidesGrid">
                    {guides.map((item) => (
                        <article key={item.role}>
                            <h4>{item.role}</h4>
                            <p>{item.text}</p>
                        </article>
                    ))}
                </div>
                <footer>{t("home.guides.footer")}</footer>
            </section>
        </div>
    );
}
