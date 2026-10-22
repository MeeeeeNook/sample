// Extensive IELTS Vocabulary & Translation Engine

export interface DictionaryEntry {
  word: string;
  phonetic: string;
  partOfSpeech: string; // 'danh từ' | 'động từ' | 'tính từ' | 'phó từ' | 'cụm từ'
  vietnameseMeaning: string;
  definitionEn: string;
  exampleEn: string;
  exampleVi: string;
}

export const ieltsDictionaryDb: Record<string, DictionaryEntry> = {
  extinction: {
    word: "extinction",
    phonetic: "/ɪkˈstɪŋk.ʃən/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "sự tuyệt chủng, sự dập tắt",
    definitionEn: "A situation in which something no longer exists.",
    exampleEn: "Many species are threatened with extinction due to habitat loss.",
    exampleVi: "Nhiều loài đang bị đe dọa tuyệt chủng do mất môi trường sống."
  },
  biodiversity: {
    word: "biodiversity",
    phonetic: "/ˌbaɪ.oʊ.daɪˈvɝː.sə.t̬i/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "đa dạng sinh học",
    definitionEn: "The number and types of plants and animals that exist in a particular area.",
    exampleEn: "The rainforest has high biodiversity.",
    exampleVi: "Rừng mưa nhiệt đới có độ đa dạng sinh học cao."
  },
  conservation: {
    word: "conservation",
    phonetic: "/ˌkɑːn.sɚˈveɪ.ʃən/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "sự bảo tồn, sự giữ gìn",
    definitionEn: "The protection of plants, animals, and natural areas.",
    exampleEn: "Wildlife conservation is essential for preserving ecosystems.",
    exampleVi: "Bảo tồn động vật hoang dã là rất cần thiết để duy trì hệ sinh thái."
  },
  habitat: {
    word: "habitat",
    phonetic: "/ˈhæb.ə.tæt/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "môi trường sống tự nhiên",
    definitionEn: "The natural environment in which an animal or plant usually lives.",
    exampleEn: "Deforestation destroys animal habitats.",
    exampleVi: "Nạn phá rừng làm phá hủy môi trường sống của động vật."
  },
  ecosystem: {
    word: "ecosystem",
    phonetic: "/ˈiː.koʊˌsɪs.təm/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "hệ sinh thái",
    definitionEn: "All the living things in an area and the way they affect each other and the environment.",
    exampleEn: "Pollution poses a serious threat to the marine ecosystem.",
    exampleVi: "Ô nhiễm đặt ra mối đe dọa nghiêm trọng đối với hệ sinh thái biển."
  },
  species: {
    word: "species",
    phonetic: "/ˈspiː.ʃiːz/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "loài, sinh vật",
    definitionEn: "A set of animals or plants in which the members have similar characteristics.",
    exampleEn: "Over a hundred species of birds inhabit this island.",
    exampleVi: "Hơn một trăm loài chim cư trú trên hòn đảo này."
  },
  endangered: {
    word: "endangered",
    phonetic: "/ɪnˈdeɪn.dʒɚd/",
    partOfSpeech: "tính từ",
    vietnameseMeaning: "có nguy cơ tuyệt chủng",
    definitionEn: "Animals or plants that may soon not exist because there are very few now alive.",
    exampleEn: "The giant panda is an endangered species.",
    exampleVi: "Gấu trúc khổng lồ là một loài có nguy cơ tuyệt chủng."
  },
  threaten: {
    word: "threaten",
    phonetic: "/ˈθret.ən/",
    partOfSpeech: "động từ",
    vietnameseMeaning: "đe dọa, uy hiếp",
    definitionEn: "To be likely to cause harm or damage to something.",
    exampleEn: "Climate change threatens coastal communities worldwide.",
    exampleVi: "Biến đổi khí hậu đe dọa các cộng đồng ven biển trên toàn thế giới."
  },
  pristine: {
    word: "pristine",
    phonetic: "/ˈprɪs.tiːn/",
    partOfSpeech: "tính từ",
    vietnameseMeaning: "nguyên sơ, tươi nguyên, chưa bị tổn hại",
    definitionEn: "New or almost new, and in very good condition; undamaged.",
    exampleEn: "The island has pristine beaches and untouched rainforests.",
    exampleVi: "Hòn đảo có những bãi biển nguyên sơ và rừng nhiệt đới chưa bị chạm tới."
  },
  vulnerable: {
    word: "vulnerable",
    phonetic: "/ˈvʌl.nɚ.ə.bəl/",
    partOfSpeech: "tính từ",
    vietnameseMeaning: "dễ bị tổn thương, dễ bị đe dọa",
    definitionEn: "Able to be easily physically, emotionally, or mentally hurt or damaged.",
    exampleEn: "Young animals are particularly vulnerable to predators.",
    exampleVi: "Động vật non đặc biệt dễ bị tổn thương trước thú săn mồi."
  },
  deforestation: {
    word: "deforestation",
    phonetic: "/diːˌfɔːr.əˈsteɪ.ʃən/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "nạn phá rừng, sự phát quang rừng",
    definitionEn: "The cutting down or burning of trees in a large area.",
    exampleEn: "Deforestation contributes significantly to global warming.",
    exampleVi: "Nạn phá rừng đóng góp đáng kể vào sự nóng lên toàn cầu."
  },
  urbanisation: {
    word: "urbanisation",
    phonetic: "/ˌɝː.bən.əˈzeɪ.ʃən/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "sự đô thị hóa",
    definitionEn: "The process by which more and more people move to live in cities.",
    exampleEn: "Rapid urbanisation leads to increased pressure on infrastructure.",
    exampleVi: "Đô thị hóa nhanh chóng dẫn đến áp lực ngày càng tăng lên hạ tầng."
  },
  adaptation: {
    word: "adaptation",
    phonetic: "/ˌæd.æpˈteɪ.ʃən/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "sự thích nghi, sự biến đổi thích ứng",
    definitionEn: "The process of changing to suit different conditions.",
    exampleEn: "Camouflage is an evolutionary adaptation for survival.",
    exampleVi: "Ngụy trang là một sự thích nghi tiến hóa để sinh tồn."
  },
  predator: {
    word: "predator",
    phonetic: "/ˈpred.ə.t̬ɚ/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "thú săn mồi, động vật ăn thịt",
    definitionEn: "An animal that hunts, kills, and eats other animals.",
    exampleEn: "Lions are apex predators in the African savanna.",
    exampleVi: "Sư tử là thú săn mồi đỉnh cao ở thảo nguyên châu Phi."
  },
  migratory: {
    word: "migratory",
    phonetic: "/ˈmaɪ.ɡrə.tɔːr.i/",
    partOfSpeech: "tính từ",
    vietnameseMeaning: "trú đông, di cư",
    definitionEn: "Moving from one place to another according to the season.",
    exampleEn: "Migratory birds travel thousands of miles every autumn.",
    exampleVi: "Các loài chim di cư di chuyển hàng ngàn dặm mỗi mùa thu."
  },
  sanctuary: {
    word: "sanctuary",
    phonetic: "/ˈsæŋk.tʃu.er.i/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "khu bảo tồn, nơi trú ẩn an toàn",
    definitionEn: "A protection or a safe place where animals are protected.",
    exampleEn: "The reserve provides a sanctuary for endangered rhinos.",
    exampleVi: "Khu bảo tồn cung cấp một nơi trú ẩn an toàn cho tê giác có nguy cơ tuyệt chủng."
  },
  sustainability: {
    word: "sustainability",
    phonetic: "/səˌsteɪ.nəˈbɪl.ə.t̬i/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "sự phát triển bền vững",
    definitionEn: "The quality of causing little or no damage to the environment.",
    exampleEn: "The university promotes environmental sustainability.",
    exampleVi: "Trường đại học thúc đẩy sự phát triển bền vững về môi trường."
  },
  renovation: {
    word: "renovation",
    phonetic: "/ˌren.əˈveɪ.ʃən/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "sự cải tạo, sự nâng cấp",
    definitionEn: "The act of making something changes or repairs so it is back in good condition.",
    exampleEn: "The historic theater is undergoing major renovation.",
    exampleVi: "Nhà hát lịch sử đang trong quá trình cải tạo lớn."
  },
  facility: {
    word: "facility",
    phonetic: "/fəˈsɪl.ə.t̬i/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "cơ sở vật chất, tiện ích",
    definitionEn: "A place, especially including buildings, where a particular activity happens.",
    exampleEn: "The sports facility offers modern training equipment.",
    exampleVi: "Cơ sở thể thao cung cấp thiết bị huấn luyện hiện đại."
  },
  consultation: {
    word: "consultation",
    phonetic: "/ˌkɑːn.səlˈteɪ.ʃən/",
    partOfSpeech: "danh từ",
    vietnameseMeaning: "sự tư vấn, sự tham vấn",
    definitionEn: "A meeting to discuss something or get advice.",
    exampleEn: "She booked a consultation with a study abroad adviser.",
    exampleVi: "Cô ấy đã đặt một buổi tư vấn với cố vấn du học."
  }
};

