# GitHub Pages 公開手順

このフォルダは、そのまま **リポジトリ直下** に置ける構成です。

## 最短手順（ブラウザだけで公開）
1. GitHub で新しいリポジトリを作成します。
2. このフォルダの中身を **すべて** リポジトリ直下にアップロードします。
   - `index.html`
   - `dictionary.html`
   - `styles.css`
   - `dictionary.js`
   - `theme.js`
   - `terms-data.json`
   - `terms-data.js`
   - `terms/` フォルダ
3. GitHub の **Settings > Pages** を開きます。
4. **Build and deployment** の **Source** で **Deploy from a branch** を選びます。
5. Branch を **main**、Folder を **/(root)** にして保存します。
6. 数分待つと、公開 URL が表示されます。

## URL の違い
- ユーザーサイト: `https://<account>.github.io/`
- プロジェクトサイト: `https://<account>.github.io/<repository-name>/`

このサイトは相対パスで組んであるため、**プロジェクトサイト形式でも公開しやすい**構成です。

## Git コマンドで公開する場合
```bash
git init
git branch -M main
git add .
git commit -m "Initial publish"
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

その後、GitHub 側で **Settings > Pages > Deploy from a branch > main / (root)** を設定してください。

## 補足
- `index.html` がトップページです。
- 静的 HTML/CSS/JavaScript サイトなので、追加ビルドなしで公開できます。
- カスタムドメインを使う場合は、GitHub Pages の設定画面から追加してください。
