import { createContext, useContext, useMemo, useState } from "react";

const CrmDataContext = createContext(null);

const createId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

const initialKindergartens = [
    {
        id: createId("kg"),
        name: "Bolajon Asosiysi",
        director: "Dilnoza Karimova",
        phone: "+998 90 123 45 67",
        address: "Toshkent shahri, Yashnobod tumani",
        status: "MAIN",
        children: 126,
        staff: 48,
        blocked: false,
        createdAt: "2024-01-15"
    },
    {
        id: createId("kg"),
        name: "Bolajon Filial-1",
        parentId: "Bolajon Asosiysi",
        director: "Filial rahbari: Murod Mirzaev",
        phone: "+998 97 765 43 21",
        address: "Toshkent viloyati, Qibray tumani",
        status: "BRANCH",
        children: 74,
        staff: 23,
        blocked: false,
        createdAt: "2024-02-02"
    }
];

const initialApplications = [
    {
        id: createId("app"),
        guardian: "Shahnoza Yo‘ldosheva",
        phone: "+998 99 123 45 67",
        childName: "Imron",
        location: "Sergeli tumani",
        submittedAt: "2024-03-18T09:30",
        status: "approved",
        notes: "Shahar markazida joylashgan maydon kerak"
    },
    {
        id: createId("app"),
        guardian: "Baxtiyor Sodiqov",
        phone: "+998 93 555 77 88",
        childName: "Malika",
        location: "Yunusobod tumani",
        submittedAt: "2024-03-26T11:10",
        status: "pending",
        notes: "Innovatsion to‘garaklar bilan bog‘cha ochish istagi"
    }
];

const initialVideos = {
    ADMIN: [
        {
            id: createId("vid"),
            title: "Asosiy bog‘cha yaratish jarayoni",
            duration: "06:24",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
            id: createId("vid"),
            title: "Filiallarni boshqarish va bloklash",
            duration: "04:52",
            url: "https://www.youtube.com/watch?v=oHg5SJYRHA0"
        }
    ],
    DIRECTOR: [
        {
            id: createId("vid"),
            title: "Guruh va tarbiyachilarni tezkor boshqarish",
            duration: "05:11",
            url: "https://www.youtube.com/watch?v=V-_O7nl0Ii0"
        }
    ],
    TEACHER: [
        {
            id: createId("vid"),
            title: "Dars jadvali va kundalik hisobot",
            duration: "07:03",
            url: "https://www.youtube.com/watch?v=DLzxrzFCyOs"
        }
    ],
    PARENT: [
        {
            id: createId("vid"),
            title: "Mobil ilovada farzandingizni kuzatish",
            duration: "03:40",
            url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk"
        }
    ]
};

export function CrmDataProvider({ children }) {
    const [kindergartens, setKindergartens] = useState(initialKindergartens);
    const [applications, setApplications] = useState(initialApplications);
    const [videos, setVideos] = useState(initialVideos);

    const submitApplication = (payload) => {
        setApplications((prev) => [
            {
                id: createId("app"),
                status: "pending",
                submittedAt: new Date().toISOString(),
                ...payload
            },
            ...prev
        ]);
    };

    const approveApplication = (applicationId) => {
        let approved;
        setApplications((prev) => prev.map((app) => {
            if (app.id === applicationId) {
                approved = { ...app, status: "approved" };
                return approved;
            }
            return app;
        }));
        if (approved) {
            const name = `${approved.guardian} Bog‘chasi`;
            createMainKindergarten({
                name,
                director: approved.guardian,
                phone: approved.phone,
                address: approved.location,
                notes: approved.notes
            });
        }
    };

    const rejectApplication = (applicationId) => {
        setApplications((prev) => prev.map((app) => app.id === applicationId ? { ...app, status: "rejected" } : app));
    };

    const createMainKindergarten = ({ name, director, phone, address, notes }) => {
        setKindergartens((prev) => [
            {
                id: createId("kg"),
                name,
                director,
                phone,
                address,
                status: "MAIN",
                children: 0,
                staff: 0,
                blocked: false,
                createdAt: new Date().toISOString().slice(0, 10),
                notes: notes || ""
            },
            ...prev
        ]);
    };

    const createBranch = ({ name, parentId, phone, address }) => {
        setKindergartens((prev) => [
            {
                id: createId("kg"),
                name,
                parentId,
                phone,
                address,
                status: "BRANCH",
                children: 0,
                staff: 0,
                blocked: false,
                createdAt: new Date().toISOString().slice(0, 10)
            },
            ...prev
        ]);
    };

    const toggleKindergartenBlock = (id) => {
        setKindergartens((prev) => prev.map((item) => item.id === id ? { ...item, blocked: !item.blocked } : item));
    };

    const addVideo = (role, video) => {
        setVideos((prev) => ({
            ...prev,
            [role]: [
                {
                    id: createId("vid"),
                    ...video
                },
                ...(prev[role] || [])
            ]
        }));
    };

    const stats = useMemo(() => {
        const totalMain = kindergartens.filter((item) => item.status === "MAIN").length;
        const totalBranches = kindergartens.filter((item) => item.status === "BRANCH").length;
        const totalChildren = kindergartens.reduce((acc, item) => acc + (item.children || 0), 0);
        const pendingApplications = applications.filter((item) => item.status === "pending").length;
        const monthlyTuition = "114.4M";
        const monthlyRevenue = "114.4M";
        return {
            totalMain,
            totalBranches,
            totalChildren,
            pendingApplications,
            totalApplications: applications.length,
            monthlyTuition,
            monthlyRevenue
        };
    }, [kindergartens, applications]);

    return (
        <CrmDataContext.Provider value={{
            kindergartens,
            applications,
            videos,
            stats,
            submitApplication,
            approveApplication,
            rejectApplication,
            createMainKindergarten,
            createBranch,
            toggleKindergartenBlock,
            addVideo
        }}>
            {children}
        </CrmDataContext.Provider>
    );
}

export const useCrmData = () => {
    const ctx = useContext(CrmDataContext);
    if (!ctx) {
        throw new Error("useCrmData must be used within CrmDataProvider");
    }
    return ctx;
};
