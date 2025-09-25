# デザイン設計書: へんしんマジック・キッチン

このドキュメントは、アプリケーション「へんしんマジック・キッチン」の技術スタックとシステム構成案を定義します。最新の安定バージョンを使用することを前提とします。

## 1. 全体アーキテクチャ

モバイルファーストなシングルページアプリケーション（SPA）として構築し、バックエンドはサーバーレスアーキテクチャを採用します。これにより、スケーラビリティと開発の俊敏性を両立させます。AI機能はGoogle CloudのVertex AIを全面的に活用します。

- **フロントエンド**: Next.js (React)
- **バックエンド**: Firebase Functions (Node.js/TypeScript)
- **データベース**: Firestore, Cloud Storage for Firebase
- **AI/ML**: Google Cloud Vertex AI (Gemini API, Gemini 2.5 Flash Image (Nano Banana))

## 2. フロントエンド

ユーザーが直接操作するインターフェース部分です。直感的で分かりやすいUI/UXを提供します。

- **フレームワーク**: [Next.js](https://nextjs.org/)
  - **理由**: Reactベースのフレームワークであり、SSR（サーバーサイドレンダリング）やSSG（静的サイト生成）、APIルートなどの機能が豊富で、パフォーマンスと開発体験のバランスが良いため。
- **言語**: [TypeScript](https://www.typescriptlang.org/)
  - **理由**: 静的型付けにより、コードの堅牢性と保守性を向上させます。
- **UIライブラリ**: [Material-UI (MUI)](https://mui.com/)
  - **理由**: Googleのデザインシステムに基づいており、高品質なコンポーネントが豊富に揃っているため、迅速に洗練されたUIを構築できます。
- **状態管理**: [Recoil](https://recoiljs.org/) または React Context API
  - **理由**: アプリケーションの状態（ユーザー情報、子供の嗜好データなど）を効率的に管理するため。RecoilはシンプルなAPIで大規模な状態管理にも対応できます。

## 3. バックエンド

ビジネスロジック、データベースとの連携、AIモデルの呼び出しなどを担当します。

- **プラットフォーム**: [Firebase Functions](https://firebase.google.com/docs/functions)
  - **理由**: サーバーの管理が不要なサーバーレス環境であり、イベントドリブンな処理（例：DB更新時に通知）を容易に実装できます。FirestoreやAuthenticationとの親和性が非常に高いです。
- **言語**: [Node.js](https://nodejs.org/) with [TypeScript](https://www.typescriptlang.org/)
  - **理由**: フロントエンドと言語を統一することで、開発効率を高めます。

## 4. AI/ML

アプリケーションのコアとなる、パーソナライズされた調理法の提案と画像生成を担います。

- **AIプラットフォーム**: [Google Cloud Vertex AI](https://cloud.google.com/vertex-ai)
  - **理由**: Googleの最新AIモデルを統合的に利用できるマネージドプラットフォームであるため。
- **大規模言語モデル (LLM)**: [Gemini API](https://ai.google.dev/docs/gemini_api_overview)
  - **理由**: 子供の好き嫌いの分析、苦手食材の「変身プラン」の立案、保育園への報告文の自動生成など、高度なテキスト生成・分析タスクに活用します。
- **画像生成モデル**: Gemini 2.5 Flash Image (Nano Banana)
  - **理由**: 提案された調理法の完成イメージをリアルに生成するために使用します。

## 5. データベース

ユーザー情報、子供の嗜好データ、調理記録などを永続的に保存します。

- **NoSQLデータベース**: [Firestore](https://firebase.google.com/docs/firestore)
  - **理由**: ユーザーごとの柔軟なデータ構造（好き嫌い、アレルギー情報など）に対応しやすいドキュメント指向データベースです。リアルタイム同期機能も備えており、インタラクティブなアプリケーションに適しています。
- **ストレージ**: [Cloud Storage for Firebase](https://firebase.google.com/docs/storage)
  - **理由**: AIが生成した料理画像や、ユーザーがアップロードする画像を安全に保存・管理するために使用します。

## 6. 認証

安全なユーザー認証機能を提供します。

- **認証サービス**: [Firebase Authentication](https://firebase.google.com/docs/auth)
  - **理由**: メール/パスワード、Google、Facebookなど、多様な認証方法を容易に実装でき、高いセキュリティを確保できます。

## 7. デプロイ

アプリケーションをインターネット上に公開するための環境です。

- **フロントエンド**: [Vercel](https://vercel.com/)
  - **理由**: Next.jsとの親和性が非常に高く、Gitリポジトリと連携してCI/CDを自動化できるため、デプロイが非常に簡単です。
- **バックエンド**: Firebase
  - **理由**: Firebase FunctionsはFirebase CLIを通じて簡単にデプロイできます。
