import { Routes, Route, Navigate, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import KindergartenList from "./pages/Kindergarten/KindergartensPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDirectors from "./pages/admin/AdminDirectors";
import AdminKindergartens from "./pages/admin/AdminKindergartens";
import DirectorLayout from "./pages/director/DirectorLayout";
import DirStaff from "./pages/director/DirStaff";
import DirGroups from "./pages/director/DirGroup";
import DirChildren from "./pages/director/DirChildren";
import NotFound from "./pages/NotFound/NotFound";
import RequireRole from "./router/RequireRole";
import RequireAuth from "./router/RequireAuth";
import "./App.css";

export default function App() {
    return (
        <div className="App">
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route element={<RequireAuth />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/kindergartens" element={<KindergartenList />} />
                    </Route>

                    <Route path="/admin" element={
                        <RequireRole role="ADMIN"><AdminLayout /></RequireRole>
                    }>
                        <Route index element={<Navigate to="directors" replace />} />
                        <Route path="directors" element={<AdminDirectors />} />
                        <Route path="kindergartens" element={<AdminKindergartens />} />
                    </Route>

                    <Route path="/director" element={
                        <RequireRole role="DIRECTOR"><DirectorLayout /></RequireRole>
                    }>
                        <Route index element={<Navigate to="staff" replace />} />
                        <Route path="staff" element={<DirStaff />} />
                        <Route path="groups" element={<DirGroups />} />
                        <Route path="children" element={<DirChildren />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <footer style={{textAlign:"center", padding:"24px", color:"var(--muted)"}}>
                <Link to="/">Kindergarten</Link> © {new Date().getFullYear()}
            </footer>
        </div>
    );
}
