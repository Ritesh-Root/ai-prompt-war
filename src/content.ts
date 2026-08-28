// PromptShala Curriculum — "AI ki Barakhadi"
// 5 levels modelled on how a child learns alphabets → words → sentences → stories

export type Lang = 'hi' | 'en'

export const PROFESSIONS: Record<string, { icon: string; en: string; hi: string; context: string }> = {
  shopkeeper: { icon: 'fa-store', en: 'Shopkeeper', hi: 'दुकानदार', context: 'runs a small kirana/general store, sells daily items, deals with customers and suppliers, uses WhatsApp for business' },
  farmer: { icon: 'fa-wheat-awn', en: 'Farmer', hi: 'किसान', context: 'grows crops, needs weather/mandi price info, government scheme details, pest control advice' },
  teacher: { icon: 'fa-chalkboard-user', en: 'Teacher', hi: 'शिक्षक', context: 'teaches school students, prepares lessons, question papers, explains difficult topics simply' },
  student: { icon: 'fa-graduation-cap', en: 'Student', hi: 'विद्यार्थी', context: 'studies in school/college, prepares for exams, writes assignments, learns new skills' },
  tailor: { icon: 'fa-scissors', en: 'Tailor / Boutique', hi: 'दर्ज़ी / बुटीक', context: 'stitches clothes, designs outfits, manages customer orders, promotes work on WhatsApp/Instagram' },
  homemaker: { icon: 'fa-house-user', en: 'Home-maker', hi: 'गृहिणी', context: 'manages home, cooking, children education, budgets, health of family' }
}

export interface Lesson {
  id: string
  level: number
  title: { hi: string; en: string }
  concept: { hi: string; en: string }
  activity: {
    type: 'tap_quiz' | 'fill_blank' | 'blocks' | 'free_prompt' | 'workflow'
    question?: { hi: string; en: string }
    options?: { hi: string[]; en: string[] }
    answer?: number
    template?: { hi: string; en: string } // fill_blank: use ___ for blank
    blockHint?: { hi: string; en: string }
  }
}

export const LEVELS = [
  { level: 1, name: { hi: 'अ — AI क्या है?', en: 'अ — What is AI?' }, tag: { hi: 'नर्सरी', en: 'Nursery' }, icon: 'fa-seedling' },
  { level: 2, name: { hi: 'का कि की — पहला प्रॉम्प्ट', en: 'का कि की — Baby Prompts' }, tag: { hi: 'के.जी.', en: 'KG' }, icon: 'fa-comment-dots' },
  { level: 3, name: { hi: 'शब्द — प्रॉम्प्ट के ब्लॉक', en: 'शब्द — Prompt Blocks' }, tag: { hi: 'कक्षा 1', en: 'Class 1' }, icon: 'fa-cubes' },
  { level: 4, name: { hi: 'वाक्य — अपने काम के प्रॉम्प्ट', en: 'वाक्य — Prompts for YOUR work' }, tag: { hi: 'कक्षा 2', en: 'Class 2' }, icon: 'fa-briefcase' },
  { level: 5, name: { hi: 'कहानी — AI आपके workflow में', en: 'कहानी — AI in your workflow' }, tag: { hi: 'कक्षा 3', en: 'Class 3' }, icon: 'fa-rocket' }
]

