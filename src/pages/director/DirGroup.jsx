import { useEffect, useMemo, useState } from "react";
import { dirCreateGroup, dirUpdateGroup, dirDeleteGroup, dirAssignTeacher, dirBlockGroup, dirUnblockGroup, dirStatusMe, dirStatusKindergarten } from "../../api/director";
import { getBranches, getKindergartenById } from "../../api/kindergarten";
import { getGroups } from "../../api/groups";
import "./DirGroup.css";

export default function DirGroups() {
    const [kgOptions, setKgOptions] = useState([]);
    const [selectedKg, setSelectedKg] = useState("");

    const [groupDto, setGroupDto] = useState({ groupName: "", price: "" });
    const [groups, setGroups] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedTeacher, setSelectedTeacher] = useState("");

    const [res, setRes] = useState(null);
    const [err, setErr] = useState(null);

    // Load director's main + branches
    useEffect(() => {
        (async () => {
            try {
                const me = await dirStatusMe();
                const mainId = me?.kindergarten?.resourceId || me?.kindergarten?.id;
                if (!mainId) return;
                const main = await getKindergartenById(mainId);
                const branches = await getBranches(mainId);
                setKgOptions([{ id: main.id, name: main.name, subName: main.subName }, ...branches]);
            } catch (e) { setErr(e?.response?.data || e.message); }
        })();
    }, []);

    // Load groups & teachers for selected KG
    useEffect(() => {
        (async () => {
            if (!selectedKg) { setGroups([]); setTeachers([]); setSelectedGroup(""); setSelectedTeacher(""); return; }
            try {
                // Avval director status orqali olishga urinib ko‘ramiz
                const st = await dirStatusKindergarten(selectedKg);
                let g = Array.isArray(st?.groups) ? st.groups : [];
                let t = Array.isArray(st?.users) ? st.users.filter(u => u.roles === "TEACHER") : [];

                // Agar status ichida guruhlar bo‘lmasa, umumiy /api/groups dan filterlaymiz
                if (!g.length) {
                    const all = await getGroups();
                    g = all.filter(x => String(x.kindergartenId) === String(selectedKg));
                }

                // Agar teacherlar bo‘lmasa, statusda staff bo‘lishi mumkin
                if (!t.length && Array.isArray(st?.staff)) {
                    t = st.staff.filter(u => u.roles === "TEACHER");
                }

                setGroups(g);
                setTeachers(t);
                setSelectedGroup("");
                setSelectedTeacher("");
            } catch (e) {
                setErr(e?.response?.data || e.message);
            }
        })();
    }, [selectedKg]);

    const priceNumber = useMemo(() => Number(groupDto.price || 0), [groupDto.price]);

    const createGroup = async () => {
        setErr(null);
        if (!selectedKg) return setErr("Bog‘cha tanlanmagan.");
        try {
            const r = await dirCreateGroup(selectedKg, { ...groupDto, price: priceNumber });
            setRes(r);
        } catch (e) { setErr(e?.response?.data || e.message); }
    };

    const updateGroup = async () => {
        setErr(null);
        if (!selectedGroup) return setErr("Guruh tanlanmagan.");
        try {
            const r = await dirUpdateGroup(selectedGroup, { ...groupDto, price: priceNumber });
            setRes(r);
        } catch (e) { setErr(e?.response?.data || e.message); }
    };

    const deleteGroup = async () => {
        setErr(null);
        if (!selectedGroup) return setErr("Guruh tanlanmagan.");
        try { const r = await dirDeleteGroup(selectedGroup); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };

    const assignTeacher = async () => {
        setErr(null);
        if (!selectedGroup) return setErr("Guruh tanlanmagan.");
        if (!selectedTeacher) return setErr("O‘qituvchi tanlanmagan.");
        try { const r = await dirAssignTeacher(selectedGroup, selectedTeacher); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };

    const block = async () => {
        if (!selectedGroup) return setErr("Guruh tanlanmagan.");
        try { const r = await dirBlockGroup(selectedGroup); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };
    const unblock = async () => {
        if (!selectedGroup) return setErr("Guruh tanlanmagan.");
        try { const r = await dirUnblockGroup(selectedGroup); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };

    return (
        <div className="DirGroups card">
            <h3>Guruhlar</h3>

            <div className="row">
                <label>Bog‘cha</label>
                <select className="DirGroups-input" value={selectedKg} onChange={e => setSelectedKg(e.target.value)}>
                    <option value="">— Bog‘cha tanlang —</option>
                    {kgOptions.map(k => (
                        <option key={k.id} value={k.id}>
                            {k.name}{k.subName ? ` — ${k.subName}` : ""}
                        </option>
                    ))}
                </select>

                <input className="DirGroups-input" placeholder="groupName"
                       value={groupDto.groupName} onChange={e => setGroupDto({ ...groupDto, groupName: e.target.value })}/>
                <input className="DirGroups-input" placeholder="price"
                       value={groupDto.price} onChange={e => setGroupDto({ ...groupDto, price: e.target.value })}/>
                <button className="DirGroups-btn" onClick={createGroup} disabled={!selectedKg}>Yaratish</button>
            </div>

            <div className="row">
                <label>Guruh</label>
                <select className="DirGroups-input" value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} disabled={!selectedKg}>
                    <option value="">— Guruh tanlang —</option>
                    {groups.map(g => (
                        <option key={g.id} value={g.id}>{g.groupName || g.name || g.id}</option>
                    ))}
                </select>

                <button className="DirGroups-btn" onClick={updateGroup} disabled={!selectedGroup}>Yangilash</button>
                <button className="DirGroups-btn" onClick={deleteGroup} disabled={!selectedGroup}>O‘chirish</button>
            </div>

            <div className="row">
                <label>O‘qituvchi</label>
                <select className="DirGroups-input" value={selectedTeacher} onChange={e => setSelectedTeacher(e.target.value)} disabled={!selectedKg}>
                    <option value="">— O‘qituvchi tanlang —</option>
                    {teachers.map(t => (
                        <option key={t.id} value={t.id}>{t.firstname} {t.lastname} (@{t.username})</option>
                    ))}
                </select>

                <button className="DirGroups-btn" onClick={assignTeacher} disabled={!selectedGroup || !selectedTeacher}>O‘qituvchi biriktirish</button>
                <button className="DirGroups-btn" onClick={block} disabled={!selectedGroup}>Bloklash</button>
                <button className="DirGroups-btn" onClick={unblock} disabled={!selectedGroup}>Blokdan chiqarish</button>
            </div>

            {res && <pre className="DirGroups-pre">{JSON.stringify(res, null, 2)}</pre>}
            {err && <div className="DirGroups-err">{String(typeof err === "string" ? err : JSON.stringify(err))}</div>}
        </div>
    );
}