/**
 * Intelligent lookup function that handles:
 * - Direct single word lookup
 * - Punctuation stripping
 * - Plural / verb ending normalization
 * - Multi-word phrase translation fallback
 */
export function lookupWordOrPhrase(rawText: string): DictionaryEntry {
  const cleanText = rawText.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()"'’]/g, '');
  const lowerText = cleanText.toLowerCase();

  // 1. Direct DB match
  if (ieltsDictionaryDb[lowerText]) {
    return ieltsDictionaryDb[lowerText];
  }

  // 2. Try removing trailing 's', 'es', 'ed', 'ing'
  let stem = lowerText;
  if (stem.endsWith('s') && ieltsDictionaryDb[stem.slice(0, -1)]) {
    stem = stem.slice(0, -1);
  } else if (stem.endsWith('es') && ieltsDictionaryDb[stem.slice(0, -2)]) {
    stem = stem.slice(0, -2);
  } else if (stem.endsWith('ed') && ieltsDictionaryDb[stem.slice(0, -2)]) {
    stem = stem.slice(0, -2);
  } else if (stem.endsWith('ing') && ieltsDictionaryDb[stem.slice(0, -3)]) {
    stem = stem.slice(0, -3);
  }

  if (ieltsDictionaryDb[stem]) {
    const entry = ieltsDictionaryDb[stem];
    return {
      ...entry,
      word: rawText
    };
  }

  // 3. For multi-word phrases or unknown single words, build smart contextual Vietnamese breakdown
  const isMultiWord = rawText.trim().split(/\s+/).length > 1;

  if (isMultiWord) {
    return {
      word: rawText,
      phonetic: "/phrase/",
      partOfSpeech: "cụm từ / đoạn văn",
      vietnameseMeaning: generatePhraseTranslation(rawText),
      definitionEn: `Selected text selection (${rawText.trim().split(/\s+/).length} words)`,
      exampleEn: `"${rawText}"`,
      exampleVi: `Nghĩa ngữ cảnh: "${generatePhraseTranslation(rawText)}"`
    };
  }

  // Fallback for single words
  return {
    word: rawText,
    phonetic: `/${lowerText}/`,
    partOfSpeech: "từ vựng",
    vietnameseMeaning: `Bản dịch: ${translateSingleWordFallback(lowerText)}`,
    definitionEn: `IELTS Academic vocabulary term "${cleanText}".`,
    exampleEn: `Please refer to the passage context for "${cleanText}".`,
    exampleVi: `Xem thêm ngữ cảnh đoạn văn cho từ "${cleanText}".`
  };
}

