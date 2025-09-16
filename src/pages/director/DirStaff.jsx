import { useEffect, useState } from "react";
import { dirCreateStaff, dirBlockStaff, dirUnblockStaff, dirReassignStaff, dirStatusMe } from "../../api/director";
import { getBranches, getKindergartenById } from "../../api/kindergarten";
import "./DirStaff.css";

export default function DirStaff() {
    const [dto, setDto] = useState({ firstname: "", lastname: "", phoneNumber: "", roles: "" });
    const [kgOptions, setKgOptions] = useState([]);
    const [kindergartenId, setKindergartenId] = useState("");
    const [res, setRes] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const me = await dirStatusMe(); // {kindergarten: {resourceId|id: ...}}
                const mainId = me?.kindergarten?.resourceId || me?.kindergarten?.id;
                if (!mainId) return;

                const main = await getKindergartenById(mainId);
                const branches = await getBranches(mainId);
                const list = [{ id: main.id, name: main.name, subName: main.subName }, ...branches];
                setKgOptions(list);
            } catch (e) {
                setErr(e?.response?.data || e.message);
            }
        })();
    }, []);

    const createStaff = async () => {
        setErr(null);
        if (!kindergartenId) return setErr("Bog‘cha tanlanmagan.");
        try {
            const r = await dirCreateStaff(kindergartenId, dto);
            setRes(r);
        } catch (e) { setErr(e?.response?.data || e.message); }
    };

    const block = async () => {
        if (!res?.id) return;
        try { const r = await dirBlockStaff(res.id); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };

    const unblock = async () => {
        if (!res?.id) return;
        try { const r = await dirUnblockStaff(res.id); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };

    const reassign = async (toKgId) => {
        if (!res?.id) return;
        try { const r = await dirReassignStaff(res.id, toKgId); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };

    return (
        <div className="DirStaff card">
            <h3>Xodim yaratish</h3>

            <div className="row">
                <label>Bog‘cha</label>
                <select className="DirStaff-input" value={kindergartenId} onChange={e => setKindergartenId(e.target.value)}>
                    <option value="">— Bog‘cha tanlang —</option>
                    {kgOptions.map(k => (
                        <option key={k.id} value={k.id}>
                            {k.name}{k.subName ? ` — ${k.subName}` : ""}
                        </option>
                    ))}
                </select>

                <input className="DirStaff-input" placeholder="Ism" value={dto.firstname}
                       onChange={e => setDto({ ...dto, firstname: e.target.value })}/>
                <input className="DirStaff-input" placeholder="Familiya" value={dto.lastname}
                       onChange={e => setDto({ ...dto, lastname: e.target.value })}/>
                <input className="DirStaff-input" placeholder="Telefon" value={dto.phoneNumber}
                       onChange={e => setDto({ ...dto, phoneNumber: e.target.value })}/>
                <select className="DirStaff-input" value={dto.roles} onChange={e => setDto({ ...dto, roles: e.target.value })}>
                    <option value="TEACHER">TEACHER</option>
                    <option value="PARENTS">PARENTS</option>
                </select>

                <button className="DirStaff-btn" onClick={createStaff}>Yaratish</button>
            </div>

            {res && <pre className="DirStaff-pre">{JSON.stringify(res, null, 2)}</pre>}
            {res?.id && (
                <div className="row">
                    <button onClick={block}>Bloklash</button>
                    <button onClick={unblock}>Blokdan chiqarish</button>

                    <label>— Boshqa bog‘chaga ko‘chirish —</label>
                    <select className="DirStaff-input" onChange={e => e.target.value && reassign(e.target.value)} defaultValue="">
                        <option value="" disabled>— Yangi bog‘cha tanlang —</option>
                        {kgOptions.map(k => (
                            <option key={k.id} value={k.id}>
                                {k.name}{k.subName ? ` — ${k.subName}` : ""}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {err && <div className="DirStaff-err">{String(typeof err === "string" ? err : JSON.stringify(err))}</div>}
        </div>
    );
}
