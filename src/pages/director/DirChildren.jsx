import { useEffect, useMemo, useState } from "react";
import { dirCreateChild, dirUpdateChild, dirDeleteChild, dirMoveChild, dirBlockChild, dirUnblockChild, dirStatusMe, dirStatusKindergarten } from "../../api/director";
import { getBranches, getKindergartenById } from "../../api/kindergarten";
import { getGroups } from "../../api/groups";
import "./DirChildren.css";

export default function DirChildren() {
    const [kgOptions, setKgOptions] = useState([]);
    const [selectedKg, setSelectedKg] = useState("");

    const [groups, setGroups] = useState([]);
    const [parents, setParents] = useState([]);
    const [children, setChildren] = useState([]);

    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedParent, setSelectedParent] = useState("");
    const [selectedChild, setSelectedChild] = useState("");

    const [createDto, setCreateDto] = useState({
        firstname: "",
        lastname: "",
        parentId: "",
        groupId: "",
        birthdate: { year: 2019, month: "JANUARY", day: 5 }
    });

    const [res, setRes] = useState(null);
    const [err, setErr] = useState(null);

    // Director boshqaradigan KG lar
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

    // KG tanlanganda: groups/parents/children ro‘yxatini yuklash
    useEffect(() => {
        (async () => {
            if (!selectedKg) { setGroups([]); setParents([]); setChildren([]); setSelectedGroup(""); setSelectedParent(""); setSelectedChild(""); return; }
            try {
                const st = await dirStatusKindergarten(selectedKg);

                // Guruhlar
                let g = Array.isArray(st?.groups) ? st.groups : [];
                if (!g.length) {
                    const all = await getGroups();
                    g = all.filter(x => String(x.kindergartenId) === String(selectedKg));
                }

                // Ota-onalar
                let p = Array.isArray(st?.users) ? st.users.filter(u => u.roles === "PARENTS") : [];
                if (!p.length && Array.isArray(st?.staff)) {
                    p = st.staff.filter(u => u.roles === "PARENTS");
                }

                // Bolalar (statusda bo‘lsa — yaxshi; bo‘lmasa guruhlar ichidan yig‘ib ko‘ramiz)
                let c = [];
                if (Array.isArray(st?.children)) c = st.children;
                if (!c.length && Array.isArray(g)) {
                    for (const gr of g) {
                        if (Array.isArray(gr.children)) c = c.concat(gr.children.map(ch => ({ ...ch, groupId: gr.id })));
                    }
                }

                setGroups(g);
                setParents(p);
                setChildren(c);
                setSelectedGroup("");
                setSelectedParent("");
                setSelectedChild("");
                setCreateDto(d => ({ ...d, parentId: "", groupId: "" }));
            } catch (e) { setErr(e?.response?.data || e.message); }
        })();
    }, [selectedKg]);

    // createDto ni selectlar bilan sinxronlab boramiz
    useEffect(() => {
        setCreateDto(d => ({ ...d, groupId: selectedGroup || "" }));
    }, [selectedGroup]);
    useEffect(() => {
        setCreateDto(d => ({ ...d, parentId: selectedParent || "" }));
    }, [selectedParent]);

    const createChild = async () => {
        setErr(null);
        if (!selectedKg) return setErr("Bog‘cha tanlanmagan.");
        if (!createDto.groupId) return setErr("Guruh tanlanmagan.");
        if (!createDto.parentId) return setErr("Ota-ona tanlanmagan.");
        try { const r = await dirCreateChild(createDto); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };

    const updateChild = async () => {
        setErr(null);
        if (!selectedChild) return setErr("Bola tanlanmagan.");
        try {
            const r = await dirUpdateChild(selectedChild, {
                firstname: createDto.firstname,
                lastname: createDto.lastname,
                birthdate: createDto.birthdate
            });
            setRes(r);
        } catch (e) { setErr(e?.response?.data || e.message); }
    };

    const deleteChild = async () => {
        setErr(null);
        if (!selectedChild) return setErr("Bola tanlanmagan.");
        try { const r = await dirDeleteChild(selectedChild); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };

    const moveChild = async () => {
        setErr(null);
        if (!selectedChild) return setErr("Bola tanlanmagan.");
        if (!selectedGroup) return setErr("Yangi guruh tanlanmagan.");
        try { const r = await dirMoveChild(selectedChild, selectedGroup); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };

    const block = async () => {
        if (!selectedChild) return setErr("Bola tanlanmagan.");
        try { const r = await dirBlockChild(selectedChild); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };
    const unblock = async () => {
        if (!selectedChild) return setErr("Bola tanlanmagan.");
        try { const r = await dirUnblockChild(selectedChild); setRes(r); }
        catch (e) { setErr(e?.response?.data || e.message); }
    };

    const groupsForSelect = useMemo(() => groups || [], [groups]);
    const parentsForSelect = useMemo(() => parents || [], [parents]);
    const childrenForSelect = useMemo(() => children || [], [children]);

    return (
        <div className="DirChildren card">
            <h3>Bola boshqaruvi</h3>

            <div className="row">
                <label>Bog‘cha</label>
                <select className="DirChildren-input" value={selectedKg} onChange={e => setSelectedKg(e.target.value)}>
                    <option value="">— Bog‘cha tanlang —</option>
                    {kgOptions.map(k => (
                        <option key={k.id} value={k.id}>
                            {k.name}{k.subName ? ` — ${k.subName}` : ""}
                        </option>
                    ))}
                </select>
            </div>

            <div className="row">
                <label>Guruh</label>
                <select className="DirChildren-input" value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} disabled={!selectedKg}>
                    <option value="">— Guruh tanlang —</option>
                    {groupsForSelect.map(g => (
                        <option key={g.id} value={g.id}>{g.groupName || g.name || g.id}</option>
                    ))}
                </select>

                <label>Ota-ona</label>
                <select className="DirChildren-input" value={selectedParent} onChange={e => setSelectedParent(e.target.value)} disabled={!selectedKg}>
                    <option value="">— Ota-ona tanlang —</option>
                    {parentsForSelect.map(p => (
                        <option key={p.id} value={p.id}>{p.firstname} {p.lastname} (@{p.username})</option>
                    ))}
                </select>
            </div>

            <div className="row">
                <input className="DirChildren-input" placeholder="Ism" value={createDto.firstname}
                       onChange={e => setCreateDto({ ...createDto, firstname: e.target.value })}/>
                <input className="DirChildren-input" placeholder="Familiya" value={createDto.lastname}
                       onChange={e => setCreateDto({ ...createDto, lastname: e.target.value })}/>
                <button className="DirChildren-btn" onClick={createChild} disabled={!selectedGroup || !selectedParent}>Yaratish</button>
            </div>

            <hr/>

            <div className="row">
                <label>Bola</label>
                <select className="DirChildren-input" value={selectedChild} onChange={e => setSelectedChild(e.target.value)} disabled={!selectedKg}>
                    <option value="">— Bola tanlang —</option>
                    {childrenForSelect.map(ch => (
                        <option key={ch.id} value={ch.id}>
                            {ch.firstname} {ch.lastname}{ch.groupName ? ` — ${ch.groupName}` : ""}
                        </option>
                    ))}
                </select>

                <button className="DirChildren-btn" onClick={moveChild} disabled={!selectedChild || !selectedGroup}>Guruhini almashtirish</button>
                <button className="DirChildren-btn" onClick={updateChild} disabled={!selectedChild}>Yangilash</button>
                <button className="DirChildren-btn" onClick={deleteChild} disabled={!selectedChild}>O‘chirish</button>
                <button className="DirChildren-btn" onClick={block} disabled={!selectedChild}>Bloklash</button>
                <button className="DirChildren-btn" onClick={unblock} disabled={!selectedChild}>Blokdan chiqarish</button>
            </div>

            {res && <pre className="DirChildren-pre">{JSON.stringify(res, null, 2)}</pre>}
            {err && <div className="DirChildren-err">{String(typeof err === "string" ? err : JSON.stringify(err))}</div>}
        </div>
    );
}
