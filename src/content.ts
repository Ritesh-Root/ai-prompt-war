// PromptShala Curriculum
// A respectful, professional path from AI fundamentals to advanced prompting.
// 6 levels, 17 lessons. Bilingual (English default, Hindi available).

export type Lang = 'hi' | 'en'

export const PROFESSIONS: Record<string, { icon: string; en: string; hi: string; context: string }> = {
  shopkeeper: { icon: 'fa-store', en: 'Shopkeeper', hi: 'दुकानदार', context: 'runs a small kirana/general store, sells daily items, deals with customers and suppliers, uses WhatsApp for business' },
  farmer: { icon: 'fa-wheat-awn', en: 'Farmer', hi: 'किसान', context: 'grows crops, needs weather/mandi price info, government scheme details, pest control advice' },
  teacher: { icon: 'fa-chalkboard-user', en: 'Teacher', hi: 'शिक्षक', context: 'teaches school students, prepares lessons, question papers, explains difficult topics simply' },
  student: { icon: 'fa-graduation-cap', en: 'Student', hi: 'विद्यार्थी', context: 'studies in school/college, prepares for exams, writes assignments, learns new skills' },
  tailor: { icon: 'fa-scissors', en: 'Tailor / Boutique', hi: 'दर्ज़ी / बुटीक', context: 'stitches clothes, designs outfits, manages customer orders, promotes work on WhatsApp/Instagram' },
  homemaker: { icon: 'fa-house-user', en: 'Home-maker', hi: 'गृहिणी', context: 'manages home, cooking, children education, budgets, health of family' },
  professional: { icon: 'fa-briefcase', en: 'Office Professional', hi: 'ऑफ़िस प्रोफ़ेशनल', context: 'works in an office, writes emails and reports, prepares presentations, manages tasks and meetings' }
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
    template?: { hi: string; en: string }
    blockHint?: { hi: string; en: string }
  }
}

export const LEVELS = [
  { level: 1, name: { hi: 'बुनियाद — AI क्या है', en: 'Foundations — What is AI' }, tag: { hi: 'स्तर 1', en: 'Level 1' }, icon: 'fa-lightbulb' },
  { level: 2, name: { hi: 'शुरुआत — ChatGPT, Gemini, Claude', en: 'Getting Started — ChatGPT, Gemini, Claude' }, tag: { hi: 'स्तर 2', en: 'Level 2' }, icon: 'fa-door-open' },
  { level: 3, name: { hi: 'पहले प्रॉम्प्ट', en: 'First Prompts' }, tag: { hi: 'स्तर 3', en: 'Level 3' }, icon: 'fa-comment-dots' },
  { level: 4, name: { hi: 'प्रॉम्प्ट की बनावट', en: 'Prompt Craft' }, tag: { hi: 'स्तर 4', en: 'Level 4' }, icon: 'fa-cubes' },
  { level: 5, name: { hi: 'काम में AI', en: 'AI at Work' }, tag: { hi: 'स्तर 5', en: 'Level 5' }, icon: 'fa-briefcase' },
  { level: 6, name: { hi: 'एडवांस तकनीकें', en: 'Advanced Techniques' }, tag: { hi: 'स्तर 6', en: 'Level 6' }, icon: 'fa-rocket' }
]

