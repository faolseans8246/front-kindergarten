import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./LoginModal.css";

export default function LoginModal({ onClose }) {
    const { login } = useAuth();
    const [form, setForm] = useState({ username: "", password: "" });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setErr(null);
        setLoading(true);
        try {
            await login(form.username, form.password);
            onClose();
        } catch (e) {
            setErr(e?.response?.data || e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="LoginModal-backdrop" onClick={onClose}>
            <div className="LoginModal" onClick={e=>e.stopPropagation()}>
                <h3>Tizimga kirish</h3>
                <form onSubmit={submit} className="LoginModal-form">
                    <label>Username</label>
                    <input value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
                    <label>Password</label>
                    <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
                    {err && <div className="LoginModal-error">{typeof err === 'string' ? err : JSON.stringify(err)}</div>}
                    <div className="LoginModal-actions">
                        <button type="button" onClick={onClose}>Bekor qilish</button>
                        <button type="submit" disabled={loading}>{loading ? "Kirilmoqda..." : "Kirish"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
