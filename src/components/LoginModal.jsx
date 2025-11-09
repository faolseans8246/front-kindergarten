import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../context/I18nContext";
import "./LoginModal.css";

const ADMIN_PHONE = "+998953900004";
const OTP_CODE = "4444";
const ADMIN_PIN = "666666";
const keypad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export default function LoginModal({ onClose }) {
    const { login } = useAuth();
    const { t } = useI18n();
    const [step, setStep] = useState("phone");
    const [phone, setPhone] = useState(ADMIN_PHONE);
    const [otp, setOtp] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const goToOtp = (e) => {
        e.preventDefault();
        if (!phone) {
            setError(t("login.errors.phoneRequired"));
            return;
        }
        if (phone !== ADMIN_PHONE) {
            setError(t("login.errors.phoneMismatch"));
            return;
        }
        setError(null);
        setStep("otp");
    };

    const goToPin = (e) => {
        e.preventDefault();
        if (otp !== OTP_CODE) {
            setError(t("login.errors.otpMismatch"));
            return;
        }
        setError(null);
        setStep("pin");
        setPin("");
    };

    const submitPin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        if (pin !== ADMIN_PIN) {
            setLoading(false);
            setError(t("login.errors.pinMismatch"));
            return;
        }
        try {
            await login(phone, pin);
            onClose();
        } catch (err) {
            if (err?.code === "INVALID_CREDENTIALS" || err?.message === "INVALID_CREDENTIALS") {
                setError(t("login.errors.pinMismatch"));
            } else {
                setError(err?.message || t("login.errors.generic"));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeypad = useCallback((digit) => {
        if (loading) return;
        setPin((prev) => {
            if (prev.length >= 6) return prev;
            return `${prev}${digit}`;
        });
    }, [loading]);

    const handleBackspace = useCallback(() => {
        if (loading) return;
        setPin((prev) => prev.slice(0, -1));
    }, [loading]);

    const digits = pin.padEnd(6, " ").split("");

    useEffect(() => {
        if (step !== "pin") return;
        const handleKey = (event) => {
            if (/^[0-9]$/.test(event.key)) {
                event.preventDefault();
                handleKeypad(event.key);
            } else if (event.key === "Backspace") {
                event.preventDefault();
                handleBackspace();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [step, handleKeypad, handleBackspace]);

    return (
        <div className="LoginModal-backdrop" onClick={onClose}>
            <div className="LoginModal" onClick={e=>e.stopPropagation()}>
                <div className="LoginModal-visual">
                    <div className="LoginModal-illustration">
                        <div className="LoginModal-circle" />
                        <div className="LoginModal-phone">
                            <div className="LoginModal-screen">
                                <span />
                                <div />
                            </div>
                            <div className="LoginModal-hand" />
                        </div>
                    </div>
                    <div className="LoginModal-helper">{t("login.helper")}</div>
                </div>

                <div className="LoginModal-panel">
                    <header className="LoginModal-header">
                        <h3>{t("login.title")}</h3>
                        <p>{t("login.subtitle")}</p>
                        <div className="LoginModal-steps">
                            <span className={step === "phone" ? "active" : ""}>1. {t("login.steps.phone")}</span>
                            <span className={step === "otp" ? "active" : ""}>2. {t("login.steps.otp")}</span>
                            <span className={step === "pin" ? "active" : ""}>3. {t("login.steps.pin")}</span>
                        </div>
                    </header>

                    {step === "phone" && (
                        <form className="LoginModal-form" onSubmit={goToOtp}>
                            <label>{t("login.phone.label")}</label>
                            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder={t("login.phone.placeholder")} />
                            <small>{t("login.phone.hint")}</small>
                            {error && <div className="LoginModal-error">{error}</div>}
                            <div className="LoginModal-actions">
                                <button type="button" onClick={onClose}>{t("common.actions.cancel")}</button>
                                <button type="submit">{t("login.actions.request")}</button>
                            </div>
                        </form>
                    )}

                    {step === "otp" && (
                        <form className="LoginModal-form" onSubmit={goToPin}>
                            <label>{t("login.otp.label")}</label>
                            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder={t("login.otp.placeholder")} />
                            <small>{t("login.otp.hint")}</small>
                            {error && <div className="LoginModal-error">{error}</div>}
                            <div className="LoginModal-actions">
                                <button type="button" onClick={() => setStep("phone")}>{t("common.actions.back")}</button>
                                <button type="submit">{t("login.actions.verify")}</button>
                            </div>
                        </form>
                    )}

                    {step === "pin" && (
                        <form className="LoginModal-pin" onSubmit={submitPin}>
                            <div className="LoginModal-pinHeader">
                                <label>{t("login.pin.label")}</label>
                                <small>{t("login.pin.hint")}</small>
                            </div>
                            <div className="LoginModal-dots">
                                {digits.map((digit, index) => (
                                    <span key={index} className={index < pin.length ? "filled" : ""}>{index < pin.length ? "•" : ""}</span>
                                ))}
                            </div>
                            {error && <div className="LoginModal-error">{error}</div>}
                            <div className="LoginModal-keypad">
                                {keypad.slice(0, 9).map((digit) => (
                                    <button type="button" key={digit} onClick={() => handleKeypad(digit)}>{digit}</button>
                                ))}
                                <button type="button" onClick={handleBackspace} className="LoginModal-keypadBack">←</button>
                                <button type="button" onClick={() => handleKeypad("0")}>0</button>
                                <button type="submit" className="LoginModal-keypadConfirm" disabled={pin.length !== 6 || loading}>
                                    {loading ? "…" : t("login.actions.enter")}
                                </button>
                            </div>
                            <div className="LoginModal-pinFooter">
                                <button type="button" onClick={() => setStep("otp")}>{t("common.actions.back")}</button>
                                <button type="button" className="LoginModal-pinForgot">{t("login.keypad.forgot")}</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
