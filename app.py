import csv
import os
import re
from difflib import SequenceMatcher
from urllib.parse import urlparse

from flask import Flask, render_template, request

app = Flask(__name__)


def t(ar_text, en_text, ui_language):
    return ar_text if ui_language == "ar" else en_text


def translate_label(label, ui_language):
    mapping = {
        "Safe": "آمنة",
        "Suspicious": "مشبوهة",
        "Fraudulent": "احتيالية",
        "safe": "آمنة",
        "suspicious": "مشبوهة",
        "fraudulent": "احتيالية",
        "phishing": "احتيالية",
    }
    if ui_language == "ar":
        return mapping.get(label, label)
    return label


def get_source_label(source, ui_language):
    labels = {
        "sms": {"ar": "رسالة نصية", "en": "SMS"},
        "email": {"ar": "بريد إلكتروني", "en": "Email"},
        "whatsapp": {"ar": "واتساب", "en": "WhatsApp"},
        "telegram": {"ar": "تيليجرام", "en": "Telegram"},
        "other": {"ar": "مصدر آخر", "en": "Other"},
    }
    return labels.get(source, labels["other"])[ui_language]


def normalize_message_text(text):
    return re.sub(r"\s+", " ", (text or "").strip().lower())


URL_PATTERN = re.compile(r"(?:(?:https?://)?(?:[\w-]+\.)+[a-zA-Z]{2,}(?:/[^\s]*)?)")


def extract_urls(text):
    if not text:
        return []

    seen = set()
    urls = []
    for match in URL_PATTERN.findall(text):
        cleaned = match.strip("()[]{}<>\"'.,!?")
        if cleaned and cleaned not in seen:
            seen.add(cleaned)
            urls.append(cleaned)
    return urls


_DATASET_EXAMPLES = None


def load_dataset_examples():
    global _DATASET_EXAMPLES
    if _DATASET_EXAMPLES is not None:
        return _DATASET_EXAMPLES

    dataset_path = os.path.join(app.root_path, "data", "messages_dataset.csv")
    examples = []

    if os.path.exists(dataset_path):
        try:
            with open(dataset_path, newline="", encoding="utf-8") as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    text = (row.get("text") or row.get("message") or "").strip()
                    label = (row.get("label") or "").strip().lower()
                    if text and label:
                        normalized = normalize_message_text(text)
                        tokens = set(re.findall(r"[a-z0-9\u0600-\u06FF]+", normalized))
                        examples.append(
                            {
                                "text": text,
                                "label": label,
                                "normalized": normalized,
                                "tokens": tokens,
                            }
                        )
        except Exception:
            examples = []

    _DATASET_EXAMPLES = examples
    return examples


def best_dataset_match(message):
    normalized_message = normalize_message_text(message)
    message_tokens = set(re.findall(r"[a-z0-9\u0600-\u06FF]+", normalized_message))

    best = None
    best_score = 0.0

    for example in load_dataset_examples():
        if normalized_message == example["normalized"]:
            return {
                "label": example["label"],
                "score": 1.0,
                "text": example["text"],
            }

        ratio_score = SequenceMatcher(None, normalized_message, example["normalized"]).ratio()
        union = message_tokens | example["tokens"]
        overlap = len(message_tokens & example["tokens"])
        token_score = overlap / len(union) if union else 0.0
        score = max(ratio_score, token_score)

        if score > best_score:
            best_score = score
            best = {
                "label": example["label"],
                "score": score,
                "text": example["text"],
            }

    if best and best_score >= 0.72:
        return best

    return None


def analyze_urls(urls):
    risk_bonus = 0

    suspicious_shorteners = ("bit.ly", "tinyurl", "t.co", "goo.gl", "shorturl")
    suspicious_tlds = (".xyz", ".top", ".click", ".vip", ".gq", ".ru")

    for raw_url in urls:
        url = raw_url if raw_url.startswith(("http://", "https://")) else f"http://{raw_url}"
        parsed = urlparse(url)
        host = (parsed.netloc or parsed.path).lower()

        if raw_url.startswith("http://"):
            risk_bonus += 12

        if any(shortener in host for shortener in suspicious_shorteners):
            risk_bonus += 18

        if any(host.endswith(tld) for tld in suspicious_tlds):
            risk_bonus += 12

        if host.count("-") >= 2 or host.count(".") >= 3:
            risk_bonus += 8

        if re.search(r"\d", host):
            risk_bonus += 5

    return risk_bonus


