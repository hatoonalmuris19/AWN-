(function () {
    function getUiLanguage() {
        return localStorage.getItem("lang") || document.documentElement.lang || "ar";
    }

    function getDictionary() {
        const translations = window.awnTranslations || {};
        const lang = getUiLanguage();
        return translations[lang] || translations.ar || {};
    }

    function t(key, fallback) {
        const dictionary = getDictionary();
        return dictionary[key] || fallback;
    }

    function detectTextLanguage(text) {
        const arabicMatches = text.match(/[\u0600-\u06FF]/g) || [];
        const englishMatches = text.match(/[A-Za-z]/g) || [];

        if (arabicMatches.length > englishMatches.length) {
            return "ar-SA";
        }

        if (englishMatches.length > arabicMatches.length) {
            return "en-US";
        }

        return getUiLanguage() === "en" ? "en-US" : "ar-SA";
    }

    function normalizeText(text) {
        return (text || "").replace(/\s+/g, " ").trim();
    }

    function splitText(text, maxLength) {
        const chunks = [];
        let remaining = normalizeText(text);
        const arabicComma = "\u060C";

        while (remaining.length > maxLength) {
            let splitAt = remaining.lastIndexOf(".", maxLength);
            if (splitAt < maxLength * 0.4) {
                splitAt = remaining.lastIndexOf(arabicComma, maxLength);
            }
            if (splitAt < maxLength * 0.4) {
                splitAt = remaining.lastIndexOf(",", maxLength);
            }
            if (splitAt < maxLength * 0.4) {
                splitAt = remaining.lastIndexOf(" ", maxLength);
            }
            if (splitAt <= 0) {
                splitAt = maxLength;
            }

            chunks.push(remaining.slice(0, splitAt + 1).trim());
            remaining = remaining.slice(splitAt + 1).trim();
        }

        if (remaining) {
            chunks.push(remaining);
        }

        return chunks.filter(Boolean);
    }

    function getVoices() {
        return window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    }

    function pickVoice(lang) {
        const voices = getVoices();
        if (!voices.length) {
            return null;
        }

        const prefix = lang.split("-")[0];

        function scoreVoice(voice) {
            const voiceLang = (voice.lang || "").toLowerCase();
            const voiceName = (voice.name || "").toLowerCase();
            let score = 0;

            if (voiceLang === lang.toLowerCase()) {
                score += 120;
            } else if (voiceLang.startsWith(prefix.toLowerCase())) {
                score += 80;
            }

            if (voice.localService) {
                score += 18;
            }

            if (voice.default) {
                score += 12;
            }

            if (/natural|neural|enhanced|premium|online|google|microsoft/i.test(voice.name || "")) {
                score += 20;
            }

            if (prefix === "ar") {
                if (/arabic|saudi|hail|naayf|tarik|maged/i.test(voiceName)) {
                    score += 24;
                }
            }

            if (prefix === "en") {
                if (/english|united states|united kingdom|aria|jenny|guy|davis|libby/i.test(voiceName)) {
                    score += 24;
                }
            }

            return score;
        }

        return voices
            .filter((voice) => (voice.lang || "").toLowerCase().startsWith(prefix.toLowerCase()))
            .sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] || null;
    }

    function extractTextFromElement(element) {
        if (!element) {
            return "";
        }

        const blockedTags = new Set(["SCRIPT", "STYLE", "NAV", "SELECT", "OPTION", "INPUT", "TEXTAREA", "BUTTON"]);
        const parts = [];

        function visit(node) {
            if (!node) {
                return;
            }

            if (node.nodeType === Node.TEXT_NODE) {
                const value = normalizeText(node.textContent || "");
                if (value) {
                    parts.push(value);
                }
                return;
            }

            if (node.nodeType !== Node.ELEMENT_NODE) {
                return;
            }

            if (blockedTags.has(node.tagName) || node.hasAttribute("data-speech-exclude")) {
                return;
            }

            Array.from(node.childNodes).forEach(visit);
        }

        visit(element);
        return normalizeText(parts.join(". "));
    }

    function getReadableRoot() {
        const selectors = [
            "[data-speech-content]",
            ".result-grid",
            ".page-grid",
            ".alert-feed",
            ".settings-grid",
            ".guide-grid",
            ".about-grid",
            ".card"
        ];

        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                return element;
            }
        }

        return document.querySelector(".shell") || document.body;
    }

    function getSelectedText() {
        return normalizeText(window.getSelection ? window.getSelection().toString() : "");
    }

    function splitIntoSegments(text) {
        return normalizeText(text)
            .split(/(?<=[.!?\u061F])\s+|\n+/)
            .map(normalizeText)
            .filter(Boolean);
    }

    function buildSpeechItems(text) {
        const segments = splitIntoSegments(text);
        return segments.flatMap((segment) => {
            const lang = detectTextLanguage(segment);
            const voice = pickVoice(lang);

            return splitText(segment, 220).map((chunk) => {
                const utterance = new SpeechSynthesisUtterance(chunk);
                utterance.lang = lang;
                utterance.rate = lang.startsWith("ar") ? 0.92 : 0.98;
                utterance.pitch = 1;
                if (voice) {
                    utterance.voice = voice;
                }
                return utterance;
            });
        });
    }

    function initAccessibilityWidget() {
        const synthesis = window.speechSynthesis;
        if (!synthesis) {
            return;
        }

        // Create floating button
        const floatingBtn = document.createElement("button");
        floatingBtn.className = "speech-floating-btn";
        floatingBtn.setAttribute("data-speech-exclude", "true");
        floatingBtn.setAttribute("type", "button");
        floatingBtn.setAttribute("aria-label", "Toggle speech tools");
        floatingBtn.innerHTML = '🔊';

        // Create collapsible toolbar
        const toolbar = document.createElement("div");
        toolbar.className = "speech-toolbar speech-toolbar--collapsed";
        toolbar.setAttribute("data-speech-exclude", "true");
        toolbar.innerHTML = [
            '<div class="speech-toolbar__actions">',
            '<button type="button" class="speech-button" data-action="selection"></button>',
            '<button type="button" class="speech-button" data-action="page"></button>',
            '<button type="button" class="speech-button speech-button--secondary" data-action="stop"></button>',
            "</div>",
            '<p class="speech-toolbar__status" aria-live="polite"></p>'
        ].join("");

        document.body.appendChild(floatingBtn);
        document.body.appendChild(toolbar);

        // Toggle toolbar visibility
        floatingBtn.addEventListener("click", () => {
            toolbar.classList.toggle("speech-toolbar--collapsed");
            toolbar.classList.toggle("speech-toolbar--expanded");
        });

        const selectionButton = toolbar.querySelector('[data-action="selection"]');
        const pageButton = toolbar.querySelector('[data-action="page"]');
        const stopButton = toolbar.querySelector('[data-action="stop"]');
        const status = toolbar.querySelector(".speech-toolbar__status");

        function setStatus(messageKey, fallback) {
            status.textContent = t(messageKey, fallback);
        }

        function syncLabels() {
            selectionButton.textContent = t("speechSelected", "Read Selection");
            pageButton.textContent = t("speechPage", "Read Page");
            stopButton.textContent = t("speechStop", "Stop Reading");
            setStatus("speechHint", "Select text or read the page.");
            selectionButton.disabled = !getSelectedText();
        }

        function stopReading() {
            synthesis.cancel();
            setStatus("speechStopped", "Reading has been stopped.");
        }

        function speak(text, statusKey, fallback) {
            const normalized = normalizeText(text);
            if (!normalized) {
                return false;
            }

            synthesis.cancel();
            const utterances = buildSpeechItems(normalized);
            utterances.forEach((utterance, index) => {
                if (index === 0) {
                    utterance.onstart = function () {
                        setStatus(statusKey, fallback);
                    };
                }
                synthesis.speak(utterance);
            });
            return true;
        }

        selectionButton.addEventListener("click", function () {
            const selectedText = getSelectedText();
            if (!selectedText) {
                setStatus("speechNoSelection", "No text is selected for reading.");
                return;
            }

            speak(selectedText, "speechReadingSelected", "Reading the selected text.");
        });

        pageButton.addEventListener("click", function () {
            const pageText = extractTextFromElement(getReadableRoot());
            if (!pageText) {
                setStatus("speechNoContent", "No readable text was found on this page.");
                return;
            }

            speak(pageText, "speechReadingPage", "Reading the page content.");
        });

        stopButton.addEventListener("click", stopReading);

        document.addEventListener("selectionchange", function () {
            selectionButton.disabled = !getSelectedText();
        });

        document.addEventListener("awn:languagechange", syncLabels);
        if (typeof synthesis.addEventListener === "function") {
            synthesis.addEventListener("voiceschanged", syncLabels);
        } else {
            synthesis.onvoiceschanged = syncLabels;
        }

        syncLabels();
    }

    document.addEventListener("DOMContentLoaded", initAccessibilityWidget);
})();
