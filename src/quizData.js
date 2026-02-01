// 質問データ
export const questions = [
  {
    id: 1,
    question: "情報を探すとき、どちらの方法が好き？",
    options: [
      { text: "ピンポイントで答えを知りたい", scores: { perplexity: 3, chatgpt: 2, gemini: 2 } },
      { text: "対話しながら深掘りしたい", scores: { claude: 3, chatgpt: 2, gemini: 1 } },
    ]
  },
  {
    id: 2,
    question: "文章を書いてもらうとき、求めるスタイルは？",
    options: [
      { text: "簡潔で要点がまとまっている", scores: { chatgpt: 3, gemini: 2, copilot: 2 } },
      { text: "丁寧で思考プロセスも見える", scores: { claude: 3, chatgpt: 1 } },
    ]
  },
  {
    id: 3,
    question: "コードを書くとき、AIにどんな役割を期待する？",
    options: [
      { text: "エディタに統合されて自動補完してほしい", scores: { copilot: 3, claude: 1 } },
      { text: "設計から一緒に考えてほしい", scores: { claude: 3, chatgpt: 2, gemini: 1 } },
    ]
  },
  {
    id: 4,
    question: "AIとのやり取りで重視するのは？",
    options: [
      { text: "速さと効率", scores: { chatgpt: 2, gemini: 2, copilot: 2 } },
      { text: "正確さと安全性", scores: { claude: 3, chatgpt: 1 } },
    ]
  },
  {
    id: 5,
    question: "新しい技術やトピックを学ぶとき...",
    options: [
      { text: "概要をざっくり把握したい", scores: { chatgpt: 2, gemini: 2, perplexity: 2 } },
      { text: "背景や文脈も含めて理解したい", scores: { claude: 3, chatgpt: 1 } },
    ]
  },
  {
    id: 6,
    question: "検索結果で重要なのは？",
    options: [
      { text: "最新の情報が反映されている", scores: { perplexity: 3, gemini: 2, copilot: 1 } },
      { text: "信頼できる推論と説明がある", scores: { claude: 3, chatgpt: 2 } },
    ]
  },
  {
    id: 7,
    question: "創造的な作業で求めるのは？",
    options: [
      { text: "とにかくたくさんのアイデア", scores: { chatgpt: 2, gemini: 3, claude: 1 } },
      { text: "質の高い洗練されたアイデア", scores: { claude: 3, chatgpt: 1 } },
    ]
  },
  {
    id: 8,
    question: "複雑な問題に取り組むとき...",
    options: [
      { text: "すぐに実用的な解決策がほしい", scores: { chatgpt: 3, copilot: 2, gemini: 1 } },
      { text: "段階的に考えを深めたい", scores: { claude: 3, chatgpt: 1 } },
    ]
  },
  {
    id: 9,
    question: "AIの回答で気になるのは？",
    options: [
      { text: "たまに間違えても速く答えてほしい", scores: { chatgpt: 2, gemini: 2 } },
      { text: "慎重でも正確であってほしい", scores: { claude: 3, perplexity: 1 } },
    ]
  },
  {
    id: 10,
    question: "理想的なAIアシスタントは？",
    options: [
      { text: "万能なツールとして使える", scores: { chatgpt: 3, gemini: 2, copilot: 1 } },
      { text: "思考のパートナーとして寄り添う", scores: { claude: 3 } },
    ]
  },
];

// AIの情報
export const aiModels = {
  claude: {
    name: "Claude",
    description: "思慮深く丁寧な対話を好むあなたにぴったり。安全性と正確性を重視し、複雑な思考をサポートします。",
    color: "#D97757",
    icon: "🤔"
  },
  chatgpt: {
    name: "ChatGPT",
    description: "バランスの取れた万能型。幅広いタスクを効率的にこなし、創造的な作業も得意です。",
    color: "#10A37F",
    icon: "💬"
  },
  gemini: {
    name: "Gemini",
    description: "創造性と最新情報へのアクセスを重視するあなたに最適。Googleの強力なエコシステムと連携します。",
    color: "#4285F4",
    icon: "✨"
  },
  copilot: {
    name: "Copilot",
    description: "コーディングと実務作業の効率化を求めるなら最良の選択。エディタ統合で開発を加速します。",
    color: "#0078D4",
    icon: "👨‍💻"
  },
  perplexity: {
    name: "Perplexity",
    description: "リサーチと情報収集のスペシャリスト。最新情報を引用付きで素早く提供します。",
    color: "#20808D",
    icon: "🔍"
  }
};

// スコア計算
export const calculateScores = (answers) => {
  const scores = {
    claude: 0,
    chatgpt: 0,
    gemini: 0,
    copilot: 0,
    perplexity: 0
  };

  answers.forEach(answer => {
    // answer は option.scores オブジェクトそのもの
    Object.entries(answer).forEach(([ai, score]) => {
      if (scores.hasOwnProperty(ai)) {
        scores[ai] += score;
      }
    });
  });

  // パーセンテージに変換
  const maxScore = Math.max(...Object.values(scores));
  const percentages = {};
  Object.entries(scores).forEach(([ai, score]) => {
    percentages[ai] = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  });

  return percentages;
};