export const LESSONS: Lesson[] = [
  // ── LEVEL 1: FOUNDATIONS ─────────────────────────────────────
  {
    id: 'l1a', level: 1,
    title: { hi: 'AI एक सक्षम सहायक है', en: 'AI is a capable assistant' },
    concept: {
      hi: 'AI (Artificial Intelligence) एक ऐसा कंप्यूटर प्रोग्राम है जो आपकी भाषा समझता है और उसमें जवाब देता है। ChatGPT, Gemini और Claude जैसे AI टूल लिखने, समझाने, योजना बनाने, अनुवाद करने और सुझाव देने में मदद करते हैं। इन्हें इस्तेमाल करने के लिए किसी तकनीकी पढ़ाई की ज़रूरत नहीं — <b>अपनी भाषा में साफ़ बात रखना ही काफी है।</b>',
      en: 'AI (Artificial Intelligence) is software that understands your language and responds in it. Tools like ChatGPT, Gemini and Claude help you write, explain, plan, translate and get suggestions. You do not need any technical background to use them — <b>expressing your request clearly in your own language is enough.</b>'
    },
    activity: {
      type: 'tap_quiz',
      question: { hi: 'AI टूल इस्तेमाल करने के लिए क्या ज़रूरी है?', en: 'What do you need to use an AI tool?' },
      options: {
        hi: ['कोडिंग की जानकारी', 'अपनी बात साफ़ शब्दों में रखना', 'महंगा कंप्यूटर'],
        en: ['Coding knowledge', 'Expressing your request clearly', 'An expensive computer']
      },
      answer: 1
    }
  },
  {
    id: 'l1b', level: 1,
    title: { hi: 'प्रॉम्प्ट: AI को दिया गया निर्देश', en: 'The prompt: your instruction to AI' },
    concept: {
      hi: 'AI को आप जो भी लिखकर या बोलकर बताते हैं, उसे <b>प्रॉम्प्ट</b> कहते हैं। यह एक निर्देश है — जैसे किसी सहयोगी को काम समझाना। उदाहरण: "मेरी दुकान के लिए दिवाली ऑफर का WhatsApp मैसेज लिखो।" नियम सरल है: <b>जितना स्पष्ट निर्देश, उतना उपयोगी जवाब।</b>',
      en: 'Whatever you type or say to an AI is called a <b>prompt</b>. It is an instruction — like briefing a colleague on a task. Example: "Write a WhatsApp message announcing a Diwali offer for my store." The rule is simple: <b>the clearer the instruction, the more useful the answer.</b>'
    },
    activity: {
      type: 'tap_quiz',
      question: { hi: 'इनमें से सबसे अच्छा प्रॉम्प्ट कौन-सा है?', en: 'Which of these is the strongest prompt?' },
      options: {
        hi: ['"मैसेज लिखो"', '"मेरी किराना दुकान के लिए 2 लाइन का दिवाली ऑफर मैसेज लिखो"', '"कुछ अच्छा लिखो"'],
        en: ['"Write a message"', '"Write a 2-line Diwali offer message for my grocery store"', '"Write something good"']
      },
      answer: 1
    }
  },
  {
    id: 'l1c', level: 1,
    title: { hi: 'AI क्या कर सकता है — और क्या नहीं', en: 'What AI can do — and what it cannot' },
    concept: {
      hi: 'AI बहुत कुछ कर सकता है: लिखना, सारांश बनाना, समझाना, अनुवाद, योजना, आइडिया देना। लेकिन सीमाएँ भी हैं: AI कभी-कभी <b>गलत जानकारी भी आत्मविश्वास से बोल देता है</b> (इसे "hallucination" कहते हैं)। इसलिए ज़रूरी तथ्य — दाम, तारीख़, कानून, दवा — हमेशा किसी भरोसेमंद स्रोत से जाँचें। AI आपका सहायक है, अंतिम निर्णय आपका है।',
      en: 'AI can do a lot: write, summarise, explain, translate, plan, generate ideas. But it has limits: AI sometimes <b>states wrong information with full confidence</b> (this is called a "hallucination"). So always verify important facts — prices, dates, laws, medical advice — with a trusted source. AI is your assistant; the final judgement is yours.'
    },
    activity: {
      type: 'tap_quiz',
      question: { hi: 'AI के जवाब में कोई ज़रूरी तथ्य मिले तो क्या करना चाहिए?', en: 'When an AI answer contains an important fact, what should you do?' },
      options: {
        hi: ['आँख बंद करके भरोसा करें', 'भरोसेमंद स्रोत से जाँच लें', 'AI इस्तेमाल करना छोड़ दें'],
        en: ['Trust it blindly', 'Verify it with a trusted source', 'Stop using AI altogether']
      },
      answer: 1
    }
  },

  // ── LEVEL 2: GETTING STARTED WITH AI TOOLS ───────────────────
  {
    id: 'l2a', level: 2,
    title: { hi: 'प्रमुख AI टूल से परिचय', en: 'Meet the major AI tools' },
    concept: {
      hi: 'आज के प्रमुख AI असिस्टेंट:<br><b>ChatGPT</b> (OpenAI) — सबसे लोकप्रिय, हर तरह के काम के लिए। chatgpt.com<br><b>Gemini</b> (Google) — Google सेवाओं से जुड़ा, Android पर आसान। gemini.google.com<br><b>Claude</b> (Anthropic) — लंबे दस्तावेज़ और सोच-समझकर लिखने में मज़बूत। claude.ai<br><b>Copilot</b> (Microsoft) — Windows और Office में शामिल।<br>सबके मुफ़्त संस्करण हैं और सब हिंदी समझते हैं। एक ही प्रॉम्प्ट सब पर काम करता है — <b>कौशल एक है, टूल कई।</b>',
      en: 'The major AI assistants today:<br><b>ChatGPT</b> (OpenAI) — the most popular, good for almost everything. chatgpt.com<br><b>Gemini</b> (Google) — connected to Google services, convenient on Android. gemini.google.com<br><b>Claude</b> (Anthropic) — strong with long documents and thoughtful writing. claude.ai<br><b>Copilot</b> (Microsoft) — built into Windows and Office.<br>All offer free versions and all understand Hindi. The same prompt works on all of them — <b>one skill, many tools.</b>'
    },
    activity: {
      type: 'tap_quiz',
      question: { hi: 'प्रॉम्प्टिंग का कौशल सीखने का सबसे बड़ा फ़ायदा क्या है?', en: 'What is the biggest advantage of learning prompting as a skill?' },
      options: {
        hi: ['यह सिर्फ़ एक ही ऐप पर काम आता है', 'यह हर AI टूल पर काम आता है — आज और आगे भी', 'इससे मोबाइल तेज़ चलता है'],
        en: ['It only works on one app', 'It works on every AI tool — today and in the future', 'It makes your phone faster']
      },
      answer: 1
    }
  },
  {
    id: 'l2b', level: 2,
    title: { hi: 'अकाउंट बनाना और शुरू करना', en: 'Creating an account and starting' },
    concept: {
      hi: 'शुरू करना आसान है — तीनों टूल का तरीका लगभग एक ही है:<br>1. वेबसाइट खोलें (chatgpt.com / gemini.google.com / claude.ai) या Play Store से आधिकारिक ऐप डाउनलोड करें।<br>2. अपनी Google ईमेल से <b>Sign up / Continue with Google</b> चुनें — नया पासवर्ड याद रखने की ज़रूरत नहीं।<br>3. नीचे दिए गए बॉक्स में अपना पहला प्रॉम्प्ट लिखें और भेजें।<br>ध्यान रखें: हमेशा <b>आधिकारिक वेबसाइट या ऐप</b> ही इस्तेमाल करें — मिलते-जुलते नाम वाले नकली ऐप्स से बचें।',
      en: 'Getting started is straightforward — all three tools follow the same pattern:<br>1. Open the website (chatgpt.com / gemini.google.com / claude.ai) or download the official app from the Play Store / App Store.<br>2. Choose <b>Sign up / Continue with Google</b> with your Google email — no new password to remember.<br>3. Type your first prompt in the message box and send it.<br>Note: always use the <b>official website or app</b> — avoid fake apps with similar names.'
    },
    activity: {
      type: 'tap_quiz',
      question: { hi: 'AI ऐप डाउनलोड करते समय सबसे ज़रूरी सावधानी क्या है?', en: 'What is the most important precaution when downloading an AI app?' },
      options: {
        hi: ['सबसे सस्ता ऐप चुनना', 'आधिकारिक ऐप ही डाउनलोड करना', 'सबसे ज़्यादा रेटिंग वाला कोई भी ऐप लेना'],
        en: ['Choosing the cheapest app', 'Downloading only the official app', 'Picking any app with high ratings']
      },
      answer: 1
    }
  },
  {
    id: 'l2c', level: 2,
    title: { hi: 'मुफ़्त बनाम पेड — क्या चुनें', en: 'Free vs paid — what to choose' },
    concept: {
      hi: 'अच्छी खबर: <b>शुरुआत के लिए मुफ़्त संस्करण पर्याप्त हैं।</b> ChatGPT, Gemini और Claude — तीनों के फ्री प्लान रोज़मर्रा के काम आराम से कर देते हैं। पेड प्लान (लगभग $20/माह) तेज़ जवाब, नए मॉडल और ज़्यादा उपयोग देते हैं — ये तब लें जब AI आपके काम का रोज़ का हिस्सा बन जाए। सलाह: पहले फ्री प्लान पर कौशल बनाइए, ज़रूरत महसूस हो तभी खर्च कीजिए।',
      en: 'Good news: <b>the free versions are more than enough to begin with.</b> ChatGPT, Gemini and Claude all offer free plans that handle everyday tasks comfortably. Paid plans (around $20/month) offer faster responses, newer models and higher limits — worth it only once AI becomes part of your daily work. Advice: build your skill on the free plan first; upgrade only when you feel the need.'
    },
    activity: {
      type: 'tap_quiz',
      question: { hi: 'AI सीखना शुरू करने के लिए क्या करना चाहिए?', en: 'What should you do to start learning AI?' },
      options: {
        hi: ['पहले पेड प्लान खरीदें', 'मुफ़्त संस्करण से शुरू करें', 'नया लैपटॉप खरीदें'],
        en: ['Buy a paid plan first', 'Start with the free version', 'Buy a new laptop']
      },
      answer: 1
    }
  },
  {
    id: 'l2d', level: 2,
    title: { hi: 'निजता और सुरक्षा के नियम', en: 'Privacy and safety rules' },
    concept: {
      hi: 'AI से खुलकर बात करें, लेकिन कुछ चीज़ें कभी साझा न करें:<br>• पासवर्ड, OTP, ATM पिन<br>• आधार / पैन नंबर, बैंक विवरण<br>• दूसरों की निजी जानकारी<br>AI से मिली स्वास्थ्य, कानूनी या पैसों की सलाह को <b>शुरुआती राय</b> मानें — अंतिम फ़ैसला विशेषज्ञ से पूछकर लें। यह सावधानी आपको एक समझदार AI उपयोगकर्ता बनाती है।',
      en: 'Talk to AI freely, but never share certain things:<br>• Passwords, OTPs, ATM PINs<br>• Aadhaar / PAN numbers, bank details<br>• Other people\'s private information<br>Treat AI\'s health, legal or financial advice as a <b>starting opinion</b> — confirm final decisions with a qualified expert. This discipline makes you a smart AI user.'
    },
    activity: {
      type: 'tap_quiz',
      question: { hi: 'इनमें से क्या AI से कभी साझा नहीं करना चाहिए?', en: 'Which of these should you never share with an AI?' },
      options: {
        hi: ['अपने बिज़नेस का विचार', 'बैंक पासवर्ड और OTP', 'अपनी दिनचर्या'],
        en: ['Your business idea', 'Bank passwords and OTPs', 'Your daily routine']
      },
      answer: 1
    }
  },

  // ── LEVEL 3: FIRST PROMPTS ───────────────────────────────────
  {
    id: 'l3a', level: 3,
    title: { hi: 'पहला प्रॉम्प्ट चलाइए', en: 'Run your first prompt' },
    concept: {
      hi: 'अब अभ्यास का समय। नीचे एक अधूरा प्रॉम्प्ट है — खाली जगह में कोई भी विषय भरिए (जैसे "चाय", "GST", "मानसून") और चलाइए। यह वही अनुभव है जो ChatGPT या Gemini पर मिलेगा — यहाँ अभ्यास कीजिए, फिर कहीं भी आत्मविश्वास से इस्तेमाल कीजिए।',
      en: 'Time to practise. Below is a partial prompt — fill the blank with any topic (for example "tea", "GST", "monsoon") and run it. This is exactly the experience you will have on ChatGPT or Gemini — practise here, then use any tool with confidence.'
    },
    activity: {
      type: 'fill_blank',
      template: { hi: 'मुझे ___ के बारे में 3 उपयोगी बातें बताओ', en: 'Tell me 3 useful facts about ___' }
    }
  },
  {
    id: 'l3b', level: 3,
    title: { hi: 'जवाब का स्तर और भाषा तय कीजिए', en: 'Control the level and language of answers' },
    concept: {
      hi: 'AI से जवाब <b>अपनी शर्तों पर</b> लीजिए। प्रॉम्प्ट में जोड़िए: "आसान शब्दों में", "बिना तकनीकी भाषा के", "हिंदी में", "छोटे उदाहरण के साथ"। यह कमज़ोरी नहीं, समझदारी है — विशेषज्ञ भी AI से ऐसे ही सटीक जवाब निकलवाते हैं।',
      en: 'Get answers <b>on your terms</b>. Add to your prompt: "in simple words", "without technical jargon", "in Hindi", "with a short example". This is not a shortcut — it is exactly how experts extract precise answers from AI.'
    },
    activity: {
      type: 'fill_blank',
      template: { hi: '___ क्या होता है? आसान शब्दों में, एक छोटे उदाहरण के साथ समझाओ', en: 'What is ___? Explain in simple words, with one short example' }
    }
  },
  {
    id: 'l3c', level: 3,
    title: { hi: 'संदर्भ जोड़िए — जवाब निखर जाएगा', en: 'Add context — the answer sharpens' },
    concept: {
      hi: 'AI आपके बारे में कुछ नहीं जानता — <b>संदर्भ (context) देना आपका काम है।</b> "बिज़नेस बढ़ाने के तरीके बताओ" की जगह: "मैं छोटे शहर में किराना दुकान चलाता हूँ, महीने का बजट 2000 रुपये है — बिज़नेस बढ़ाने के 3 तरीके बताओ।" संदर्भ जितना ठोस, सलाह उतनी काम की।',
      en: 'AI knows nothing about you — <b>providing context is your job.</b> Instead of "suggest ways to grow a business", try: "I run a grocery store in a small town with a monthly budget of Rs 2000 — suggest 3 ways to grow." The more concrete the context, the more practical the advice.'
    },
    activity: {
      type: 'fill_blank',
      template: { hi: 'मैं ___ हूँ। मेरे काम में AI किन 3 तरीकों से मदद कर सकता है? हर तरीके के लिए एक उदाहरण प्रॉम्प्ट भी दो', en: 'I am a ___. In what 3 ways can AI help my work? Give one example prompt for each' }
    }
  },

  // ── LEVEL 4: PROMPT CRAFT ────────────────────────────────────
  {
    id: 'l4a', level: 4,
    title: { hi: 'प्रॉम्प्ट के 4 हिस्से', en: 'The 4 parts of a strong prompt' },
    concept: {
      hi: 'मज़बूत प्रॉम्प्ट के 4 हिस्से होते हैं:<br><b>भूमिका (Role)</b> — "तुम एक अनुभवी मार्केटिंग सलाहकार हो"<br><b>काम (Task)</b> — "मेरी दुकान के लिए ऑफर मैसेज लिखो"<br><b>संदर्भ (Context)</b> — "छोटे शहर की किराना दुकान, त्योहार का मौसम"<br><b>प्रारूप (Format)</b> — "2 लाइन, WhatsApp के लिए"<br>हर बार चारों ज़रूरी नहीं — पर जितने जोड़ेंगे, जवाब उतना सटीक होगा।',
      en: 'A strong prompt has 4 parts:<br><b>Role</b> — "You are an experienced marketing consultant"<br><b>Task</b> — "Write an offer message for my store"<br><b>Context</b> — "A small-town grocery store, festival season"<br><b>Format</b> — "2 lines, for WhatsApp"<br>You will not always need all four — but each one you add makes the answer more precise.'
    },
    activity: {
      type: 'blocks',
      blockHint: { hi: 'चारों हिस्से चुनकर प्रॉम्प्ट बनाइए और AI पर चलाइए', en: 'Select all four parts to build the prompt, then run it on AI' }
    }
  },
  {
    id: 'l4b', level: 4,
    title: { hi: 'अपने काम के लिए प्रॉम्प्ट गढ़िए', en: 'Craft a prompt for your own work' },
    concept: {
      hi: 'अब वही ढाँचा अपने पेशे पर लगाइए। नीचे आपके काम से जुड़े ब्लॉक हैं — चुनिए, चलाइए, और देखिए कि संरचित प्रॉम्प्ट कितना बेहतर नतीजा देता है। यही ढाँचा आप ChatGPT, Gemini या Claude — कहीं भी इस्तेमाल कर सकते हैं।',
      en: 'Now apply the same structure to your own profession. The blocks below are tailored to your work — select, run, and notice how much better a structured prompt performs. This same structure works on ChatGPT, Gemini or Claude — anywhere.'
    },
    activity: {
      type: 'blocks',
      blockHint: { hi: 'अपने पेशे वाले ब्लॉक आज़माइए', en: 'Try the blocks tailored to your profession' }
    }
  },

  // ── LEVEL 5: AI AT WORK ──────────────────────────────────────
  {
    id: 'l5a', level: 5,
    title: { hi: 'असली काम, असली प्रॉम्प्ट', en: 'A real task, a real prompt' },
    concept: {
      hi: 'अब आप बिना सहारे के प्रॉम्प्ट लिखेंगे। आपका AI मेंटर आपके पेशे और अब तक की प्रगति के आधार पर एक असली काम देगा। प्रॉम्प्ट लिखिए, चलाइए, और रिपोर्ट कार्ड लीजिए — जिसमें आपकी ताक़तें और अगला सुधार दोनों होंगे।',
      en: 'Now you will write prompts independently. Your AI mentor will assign a real task based on your profession and progress so far. Write the prompt, run it, and request a report card — it will highlight both your strengths and your next improvement.'
    },
    activity: { type: 'free_prompt' }
  },
  {
    id: 'l5b', level: 5,
    title: { hi: 'फ़ॉलो-अप: बातचीत से बेहतर नतीजे', en: 'Follow-ups: better results through conversation' },
    concept: {
      hi: 'AI के साथ काम <b>बातचीत</b> है, एक बार का सवाल-जवाब नहीं। पहला जवाब ठीक न लगे तो निर्देश दीजिए: "इसे आधा छोटा करो", "और औपचारिक बनाओ", "3 विकल्प दो", "इस हिस्से को बदलो"। पेशेवर उपयोगकर्ता औसतन 3-4 फ़ॉलो-अप के बाद ही अंतिम नतीजा लेते हैं।',
      en: 'Working with AI is a <b>conversation</b>, not a single question-answer. If the first reply is not right, direct it: "cut this by half", "make it more formal", "give me 3 options", "change this part". Professional users typically refine through 3-4 follow-ups before taking the final result.'
    },
    activity: { type: 'free_prompt' }
  },
  {
    id: 'l5c', level: 5,
    title: { hi: 'जाँच की आदत: भरोसेमंद उपयोगकर्ता बनिए', en: 'The verification habit: become a reliable user' },
    concept: {
      hi: 'AI कभी-कभी तथ्यों में ग़लती करता है — यह टूल की सीमा है, आपकी नहीं। पेशेवर तरीका:<br>• संख्याएँ, तारीख़ें, नियम — भरोसेमंद स्रोत से मिलाएँ<br>• AI से ही पूछें: "इस जवाब में क्या ग़लत हो सकता है?"<br>• दो AI टूल से एक ही सवाल पूछकर तुलना करें<br>जो उपयोगकर्ता जाँचता है, उसी की साख बनती है।',
      en: 'AI sometimes gets facts wrong — that is the tool\'s limitation, not yours. The professional approach:<br>• Cross-check numbers, dates and rules with a trusted source<br>• Ask the AI itself: "What could be wrong in this answer?"<br>• Ask the same question on two AI tools and compare<br>Users who verify are the users others trust.'
    },
    activity: {
      type: 'tap_quiz',
      question: { hi: 'AI ने एक सरकारी योजना की आवेदन-तिथि बताई। पेशेवर कदम क्या है?', en: 'AI states an application deadline for a government scheme. What is the professional next step?' },
      options: {
        hi: ['तुरंत सबको बता दें', 'आधिकारिक वेबसाइट से तारीख़ मिला लें', 'जवाब अनदेखा कर दें'],
        en: ['Share it with everyone immediately', 'Confirm the date on the official website', 'Ignore the answer entirely']
      },
      answer: 1
    }
  },
  {
    id: 'l5d', level: 5,
    title: { hi: 'AI से अपना काम का टेम्पलेट बनवाइए', en: 'Build reusable templates with AI' },
    concept: {
      hi: 'एक बार का जवाब अच्छा है — <b>दोबारा इस्तेमाल होने वाला टेम्पलेट बेहतर है।</b> AI से कहिए: "ग्राहकों को भेजने के लिए एक मैसेज टेम्पलेट बनाओ जिसमें मैं सिर्फ़ नाम और ऑफर बदलूँ।" अब हर बार पूरा मैसेज लिखवाने की ज़रूरत नहीं — यही असली समय की बचत है।',
      en: 'A one-time answer is good — <b>a reusable template is better.</b> Ask AI: "Create a customer message template where I only change the name and the offer." Now you never need to draft from scratch again — this is where the real time savings begin.'
    },
    activity: { type: 'free_prompt' }
  },

  // ── LEVEL 6: ADVANCED TECHNIQUES ─────────────────────────────
  {
    id: 'l6a', level: 6,
    title: { hi: 'उदाहरण देकर सिखाइए (Few-shot)', en: 'Teach by example (few-shot prompting)' },
    concept: {
      hi: 'एडवांस तकनीक 1: AI को <b>अपना उदाहरण दिखाइए</b>, वह उसी शैली में काम करेगा। इसे "few-shot prompting" कहते हैं:<br><i>"यह मेरा लिखा मैसेज है: [उदाहरण]। ठीक इसी अंदाज़ में नए ऑफर के लिए मैसेज लिखो।"</i><br>आपकी शैली, आपकी शब्दावली — AI बस उसे आगे बढ़ाता है। ब्रांड की एक जैसी आवाज़ बनाए रखने का यही पेशेवर तरीका है।',
      en: 'Advanced technique 1: <b>show AI your own example</b>, and it will match that style. This is called "few-shot prompting":<br><i>"Here is a message I wrote: [example]. Write a message for the new offer in exactly this style."</i><br>Your voice, your vocabulary — AI simply extends it. This is the professional way to keep a consistent brand voice.'
    },
    activity: {
      type: 'fill_blank',
      template: {
        hi: 'यह मेरा लिखा वाक्य है: "___"। ठीक इसी अंदाज़ और लहजे में इसी विषय पर 2 और वाक्य लिखो',
        en: 'Here is a sentence I wrote: "___". Write 2 more sentences on the same topic in exactly this style and tone'
      }
    }
  },
  {
    id: 'l6b', level: 6,
    title: { hi: 'सोचने का तरीका माँगिए (Step-by-step)', en: 'Ask for reasoning (step-by-step prompting)' },
    concept: {
      hi: 'एडवांस तकनीक 2: जटिल फ़ैसलों में AI से <b>कदम-दर-कदम सोचने</b> को कहिए: "कदम-दर-कदम विश्लेषण करो, फिर निष्कर्ष दो।" इससे जवाब ज़्यादा तर्कसंगत होता है और आप उसकी सोच जाँच भी सकते हैं। दूसरा रूप: "पहले मुझसे 3 सवाल पूछो जो तुम्हें बेहतर जवाब देने में मदद करें" — AI को इंटरव्यू करने दीजिए।',
      en: 'Advanced technique 2: for complex decisions, ask AI to <b>think step by step</b>: "Analyse this step by step, then give your conclusion." The answer becomes more rigorous, and you can inspect its reasoning. A powerful variant: "First ask me 3 questions that would help you answer better" — let the AI interview you.'
    },
    activity: { type: 'free_prompt' }
  },
  {
    id: 'l6c', level: 6,
    title: { hi: 'प्रॉम्प्ट-चेन: पूरा workflow', en: 'Prompt chains: a complete workflow' },
    concept: {
      hi: 'सबसे ताक़तवर तकनीक: <b>प्रॉम्प्ट-चेन</b> — एक काम को जुड़े हुए कदमों में बाँटना, जहाँ हर कदम पिछले जवाब पर बनता है। योजना → मसौदा → सुधार। आपका मेंटर आपके पेशे का एक असली 3-कदम workflow देगा। इसे पूरा कीजिए — यही कौशल AI को "जवाब देने वाले" से "काम पूरा करने वाला" बना देता है। इसके बाद आपका प्रमाणपत्र तैयार है।',
      en: 'The most powerful technique: the <b>prompt chain</b> — breaking one job into connected steps, where each step builds on the previous answer. Plan, then draft, then refine. Your mentor will assign a real 3-step workflow from your profession. Complete it — this is the skill that turns AI from "something that answers" into "something that gets work done". Your certificate awaits after this.'
    },
    activity: { type: 'workflow' }
  }
]

