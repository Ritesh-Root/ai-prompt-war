// ─────────────────────────────────────────────────────────────
// PromptShala — Daily Ideas & Trends
// Curated seed for 2026-09-15. Served by GET /api/daily.
// Each item: a real world trend → a small business idea → a ready prompt.
// Bilingual (en default, hi available). Sources are mainstream press.
// ─────────────────────────────────────────────────────────────

export interface DailyIdea {
  id: string
  date: string // YYYY-MM-DD
  tag: { hi: string; en: string }
  trend: { hi: string; en: string }
  why: { hi: string; en: string }
  idea: { hi: string; en: string }
  prompt: { hi: string; en: string }
  forProfessions: string[] // profession keys, or ['all']
  source: string
}

export const DAILY_DATE = '2026-09-15'

export const DAILY_IDEAS: DailyIdea[] = [
  {
    id: 'd1-agentic-upi',
    date: DAILY_DATE,
    tag: { hi: 'AI एजेंट', en: 'AI agents' },
    trend: {
      hi: 'UPI के लिए AI-एजेंट रजिस्ट्री: NPCI अब स्वीकृत AI एजेंटों के लिए "Unified Agentic Protocol" बना रहा है — जल्द AI आपकी ओर से पेमेंट और ऑर्डर भी कर सकेगा।',
      en: 'AI-agent registry for UPI: NPCI is building a "Unified Agentic Protocol" so approved AI agents can pay and order on your behalf.'
    },
    why: {
      hi: 'दुकानदारों और छोटे बिज़नेस के लिए दोहराए जाने वाले ऑर्डर, पेमेंट रिमाइंडर और हिसाब AI संभाल सकेगा — पर इंसान की मंज़ूरी ज़रूरी रहेगी।',
      en: 'For shopkeepers and small businesses, repeat orders, payment reminders and bookkeeping can be delegated to AI — with human approval kept in the loop.'
    },
    idea: {
      hi: 'WhatsApp पर उधार/पेमेंट रिमाइंडर मैसेज का 3-टेम्पलेट सेट बनाइए — विनम्र, फर्म, और अंतिम सूचना।',
      en: 'Make a 3-template payment-reminder set for WhatsApp — polite nudge, firm follow-up, final notice.'
    },
    prompt: {
      hi: 'मेरी किराना दुकान के लिए 3 छोटे WhatsApp पेमेंट रिमाइंडर लिखो — पहला विनम्र, दूसरा फर्म, तीसरा अंतिम सूचना। सरल हिंदी में, हर एक 2 लाइन में।',
      en: 'Write 3 short WhatsApp payment reminders for my grocery store — first polite, second firm, third final notice. Simple language, 2 lines each.'
    },
    forProfessions: ['shopkeeper', 'tailor', 'professional', 'all'],
    source: 'Reuters, 10 Sep 2026'
  },
  {
    id: 'd2-one-prompt-website',
    date: DAILY_DATE,
    tag: { hi: 'एक प्रॉम्प्ट में वेबसाइट', en: 'One-prompt website' },
    trend: {
      hi: 'एक प्रॉम्प्ट से पूरी वेबसाइट: Leadpages का नया साइट-बिल्डर और SmallBiz.ai जैसे टूल अब एक ही निर्देश से होम, प्राइसिंग, संपर्क — पूरे पेज एक साथ बना देते हैं।',
      en: 'Entire websites from one prompt: tools like Leadpages\' new builder and SmallBiz.ai now generate a whole multi-page site from a single instruction.'
    },
    why: {
      hi: 'टेलर, दुकानदार और कोचिंग टीचर बिना डिज़ाइनर के अपना रेट-कार्ड और कैटलॉग पेज बना सकते हैं — बस सही प्रॉम्प्ट चाहिए।',
      en: 'Tailors, shopkeepers and tutors can publish a rate-card or catalogue page without a designer — the prompt is the skill.'
    },
    idea: {
      hi: 'अपनी दुकान/बुटीक का एक-पेज रेट कार्ड बनाइए: 5 बेस्ट आइटम, दाम, WhatsApp ऑर्डर लाइन।',
      en: 'Make a one-page rate card for your shop/boutique: 5 best items, prices, WhatsApp order line.'
    },
    prompt: {
      hi: 'मेरे बुटीक के लिए एक-पेज वेबसाइट का पूरा टेक्स्ट लिखो: दुकान का नाम "New Style Boutique", 5 सिलाई आइटम उनके दाम के साथ, ऑर्डर के लिए WhatsApp नंबर की लाइन, सरल हिंदी में।',
      en: 'Write the full text for a one-page website for my boutique "New Style Boutique": 5 stitching items with prices, a WhatsApp order line, in simple English, 5 short sections.'
    },
    forProfessions: ['tailor', 'shopkeeper', 'teacher', 'all'],
    source: 'Leadpages blog, 12 Sep 2026; SmallBiz.ai launch, 4 Sep 2026'
  },
  {
    id: 'd3-climate-agri',
    date: DAILY_DATE,
    tag: { hi: 'किसानों के लिए AI', en: 'AI for farmers' },
    trend: {
      hi: 'Google ने 4 भारतीय क्लाइमेट-AI स्टार्टअप चुने (Terrastack, Varaha, Farmers for Forests, Climitra) — सैटेलाइट + AI से छोटे किसानों को ज़मीन, फसल और कार्बन-क्रेडिट की सलाह। साथ ही Solar API अब 30 करोड़ छतों तक।',
      en: 'Google picked 4 Indian climate-AI startups (Terrastack, Varaha, Farmers for Forests, Climitra) — satellite + AI advice for small farmers on land, crops and carbon credits. Its Solar API now scales toward 300M rooftops.'
    },
    why: {
      hi: 'किसान अब मौसम, मंडी भाव और सरकारी योजना — तीनों के लिए AI से छोटे, जाँचे हुए सवाल पूछना सीखें तो सीधा फायदा।',
      en: 'Farmers gain directly by asking AI short, verifiable questions on weather, mandi prices and government schemes.'
    },
    idea: {
      hi: 'अपनी फसल के लिए "आज का 3-सवाल चेक" बनाइए: मौसम + मंडी भाव + योजना की पात्रता।',
      en: 'Build a "daily 3-question check" for your crop: weather + mandi price + scheme eligibility.'
    },
    prompt: {
      hi: 'मैं MP में सोयाबीन उगाता हूँ। बताओ: (1) इस हफ्ते बारिश का क्या ध्यान रखूँ, (2) मंडी भाव पूछने के लिए सही सवाल कैसे लिखूँ, (3) किसानों की एक सरकारी योजना की पात्रता 5 पॉइंट में। सरल हिंदी में।',
      en: 'I grow soybean in MP. Tell me: (1) what to watch for in this week\'s rain, (2) how to phrase the right question to ask mandi prices, (3) eligibility for one farmer government scheme in 5 points. Simple English.'
    },
    forProfessions: ['farmer', 'homemaker', 'all'],
    source: 'Rediff/Google, 15 Sep 2026; Google sustainability blog, 10 Sep 2026'
  },
  {
    id: 'd4-space-startups',
    date: DAILY_DATE,
    tag: { hi: 'स्टार्टअप बूम', en: 'Startup boom' },
    trend: {
      hi: 'अंतरिक्ष-टेक में धमाका: Pixxel ने $100M जुटाए, GalaxEye को US पेटेंट मिला, Agnikul ने reusable रॉकेट फैसिलिटी खोली। देश में 450+ स्पेस स्टार्टअप; Hurun ने 110 भावी यूनिकॉर्न पहचाने।',
      en: 'Space-tech surge: Pixxel raised $100M, GalaxEye earned a US patent, Agnikul opened reusable-rocket facilities. 450+ space startups in India; Hurun tracks 110 future unicorns.'
    },
    why: {
      hi: 'छात्रों और ऑफिस प्रोफेशनल के लिए यह "डीप-टेक + AI" स्किल का संकेत है — रिसर्च, सारांश और प्रेजेंटेशन AI से तेज़।',
      en: 'For students and professionals this signals "deep-tech + AI" skills — research, summaries and presentations go faster with AI.'
    },
    idea: {
      hi: 'किसी एक स्टार्टअप खबर पर 5-स्लाइड का क्लास प्रेजेंटेशन या लिंक्डइन पोस्ट बनाइए।',
      en: 'Turn one startup story into a 5-slide class presentation or a LinkedIn post.'
    },
    prompt: {
      hi: 'Pixxel के $100M फंडिंग पर कक्षा 10 के लिए 5 स्लाइड का प्रेजेंटेशन आउटलाइन बनाओ: कंपनी क्या करती है, पैसा किस काम आएगा, भारत के लिए क्यों ज़रूरी — सरल हिंदी, हर स्लाइड 3 पॉइंट।',
      en: 'Make a 5-slide presentation outline on Pixxel\'s $100M funding for Class 10: what the company does, what the money is for, why it matters for India — simple English, 3 points per slide.'
    },
    forProfessions: ['student', 'teacher', 'professional', 'all'],
    source: 'TICE News week of 7–13 Sep 2026; Hurun Cheetah Index 2026'
  },
  {
    id: 'd5-ai-at-work',
    date: DAILY_DATE,
    tag: { hi: 'काम में AI', en: 'AI at work' },
    trend: {
      hi: 'काम की नई सच्चाई: Wipro का कहना है AI से 20,000 लोगों के बराबर क्षमता मुक्त हुई (1 लाख+ स्टाफ को AI ट्रेनिंग); Microsoft की स्टडी में 32% भारतीय AI यूज़र "Frontier Professional" — दुनिया के औसत से दोगुना। बहस भी तेज़: Anthropic ने "kill switch" की बात की, Microsoft ने "humanist AI" गाइडलाइन निकाली।',
      en: 'The new reality of work: Wipro says AI freed capacity equal to 20,000 staff (100k+ trained); 32% of Indian AI users are "Frontier Professionals" per Microsoft — double the global average. Debate is live too: Anthropic proposed a "kill switch", Microsoft published "humanist AI" guardrails.'
    },
    why: {
      hi: 'नौकरी बचाने का तरीका AI से लड़ना नहीं — AI को जाँचना, सुधारना और ज़िम्मेदारी से चलाना सीखना है। यही PromptShala का रिपोर्ट-कार्ड स्किल है।',
      en: 'The way to stay valuable is not to fight AI but to verify, refine and govern it — exactly PromptShala\'s report-card skill.'
    },
    idea: {
      hi: 'अपने किसी असली कामकाजी मैसेज (छुट्टी की अर्ज़ी, क्लाइंट ईमेल, होम-बजट) को AI से लिखवाकर "verify + improve" का 2-स्टेप अभ्यास कीजिए।',
      en: 'Take one real work message (leave request, client email, home budget), draft it with AI, then do a 2-step "verify + improve" pass.'
    },
    prompt: {
      hi: 'क्लाइंट को भेजने के लिए 6 लाइन का औपचारिक ईमेल लिखो: त्योहार के कारण डिलीवरी में 3 दिन की देरी, नई तारीख, और असुविधा के लिए खेद। फिर नीचे 3 पॉइंट में बताओ मैंने क्या जाँचना चाहिए।',
      en: 'Draft a 6-line formal email to a client: 3-day delivery delay due to the festival, new date, apology for inconvenience. Then list 3 points below on what I should verify before sending.'
    },
    forProfessions: ['professional', 'teacher', 'homemaker', 'student', 'all'],
    source: 'Reuters, 10 Sep 2026; Microsoft Frontier study, 3 Sep 2026; BBC/Reuters, 15 Sep 2026'
  }
]
