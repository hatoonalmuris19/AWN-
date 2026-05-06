const translations = {
    ar: {
        siteTitle: "نظام عون للحماية من الاحتيال",
        navMessage: "تحليل الرسائل",
        navAlerts: "التنبيهات",
        navAbout: "من نحن",
        navSettings: "الإعدادات",
        navHowTo: "طريقة الاستخدام",
        indexTitle: "افحص الرسائل المشبوهة بسهولة",
        indexSubtitle: "ألصق الرسالة المشبوهة وسيقوم النظام بتحليلها وإظهار مستوى الخطورة بشكل واضح.",
        analyzeCardTitle: "تحليل رسالة",
        analyzeLabel: "نص الرسالة",
        analyzePlaceholder: "اكتب هنا الرسالة المراد فحصها...",
        analyzeButton: "ابدأ التحليل",
        messageSourceLabel: "مصدر الرسالة",
        sourceSms: "رسالة نصية",
        sourceEmail: "بريد إلكتروني",
        sourceWhatsapp: "واتساب",
        sourceTelegram: "تيليجرام",
        sourceOther: "مصدر آخر",
        senderHintLabel: "اسم الجهة أو المرسل",
        senderHintPlaceholder: "مثال: البنك أو رقم غير معروف",
        quickTipsTitle: "إشارات سريعة",
        quickTip1: "الرسائل المستعجلة جدًا غالبًا تحتاج حذرًا أكبر.",
        quickTip2: "لا تشارك كلمات المرور أو رموز التحقق أبدًا.",
        quickTip3: "تحقق من الجهة المرسلة قبل التفاعل مع الرسالة.",
        linkCheckerTitle: "أدوات فحص الروابط",
        linkCheckerText: "اختر الأداة المفضلة لفحص صحة الروابط:",
        urlscanLabel: "urlscan",
        virsoLabel: "virustotal",
        selectedTool: "الأداة المختارة:",
        alertsTitle: "تنبيهات أمنية مهمة",
        alertsSubtitle: "في هذه الصفحة ستجد التنبيهات الفترية والتنبيهات الحالية المرتبطة بالاحتيال والاختراقات الشائعة في المجتمع.",
        alertNow1Title: "رسائل تنتحل صفة البنوك",
        alertNow1Text: "تنتشر رسائل تطلب تحديث الحساب أو تفعيل البطاقة عبر رابط سريع. لا تدخل بياناتك إلا من التطبيق أو الموقع الرسمي.",
        alertNow2Title: "روابط شحن وطرود وهمية",
        alertNow2Text: "بعض الرسائل تدّعي وجود شحنة معلقة وتطلب رسومًا بسيطة. هذا أسلوب شائع لسرقة البطاقة البنكية.",
        alertNow3Title: "حسابات واتساب مزيفة",
        alertNow3Text: "قد تصلك رسالة من رقم غير معروف يطلب رمز التحقق أو مساعدة مالية عاجلة. توقف وتحقق قبل الرد.",
        alertNow4Title: "جوائز أو استرداد مالي غير متوقع",
        alertNow4Text: "أي رسالة تعدك بجائزة أو استرجاع مبلغ مقابل الضغط على رابط أو إدخال بياناتك يجب اعتبارها مشبوهة.",
        aboutTitle: "من نحن",
        aboutSubtitle: "صفحة تعريفية تشرح هدف النظام وكيف يساعد المستخدم على اكتشاف الرسائل الاحتيالية بطريقة بسيطة وواضحة.",
        aboutMissionTitle: "فكرة النظام",
        aboutMissionText: "نظام عون هو مشروع يهدف إلى مساعدة المستخدمين على تحليل الرسائل المشبوهة، لتقليل الوقوع في التصيد والاحتيال الرقمي.",
        aboutHowTitle: "كيف نساعد المستخدم",
        aboutHowText: "نحلل محتوى الرسالة، مصدر الرسالة، وبعض المؤشرات السلوكية مثل الاستعجال وطلب البيانات الحساسة، ثم نعرض النتيجة بشكل مفهوم.",
        aboutAudienceTitle: "لمن صُمم النظام",
        aboutAudienceText: "النظام مناسب لجميع المستخدمين، مع اهتمام خاص بكبار السن، وذوي الاحتياجات الخاصة، والأشخاص الذين لا يملكون خبرة تقنية كافية للتمييز بين الرسائل السليمة والاحتيالية.",
        aboutGoalTitle: "هدفنا",
        aboutGoalText: "نطمح إلى رفع الوعي الرقمي، وتقديم أداة سهلة تساعد على اتخاذ قرار آمن قبل الضغط على أي رابط أو مشاركة أي معلومات حساسة.",
        howtoTitle: "كيفية استخدام النظام",
        howtoSubtitle: "خطوات بسيطة لفحص الرسائل واتخاذ قرار آمن.",
        step1Title: "أدخل الرسالة",
        step1Text: "الصق نص الرسالة في صفحة التحليل، ويمكنك أيضًا تحديد مصدر الرسالة والجهة المرسلة إن كانت معروفة.",
        step2Title: "ابدأ الفحص",
        step2Text: "بعد الضغط على زر التحليل يبدأ النظام بمراجعة النص والإشارات الاحتيالية المحتملة.",
        step3Title: "اقرأ النتيجة",
        step3Text: "ستظهر لك درجة الخطورة والتصنيف مع أسباب واضحة تساعدك على فهم سبب اعتبار الرسالة آمنة أو مشبوهة.",
        step4Title: "استخدم أدوات الروابط",
        step4Text: "إذا كانت الرسالة تحتوي على رابط، راجع الجهة المرسلة والنطاق والطلب قبل أن تضغط أي شيء.",
        step5Title: "اتخذ القرار الآمن",
        step5Text: "إذا ظهرت مؤشرات خطر، لا تضغط على الرابط ولا تشارك بياناتك، وتحقق من الجهة عبر قناة رسمية موثوقة.",
        step6Title: "تابع التنبيهات",
        step6Text: "صفحة التنبيهات تعرض أمثلة ومخاطر حالية تساعدك على التعرف على الأساليب الشائعة في الاحتيال الرقمي.",
        settingsTitle: "إعدادات الموقع",
        settingsSubtitle: "هذه التعديلات ستُطبّق على جميع صفحات الموقع وليس على الصفحة الحالية فقط.",
        langCardTitle: "اللغة",
        langCardText: "اختر لغة العرض الأساسية للموقع.",
        languageLabel: "لغة الواجهة",
        appearanceTitle: "المظهر",
        appearanceText: "تحكم بشكل النص وحجمه لتجربة قراءة مريحة.",
        fontSizeLabel: "حجم الخط",
        fontFamilyLabel: "نوع الخط",
        contrastTitle: "التباين",
        contrastText: "فعّل الوضع عالي التباين لتحسين الوضوح.",
        contrastButton: "تبديل التباين العالي",
        resetTitle: "إعادة الضبط",
        resetText: "إرجاع الإعدادات إلى الوضع الافتراضي.",
        resetButton: "إعادة تعيين الإعدادات",
        analyzeResultTitle: "نتيجة التحليل",
        resultOverview: "ملخص النتيجة",
        classification: "التصنيف",
        riskScore: "درجة الخطورة",
        highRiskSummary: "الرسالة تحتوي على مؤشرات قوية جدًا لاحتيال أو تصيد ويُنصح بعدم التفاعل معها.",
        mediumRiskSummary: "الرسالة تتضمن إشارات مقلقة وتحتاج إلى تحقق دقيق قبل اتخاذ أي إجراء.",
        lowRiskSummary: "لم تظهر مؤشرات قوية على الاحتيال، لكن يظل التحقق اليدوي خطوة مهمة.",
        reasons: "الأسباب",
        actions: "إجراءات مقترحة",
        originalMessage: "الرسالة الأصلية",
        backHome: "العودة للرئيسية",
        noResult: "لا توجد نتيجة متاحة حاليًا.",
        notice: "تنبيه",
        error: "خطأ",
        speechSelected: "قراءة النص المحدد",
        speechPage: "قراءة الصفحة",
        speechStop: "إيقاف القراءة",
        speechHint: "حدد أي نص ثم اضغط قراءة النص المحدد، أو استخدم قراءة الصفحة لسماع المحتوى الحالي.",
        speechUnsupported: "القراءة الصوتية غير مدعومة في هذا المتصفح.",
        speechNoSelection: "لم يتم تحديد نص للقراءة.",
        speechNoContent: "لم يتم العثور على نص مناسب للقراءة في هذه الصفحة.",
        speechReadingSelected: "جاري قراءة النص المحدد.",
        speechReadingPage: "جاري قراءة محتوى الصفحة.",
        speechStopped: "تم إيقاف القراءة."
    },
    en: {
        siteTitle: "AWN Anti-Fraud System",
        navMessage: "Message Analysis",
        navAlerts: "Alerts",
        navAbout: "About Us",
        navSettings: "Settings",
        navHowTo: "How to Use",
        indexTitle: "Check suspicious messages with clarity",
        indexSubtitle: "Paste the suspicious message and the system will analyze it with a clear risk summary.",
        analyzeCardTitle: "Analyze a Message",
        analyzeLabel: "Message text",
        analyzePlaceholder: "Type the message you want to inspect...",
        analyzeButton: "Analyze Now",
        messageSourceLabel: "Message source",
        sourceSms: "SMS",
        sourceEmail: "Email",
        sourceWhatsapp: "WhatsApp",
        sourceTelegram: "Telegram",
        sourceOther: "Other",
        senderHintLabel: "Sender or organization",
        senderHintPlaceholder: "Example: bank or unknown number",
        quickTipsTitle: "Quick Signals",
        quickTip1: "Highly urgent messages usually deserve extra caution.",
        quickTip2: "Never share passwords or verification codes.",
        quickTip3: "Always verify the sender before interacting with the message.",
        linkCheckerTitle: "Link Checking Tools",
        linkCheckerText: "Choose your preferred tool to verify link safety:",
        urlscanLabel: "urlscan",
        virsoLabel: "virustotal",
        selectedTool: "Selected tool:",
        alertsTitle: "Important Security Alerts",
        alertsSubtitle: "This page contains periodic alerts and current warnings related to common scams and security incidents in the community.",
        alertNow1Title: "Bank impersonation messages",
        alertNow1Text: "Some messages ask you to update your account or activate a card through a fast link. Only use the official app or website.",
        alertNow2Title: "Fake delivery and shipment links",
        alertNow2Text: "Some messages claim a shipment is pending and ask for a small fee. This is a common way to steal card details.",
        alertNow3Title: "Fake WhatsApp accounts",
        alertNow3Text: "A message from an unknown number may ask for a verification code or urgent financial help. Stop and verify first.",
        alertNow4Title: "Unexpected prizes or refunds",
        alertNow4Text: "Any message promising a prize or refund in exchange for clicking a link or entering your details should be treated as suspicious.",
        aboutTitle: "About Us",
        aboutSubtitle: "A simple page explaining the system's purpose and how it helps users identify fraudulent messages.",
        aboutMissionTitle: "System Idea",
        aboutMissionText: "AWN is a project that helps users analyze suspicious messages to reduce the chance of phishing and digital fraud.",
        aboutHowTitle: "How We Help",
        aboutHowText: "We analyze the message content, source, and behavioral signals such as urgency or requests for sensitive data, then present the result in a simple way.",
        aboutAudienceTitle: "Who It Is For",
        aboutAudienceText: "The system is designed for everyone, with special attention to older adults, people with disabilities, and users with limited technical experience.",
        aboutGoalTitle: "Our Goal",
        aboutGoalText: "We aim to improve digital awareness and provide an easy tool that supports safer decisions before clicking any link or sharing sensitive data.",
        howtoTitle: "How to Use the System",
        howtoSubtitle: "Simple steps for checking messages and making a safer decision.",
        step1Title: "Enter the message",
        step1Text: "Paste the message into the analysis page, and optionally choose the message source and sender name if known.",
        step2Title: "Start the scan",
        step2Text: "After clicking analyze, the system reviews the text and possible scam indicators.",
        step3Title: "Read the result",
        step3Text: "You will see the risk score and classification with clear reasons to understand why the message is safe or suspicious.",
        step4Title: "Review the link",
        step4Text: "If a message contains a link, inspect the sender, the domain, and the request before clicking anything.",
        step5Title: "Take the safer action",
        step5Text: "If risk indicators appear, do not click the link or share your details, and verify the sender through an official channel.",
        step6Title: "Follow alerts",
        step6Text: "The alerts page shows current examples and active risks to help you recognize common scam styles.",
        settingsTitle: "Site Settings",
        settingsSubtitle: "These changes apply across the whole website, not just the current page.",
        langCardTitle: "Language",
        langCardText: "Choose the main interface language for the site.",
        languageLabel: "Interface language",
        appearanceTitle: "Appearance",
        appearanceText: "Adjust font size and family for more comfortable reading.",
        fontSizeLabel: "Font size",
        fontFamilyLabel: "Font family",
        contrastTitle: "Contrast",
        contrastText: "Enable high contrast mode for stronger readability.",
        contrastButton: "Toggle High Contrast",
        resetTitle: "Reset",
        resetText: "Restore the default settings.",
        resetButton: "Reset Settings",
        analyzeResultTitle: "Analysis Result",
        resultOverview: "Result Overview",
        classification: "Classification",
        riskScore: "Risk Score",
        highRiskSummary: "This message shows strong phishing or fraud indicators and should not be trusted or interacted with.",
        mediumRiskSummary: "This message contains concerning indicators and should be verified carefully before taking any action.",
        lowRiskSummary: "No strong fraud indicators were detected, but manual verification is still recommended.",
        reasons: "Reasons",
        actions: "Recommended Actions",
        originalMessage: "Original Message",
        backHome: "Back to Home",
        noResult: "No result is available right now.",
        notice: "Notice",
        error: "Error",
        speechSelected: "Read Selection",
        speechPage: "Read Page",
        speechStop: "Stop Reading",
        speechHint: "Select any text and press Read Selection, or use Read Page to hear the current content.",
        speechUnsupported: "Text-to-speech is not supported in this browser.",
        speechNoSelection: "No text is selected for reading.",
        speechNoContent: "No readable text was found on this page.",
        speechReadingSelected: "Reading the selected text.",
        speechReadingPage: "Reading the page content.",
        speechStopped: "Reading has been stopped."
    }
};

