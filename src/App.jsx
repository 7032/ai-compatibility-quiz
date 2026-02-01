import { useState, useEffect } from 'react';
import { questions, aiModels, calculateScores } from './quizData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (optionScores) => {
    const newAnswers = [...answers, optionScores];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // 全ての質問に答えたら結果を表示
  useEffect(() => {
    if (answers.length === questions.length && answers.length > 0) {
      setShowResults(true);
    }
  }, [answers]);

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setStarted(false);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              🤖 AI相性診断
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              あなたにぴったりのAIアシスタントを見つけよう
            </p>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                10個の質問に答えると、あなたの使い方や好みに最も合うAIアシスタントが分かります。
                Claude、ChatGPT、Gemini、Copilot、Perplexityの5つのAIとの相性を診断します。
              </p>
            </div>
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-12 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              診断をはじめる
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const scores = calculateScores(answers);
    const sortedScores = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([ai, score]) => ({
        ai,
        score,
        ...aiModels[ai]
      }));

    const topMatch = sortedScores[0];

    const chartData = sortedScores.map(item => ({
      name: item.name,
      相性: item.score
    }));

    const radarData = sortedScores.map(item => ({
      ai: item.name,
      score: item.score
    }));

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
              診断結果
            </h2>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 mb-8">
              <div className="text-center">
                <div className="text-6xl mb-4">{topMatch.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  あなたと最も相性が良いのは...
                </h3>
                <div className="text-5xl font-bold mb-4" style={{ color: topMatch.color }}>
                  {topMatch.name}
                </div>
                <div className="text-xl text-gray-700">
                  相性度: {topMatch.score}%
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <p className="text-gray-700 text-center leading-relaxed">
                {topMatch.description}
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                各AIとの相性チャート
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="相性" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                レーダーチャート
              </h4>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="ai" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="相性スコア" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="text-xl font-bold text-gray-800 text-center">
                詳細スコア
              </h4>
              {sortedScores.map((item, index) => (
                <div key={item.ai} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <div className="font-bold text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: item.color }}>
                    {item.score}%
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center space-y-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🤖AI相性診断の結果\n\n${sortedScores.map(item => `${item.icon}${item.name}: ${item.score}%`).join('\n')}\n\n私と最も相性が良いのは「${topMatch.name}」でした！\n\nあなたも診断してみよう👇\n${window.location.href}`)}&hashtags=${encodeURIComponent('AI相性診断')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Xへ投稿する
              </a>
              <br />
              <button
                onClick={handleRestart}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                もう一度診断する
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              質問 {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm font-semibold text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          {question.question}
        </h2>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.scores)}
              className="w-full bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-100 hover:to-blue-100 border-2 border-gray-200 hover:border-purple-300 rounded-2xl p-6 text-left transition-all transform hover:scale-102 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-lg text-gray-800">
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