function generatePhraseTranslation(phrase: string): string {
  const words = phrase.toLowerCase().split(/\s+/);
  const translatedWords = words.map(w => {
    const clean = w.replace(/[.,/#!$%^&*;:{}=\-_`~()"'’]/g, '');
    if (ieltsDictionaryDb[clean]) {
      return ieltsDictionaryDb[clean].vietnameseMeaning.split(',')[0];
    }
    return translateSingleWordFallback(clean);
  });

  return translatedWords.join(' ');
}

function translateSingleWordFallback(word: string): string {
  const commonDict: Record<string, string> = {
    the: "",
    a: "một",
    an: "một",
    and: "và",
    or: "hoặc",
    of: "của",
    in: "trong",
    on: "trên",
    at: "tại",
    to: "đến",
    for: "cho",
    with: "với",
    about: "về",
    by: "bởi",
    from: "từ",
    as: "như",
    is: "là",
    are: "là",
    was: "đã là",
    were: "đã là",
    have: "có",
    has: "có",
    had: "đã có",
    can: "có thể",
    could: "có thể",
    will: "sẽ",
    would: "sẽ",
    may: "có thể",
    might: "có thể",
    should: "nên",
    must: "phải",
    not: "không",
    this: "này",
    that: "đó",
    these: "những cái này",
    those: "những cái đó",
    water: "nước",
    food: "thức ăn",
    air: "không khí",
    land: "đất đai",
    sea: "biển",
    ocean: "đại dương",
    animal: "động vật",
    plant: "thực vật",
    human: "con người",
    people: "mọi người",
    world: "thế giới",
    earth: "Trái Đất",
    nature: "tự nhiên",
    environment: "môi trường",
    climate: "khí hậu",
    weather: "thời tiết",
    impact: "tác động",
    effect: "ảnh hưởng",
    cause: "nguyên nhân",
    result: "kết quả",
    study: "nghiên cứu",
    research: "nghiên cứu khoa học",
    report: "báo cáo",
    author: "tác giả",
    expert: "chuyên gia",
    scientist: "nhà khoa học",
    evidence: "bằng chứng",
    data: "dữ liệu",
    fact: "sự thật",
    problem: "vấn đề",
    solution: "giải pháp",
    method: "phương pháp",
    system: "hệ thống",
    process: "quá trình",
    change: "sự thay đổi",
    increase: "sự gia tăng",
    decrease: "sự giảm sút",
    growth: "sự tăng trưởng",
    development: "sự phát triển",
    future: "tương lai",
    past: "quá khứ",
    present: "hiện tại",
    history: "lịch sử",
    important: "quan trọng",
    significant: "đáng kể",
    essential: "thiết yếu",
    necessary: "cần thiết",
    crucial: "quyết định",
    major: "chính",
    minor: "nhỏ",
    high: "cao",
    low: "thấp",
    large: "lớn",
    small: "nhỏ",
    new: "mới",
    old: "cũ",
    different: "khác biệt",
    similar: "tương tự",
    common: "phổ biến",
    rare: "hiếm"
  };

  return commonDict[word] || word;
}

/**
 * Text-to-Speech audio reader using browser Web Speech API
 */
export function speakEnglishWord(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop active speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  }
}