export const LESSONS: Lesson[] = [
  // LEVEL 1 — What is AI (tap concepts, zero jargon)
  {
    id: 'l1a', level: 1,
    title: { hi: 'AI एक होशियार सहायक है', en: 'AI is a smart helper' },
    concept: {
      hi: 'AI (जैसे ChatGPT, Gemini) एक होशियार सहायक है — जैसे एक पढ़ा-लिखा दोस्त जो हर सवाल का जवाब देता है। आप उससे <b>अपनी भाषा में</b> बात कर सकते हैं। ना कोई कोडिंग, ना अंग्रेज़ी ज़रूरी!',
      en: 'AI (like ChatGPT, Gemini) is a smart helper — like an educated friend who answers every question. You can talk to it <b>in your own language</b>. No coding, no English needed!'
    },
    activity: {
      type: 'tap_quiz',
      question: { hi: 'AI से बात करने के लिए क्या ज़रूरी है?', en: 'What do you need to talk to AI?' },
      options: {
        hi: ['कंप्यूटर की पढ़ाई', 'सिर्फ अपनी बात — किसी भी भाषा में', 'अंग्रेज़ी आना'],
        en: ['A computer degree', 'Just your words — in any language', 'Knowing English']
      },
      answer: 1
    }
  },
  {
    id: 'l1b', level: 1,
    title: { hi: 'प्रॉम्प्ट = AI से आपकी बात', en: 'Prompt = what you say to AI' },
    concept: {
      hi: 'आप AI को जो भी बोलते या लिखते हैं, उसे <b>प्रॉम्प्ट</b> कहते हैं। जैसे दुकान पर बोलते हैं "आधा किलो चीनी देना" — वैसे ही AI से बोलिए "मुझे आज की रोटी-सब्ज़ी की लिस्ट बनाकर दो"। जितनी साफ़ बात, उतना अच्छा जवाब!',
      en: 'Whatever you say or type to AI is called a <b>prompt</b>. Just like you say "give me half kg sugar" at a shop — tell AI "make me a shopping list for today\'s dinner". Clearer words = better answers!'
    },
    activity: {
      type: 'tap_quiz',
      question: { hi: 'इनमें से "प्रॉम्प्ट" कौन-सा है?', en: 'Which of these is a "prompt"?' },
      options: {
        hi: ['AI का जवाब', 'AI से पूछा गया आपका सवाल', 'मोबाइल का चार्जर'],
        en: ['The AI\'s answer', 'Your question asked to AI', 'A mobile charger']
      },
      answer: 1
    }
  },
  // LEVEL 2 — Baby prompts (fill in blank → live AI)
  {
    id: 'l2a', level: 2,
    title: { hi: 'पहला प्रॉम्प्ट — खाली जगह भरें', en: 'First prompt — fill the blank' },
    concept: {
      hi: 'चलिए पहला प्रॉम्प्ट बनाते हैं! नीचे एक अधूरा वाक्य है — बस खाली जगह भरिए और AI का जादू देखिए। घबराइए नहीं, कुछ भी गलत नहीं होता!',
      en: 'Let\'s build your first prompt! Below is an incomplete sentence — just fill the blank and watch AI magic. Don\'t worry, nothing can go wrong!'
    },
    activity: {
      type: 'fill_blank',
      template: { hi: 'मुझे ___ के बारे में 3 आसान बातें बताओ', en: 'Tell me 3 simple facts about ___' }
    }
  },
  {
    id: 'l2b', level: 2,
    title: { hi: 'भाषा बताना सीखें', en: 'Ask in your language' },
    concept: {
      hi: 'AI से हिंदी में जवाब चाहिए? बस बोल दीजिए! प्रॉम्प्ट के अंत में जोड़िए: <b>"आसान हिंदी में बताओ"</b>। AI आपकी भाषा में, आपके स्तर पर जवाब देगा।',
      en: 'Want answers in simple words? Just say so! Add at the end: <b>"explain in very simple words"</b>. AI will match your language and level.'
    },
    activity: {
      type: 'fill_blank',
      template: { hi: '___ क्या होता है? बिल्कुल आसान हिंदी में समझाओ, जैसे बच्चे को समझाते हैं', en: 'What is ___? Explain in very simple words, like explaining to a child' }
    }
  },
  // LEVEL 3 — Prompt blocks (Role + Task + Detail + Format)
  {
    id: 'l3a', level: 3,
    title: { hi: 'प्रॉम्प्ट के 4 ब्लॉक', en: 'The 4 blocks of a prompt' },
    concept: {
      hi: 'बढ़िया प्रॉम्प्ट LEGO जैसे ब्लॉक से बनता है:<br>🎭 <b>भूमिका</b> — "तुम एक अनुभवी डॉक्टर हो"<br>📋 <b>काम</b> — "मुझे बुखार के घरेलू उपाय बताओ"<br>🔍 <b>जानकारी</b> — "मरीज़ 8 साल का बच्चा है"<br>📦 <b>ढंग</b> — "5 पॉइंट में, आसान हिंदी में"',
      en: 'A great prompt is built from LEGO-like blocks:<br>🎭 <b>Role</b> — "You are an experienced doctor"<br>📋 <b>Task</b> — "Suggest home remedies for fever"<br>🔍 <b>Details</b> — "The patient is an 8-year-old child"<br>📦 <b>Format</b> — "In 5 points, simple words"'
    },
    activity: {
      type: 'blocks',
      blockHint: { hi: 'चारों ब्लॉक चुनकर अपना प्रॉम्प्ट बनाइए — फिर AI पर चलाइए!', en: 'Pick all four blocks to build your prompt — then run it on AI!' }
    }
  },
  {
    id: 'l3b', level: 3,
    title: { hi: 'ब्लॉक से खुद बनाओ', en: 'Build your own with blocks' },
    concept: {
      hi: 'अब अपने काम के लिए ब्लॉक चुनिए। याद रखें: जितनी ज़्यादा <b>जानकारी</b>, उतना सटीक जवाब। AI आपका मन नहीं पढ़ सकता — उसे बताइए!',
      en: 'Now pick blocks for YOUR work. Remember: more <b>details</b> = more accurate answers. AI can\'t read your mind — tell it!'
    },
    activity: {
      type: 'blocks',
      blockHint: { hi: 'इस बार अपने पेशे वाले ब्लॉक आज़माइए', en: 'This time try the blocks made for your profession' }
    }
  },
  // LEVEL 4 — Real work prompts (free prompt + AI grading)
  {
    id: 'l4a', level: 4,
    title: { hi: 'अपने काम का असली प्रॉम्प्ट', en: 'A real prompt for your work' },
    concept: {
      hi: 'अब ट्रेनिंग व्हील हटाते हैं! आपका AI गुरु आपके पेशे के हिसाब से एक असली काम देगा। आप खुद प्रॉम्प्ट लिखिए — गुरु उसे जाँचकर रिपोर्ट कार्ड देगा ⭐',
      en: 'Training wheels off! Your AI Guru will give you a real task from your profession. Write the prompt yourself — Guru will grade it and give a report card ⭐'
    },
    activity: { type: 'free_prompt' }
  },
  {
    id: 'l4b', level: 4,
    title: { hi: 'जवाब को और बेहतर कराओ', en: 'Make AI improve its answer' },
    concept: {
      hi: 'AI से बात एक बार में खत्म नहीं होती! जवाब पसंद नहीं? बोलिए: <b>"इसे और छोटा करो"</b>, <b>"आसान शब्दों में"</b>, <b>"एक मज़ेदार लाइन जोड़ो"</b>। यही है असली ताकत — बातचीत!',
      en: 'Talking to AI isn\'t one-shot! Don\'t like the answer? Say: <b>"make it shorter"</b>, <b>"simpler words"</b>, <b>"add a fun line"</b>. That\'s the real power — conversation!'
    },
    activity: { type: 'free_prompt' }
  },
  // LEVEL 5 — Workflow (chain of prompts)
  {
    id: 'l5a', level: 5,
    title: { hi: 'AI आपके रोज़ के काम में', en: 'AI in your daily workflow' },
    concept: {
      hi: 'अब आखिरी कदम — एक पूरा काम AI के साथ, शुरू से आखिर तक। आपका गुरु आपके पेशे का एक असली workflow देगा: 3 कदम, 3 प्रॉम्प्ट। पूरा कीजिए और <b>AI साक्षरता प्रमाणपत्र</b> पाइए! 🎓',
      en: 'The final step — one complete task with AI, start to finish. Your Guru will give a real workflow from your profession: 3 steps, 3 prompts. Complete it and earn your <b>AI Literacy Certificate</b>! 🎓'
    },
    activity: { type: 'workflow' }
  }
]

