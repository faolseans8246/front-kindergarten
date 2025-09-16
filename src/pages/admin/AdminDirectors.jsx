import { useState } from "react";
import { adminCreateDirector, adminBlockDirector, adminUnblockDirector } from "../../api/admin";
import "./AdminDirectors.css";

export default function AdminDirectors() {
    const [dto, setDto] = useState({ firstname:"", lastname:"", phoneNumber:"" });
    const [created, setCreated] = useState(null);
    const [last, setLast] = useState(null);
    const [err, setErr] = useState(null);

    const submit = async () => {
        setErr(null);
        try {
            const res = await adminCreateDirector(dto);
            setCreated(res);
        } catch (e) {
            setErr(e?.response?.data || e.message);
        }
    };

    const block = async (id) => {
        try { const r = await adminBlockDirector(id, "policy"); setLast(r); }
        catch(e) { setErr(e?.response?.data || e.message); }
    };
    const unblock = async (id) => {
        try { const r = await adminUnblockDirector(id); setLast(r); }
        catch(e) { setErr(e?.response?.data || e.message); }
    };

    return (
        <div className="AdminDirectors card">
            <h3>Direktor yaratish</h3>
            <div className="row">
                <input className="AdminDirectors-input" placeholder="Ism" value={dto.firstname} onChange={e=>setDto({...dto, firstname:e.target.value})}/>
                <input className="AdminDirectors-input" placeholder="Familiya" value={dto.lastname} onChange={e=>setDto({...dto, lastname:e.target.value})}/>
                <input className="AdminDirectors-input" placeholder="Telefon (+998...)" value={dto.phoneNumber} onChange={e=>setDto({...dto, phoneNumber:e.target.value})}/>
                <button className="AdminDirectors-btn" onClick={submit}>Yaratish</button>
            </div>
            {created && (
                <>
                    <h4>Yaratilgan</h4>
                    <pre className="AdminDirectors-pre">{JSON.stringify(created,null,2)}</pre>
                    <div className="row">
                        <button onClick={()=>block(created.id)}>Bloklash</button>
                        <button onClick={()=>unblock(created.id)}>Blokdan chiqarish</button>
                    </div>
                </>
            )}
            {last && <pre className="AdminDirectors-pre">{JSON.stringify(last,null,2)}</pre>}
            {err && <div className="AdminDirectors-err">{JSON.stringify(err)}</div>}
        </div>
    );
}