window.awnTranslations = translations;

const defaults = {
    lang: "ar",
    fontSize: "16px",
    fontFamily: "\"Segoe UI\", Tahoma, sans-serif",
    contrast: "off",
    linkCheckerTool: "urlscan"
};

function getSetting(key) {
    return localStorage.getItem(key) || defaults[key];
}

function applyAppearance() {
    document.documentElement.style.setProperty("--font-size", getSetting("fontSize"));
    document.documentElement.style.setProperty("--font-family", getSetting("fontFamily"));
    document.body.classList.toggle("high-contrast", getSetting("contrast") === "on");
}

function applyLanguage(lang) {
    const selected = translations[lang] ? lang : defaults.lang;
    localStorage.setItem("lang", selected);

    const dictionary = translations[selected];
    document.documentElement.lang = selected;
    document.documentElement.dir = selected === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        if (dictionary[key]) {
            element.textContent = dictionary[key];
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.dataset.i18nPlaceholder;
        if (dictionary[key]) {
            element.setAttribute("placeholder", dictionary[key]);
        }
    });

    if (document.title && document.body.dataset.titleKey) {
        const titleKey = document.body.dataset.titleKey;
        if (dictionary[titleKey]) {
            document.title = dictionary[titleKey];
        }
    }

    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) {
        languageSelect.value = selected;
    }

    const uiLanguage = document.getElementById("uiLanguage");
    if (uiLanguage) {
        uiLanguage.value = selected;
    }

    document.dispatchEvent(new CustomEvent("awn:languagechange", { detail: { lang: selected } }));
}

