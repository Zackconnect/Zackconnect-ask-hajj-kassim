/**
 * Sample Islamic content library.
 *
 * This is a small, hand-checked seed set used for the explorer pages while the
 * live Qur'an / Hadith APIs are not connected yet. Every item carries its
 * reference so the UI can always show provenance. Replace `fetchSurahs`,
 * `fetchHadith` and `fetchDuas` in src/lib/content-service.ts with real API
 * calls when those services are wired up.
 */

export type Verse = {
  surah: number;
  surahName: string;
  surahNameArabic: string;
  ayah: number;
  arabic: string;
  translation: string;
  topics: string[];
};

export type Surah = {
  number: number;
  name: string;
  arabic: string;
  meaning: string;
  verses: number;
  revelation: "Meccan" | "Medinan";
};

export type Hadith = {
  id: string;
  collection: string;
  book: string;
  number: string;
  narrator: string;
  arabic: string;
  translation: string;
  grade: string;
  topics: string[];
};

export type Dua = {
  id: string;
  category: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  source: string;
};

export const SURAHS: Surah[] = [
  { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", meaning: "The Opening", verses: 7, revelation: "Meccan" },
  { number: 2, name: "Al-Baqarah", arabic: "البقرة", meaning: "The Cow", verses: 286, revelation: "Medinan" },
  { number: 3, name: "Ali 'Imran", arabic: "آل عمران", meaning: "Family of Imran", verses: 200, revelation: "Medinan" },
  { number: 4, name: "An-Nisa", arabic: "النساء", meaning: "The Women", verses: 176, revelation: "Medinan" },
  { number: 17, name: "Al-Isra", arabic: "الإسراء", meaning: "The Night Journey", verses: 111, revelation: "Meccan" },
  { number: 18, name: "Al-Kahf", arabic: "الكهف", meaning: "The Cave", verses: 110, revelation: "Meccan" },
  { number: 55, name: "Ar-Rahman", arabic: "الرحمن", meaning: "The Most Merciful", verses: 78, revelation: "Medinan" },
  { number: 94, name: "Ash-Sharh", arabic: "الشرح", meaning: "The Relief", verses: 8, revelation: "Meccan" },
  { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", meaning: "Sincerity", verses: 4, revelation: "Meccan" },
];

export const VERSES: Verse[] = [
  {
    surah: 2,
    surahName: "Al-Baqarah",
    surahNameArabic: "البقرة",
    ayah: 153,
    arabic: "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ",
    translation:
      "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
    topics: ["patience", "salah", "hardship"],
  },
  {
    surah: 17,
    surahName: "Al-Isra",
    surahNameArabic: "الإسراء",
    ayah: 23,
    arabic:
      "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوٓا۟ إِلَّآ إِيَّاهُ وَبِٱلْوَٰلِدَيْنِ إِحْسَٰنًا",
    translation:
      "And your Lord has decreed that you worship none but Him, and that you be dutiful to your parents.",
    topics: ["parents", "family", "manners"],
  },
  {
    surah: 4,
    surahName: "An-Nisa",
    surahNameArabic: "النساء",
    ayah: 11,
    arabic:
      "يُوصِيكُمُ ٱللَّهُ فِىٓ أَوْلَٰدِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ ٱلْأُنثَيَيْنِ",
    translation:
      "Allah instructs you concerning your children: for the male, what is equal to the share of two females.",
    topics: ["inheritance", "family", "property"],
  },
  {
    surah: 30,
    surahName: "Ar-Rum",
    surahNameArabic: "الروم",
    ayah: 21,
    arabic:
      "وَمِنْ ءَايَٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    translation:
      "And of His signs is that He created for you mates from among yourselves, that you may find tranquillity in them; and He placed between you affection and mercy.",
    topics: ["marriage", "family", "mercy"],
  },
  {
    surah: 2,
    surahName: "Al-Baqarah",
    surahNameArabic: "البقرة",
    ayah: 275,
    arabic: "وَأَحَلَّ ٱللَّهُ ٱلْبَيْعَ وَحَرَّمَ ٱلرِّبَوٰا۟",
    translation: "But Allah has permitted trade and has forbidden interest (riba).",
    topics: ["business", "interest", "riba", "finance"],
  },
  {
    surah: 94,
    surahName: "Ash-Sharh",
    surahNameArabic: "الشرح",
    ayah: 6,
    arabic: "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
    translation: "Indeed, with hardship comes ease.",
    topics: ["hardship", "hope", "patience"],
  },
  {
    surah: 2,
    surahName: "Al-Baqarah",
    surahNameArabic: "البقرة",
    ayah: 183,
    arabic:
      "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ كُتِبَ عَلَيْكُمُ ٱلصِّيَامُ كَمَا كُتِبَ عَلَى ٱلَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ",
    translation:
      "O you who have believed, fasting has been prescribed for you as it was prescribed for those before you, that you may become righteous.",
    topics: ["fasting", "ramadan", "taqwa"],
  },
  {
    surah: 112,
    surahName: "Al-Ikhlas",
    surahNameArabic: "الإخلاص",
    ayah: 1,
    arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
    translation: "Say: He is Allah, the One.",
    topics: ["tawhid", "aqeedah"],
  },
];

export const HADITH_COLLECTIONS = [
  "Sahih al-Bukhari",
  "Sahih Muslim",
  "Sunan Abu Dawud",
  "Jami' at-Tirmidhi",
  "Sunan an-Nasa'i",
  "Sunan Ibn Majah",
];

export const HADITHS: Hadith[] = [
  {
    id: "b1",
    collection: "Sahih al-Bukhari",
    book: "Revelation",
    number: "1",
    narrator: "Umar ibn al-Khattab (may Allah be pleased with him)",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    translation:
      "Actions are judged by intentions, and every person will get the reward according to what he intended.",
    grade: "Sahih",
    topics: ["intention", "worship", "sincerity"],
  },
  {
    id: "b2",
    collection: "Sahih al-Bukhari",
    book: "Belief",
    number: "8",
    narrator: "Ibn Umar (may Allah be pleased with him)",
    arabic: "بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ",
    translation:
      "Islam is built upon five: testifying that there is no god but Allah and that Muhammad is His Messenger, establishing prayer, giving zakat, pilgrimage to the House, and fasting Ramadan.",
    grade: "Sahih",
    topics: ["pillars", "salah", "zakat", "hajj", "fasting"],
  },
  {
    id: "m1",
    collection: "Sahih Muslim",
    book: "Purification",
    number: "223",
    narrator: "Abu Malik al-Ash'ari (may Allah be pleased with him)",
    arabic: "الطُّهُورُ شَطْرُ الإِيمَانِ",
    translation: "Purity is half of faith.",
    grade: "Sahih",
    topics: ["wudu", "purification", "salah"],
  },
  {
    id: "t1",
    collection: "Jami' at-Tirmidhi",
    book: "Righteousness",
    number: "1987",
    narrator: "Abu Dharr (may Allah be pleased with him)",
    arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا",
    translation:
      "Fear Allah wherever you are, follow a bad deed with a good deed and it will erase it, and treat people with good character.",
    grade: "Hasan",
    topics: ["manners", "taqwa", "repentance"],
  },
  {
    id: "d1",
    collection: "Sunan Abu Dawud",
    book: "Wages",
    number: "3529",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    arabic: "أَدِّ الأَمَانَةَ إِلَى مَنِ ائْتَمَنَكَ",
    translation: "Fulfil the trust to the one who entrusted you, and do not betray the one who betrayed you.",
    grade: "Hasan",
    topics: ["business", "trust", "contracts"],
  },
  {
    id: "m2",
    collection: "Sahih Muslim",
    book: "Zakat",
    number: "1015",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    arabic: "إِنَّ اللَّهَ طَيِّبٌ لاَ يَقْبَلُ إِلاَّ طَيِّبًا",
    translation: "Allah is Pure and accepts only what is pure.",
    grade: "Sahih",
    topics: ["zakat", "sadaqah", "halal"],
  },
];

export const DUA_CATEGORIES = [
  "Morning",
  "Evening",
  "Sleep",
  "Food",
  "Travel",
  "Prayer",
  "Forgiveness",
  "Protection",
  "Parents",
  "Difficulty",
];

export const DUAS: Dua[] = [
  {
    id: "d-morning",
    category: "Morning",
    title: "Morning remembrance",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah",
    translation: "We have entered the morning and the dominion belongs to Allah, and praise is to Allah.",
    source: "Sahih Muslim 2723",
  },
  {
    id: "d-evening",
    category: "Evening",
    title: "Evening remembrance",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    transliteration: "Amsayna wa amsal-mulku lillah, walhamdu lillah",
    translation: "We have entered the evening and the dominion belongs to Allah, and praise is to Allah.",
    source: "Sahih Muslim 2723",
  },
  {
    id: "d-sleep",
    category: "Sleep",
    title: "Before sleeping",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: "In Your name, O Allah, I die and I live.",
    source: "Sahih al-Bukhari 6324",
  },
  {
    id: "d-food",
    category: "Food",
    title: "Before eating",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    translation: "In the name of Allah.",
    source: "Sahih al-Bukhari 5376",
  },
  {
    id: "d-travel",
    category: "Travel",
    title: "Travel supplication",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
    transliteration: "Subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrinin",
    translation: "Glory to Him who has subjected this to us, and we could never have accomplished it ourselves.",
    source: "Qur'an 43:13; Sahih Muslim 1342",
  },
  {
    id: "d-forgive",
    category: "Forgiveness",
    title: "Sayyid al-Istighfar (opening)",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ",
    transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduk",
    translation: "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant.",
    source: "Sahih al-Bukhari 6306",
  },
  {
    id: "d-anxiety",
    category: "Difficulty",
    title: "In distress",
    arabic: "لاَ إِلَهَ إِلاَّ اللَّهُ الْعَظِيمُ الْحَلِيمُ",
    transliteration: "La ilaha illallahul-'Adhimul-Halim",
    translation: "There is no god but Allah, the Mighty, the Forbearing.",
    source: "Sahih al-Bukhari 6346",
  },
  {
    id: "d-parents",
    category: "Parents",
    title: "For one's parents",
    arabic: "رَبِّ ٱرْحَمْهُمَا كَمَا رَبَّيَانِى صَغِيرًا",
    transliteration: "Rabbi irhamhuma kama rabbayani saghira",
    translation: "My Lord, have mercy upon them as they brought me up when I was small.",
    source: "Qur'an 17:24",
  },
  {
    id: "d-protection",
    category: "Protection",
    title: "Protection from harm",
    arabic: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ",
    transliteration: "Bismillahilladhi la yadurru ma'asmihi shay'",
    translation: "In the name of Allah, with whose name nothing can cause harm.",
    source: "Sunan Abu Dawud 5088",
  },
  {
    id: "d-prayer",
    category: "Prayer",
    title: "After the adhan",
    arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ",
    transliteration: "Allahumma Rabba hadhihid-da'watit-tammah",
    translation: "O Allah, Lord of this perfect call, grant Muhammad the intercession and favour.",
    source: "Sahih al-Bukhari 614",
  },
];

export const CATEGORIES = [
  { key: "quran", icon: "📖", query: "Explain the Qur'an and tafsir" },
  { key: "salah", icon: "🕌", query: "What are the conditions of Salah?" },
  { key: "fasting", icon: "🌙", query: "What invalidates the fast in Ramadan?" },
  { key: "zakat", icon: "💰", query: "How is Zakat calculated on gold and savings?" },
  { key: "hajj", icon: "🕋", query: "What are the steps of Umrah?" },
  { key: "marriage", icon: "❤️", query: "What are the rights of a husband and wife?" },
  { key: "inheritance", icon: "⚖️", query: "How is inheritance divided in Islam?" },
  { key: "halal", icon: "🍽️", query: "What is the ruling on interest in Islam?" },
  { key: "history", icon: "🏛️", query: "Tell me about the life of the Sahabah" },
  { key: "duas", icon: "🤲", query: "What are the morning and evening adhkar?" },
];

export const POPULAR_QUESTION_KEYS = [
  "q.pillars",
  "q.salah",
  "q.marriage",
  "q.inheritance",
  "q.patience",
];

export const DAILY = {
  questionKey: "q.pillars",
  verse: VERSES[0]!,
  hadith: HADITHS[0]!,
  dua: DUAS[0]!,
};