// Prompt blocks for the visual builder — generic + per-profession
export const BLOCKS = {
  role: {
    generic: [
      { hi: 'तुम एक अनुभवी सलाहकार हो', en: 'You are an experienced consultant' },
      { hi: 'तुम एक कुशल लेखक हो', en: 'You are a skilled writer' },
      { hi: 'तुम एक व्यावहारिक योजनाकार हो', en: 'You are a practical planner' }
    ],
    shopkeeper: [{ hi: 'तुम एक रिटेल मार्केटिंग विशेषज्ञ हो', en: 'You are a retail marketing expert' }],
    farmer: [{ hi: 'तुम एक कृषि वैज्ञानिक हो', en: 'You are an agriculture scientist' }],
    teacher: [{ hi: 'तुम एक शिक्षा विशेषज्ञ हो', en: 'You are an education expert' }],
    student: [{ hi: 'तुम एक अनुभवी मेंटर हो', en: 'You are an experienced mentor' }],
    tailor: [{ hi: 'तुम एक फैशन डिज़ाइनर हो', en: 'You are a fashion designer' }],
    homemaker: [{ hi: 'तुम एक गृह-प्रबंधन सलाहकार हो', en: 'You are a home-management advisor' }],
    professional: [{ hi: 'तुम एक बिज़नेस कम्युनिकेशन कोच हो', en: 'You are a business communication coach' }]
  },
  task: {
    generic: [
      { hi: 'मुझे एक योजना बनाकर दो', en: 'Create a plan for me' },
      { hi: 'मुझे यह विषय समझाओ', en: 'Explain this topic to me' }
    ],
    shopkeeper: [
      { hi: 'त्योहार के ऑफर का WhatsApp मैसेज लिखो', en: 'Write a festival offer WhatsApp message' },
      { hi: 'दुकान का हिसाब रखने का आसान तरीका बताओ', en: 'Suggest an easy way to track shop accounts' }
    ],
    farmer: [
      { hi: 'फसल में कीट से बचाव के उपाय बताओ', en: 'Suggest ways to protect crops from pests' },
      { hi: 'किसानों की सरकारी योजना समझाओ', en: 'Explain a government scheme for farmers' }
    ],
    teacher: [
      { hi: 'कक्षा 5 के लिए पाठ योजना बनाओ', en: 'Create a lesson plan for Class 5' },
      { hi: '10 सवालों का टेस्ट पेपर बनाओ', en: 'Make a 10-question test paper' }
    ],
    student: [
      { hi: 'परीक्षा की तैयारी का टाइम-टेबल बनाओ', en: 'Make an exam preparation timetable' },
      { hi: 'यह टॉपिक सरल भाषा में समझाओ', en: 'Explain this topic in simple terms' }
    ],
    tailor: [
      { hi: 'नई डिज़ाइन के लिए Instagram कैप्शन लिखो', en: 'Write an Instagram caption for a new design' },
      { hi: 'शादी के लहंगे के 5 डिज़ाइन आइडिया दो', en: 'Give 5 design ideas for a wedding lehenga' }
    ],
    homemaker: [
      { hi: 'हफ्ते भर का भोजन प्लान बनाओ', en: 'Plan a week of family meals' },
      { hi: 'महीने का घरेलू बजट बनाओ', en: 'Make a monthly home budget' }
    ],
    professional: [
      { hi: 'क्लाइंट को भेजने के लिए औपचारिक ईमेल लिखो', en: 'Draft a formal email to a client' },
      { hi: 'मीटिंग के मुख्य बिंदुओं का सारांश बनाओ', en: 'Summarise the key points of a meeting' }
    ]
  },
  detail: {
    generic: [
      { hi: 'मैं इस विषय में नया हूँ', en: 'I am new to this topic' },
      { hi: 'बजट सीमित है', en: 'The budget is limited' },
      { hi: 'छोटे शहर का संदर्भ है', en: 'The context is a small town' },
      { hi: 'समय कम है, आज ही चाहिए', en: 'Time is short; I need it today' }
    ]
  },
  format: {
    generic: [
      { hi: 'सरल भाषा में', en: 'In simple language' },
      { hi: '5 छोटे पॉइंट में', en: 'In 5 short points' },
      { hi: 'एक छोटे पैराग्राफ में', en: 'In one short paragraph' },
      { hi: 'औपचारिक और पेशेवर लहजे में', en: 'In a formal, professional tone' },
      { hi: 'तालिका (टेबल) के रूप में', en: 'As a table' }
    ]
  }
}

export const UI_STRINGS: Record<string, { hi: string; en: string }> = {
  appTagline: { hi: 'रोज़मर्रा के काम के लिए AI कौशल — कदम-दर-कदम', en: 'AI skills for everyday work — step by step' },
  dashboard: { hi: 'डैशबोर्ड', en: 'Dashboard' },
  lessons: { hi: 'पाठ', en: 'Lessons' },
  playground: { hi: 'प्लेग्राउंड', en: 'Playground' },
  guru: { hi: 'AI मेंटर', en: 'AI Mentor' },
  certificate: { hi: 'प्रमाणपत्र', en: 'Certificate' },
  profile: { hi: 'प्रोफ़ाइल', en: 'Profile' }
}