function resetSettings() {
    Object.entries(defaults).forEach(([key, value]) => localStorage.setItem(key, value));
    applyAppearance();
    applyLanguage(defaults.lang);
    syncInputs();
}

function syncInputs() {
    const mapping = {
        languageSelect: getSetting("lang"),
        fontSize: getSetting("fontSize"),
        fontFamily: getSetting("fontFamily")
    };

    Object.entries(mapping).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.value = value;
        }
    });

    const uiLanguage = document.getElementById("uiLanguage");
    if (uiLanguage) {
        uiLanguage.value = getSetting("lang");
    }

    updateLinkCheckerDisplay();
}

function updateLinkCheckerDisplay() {
    const selectedTool = getSetting("linkCheckerTool");
    const toolDisplay = document.getElementById("selectedToolDisplay");
    if (toolDisplay) {
        toolDisplay.textContent = selectedTool === "virustotal" ? "virustotal" : "urlscan";
    }

    document.querySelectorAll(".link-checker-btn").forEach(btn => {
        const tool = btn.getAttribute("data-tool");
        if (tool === selectedTool) {
            btn.classList.add("active");
            btn.style.backgroundColor = "#0066cc";
            btn.style.color = "white";
        } else {
            btn.classList.remove("active");
            btn.style.backgroundColor = "";
            btn.style.color = "";
        }
    });
}

