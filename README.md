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
- **サーバー**: Express.js（静的ファイル配信用）

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

## Herokuへのデプロイ手順

### 1. Heroku CLIのインストール

```bash
# macOS
brew tap heroku/brew && brew install heroku

# Ubuntu/Debian
curl https://cli-assets.heroku.com/install.sh | sh
```

### 2. Herokuにログイン

```bash
heroku login
```

### 3. Herokuアプリの作成

```bash
heroku create あなたのアプリ名
```

アプリ名を省略すると、ランダムな名前が自動生成されます。

### 4. Git設定（まだの場合）

```bash
git init
git add .
git commit -m "Initial commit"
```

### 5. Herokuにデプロイ

```bash
git push heroku main
```

または、masterブランチを使用している場合:

```bash
git push heroku master
```

### 6. アプリを開く

```bash
heroku open
```

## 環境変数

このアプリは特別な環境変数を必要としません。ポート番号は自動的にHerokuから割り当てられます。

## トラブルシューティング

### デプロイ後にアプリが起動しない

ログを確認:
```bash
heroku logs --tail
```

### ビルドエラーが発生する

Node.jsのバージョンを確認:
```bash
heroku config:set NODE_ENV=production
```

## カスタマイズ

### 質問の変更

`src/quizData.js` の `questions` 配列を編集することで、質問内容や選択肢、スコアリングをカスタマイズできます。

### AIモデルの追加/変更

`src/quizData.js` の `aiModels` オブジェクトを編集することで、診断対象のAIを変更できます。

### デザインの変更

Tailwind CSSのクラスを使用しているため、`src/App.jsx` のクラス名を変更することで簡単にデザインをカスタマイズできます。

## ライセンス

MIT
