import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./LoginModal.css";

const ADMIN_PHONE = "+998953900004";
const OTP_CODE = "4444";
const ADMIN_PIN = "666666";

export default function LoginModal({ onClose }) {
    const { login } = useAuth();
    const [step, setStep] = useState("phone");
    const [phone, setPhone] = useState(ADMIN_PHONE);
    const [otp, setOtp] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const goToOtp = (e) => {
        e.preventDefault();
        if (!phone) {
            setError("Telefon raqamini kiriting");
            return;
        }
        if (phone !== ADMIN_PHONE) {
            setError("Bu demo uchun faqat +998953900004 raqami ruxsat etilgan");
            return;
        }
        setError(null);
        setStep("otp");
    };

    const goToPin = (e) => {
        e.preventDefault();
        if (otp !== OTP_CODE) {
            setError("Tasdiqlash kodi noto‘g‘ri. Telegram orqali yuborilgan 4444 kodini kiriting.");
            return;
        }
        setError(null);
        setStep("pin");
        setPin(ADMIN_PIN);
    };

    const submitPin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(phone, pin);
            onClose();
        } catch (err) {
            setError(err.message || "Kutilmagan xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="LoginModal-backdrop" onClick={onClose}>
            <div className="LoginModal" onClick={e=>e.stopPropagation()}>
                <h3>CRM tizimga kirish</h3>
                <p className="LoginModal-desc">
                    Demo maqsadida telefon raqami, Telegram orqali yuboriladigan kod va 6 xonali PIN allaqachon tayyorlangan.
                </p>

                <div className="LoginModal-steps">
                    <span className={step === "phone" ? "active" : ""}>1. Telefon</span>
                    <span className={step === "otp" ? "active" : ""}>2. Tasdiqlash</span>
                    <span className={step === "pin" ? "active" : ""}>3. PIN</span>
                </div>

                {step === "phone" && (
                    <form className="LoginModal-form" onSubmit={goToOtp}>
                        <label>Telefon raqami</label>
                        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Masalan, +998953900004" />
                        <small>Raqamni yuborish bilan Telegram orqali bir martalik kod generatsiya qilinadi.</small>
                        {error && <div className="LoginModal-error">{error}</div>}
                        <div className="LoginModal-actions">
                            <button type="button" onClick={onClose}>Bekor qilish</button>
                            <button type="submit">Kod yuborish</button>
                        </div>
                    </form>
                )}

                {step === "otp" && (
                    <form className="LoginModal-form" onSubmit={goToPin}>
                        <label>Telegram orqali kelgan kod</label>
                        <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="4444" />
                        <small>Tasdiqlash muvaffaqiyatli bo‘lsa, doimiy 6 xonali PINni kiritish sahifasiga o‘tasiz.</small>
                        {error && <div className="LoginModal-error">{error}</div>}
                        <div className="LoginModal-actions">
                            <button type="button" onClick={() => setStep("phone")}>Ortga</button>
                            <button type="submit">Tasdiqlash</button>
                        </div>
                    </form>
                )}

                {step === "pin" && (
                    <form className="LoginModal-form" onSubmit={submitPin}>
                        <label>6 xonali doimiy PIN</label>
                        <input value={pin} onChange={e => setPin(e.target.value)} placeholder="666666" maxLength={6} />
                        <small>Demo rejimida PIN kiritilgach, admin sifatida tizimga kirasiz.</small>
                        {error && <div className="LoginModal-error">{error}</div>}
                        <div className="LoginModal-actions">
                            <button type="button" onClick={() => setStep("otp")}>Ortga</button>
                            <button type="submit" disabled={loading}>{loading ? "Kirilmoqda..." : "Kirish"}</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