function setLinkCheckerTool(tool) {
    localStorage.setItem("linkCheckerTool", tool);
    updateLinkCheckerDisplay();
    document.dispatchEvent(new CustomEvent("awn:linkcheckerchange", { detail: { tool } }));

    const toolUrls = {
        "urlscan": "https://urlscan.io/",
        "virustotal": "https://www.virustotal.com/"
    };

    const url = toolUrls[tool];
    if (url) {
        window.open(url, "_blank");
    }
}

function setupEvents() {
    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) {
        languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));
    }

    const fontSize = document.getElementById("fontSize");
    if (fontSize) {
        fontSize.addEventListener("change", () => {
            localStorage.setItem("fontSize", fontSize.value);
            applyAppearance();
        });
    }

    const fontFamily = document.getElementById("fontFamily");
    if (fontFamily) {
        fontFamily.addEventListener("change", () => {
            localStorage.setItem("fontFamily", fontFamily.value);
            applyAppearance();
        });
    }

    const highContrastBtn = document.getElementById("highContrastBtn");
    if (highContrastBtn) {
        highContrastBtn.addEventListener("click", () => {
            const nextValue = getSetting("contrast") === "on" ? "off" : "on";
            localStorage.setItem("contrast", nextValue);
            applyAppearance();
        });
    }

    const resetBtn = document.getElementById("resetSettingsBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", resetSettings);
    }

    document.querySelectorAll(".link-checker-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const tool = btn.getAttribute("data-tool");
            setLinkCheckerTool(tool);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    Object.entries(defaults).forEach(([key, value]) => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, value);
        }
    });

    applyAppearance();
    applyLanguage(getSetting("lang"));
    syncInputs();
    setupEvents();
});
