import { useEffect, useState } from "react";
import { getProfile, getMyBlockStatus } from "../../api/user";
import "./Profile.css";

export default function Profile() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(()=>{
        (async ()=>{
            try {
                const [p, s] = await Promise.all([getProfile(), getMyBlockStatus()]);
                setData(p); setStatus(s);
            } catch (e) { setErr(e?.response?.data || e.message); }
        })();
    },[]);

    return (
        <div className="Profile card">
            <h2>Mening profilim</h2>
            {err && <pre className="Profile-error">{JSON.stringify(err,null,2)}</pre>}
            {data && <pre className="Profile-pre">{JSON.stringify(data,null,2)}</pre>}
            {status && (
                <>
                    <h3>Blok holati</h3>
                    <pre className="Profile-pre">{JSON.stringify(status,null,2)}</pre>
                </>
            )}
        </div>
    );
}
