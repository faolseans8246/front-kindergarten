import { useEffect, useMemo, useState } from "react";
import { adminCreateKindergarten, adminBlockKindergarten, adminUnblockKindergarten, adminCreateDirector } from "../../api/admin";
import { getUsers } from "../../api/user";
import { getMainKindergartens } from "../../api/kindergarten";
import "./AdminKindergartens.css";

/** MAIN yaratish: director tanlanishi shart (directorId).
 *  BRANCH yaratish: parentKindergartenId va subName shart.
 *  Bazada direktor/main yo‘q bo‘lishi ham mumkin — inline “tezkor yaratish” qo‘shildi.
 */
export default function AdminKindergartens() {
    const [dto, setDto] = useState({
        id: null,
        name: "",
        subName: null,
        email: "",
        phone: "",
        type: "",
        address: { country: "", region: "", city: "", street: "", house: "" },
        locations: { latitude: 41.31, longitude: 69.24 },
        directorId: null,
        parentKindergartenId: null
    });

    const [directors, setDirectors] = useState([]);
    const [mains, setMains] = useState([]);
    const [res, setRes] = useState(null);
    const [err, setErr] = useState(null);
    const [busy, setBusy] = useState(false);

    // Tezkor direktor yaratish (baza bo‘sh bo‘lsa)
    const [quickDir, setQuickDir] = useState({ firstname: "", lastname: "", phoneNumber: "" });
    const [creatingDir, setCreatingDir] = useState(false);

    const mode = useMemo(() => (dto.parentKindergartenId ? "BRANCH" : "MAIN"), [dto.parentKindergartenId]);

    const refreshLists = async () => {
        setErr(null);
        try {
            const users = await getUsers();
            setDirectors(users.filter(u => u.roles === "DIRECTOR"));
            const mainKgs = await getMainKindergartens();
            setMains(mainKgs);
        } catch (e) {
            setErr(e?.response?.data || e.message);
        }
    };

    useEffect(() => { refreshLists(); }, []);

    const canCreate = useMemo(() => {
        if (mode === "MAIN") {
            return !!dto.name && !!dto.email && !!dto.phone && !!dto.type && !!dto.directorId;
        } else {
            // BRANCH
            return !!dto.name && !!dto.email && !!dto.phone && !!dto.type && !!dto.parentKindergartenId && !!dto.subName;
        }
    }, [mode, dto]);

    const submit = async () => {
        if (!canCreate) {
            setErr(mode === "MAIN"
                ? "Asosiy bog‘cha uchun direktor tanlang (yoki pastdan yangisini yarating)."
                : "Filial uchun asosiy bog‘cha va filial nomini (subName) tanlang.");
            return;
        }
        setBusy(true); setErr(null);
        try {
            const payload = { ...dto };
            if (mode === "MAIN") {
                payload.parentKindergartenId = null;
                payload.subName = dto.subName || null; // optional
            } else {
                payload.directorId = null; // filialda direktor tanlanmaydi
            }
            const r = await adminCreateKindergarten(payload);
            setRes(r);
            // Ro‘yxatlarni yangilab qo‘yamiz
            await refreshLists();
        } catch (e) {
            setErr(e?.response?.data || e.message);
        } finally {
            setBusy(false);
        }
    };

    const block = async () => {
        if (!res?.id) return;
        try { const r = await adminBlockKindergarten(res.id, "policy"); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };
    const unblock = async () => {
        if (!res?.id) return;
        try { const r = await adminUnblockKindergarten(res.id); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };

    const createQuickDirector = async () => {
        if (!quickDir.firstname || !quickDir.lastname || !quickDir.phoneNumber) {
            setErr("Direktor yaratish uchun ism, familiya va telefon shart.");
            return;
        }
        setCreatingDir(true); setErr(null);
        try {
            const created = await adminCreateDirector(quickDir);
            // Direktorni ro‘yxatga qo‘shamiz va tanlab qo‘yamiz
            setDirectors(prev => [{ ...created }, ...prev]);
            setDto(d => ({ ...d, directorId: created.id, parentKindergartenId: null }));
            // Forma tozalanadi
            setQuickDir({ firstname: "", lastname: "", phoneNumber: "" });
        } catch (e) {
            setErr(e?.response?.data || e.message);
        } finally {
            setCreatingDir(false);
        }
    };

    return (
        <div className="AdminKindergartens card">
            <h3>Bog‘cha yaratish</h3>

            <div className="row">
                <input className="AdminKindergartens-input" placeholder="name"
                       value={dto.name} onChange={e => setDto({ ...dto, name: e.target.value })} />
                <input className="AdminKindergartens-input" placeholder="subName (filial bo‘lsa)"
                       value={dto.subName || ""} onChange={e => setDto({ ...dto, subName: e.target.value || null })} />
                <input className="AdminKindergartens-input" placeholder="email"
                       value={dto.email} onChange={e => setDto({ ...dto, email: e.target.value })} />
                <input className="AdminKindergartens-input" placeholder="phone"
                       value={dto.phone} onChange={e => setDto({ ...dto, phone: e.target.value })} />
                <select className="AdminKindergartens-input" value={dto.type}
                        onChange={e => setDto({ ...dto, type: e.target.value })}>
                    <option value="XUSUSIY">XUSUSIY</option>
                    <option value="DAVLAT">DAVLAT</option>
                </select>
            </div>

            <div className="row" style={{ gap: 16 }}>
                <div><b>Rejim:</b> {mode === "MAIN" ? "Asosiy bog‘cha" : "Filial"}</div>
                <small>(Direktor tanlansa — MAIN, Asosiy bog‘cha tanlansa — BRANCH rejimi ishlaydi)</small>
            </div>

            {/* Direktor — MAIN uchun */}
            <div className="row">
                <label>Direktor (MAIN uchun)</label>
                <select
                    className="AdminKindergartens-input"
                    value={dto.directorId || ""}
                    onChange={e => setDto({ ...dto, directorId: e.target.value || null, parentKindergartenId: null })}
                >
                    <option value="">— Direktor tanlang —</option>
                    {directors.map(d => (
                        <option key={d.id} value={d.id}>
                            {d.firstname} {d.lastname} {d.username ? `(@${d.username})` : ""} {d.phoneNumber ? `— ${d.phoneNumber}` : ""}
                        </option>
                    ))}
                </select>
            </div>

            {/* Agar direktorlar yo‘q bo‘lsa — tezkor yaratish */}
            {directors.length === 0 && (
                <div className="row" style={{ alignItems: "flex-end", gap: 8 }}>
                    <div style={{ fontWeight: 600 }}>Direktorlar topilmadi — tezkor yarating:</div>
                    <input className="AdminKindergartens-input" placeholder="Ism"
                           value={quickDir.firstname} onChange={e => setQuickDir({ ...quickDir, firstname: e.target.value })} />
                    <input className="AdminKindergartens-input" placeholder="Familiya"
                           value={quickDir.lastname} onChange={e => setQuickDir({ ...quickDir, lastname: e.target.value })} />
                    <input className="AdminKindergartens-input" placeholder="Telefon (+998...)"
                           value={quickDir.phoneNumber} onChange={e => setQuickDir({ ...quickDir, phoneNumber: e.target.value })} />
                    <button className="AdminKindergartens-btn" onClick={createQuickDirector} disabled={creatingDir}>
                        {creatingDir ? "Yaratilmoqda..." : "Direktor yaratish"}
                    </button>
                </div>
            )}

            {/* Asosiy bog‘cha — BRANCH uchun */}
            <div className="row">
                <label>Asosiy bog‘cha (FILIAL uchun)</label>
                <select
                    className="AdminKindergartens-input"
                    value={dto.parentKindergartenId || ""}
                    onChange={e => setDto({ ...dto, parentKindergartenId: e.target.value || null, directorId: null })}
                >
                    <option value="">— Asosiy bog‘cha tanlang —</option>
                    {mains.map(k => (
                        <option key={k.id} value={k.id}>
                            {k.name}{k.subName ? ` — ${k.subName}` : ""}
                        </option>
                    ))}
                </select>
            </div>
            {mode === "BRANCH" && mains.length === 0 && (
                <div className="AdminKindergartens-err">
                    Avval <b>asosiy bog‘cha</b> yarating (direktor bilan), shundan keyin filial qo‘shish mumkin.
                </div>
            )}

            <button className="AdminKindergartens-btn" onClick={submit} disabled={!canCreate || busy}>
                {busy ? "Saqlanmoqda..." : "Yaratish"}
            </button>

            {res && <pre className="AdminKindergartens-pre">{JSON.stringify(res, null, 2)}</pre>}
            {res?.id && (
                <div className="row">
                    <button onClick={block}>Bloklash</button>
                    <button onClick={unblock}>Blokdan chiqarish</button>
                </div>
            )}
            {err && <div className="AdminKindergartens-err">{String(typeof err === "string" ? err : JSON.stringify(err))}</div>}
        </div>
    );
}
