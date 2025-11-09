import { useMemo } from "react";
import { useCrmData } from "../../context/CrmDataContext";
import "./KindergartensPage.css";

export default function KindergartenList() {
    const { kindergartens } = useCrmData();
    const sorted = useMemo(() => [...kindergartens].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), [kindergartens]);

    return (
        <div className="KindergartenList card">
            <h2>Barcha bog'chalar</h2>
            <div className="row">
                {sorted.map(k=>(
                    <div className="KindergartenList-item card" key={k.id} style={{flex:"1 1 320px"}}>
                        <div className="KindergartenList-name">
                            {k.name}
                            {k.status === "BRANCH" && <span className="KindergartenList-pill">Filial</span>}
                        </div>
                        <div className="KindergartenList-meta">
                            <div><b>Direktor:</b> {k.director || "—"}</div>
                            <div><b>Telefon:</b> {k.phone || "—"}</div>
                            <div><b>Manzil:</b> {k.address || "—"}</div>
                            {k.parentId && <div><b>Asosiy bog‘cha ID:</b> {k.parentId}</div>}
                        </div>
                    </div>
                ))}
                {sorted.length===0 && <i>Hali bog‘chalar yo‘q.</i>}
            </div>
        </div>
    );
}