def local_analyze(message, ui_language="ar", source="other", sender_hint=""):
    lowered = message.lower()
    sender_hint = sender_hint.strip()

    urls = extract_urls(message)
    url_risk = analyze_urls(urls)
    dataset_match = best_dataset_match(message)

    if dataset_match:
        dataset_label = dataset_match["label"]
        normalized_label = {
            "phishing": "Fraudulent",
            "fraudulent": "Fraudulent",
            "suspicious": "Suspicious",
            "safe": "Safe",
        }.get(dataset_label, "Fraudulent")

        if dataset_match["score"] >= 0.95:
            risk_score = 95
        elif dataset_match["score"] >= 0.85:
            risk_score = 90
        else:
            risk_score = 82

        if ui_language == "ar":
            dataset_reason = (
                "تم العثور على تطابق مباشر مع مثال احتيالي موجود في مجموعة البيانات."
                if dataset_match["score"] >= 0.95
                else "تم العثور على تطابق قريب مع مثال احتيالي موجود في مجموعة البيانات."
            )
        else:
            dataset_reason = (
                "An exact match was found in the dataset examples."
                if dataset_match["score"] >= 0.95
                else "A close match was found in the dataset examples."
            )

        return {
            "classification": translate_label(normalized_label, ui_language),
            "risk_score": risk_score,
            "reasons": [dataset_reason],
            "user_actions": [
                t(
                    "لا تضغط على أي رابط قبل التأكد من الجهة المرسلة.",
                    "Do not click any link before verifying the sender.",
                    ui_language,
                ),
                t(
                    "لا تشارك كلمات المرور أو رموز التحقق أو بياناتك البنكية.",
                    "Do not share passwords, OTP codes, or banking details.",
                    ui_language,
                ),
                t(
                    "تحقق من الرسالة عبر قناة رسمية موثوقة.",
                    "Verify the message through an official website or trusted number.",
                    ui_language,
                ),
            ],
            "source_label": get_source_label(source, ui_language),
            "sender_hint": sender_hint,
        }

    reasons = []
    risk_score = 5 + url_risk

    arabic_keywords = {
        "urgent": ["عاجل", "فورًا", "حالا", "حاليًا", "مستعجل", "خلال", "إيقاف", "تعليق"],
        "credentials": ["كلمة المرور", "رمز التحقق", "الرمز", "تسجيل الدخول", "تحقق", "otp"],
        "money": ["ادفع", "حوالة", "رسوم", "غرامة", "مبلغ", "تحويل", "استرداد", "جائزة"],
        "impersonation": ["البنك", "أبشر", "الشرطة", "الجمارك", "الدعم الفني", "شركة الشحن"],
    }
    english_keywords = {
        "urgent": ["urgent", "immediately", "now", "suspend", "expired", "within 24 hours"],
        "credentials": ["password", "verification code", "otp", "login", "verify your account"],
        "money": ["pay", "transfer", "fee", "fine", "refund", "winner", "prize", "gift card"],
        "impersonation": ["bank", "microsoft", "apple", "customs", "police", "support team", "delivery company"],
    }

    for category, keywords in {**english_keywords, **arabic_keywords}.items():
        if not any(word in lowered for word in keywords):
            continue

        if category == "urgent":
            risk_score += 20
            reasons.append(
                t(
                    "الرسالة تستخدم أسلوب الاستعجال والضغط.",
                    "The message uses urgency or pressure tactics.",
                    ui_language,
                )
            )
        elif category == "credentials":
            risk_score += 30
            reasons.append(
                t(
                    "الرسالة تطلب معلومات حساسة أو رموز تحقق.",
                    "The message asks for sensitive account information or verification codes.",
                    ui_language,
                )
            )
        elif category == "money":
            risk_score += 25
            reasons.append(
                t(
                    "الرسالة تتضمن طلبًا ماليًا أو رسومًا أو وعدًا بجائزة.",
                    "The message mentions money, fees, rewards, or transfers.",
                    ui_language,
                )
            )
        elif category == "impersonation":
            risk_score += 20
            reasons.append(
                t(
                    "قد تنتحل الرسالة صفة جهة موثوقة.",
                    "The message may be impersonating a trusted organization.",
                    ui_language,
                )
            )

    if source == "sms":
        risk_score += 6
        reasons.append(
            t(
                "وصلت الرسالة عبر الرسائل النصية، وهو مسار شائع للاحتيال السريع.",
                "The message came by SMS, which is a common channel for quick scams.",
                ui_language,
            )
        )
    elif source == "whatsapp":
        risk_score += 5
        reasons.append(
            t(
                "وصلت الرسالة عبر واتساب، ويُستخدم كثيرًا في الروابط والطلبات المستعجلة.",
                "The message came through WhatsApp, which is often used for urgent scam links.",
                ui_language,
            )
        )
    elif source == "email":
        risk_score += 4
        reasons.append(
            t(
                "وصلت الرسالة عبر البريد الإلكتروني، لذا يجب التحقق من الجهة والروابط.",
                "The message came via email, so sender identity and links should be verified.",
                ui_language,
            )
        )

    if sender_hint and any(word in lowered for word in ["bank", "support", "service", "البنك", "الدعم", "الخدمة"]):
        risk_score += 6
        reasons.append(
            t(
                "اسم الجهة أو المرسل قد يُستخدم لاستغلال الثقة.",
                "The sender or organization name may be used to exploit trust.",
                ui_language,
            )
        )

    if re.search(r"\b\d{4,8}\b", message) and any(token in lowered for token in ["otp", "code", "رمز", "verification"]):
        risk_score += 15
        reasons.append(
            t(
                "الرسالة تذكر أرقامًا أو رموز تحقق رقمية.",
                "The message references codes or numeric verification details.",
                ui_language,
            )
        )

    if not reasons:
        reasons.append(
            t(
                "لم تظهر مؤشرات احتيال قوية في هذه الرسالة.",
                "No strong scam indicators were detected in this message.",
                ui_language,
            )
        )

    risk_score = max(0, min(100, risk_score))
    if risk_score >= 75:
        classification = "Fraudulent"
    elif risk_score >= 40:
        classification = "Suspicious"
    else:
        classification = "Safe"

    if ui_language == "ar":
        user_actions = [
            "لا تضغط على أي رابط قبل التأكد من الجهة المرسلة.",
            "لا تشارك كلمات المرور أو رموز التحقق أو بياناتك البنكية.",
            "تحقق من الرسالة عبر موقع رسمي أو رقم موثوق.",
        ]
    else:
        user_actions = [
            "Do not click any link before verifying the sender.",
            "Do not share passwords, OTP codes, or banking details.",
            "Verify the message through an official website or trusted number.",
        ]

    return {
        "classification": translate_label(classification, ui_language),
        "risk_score": risk_score,
        "reasons": reasons,
        "user_actions": user_actions,
        "source_label": get_source_label(source, ui_language),
        "sender_hint": sender_hint,
    }


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():
    message = request.form.get("message", "").strip()
    ui_language = request.form.get("ui_language", "ar").strip().lower()
    source = request.form.get("message_source", "other").strip().lower()
    sender_hint = request.form.get("sender_hint", "").strip()

    if ui_language not in {"ar", "en"}:
        ui_language = "ar"
    if source not in {"sms", "email", "whatsapp", "telegram", "other"}:
        source = "other"

    if not message:
        error_text = t("الرجاء إدخال رسالة للتحليل.", "Please enter a message to analyze.", ui_language)
        return render_template("analyze.html", result=None, error=error_text, original_message="")

    result = local_analyze(message, ui_language=ui_language, source=source, sender_hint=sender_hint)
    return render_template("analyze.html", result=result, error=None, original_message=message)


@app.route("/alerts")
def alerts():
    return render_template("alerts.html")


@app.route("/settings")
def settings():
    return render_template("settings.html")


@app.route("/howto")
def howto():
    return render_template("howto.html")


@app.route("/about")
def about():
    return render_template("about.html")


if __name__ == "__main__":
    app.run(debug=True)
