import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CrmDataProvider } from "./context/CrmDataContext";
import { I18nProvider } from "./context/I18nContext";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <I18nProvider>
                <ThemeProvider>
                    <AuthProvider>
                        <CrmDataProvider>
                            <App />
                        </CrmDataProvider>
                    </AuthProvider>
                </ThemeProvider>
            </I18nProvider>
        </BrowserRouter>
    </React.StrictMode>
);
