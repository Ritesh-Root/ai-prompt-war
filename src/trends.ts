// Daily Ideas & Trends feed
// Curated, dated entries: what is happening around the learner + one small
// AI idea to try today. Served by GET /api/trends. New entries are prepended
// (newest first); the same content is archived in daily/YYYY-MM-DD.md.

export interface Trend {
  id: string
  date: string // YYYY-MM-DD
  title: { hi: string; en: string }
  what: { hi: string; en: string }
  why: { hi: string; en: string }
  idea: { hi: string; en: string }
  prompt: string // copy-paste starter, learner's own mix of Hindi/English
  levelLink: string // which PromptShala level it exercises
}

export const TRENDS: Trend[] = [
  {
    id: '2026-09-08-upi-record',
    date: '2026-09-08',
    title: { hi: 'UPI ने रिकॉर्ड तोड़ा — अगस्त में 24.51 अरब लेन-देन', en: 'UPI hits all-time record — 24.51 billion transactions in August' },
    what: {
      hi: 'NPCI के अनुसार अगस्त 2026 में UPI से 24.51 अरब लेन-देन हुए (लगभग 29.82 लाख करोड़ रुपये) — पिछले साल से 22% ज़्यादा। रक्षाबंधन पर छोटे उपहारों और P2P भुगतान ने रफ़्तार बढ़ाई।',
      en: 'NPCI reports 24.51B UPI transactions in August 2026 (~Rs 29.82 lakh crore), up 22% YoY, lifted by Raksha Bandhan gifting and peer-to-peer payments.'
    },
    why: {
      hi: 'आपके ग्राहक अब सबसे छोटी रकम भी फोन से देते हैं। त्योहारी सीज़न में UPI + ऑफर का_combo_ बिक्री बढ़ाता है।',
      en: 'Your customers already pay by phone for the smallest amounts. A UPI + festive-offer combo at your counter lifts festive sales.'
    },
    idea: {
      hi: 'दुकान/काउंटर पर "UPI + त्योहारी ऑफर" का बोर्ड लगाइए और AI से WhatsApp मैसेज लिखवाइए।',
      en: 'Put a "UPI + festive offer" board at your counter and get AI to write the WhatsApp message.'
    },
    prompt: 'मेरी किराना दुकान के लिए 2 लाइन का त्योहारी ऑफर WhatsApp मैसेज लिखो: 499 रुपये से ऊपर 5% छूट, UPI स्वीकार, होम डिलीवरी उपलब्ध।',
    levelLink: 'Level 3 + Level 5'
  },
  {
    id: '2026-09-08-festive-online',
    date: '2026-09-08',
    title: { hi: 'त्योहारी ऑनलाइन बिक्री 1.50 लाख करोड़ तक जा सकती है', en: 'Festive online sales may hit Rs 1.50 lakh crore' },
    what: {
      hi: 'अनुमान है इस त्योहारी सीज़न में ऑनलाइन बिक्री 1.50–1.55 लाख करोड़ रुपये होगी (2025 में ~1.20 लाख करोड़)। स्मार्टफोन ~30%, लाइफस्टाइल ~15%, क्विक-कॉमर्स अकेले ~24,000 करोड़।',
      en: 'Festive online GMV is estimated at Rs 1.50–1.55 lakh crore (vs ~Rs 1.20 lakh crore in 2025). Smartphones ~30%, lifestyle ~15%, quick commerce alone ~Rs 24,000 crore.'
    },
    why: {
      hi: 'ऑफलाइन बेचते हों तब भी ग्राहक पहले ऑनलाइन दाम देखते हैं। फोन की फोटो + अच्छा ब्यौरा ही बिक्री तय करता है।',
      en: 'Even offline sellers compete with online prices. Phone photos + AI-written descriptions decide sales.'
    },
    idea: {
      hi: '10 त्योहारी चीज़ों की फोटो खींचिए, AI से हर एक का 20 शब्दों में ब्यौरा लिखवाइए — WhatsApp कैटलॉग तैयार।',
      en: 'Photograph 10 festive items and get AI to write a sub-20-word description for each — instant WhatsApp catalogue.'
    },
    prompt: 'Write 10 short product descriptions (under 20 words each) for my festive items in simple Hindi + English, with price and one highlight each.',
    levelLink: 'Level 4'
  },
  {
    id: '2026-09-08-india-ai',
    date: '2026-09-08',
    title: { hi: 'भारत में AI स्टार्टअप सबसे आगे — Sarvam, Neysa, Krutrim', en: 'India AI startups lead — Sarvam, Neysa, Krutrim' },
    what: {
      hi: '2026 की पहली छमाही में भारतीय स्टार्टअप्स ने ~7.2–7.4 अरब डॉलर जुटाए; AI सबसे बड़ा विषय। Sarvam AI ने अगस्त में ~703 करोड़ रुपये जुटाए (रोज़ 1 करोड़ से ज़्यादा API कॉल), Neysa ने GPU क्लाउड के लिए 1.2 अरब डॉलर।',
      en: 'India startups raised ~$7.2–7.4B in H1 2026 with AI as the top theme. Sarvam AI raised ~Rs 703 crore in August (10M+ API calls/day); Neysa closed $1.2B for GPU cloud.'
    },
    why: {
      hi: 'हिंदी-समझने वाले AI और सस्ते क्लाउड से आपकी भाषा में काम करने वाले औज़ार बेहतर और सस्ते हो रहे हैं।',
      en: 'Indic-language AI and cheaper GPU cloud mean tools that understand your language and work keep getting better and cheaper.'
    },
    idea: {
      hi: 'एक बार-बार समझाया जाने वाला विषय चुनिए और उसका reusable AI टेम्पलेट बनाइए।',
      en: 'Pick one topic you explain repeatedly and turn it into a reusable AI template.'
    },
    prompt: 'You are a Class 5 teacher. Explain UPI safety in 5 short Hindi points with one daily-life example.',
    levelLink: 'Level 6'
  },
  {
    id: '2026-09-08-economy',
    date: '2026-09-08',
    title: { hi: 'अर्थव्यवस्था मज़बूत (7.8% GDP) पर जेब का हिसाब ज़रूरी', en: 'Strong economy (7.8% GDP) but budgets stay tight' },
    what: {
      hi: 'Q1FY27 में GDP 7.8% बढ़ी; अगस्त GST संग्रह 1,99,853 करोड़ रुपये (+14.8%)। पर महँगाई, डीज़ल/लागत और खरीफ़ की अनिश्चितता से आम ग्राहक दाम को लेकर सजग है।',
      en: 'Q1FY27 GDP grew 7.8%; August GST hit Rs 1,99,853 crore (+14.8% YoY). But food inflation, input costs and kharif dependence keep everyday buyers price-sensitive.'
    },
    why: {
      hi: 'पैसा चल रहा है पर सोचकर खर्च हो रहा है — साफ़ दाम और value-कॉम्बो जीतते हैं।',
      en: 'Money is moving but spent carefully — clear pricing and value combos win.'
    },
    idea: {
      hi: 'सितंबर का घर/दुकान बजट + स्टॉक प्लान AI से टेबल में बनवाइए।',
      en: 'Get AI to make your September home/shop budget and stock plan as a table.'
    },
    prompt: 'महीने का घरेलू बजट टेबल में बनाओ (हिंदी में): तय खर्च, खाना, बचत, एक कटौती का सुझाव। 100 शब्दों में।',
    levelLink: 'Level 5'
  },
  {
    id: '2026-09-08-agents',
    date: '2026-09-08',
    title: { hi: 'सामान्य चैटबॉट नहीं — एक काम करने वाला AI जीतेगा', en: 'Not generic chatbots — one workflow-solving AI wins' },
    what: {
      hi: 'सितंबर के वैश्विक रुझान एकमत हैं: जीतने वाले AI वही जो एक महँगा दोहराव वाला काम पूरा करें (कागज़ात, हिसाब, शेड्यूलिंग) — इंसानी जाँच के साथ।',
      en: 'September founder analyses agree: winning AI completes one expensive repeating workflow (paperwork, accounts, scheduling) with a human approval step — not another generic chatbot.'
    },
    why: {
      hi: '"AI सीखना" नहीं — हफ़्ते के 2 घंटे बचाने वाला एक workflow सीखना असली फायदा है।',
      en: 'The payoff is not "learning AI" — it is one workflow that saves you 2 hours a week.'
    },
    idea: {
      hi: 'एक workflow चुनिए और 3-कड़ी प्रॉम्प्ट-चेन चलाइए: योजना → मसौदा → छोटा करना।',
      en: 'Pick one workflow and run a 3-step prompt chain: plan → draft → shorten.'
    },
    prompt: 'मेरी दुकान के दिवाली ऑफर के लिए 3-हफ्ते का प्लान बनाओ: हफ्ता, ऑफर, WhatsApp मैसेज। 5 छोटे पॉइंट में, सरल हिंदी में।',
    levelLink: 'Level 6 + Playground'
  }
]