// Prompt blocks for the visual builder (Level 3) — generic + per-profession
export const BLOCKS = {
  role: {
    generic: [
      { hi: 'तुम एक अनुभवी शिक्षक हो', en: 'You are an experienced teacher' },
      { hi: 'तुम एक समझदार दोस्त हो', en: 'You are a wise friend' },
      { hi: 'तुम एक बिज़नेस सलाहकार हो', en: 'You are a business advisor' }
    ],
    shopkeeper: [{ hi: 'तुम एक मार्केटिंग एक्सपर्ट हो', en: 'You are a marketing expert' }],
    farmer: [{ hi: 'तुम एक कृषि वैज्ञानिक हो', en: 'You are an agriculture scientist' }],
    teacher: [{ hi: 'तुम एक शिक्षा विशेषज्ञ हो', en: 'You are an education expert' }],
    student: [{ hi: 'तुम एक टॉपर सीनियर हो', en: 'You are a topper senior' }],
    tailor: [{ hi: 'तुम एक फैशन डिज़ाइनर हो', en: 'You are a fashion designer' }],
    homemaker: [{ hi: 'तुम एक घरेलू सलाहकार हो', en: 'You are a home advisor' }]
  },
  task: {
    generic: [{ hi: 'मुझे एक योजना बनाकर दो', en: 'Make me a plan' }, { hi: 'मुझे यह समझाओ', en: 'Explain this to me' }],
    shopkeeper: [{ hi: 'त्योहार के ऑफर का WhatsApp मैसेज लिखो', en: 'Write a festival offer WhatsApp message' }, { hi: 'दुकान का हिसाब रखने का आसान तरीका बताओ', en: 'Suggest an easy way to track shop accounts' }],
    farmer: [{ hi: 'फसल में कीड़े से बचाव के उपाय बताओ', en: 'Suggest ways to protect crops from pests' }, { hi: 'सरकारी योजना की जानकारी दो', en: 'Explain a government scheme for farmers' }],
    teacher: [{ hi: 'कक्षा 5 के लिए पाठ योजना बनाओ', en: 'Create a lesson plan for Class 5' }, { hi: '10 सवालों का टेस्ट पेपर बनाओ', en: 'Make a 10-question test paper' }],
    student: [{ hi: 'परीक्षा की तैयारी का टाइम-टेबल बनाओ', en: 'Make an exam preparation timetable' }, { hi: 'यह टॉपिक आसान भाषा में समझाओ', en: 'Explain this topic in simple words' }],
    tailor: [{ hi: 'नई डिज़ाइन के लिए Instagram कैप्शन लिखो', en: 'Write an Instagram caption for a new design' }, { hi: 'शादी के लहंगे के 5 डिज़ाइन आइडिया दो', en: 'Give 5 design ideas for a wedding lehenga' }],
    homemaker: [{ hi: 'हफ्ते भर का खाना प्लान बनाओ', en: 'Plan a week of family meals' }, { hi: 'महीने का घरेलू बजट बनाओ', en: 'Make a monthly home budget' }]
  },
  detail: {
    generic: [
      { hi: 'मैं इसमें बिल्कुल नया हूँ', en: 'I am a complete beginner' },
      { hi: 'बजट कम है', en: 'Budget is small' },
      { hi: 'छोटे शहर के लिए', en: 'For a small town' }
    ]
  },
  format: {
    generic: [
      { hi: 'आसान हिंदी में', en: 'In simple words' },
      { hi: '5 छोटे पॉइंट में', en: 'In 5 short points' },
      { hi: 'एक छोटे पैराग्राफ में', en: 'In one short paragraph' },
      { hi: 'इमोजी के साथ मज़ेदार अंदाज़ में', en: 'In a fun style with emojis' }
    ]
  }
}

export const UI_STRINGS: Record<string, { hi: string; en: string }> = {
  appTagline: { hi: 'AI ki Barakhadi — हर भारतीय के लिए', en: 'AI ki Barakhadi — AI for every Indian' },
  dashboard: { hi: 'डैशबोर्ड', en: 'Dashboard' },
  lessons: { hi: 'पाठशाला', en: 'Lessons' },
  playground: { hi: 'AI मैदान', en: 'Playground' },
  guru: { hi: 'AI गुरु', en: 'AI Guru' },
  certificate: { hi: 'प्रमाणपत्र', en: 'Certificate' },
  profile: { hi: 'प्रोफ़ाइल', en: 'Profile' }
}
