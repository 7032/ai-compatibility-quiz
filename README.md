# AI相性診断

あなたにぴったりのAIアシスタントを見つける診断Webサービスです。

## 機能

- 10問の質問に答えることで、あなたと相性の良いAIを診断
- Claude、ChatGPT、Gemini、Copilot、Perplexityの5つのAIとの相性を判定
- バーチャートとレーダーチャートで視覚的に結果を表示
- レスポンシブデザイン対応

## 技術スタック

- **フロントエンド**: React + Vite
- **スタイリング**: Tailwind CSS
- **チャート**: Recharts

## ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーは `http://localhost:5173` で起動します。

## ビルド

```bash
npm run build
```

`dist` ディレクトリにビルド済みファイルが出力されます。

## カスタマイズ

### 質問の変更

`src/quizData.js` の `questions` 配列を編集することで、質問内容や選択肢、スコアリングをカスタマイズできます。

### AIモデルの追加/変更

`src/quizData.js` の `aiModels` オブジェクトを編集することで、診断対象のAIを変更できます。

### デザインの変更

Tailwind CSSのクラスを使用しているため、`src/App.jsx` のクラス名を変更することで簡単にデザインをカスタマイズできます。

## ライセンス

MIT
