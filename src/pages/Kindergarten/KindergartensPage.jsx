import { useEffect, useState } from "react";
import { getAllKindergartens } from "../../api/kindergarten";
import "./KindergartensPage.css";

export default function KindergartenList() {
    const [items, setItems] = useState([]);
    const [err, setErr] = useState(null);

    useEffect(()=>{
        getAllKindergartens()
            .then(setItems)
            .catch(e=> setErr(e?.response?.data || e.message));
    },[]);

    return (
        <div className="KindergartenList card">
            <h2>Barcha bog'chalar</h2>
            {err && <div className="KindergartenList-error">{JSON.stringify(err)}</div>}
            <div className="row">
                {items.map(k=>(
                    <div className="KindergartenList-item card" key={k.id} style={{flex:"1 1 320px"}}>
                        <div className="KindergartenList-name">
                            {k.name} {k.subName ? `— ${k.subName}` : ""}
                        </div>
                        <div className="KindergartenList-meta">
                            <div>Email: {k.email}</div>
                            <div>Tel: {k.phone}</div>
                            <div>Tur: {k.type}</div>
                        </div>
                    </div>
                ))}
                {items.length===0 && !err && <i>Hali bog‘chalar yo‘q.</i>}
            </div>
        </div>
    );
}
