# Bullet-Proof: Next.js + GSAP Training Environment

## 概要
このプロジェクトは、Next.js 15とGSAPを中心に、最新のフロントエンド技術を練習・検証できるトレーニング環境です。

## 技術スタック
- [Next.js 15](https://nextjs.org/)
- [GSAP](https://gsap.com/docs/v3/Installation?tab=yarn&module=esm&require=false)
- [Volta](https://volta.sh/)（Node.jsバージョン管理）
- Node.js 22（Voltaで管理）
- [pnpm](https://pnpm.io/)
- [Biome](https://biomejs.dev/ja/linter/)（Lint/Format）
- [react-hook-form](https://react-hook-form.com/)
- [zod](https://zod.dev/)
- [tailwindcss](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [zustand](https://zustand-demo.pmnd.rs/)

## ディレクトリ構成
- `src/` ... すべてのアプリケーションコードはこの配下に配置

## セットアップ手順
1. VoltaでNode.js 22とpnpmをインストール
   ```sh
   volta install node@22 pnpm
   ```
2. 依存パッケージのインストール
   ```sh
   pnpm install
   ```
3. 開発サーバー起動
   ```sh
   pnpm dev
   ```

## Lint/Format
- [Biome](https://biomejs.dev/ja/linter/)を使用
- 設定は公式推奨（recommended）ルールをON
- コマンド例:
  ```sh
  pnpm dlx @biomejs/biome lint
  ```

## 禁止事項
- Prettier, ESLint, npm, yarnの使用禁止
- グローバルストアをcontextで持たせることは禁止（正規ライブラリが使用する場合を除く）

## 参考ドキュメント
- [GSAP公式ドキュメント](https://gsap.com/docs/v3/Installation?tab=yarn&module=esm&require=false)
- [Biome公式ドキュメント](https://biomejs.dev/ja/linter/)
