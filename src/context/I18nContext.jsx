import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "crmLocale";

const translations = {
    uz: {
        common: {
            appName: "E-Bog'chilar CRM",
            tagline: "Bolalar bog'chasi uchun yagona boshqaruv tizimi",
            actions: {
                cancel: "Bekor qilish",
                back: "Ortga",
                continue: "Davom etish",
                confirm: "Tasdiqlash",
                submit: "Yuborish",
                add: "Qo'shish",
                create: "Yaratish",
                approve: "Tasdiqlash",
                reject: "Rad etish",
                close: "Yopish",
                search: "Qidirish",
                logout: "Chiqish",
                viewProfile: "Profil",
                viewKindergartens: "Bog'chalar"
            },
            statuses: {
                pending: "Kutilmoqda",
                approved: "Tasdiqlandi",
                rejected: "Rad etildi",
                branch: "Filial"
            },
            languages: {
                uz: "O'zbekcha",
                ru: "Русский",
                en: "English"
            }
        },
        header: {
            brand: "E-Bog'chilar",
            navigation: {
                home: "Bosh sahifa",
                kindergartens: "Bog'chalar",
                admin: "Admin",
                director: "Direktor"
            },
            login: "Kirish",
            menu: {
                profile: "Profil",
                admin: "Admin panel",
                director: "Direktor panel",
                logout: "Chiqish"
            }
        },
        login: {
            title: "CRM tizimga kirish",
            subtitle: "Telegram orqali yuborilgan kodni tasdiqlang va 6 xonali PIN bilan tizimga kiring.",
            steps: {
                phone: "Telefon",
                otp: "Tasdiqlash",
                pin: "PIN"
            },
            phone: {
                label: "Telefon raqami",
                placeholder: "+998 95 390 00 04",
                hint: "Demo rejimida faqat +998953900004 raqami ishlaydi."
            },
            otp: {
                label: "Telegram kodi",
                placeholder: "4444",
                hint: "Telegram orqali kelgan 4 xonali kodni kiriting."
            },
            pin: {
                label: "6 xonali PIN",
                placeholder: "••••••",
                hint: "Tasdiqlashdan so'ng doimiy PIN yordamida kirasiz."
            },
            keypad: {
                forgot: "Parolni unutdim"
            },
            actions: {
                request: "Kod yuborish",
                verify: "Tasdiqlash",
                enter: "Kirish"
            },
            errors: {
                phoneRequired: "Telefon raqamini kiriting",
                phoneMismatch: "Bu demo uchun faqat +998953900004 raqami ruxsat etilgan",
                otpMismatch: "Tasdiqlash kodi noto'g'ri. Telegram orqali yuborilgan 4444 kodini kiriting.",
                pinMismatch: "PIN noto'g'ri. Demo uchun 666666 kodini kiriting.",
                generic: "Kutilmagan xatolik yuz berdi"
            },
            helper: "Bir martalik kodni kiritib, platformaga doimiy kirish imkoniyatini faollashtiring."
        },
        home: {
            hero: {
                badge: "Bog'cha CRM platformasi",
                title: "Arizadan tortib filialgacha — barchasi {highlight}",
                highlight: "bir joyda",
                description: "Demo administrator sifatida +998953900004 raqami, 4444 tasdiqlash kodi va 666666 PIN bilan tanishing. Jarayonlar avtomatik ishlaydi.",
                cards: [
                    {
                        title: "Barcha rollar uchun",
                        description: "Admin, direktor, ustoz va ota-onalar uchun yagona panel"
                    },
                    {
                        title: "Avtomatik jarayon",
                        description: "Ariza tasdiqlansa, CRM o'zi asosiy bog'chani yaratadi"
                    },
                    {
                        title: "Real vaqt statistikasi",
                        description: "Bolalar, guruhlar va filiallar soni avtomatik yangilanadi"
                    }
                ]
            },
            stats: {
                main: "Asosiy bog'cha",
                branches: "Filial",
                children: "Tarbiya oluvchilar",
                pending: "Kutilayotgan ariza"
            },
            timeline: {
                title: "Jarayon qanday ishlaydi?",
                steps: [
                    "Telefon raqamingizni yuborib, Telegram orqali 4444 kodini tasdiqlaysiz",
                    "Admin panel orqali kelgan arizalarni bir tugma bilan ko'rib chiqasiz",
                    "Tasdiqlangan ariza CRMda asosiy bog'cha sifatida avtomatik yaratiladi",
                    "Filiallar qo'shib, video qo'llanmalardan foydalanishingiz mumkin"
                ],
                note: "Demo rejimida yuborilgan har bir ariza admin panelida darhol ko'rinadi."
            },
            pending: {
                title: "So'nggi arizalar",
                subtitle: "Ular admin panelida tasdiqlanishini kutmoqda.",
                empty: "Hozircha yangi arizalar yo'q.",
                status: "Status"
            },
            guides: {
                title: "Video qo'llanmalar kimlar uchun?",
                subtitle: "Har bir rol uchun alohida yo'riqnomalar mavjud.",
                roles: [
                    { role: "Admin", text: "Bog'chalarni yaratish, arizalarni tasdiqlash, statistikani nazorat qilish" },
                    { role: "Direktor", text: "Guruhlar, tarbiyachilar va bolalar ustidan nazorat" },
                    { role: "Ustoz", text: "Dars jadvali va kunlik hisobotlarni kiritish" },
                    { role: "Ota-ona", text: "Farzandingizning davomati va rivojlanishini kuzatish" }
                ],
                footer: "Admin panelida har bir rol uchun alohida video qo'llanma bloklari mavjud."
            }
        },
        application: {
            title: "Bog'cha ochish bo'yicha ariza",
            description: "CRM orqali bog'cha ochishni istasangiz, qisqa ma'lumotlarni yuboring. Admin tasdiqlasa, asosiy bog'cha avtomatik yaratiladi.",
            labels: {
                guardian: "Mas'ul shaxs",
                phone: "Telefon raqami",
                child: "Farzand yoki guruh nomi",
                location: "Hudud",
                notes: "Qo'shimcha izoh"
            },
            placeholders: {
                guardian: "Ism familiyangiz",
                phone: "+998 9X XXX XX XX",
                child: "Masalan, Imron",
                location: "Qaysi tuman/shahar",
                notes: "Maqsadingiz yoki talablaringiz"
            },
            submit: "Ariza yuborish",
            error: "Ota-ona ismi, telefon va farzand nomi majburiy maydonlar",
            success: "Arizangiz qabul qilindi. Admin tasdiqlashi bilan sizga bildirishnoma yuboriladi."
        },
        kindergartens: {
            title: "Barcha bog'chalar",
            director: "Direktor",
            phone: "Telefon",
            address: "Manzil",
            parent: "Asosiy bog'cha ID",
            empty: "Hali bog'chalar yo'q"
        },
        profile: {
            title: "Profil ma'lumotlari",
            userSection: "Foydalanuvchi",
            statsSection: "CRM statistikasi",
            fullName: "Ism familiya",
            phone: "Telefon",
            role: "Rol",
            mainCount: "Asosiy bog'chalar",
            branchCount: "Filiallar",
            pendingCount: "Kutilayotgan arizalar"
        },
        admin: {
            panelTitle: "Boshqaruv paneli",
            panelSubtitle: "Har kuni yangilanadigan statistikani kuzating",
            searchPlaceholder: "Bog'cha, ota-ona yoki kontaktni qidirish",
            filterLabel: "Saralash",
            filterOptions: {
                newest: "Eng yangilari",
                popular: "Ommabop",
                blocked: "Bloklangan"
            },
            createAction: "Bog'cha yaratish",
            nav: {
                dashboard: "Boshqaruv paneli",
                applications: "Arizalar",
                kindergartens: "Bog'chalar",
                videos: "Video qo'llanma",
                news: "Yangiliklar",
                calendar: "Kalendar",
                suppliers: "Ta'minotchilar",
                notifications: "Bildirishnomalar",
                help: "Yordam"
            },
            stats: {
                kindergartens: {
                    label: "Bog'chalar soni",
                    delta: "+12% oylik o'sish"
                },
                children: {
                    label: "O'quvchilar soni",
                    delta: "+8% oylik o'sish"
                },
                tuition: {
                    label: "Oylik tushum",
                    delta: "+2.1% oylik o'sish"
                },
                revenue: {
                    label: "Oylik daromadlar",
                    delta: "+18% oylik o'sish"
                }
            },
            dashboard: {
                latestMainTitle: "Oxirgi asosiy bog'chalar",
                latestMainSubtitle: "Ariza tasdiqlansa, CRM avtomatik asosiy bog'chani yaratadi.",
                pendingTitle: "Tasdiqlash kutilayotgan arizalar",
                pendingSubtitle: "Tasdiqlangandan so'ng direktor va asosiy bog'cha tayyor bo'ladi.",
                emptyMain: "Hozircha asosiy bog'cha yaratilmagan",
                emptyPending: "Barcha arizalar ko'rib chiqildi",
                childrenLabel: "bola",
                staffLabel: "xodim"
            },
            applications: {
                title: "Kelgan arizalar",
                description: "Har bir tasdiqlangan ariza yangi asosiy bog'chani avtomatik yaratadi.",
                columns: {
                    guardian: "Mas'ul shaxs",
                    child: "Farzand",
                    location: "Hudud",
                    status: "Status",
                    actions: "Amal"
                },
                empty: "Hozircha arizalar yo'q"
            },
            kindergartens: {
                title: "Asosiy bog'cha va filiallar",
                description: "CRM avtomatik yaratgan obyektlarni boshqaring yoki qo'lda qo'shing.",
                mainForm: {
                    title: "Asosiy bog'cha yaratish",
                    name: "Bog'cha nomi",
                    director: "Direktor",
                    phone: "Telefon",
                    address: "Manzil",
                    notes: "Qo'shimcha izoh"
                },
                branchForm: {
                    title: "Filial qo'shish",
                    name: "Filial nomi",
                    parent: "Asosiy bog'chani tanlang",
                    phone: "Telefon",
                    address: "Manzil"
                },
                messages: {
                    mainMissing: "Asosiy bog'cha yaratish uchun nom, direktor va telefon shart",
                    mainCreated: "Asosiy bog'cha yaratildi. Endi filial qo'shishingiz mumkin.",
                    branchMissing: "Filial yaratish uchun nom va asosiy bog'cha tanlash majburiy",
                    branchCreated: "Filial qo'shildi. Statistikalar avtomatik yangilandi."
                },
                lists: {
                    mains: "Asosiy bog'chalar",
                    branches: "Filiallar",
                    emptyMain: "Hozircha asosiy bog'cha yo'q",
                    emptyBranch: "Filiallar hali qo'shilmagan"
                },
                actions: {
                    block: "Bloklash",
                    unblock: "Blokdan chiqarish"
                }
            },
            videos: {
                title: "Video qo'llanmalar",
                description: "Har bir rol uchun foydali video darslarni joylang.",
                form: {
                    role: "Rol",
                    title: "Video nomi",
                    url: "Havola",
                    duration: "Davomiyligi"
                },
                roles: {
                    ADMIN: "Admin",
                    DIRECTOR: "Direktor",
                    TEACHER: "Ustoz",
                    PARENT: "Ota-ona"
                },
                counts: "{count} ta video",
                empty: "Hozircha video qo'llanma yo'q",
                open: "Videoni ochish"
            },
            userCard: {
                title: "Bepul yangilang",
                subtitle: "Premium funksiyalarni sinab ko'ring",
                currentUser: "Super admin"
            }
        }
    },
    ru: {
        common: {
            appName: "E-Bog'chilar CRM",
            tagline: "Единая система управления детским садом",
            actions: {
                cancel: "Отменить",
                back: "Назад",
                continue: "Продолжить",
                confirm: "Подтвердить",
                submit: "Отправить",
                add: "Добавить",
                create: "Создать",
                approve: "Одобрить",
                reject: "Отклонить",
                close: "Закрыть",
                search: "Поиск",
                logout: "Выйти",
                viewProfile: "Профиль",
                viewKindergartens: "Сады"
            },
            statuses: {
                pending: "В ожидании",
                approved: "Одобрено",
                rejected: "Отклонено",
                branch: "Филиал"
            },
            languages: {
                uz: "O'zbekcha",
                ru: "Русский",
                en: "English"
            }
        },
        header: {
            brand: "E-Bog'chilar",
            navigation: {
                home: "Главная",
                kindergartens: "Сады",
                admin: "Админ",
                director: "Директор"
            },
            login: "Войти",
            menu: {
                profile: "Профиль",
                admin: "Админ-панель",
                director: "Панель директора",
                logout: "Выйти"
            }
        },
        login: {
            title: "Вход в CRM",
            subtitle: "Подтвердите код из Telegram и войдите по постоянному PIN из шести цифр.",
            steps: {
                phone: "Телефон",
                otp: "Подтверждение",
                pin: "PIN"
            },
            phone: {
                label: "Номер телефона",
                placeholder: "+998 95 390 00 04",
                hint: "В демо доступен только номер +998953900004."
            },
            otp: {
                label: "Код из Telegram",
                placeholder: "4444",
                hint: "Введите 4-значный код, отправленный в Telegram."
            },
            pin: {
                label: "6-значный PIN",
                placeholder: "••••••",
                hint: "После подтверждения входите с постоянным PIN."
            },
            keypad: {
                forgot: "Забыл PIN"
            },
            actions: {
                request: "Отправить код",
                verify: "Подтвердить",
                enter: "Войти"
            },
            errors: {
                phoneRequired: "Введите номер телефона",
                phoneMismatch: "В демо разрешен только номер +998953900004",
                otpMismatch: "Неверный код. Введите 4444, отправленный в Telegram.",
                pinMismatch: "Неверный PIN. В демо используется код 666666.",
                generic: "Произошла непредвиденная ошибка"
            },
            helper: "Одноразовый код активирует постоянный доступ к платформе."
        },
        home: {
            hero: {
                badge: "CRM для детских садов",
                title: "От заявки до филиала — всё {highlight}",
                highlight: "в одном месте",
                description: "Познакомьтесь с демо: номер +998953900004, код 4444 и PIN 666666. Все процессы автоматизированы.",
                cards: [
                    {
                        title: "Для всех ролей",
                        description: "Единая панель для админа, директора, педагогов и родителей"
                    },
                    {
                        title: "Автоматизация",
                        description: "После одобрения заявки CRM создаёт основной сад"
                    },
                    {
                        title: "Статистика онлайн",
                        description: "Дети, группы и филиалы обновляются автоматически"
                    }
                ]
            },
            stats: {
                main: "Основной сад",
                branches: "Филиал",
                children: "Воспитанники",
                pending: "Заявки в ожидании"
            },
            timeline: {
                title: "Как работает процесс?",
                steps: [
                    "Отправляете номер телефона и подтверждаете код 4444 из Telegram",
                    "В админ-панели проверяете новые заявки одной кнопкой",
                    "После одобрения CRM автоматически создаёт основной сад",
                    "Добавляете филиалы и используете видеоинструкции"
                ],
                note: "В демо каждое обращение мгновенно появляется в админ-панели."
            },
            pending: {
                title: "Последние заявки",
                subtitle: "Ожидают подтверждения в админ-панели.",
                empty: "Новых заявок пока нет.",
                status: "Статус"
            },
            guides: {
                title: "Для кого видеоинструкции?",
                subtitle: "У каждой роли есть свои подсказки.",
                roles: [
                    { role: "Админ", text: "Создание садов, одобрение заявок, контроль показателей" },
                    { role: "Директор", text: "Управление группами, педагогами и детьми" },
                    { role: "Педагог", text: "Расписание занятий и ежедневные отчеты" },
                    { role: "Родитель", text: "Отслеживание посещаемости и развития ребенка" }
                ],
                footer: "В админ-панели есть разделы с видео для каждой роли."
            }
        },
        application: {
            title: "Заявка на открытие сада",
            description: "Если вы хотите открыть детский сад, отправьте краткую информацию. После одобрения сад создаётся автоматически.",
            labels: {
                guardian: "Ответственный",
                phone: "Телефон",
                child: "Имя ребенка или группы",
                location: "Регион",
                notes: "Дополнительный комментарий"
            },
            placeholders: {
                guardian: "Ваше имя и фамилия",
                phone: "+998 9X XXX XX XX",
                child: "Например, Имрон",
                location: "Укажите район/город",
                notes: "Цели или пожелания"
            },
            submit: "Отправить заявку",
            error: "Имя ответственного, телефон и имя ребенка обязательны",
            success: "Заявка принята. После одобрения администратор отправит уведомление."
        },
        kindergartens: {
            title: "Все сады",
            director: "Директор",
            phone: "Телефон",
            address: "Адрес",
            parent: "ID основного сада",
            empty: "Сады еще не добавлены"
        },
        profile: {
            title: "Профиль",
            userSection: "Пользователь",
            statsSection: "Статистика CRM",
            fullName: "Имя и фамилия",
            phone: "Телефон",
            role: "Роль",
            mainCount: "Основные сады",
            branchCount: "Филиалы",
            pendingCount: "Заявки в ожидании"
        },
        admin: {
            panelTitle: "Панель управления",
            panelSubtitle: "Следите за статистикой, обновляемой каждый день",
            searchPlaceholder: "Поиск сада, контакта или заявки",
            filterLabel: "Сортировка",
            filterOptions: {
                newest: "Новые",
                popular: "Популярные",
                blocked: "Заблокированные"
            },
            createAction: "Создать сад",
            nav: {
                dashboard: "Панель",
                applications: "Заявки",
                kindergartens: "Сады",
                videos: "Видео",
                news: "Новости",
                calendar: "Календарь",
                suppliers: "Поставщики",
                notifications: "Уведомления",
                help: "Помощь"
            },
            stats: {
                kindergartens: {
                    label: "Количество садов",
                    delta: "+12% рост в месяц"
                },
                children: {
                    label: "Количество учеников",
                    delta: "+8% рост в месяц"
                },
                tuition: {
                    label: "Месячная выручка",
                    delta: "+2.1% рост в месяц"
                },
                revenue: {
                    label: "Месячные доходы",
                    delta: "+18% рост в месяц"
                }
            },
            dashboard: {
                latestMainTitle: "Последние основные сады",
                latestMainSubtitle: "После одобрения заявка превращается в основной сад автоматически.",
                pendingTitle: "Заявки в ожидании",
                pendingSubtitle: "После подтверждения директор и сад создаются автоматически.",
                emptyMain: "Основных садов пока нет",
                emptyPending: "Все заявки обработаны",
                childrenLabel: "воспитанцев",
                staffLabel: "сотрудников"
            },
            applications: {
                title: "Новые заявки",
                description: "Каждое одобрение автоматически создает новый основной сад.",
                columns: {
                    guardian: "Ответственный",
                    child: "Ребенок",
                    location: "Регион",
                    status: "Статус",
                    actions: "Действие"
                },
                empty: "Заявок пока нет"
            },
            kindergartens: {
                title: "Основные сады и филиалы",
                description: "Управляйте автоматически созданными объектами или добавляйте вручную.",
                mainForm: {
                    title: "Создать основной сад",
                    name: "Название сада",
                    director: "Директор",
                    phone: "Телефон",
                    address: "Адрес",
                    notes: "Комментарий"
                },
                branchForm: {
                    title: "Добавить филиал",
                    name: "Название филиала",
                    parent: "Выберите основной сад",
                    phone: "Телефон",
                    address: "Адрес"
                },
                messages: {
                    mainMissing: "Для основного сада нужны название, директор и телефон",
                    mainCreated: "Основной сад создан. Теперь можно добавить филиал.",
                    branchMissing: "Для филиала нужны название и основной сад",
                    branchCreated: "Филиал добавлен. Статистика обновлена."
                },
                lists: {
                    mains: "Основные сады",
                    branches: "Филиалы",
                    emptyMain: "Основные сады отсутствуют",
                    emptyBranch: "Филиалы еще не добавлены"
                },
                actions: {
                    block: "Заблокировать",
                    unblock: "Разблокировать"
                }
            },
            videos: {
                title: "Видео-инструкции",
                description: "Добавляйте полезные видеоуроки для каждой роли.",
                form: {
                    role: "Роль",
                    title: "Название видео",
                    url: "Ссылка",
                    duration: "Длительность"
                },
                roles: {
                    ADMIN: "Админ",
                    DIRECTOR: "Директор",
                    TEACHER: "Педагог",
                    PARENT: "Родитель"
                },
                counts: "{count} видео",
                empty: "Пока нет видео",
                open: "Открыть видео"
            },
            userCard: {
                title: "Обновите бесплатно",
                subtitle: "Попробуйте премиум-функции",
                currentUser: "Супер админ"
            }
        }
    },
    en: {
        common: {
            appName: "E-Bog'chilar CRM",
            tagline: "Unified management for kindergartens",
            actions: {
                cancel: "Cancel",
                back: "Back",
                continue: "Continue",
                confirm: "Confirm",
                submit: "Submit",
                add: "Add",
                create: "Create",
                approve: "Approve",
                reject: "Reject",
                close: "Close",
                search: "Search",
                logout: "Sign out",
                viewProfile: "Profile",
                viewKindergartens: "Kindergartens"
            },
            statuses: {
                pending: "Pending",
                approved: "Approved",
                rejected: "Rejected",
                branch: "Branch"
            },
            languages: {
                uz: "O'zbekcha",
                ru: "Русский",
                en: "English"
            }
        },
        header: {
            brand: "E-Bog'chilar",
            navigation: {
                home: "Home",
                kindergartens: "Kindergartens",
                admin: "Admin",
                director: "Director"
            },
            login: "Sign in",
            menu: {
                profile: "Profile",
                admin: "Admin panel",
                director: "Director panel",
                logout: "Sign out"
            }
        },
        login: {
            title: "Access the CRM",
            subtitle: "Confirm the Telegram code and enter the six digit PIN for continuous access.",
            steps: {
                phone: "Phone",
                otp: "Verification",
                pin: "PIN"
            },
            phone: {
                label: "Phone number",
                placeholder: "+998 95 390 00 04",
                hint: "The demo accepts only +998953900004."
            },
            otp: {
                label: "Telegram code",
                placeholder: "4444",
                hint: "Enter the 4 digit code delivered via Telegram."
            },
            pin: {
                label: "6 digit PIN",
                placeholder: "••••••",
                hint: "Once confirmed, use the permanent PIN to sign in."
            },
            keypad: {
                forgot: "Forgot PIN"
            },
            actions: {
                request: "Send code",
                verify: "Verify",
                enter: "Enter"
            },
            errors: {
                phoneRequired: "Please enter the phone number",
                phoneMismatch: "Only +998953900004 is available in this demo",
                otpMismatch: "Incorrect code. Enter the 4444 code from Telegram.",
                pinMismatch: "Incorrect PIN. Use 666666 for the demo.",
                generic: "Unexpected error occurred"
            },
            helper: "Enter the one-time code to activate persistent platform access."
        },
        home: {
            hero: {
                badge: "Kindergarten CRM",
                title: "From application to branches — everything {highlight}",
                highlight: "in one place",
                description: "Try the demo admin credentials: phone +998953900004, verification code 4444, PIN 666666. All workflows are automated.",
                cards: [
                    {
                        title: "For every role",
                        description: "Unified workspace for admins, directors, teachers, and parents"
                    },
                    {
                        title: "Automated flow",
                        description: "When approved, the CRM creates the main kindergarten"
                    },
                    {
                        title: "Live analytics",
                        description: "Children, groups, and branches update automatically"
                    }
                ]
            },
            stats: {
                main: "Main kindergartens",
                branches: "Branches",
                children: "Students",
                pending: "Pending applications"
            },
            timeline: {
                title: "How does it work?",
                steps: [
                    "Submit your phone number and confirm the 4444 Telegram code",
                    "Review incoming applications from the admin panel with one click",
                    "Approved requests instantly turn into main kindergartens",
                    "Add branches and leverage the role based video library"
                ],
                note: "Every submission in the demo instantly appears inside the admin panel."
            },
            pending: {
                title: "Latest applications",
                subtitle: "Waiting for approval from the admin panel.",
                empty: "No new applications yet.",
                status: "Status"
            },
            guides: {
                title: "Who are the video guides for?",
                subtitle: "Each role receives personalised tips.",
                roles: [
                    { role: "Admin", text: "Create kindergartens, approve requests, monitor metrics" },
                    { role: "Director", text: "Oversee groups, teachers, and students" },
                    { role: "Teacher", text: "Manage schedules and daily reports" },
                    { role: "Parent", text: "Track attendance and progress of your child" }
                ],
                footer: "The admin area hosts separate video playlists for every role."
            }
        },
        application: {
            title: "Application to open a kindergarten",
            description: "Share a few details if you want to launch a kindergarten. Once approved the main branch is created automatically.",
            labels: {
                guardian: "Contact person",
                phone: "Phone",
                child: "Child or group name",
                location: "Region",
                notes: "Additional notes"
            },
            placeholders: {
                guardian: "Your full name",
                phone: "+998 9X XXX XX XX",
                child: "e.g. Imron",
                location: "Which district / city",
                notes: "Goals or requirements"
            },
            submit: "Submit application",
            error: "Contact name, phone, and child name are mandatory",
            success: "We received your application. You'll get a notification after approval."
        },
        kindergartens: {
            title: "All kindergartens",
            director: "Director",
            phone: "Phone",
            address: "Address",
            parent: "Main kindergarten ID",
            empty: "No kindergartens yet"
        },
        profile: {
            title: "Profile",
            userSection: "User",
            statsSection: "CRM statistics",
            fullName: "Full name",
            phone: "Phone",
            role: "Role",
            mainCount: "Main kindergartens",
            branchCount: "Branches",
            pendingCount: "Pending applications"
        },
        admin: {
            panelTitle: "Control panel",
            panelSubtitle: "Monitor metrics that refresh every day",
            searchPlaceholder: "Search kindergartens, contacts, or requests",
            filterLabel: "Sort",
            filterOptions: {
                newest: "Newest",
                popular: "Popular",
                blocked: "Blocked"
            },
            createAction: "Create kindergarten",
            nav: {
                dashboard: "Dashboard",
                applications: "Applications",
                kindergartens: "Kindergartens",
                videos: "Video library",
                news: "News",
                calendar: "Calendar",
                suppliers: "Suppliers",
                notifications: "Notifications",
                help: "Support"
            },
            stats: {
                kindergartens: {
                    label: "Kindergartens",
                    delta: "+12% monthly growth"
                },
                children: {
                    label: "Students",
                    delta: "+8% monthly growth"
                },
                tuition: {
                    label: "Monthly tuition",
                    delta: "+2.1% monthly growth"
                },
                revenue: {
                    label: "Monthly revenue",
                    delta: "+18% monthly growth"
                }
            },
            dashboard: {
                latestMainTitle: "Newest main kindergartens",
                latestMainSubtitle: "Once approved, applications instantly create the main branch.",
                pendingTitle: "Pending applications",
                pendingSubtitle: "Approvals automatically generate a director and main kindergarten.",
                emptyMain: "No main kindergartens yet",
                emptyPending: "Everything has been reviewed",
                childrenLabel: "children",
                staffLabel: "staff"
            },
            applications: {
                title: "Incoming applications",
                description: "Every approval automatically generates a main kindergarten.",
                columns: {
                    guardian: "Contact",
                    child: "Child",
                    location: "Region",
                    status: "Status",
                    actions: "Action"
                },
                empty: "No applications yet"
            },
            kindergartens: {
                title: "Main branches and satellites",
                description: "Manage automatically created entries or add your own.",
                mainForm: {
                    title: "Create main kindergarten",
                    name: "Kindergarten name",
                    director: "Director",
                    phone: "Phone",
                    address: "Address",
                    notes: "Notes"
                },
                branchForm: {
                    title: "Add branch",
                    name: "Branch name",
                    parent: "Select main kindergarten",
                    phone: "Phone",
                    address: "Address"
                },
                messages: {
                    mainMissing: "Name, director, and phone are required for a main kindergarten",
                    mainCreated: "Main kindergarten created. You can now add branches.",
                    branchMissing: "Name and main kindergarten are required for a branch",
                    branchCreated: "Branch added. Metrics were refreshed."
                },
                lists: {
                    mains: "Main kindergartens",
                    branches: "Branches",
                    emptyMain: "No main kindergartens yet",
                    emptyBranch: "Branches haven't been added yet"
                },
                actions: {
                    block: "Block",
                    unblock: "Unblock"
                }
            },
            videos: {
                title: "Video guides",
                description: "Share helpful lessons for every role.",
                form: {
                    role: "Role",
                    title: "Video title",
                    url: "Link",
                    duration: "Duration"
                },
                roles: {
                    ADMIN: "Admin",
                    DIRECTOR: "Director",
                    TEACHER: "Teacher",
                    PARENT: "Parent"
                },
                counts: "{count} videos",
                empty: "No videos yet",
                open: "Open video"
            },
            userCard: {
                title: "Upgrade for free",
                subtitle: "Try premium features",
                currentUser: "Super admin"
            }
        }
    }
};

const I18nContext = createContext({
    locale: "uz",
    setLocale: () => {},
    t: (key, vars) => key,
    translations: translations.uz
});

const getNested = (obj, path) => {
    return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
};

const format = (template, vars) => {
    if (!vars) return template;
    return template.replace(/\{(.*?)\}/g, (_, key) => (vars[key.trim()] ?? ""));
};

const getInitialLocale = () => {
    if (typeof window === "undefined") return "uz";
    return localStorage.getItem(STORAGE_KEY) || "uz";
};

export function I18nProvider({ children }) {
    const [locale, setLocaleState] = useState(getInitialLocale);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, locale);
        }
    }, [locale]);

    const setLocale = (value) => {
        setLocaleState(value);
    };

    const t = useMemo(() => {
        return (key, vars) => {
            const languagePack = translations[locale] || translations.uz;
            let template = getNested(languagePack, key);
            if (template === undefined) {
                template = getNested(translations.uz, key);
            }
            if (template === undefined) {
                return key;
            }
            if (typeof template === "string") {
                return format(template, vars);
            }
            if (typeof template === "function") {
                return template(vars);
            }
            return template;
        };
    }, [locale]);

    const value = useMemo(() => ({
        locale,
        setLocale,
        t,
        translations: translations[locale] || translations.uz
    }), [locale, t]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);

