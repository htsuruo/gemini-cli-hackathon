## Importtant Notice

- 思考は英語で出力はすべて日本語で出力すること
- GitHubのCLI操作は`gh`コマンドではなく、事前設定されたGitHub CMPを使うこと
- 禁止事項: `npm run dev`などのプロセスの起動は実行しないこと。`npm run build`も不要です。


---

## Project Structure

/home/student_04_59ec8ade389e/hackathon/
├───.gitignore
├───GEMINI.md
├───README.md
├───.gemini/
│   ├───settings.json
│   └───commands/
│       └───git/
│           ├───commit.toml
│           ├───pr.toml
│           └───review.toml
├───.git/...
├───docs/
│   ├───assessment_criteria.md
│   ├───demo_plan.md
│   ├───DESIGN.md
│   └───SPECIFICATION.md
└───frontend/ (Next.js Application)
    ├───.gitignore
    ├───eslint.config.mjs
    ├───next.config.ts
    ├───package-lock.json
    ├───package.json
    ├───postcss.config.mjs
    ├───README.md
    ├───tsconfig.json
    ├───.next/...
    ├───node_modules/...
    ├───public/
    │   ├───file.svg
    │   ├───globe.svg
    │   ├───next.svg
    │   ├───vercel.svg
    │   └───window.svg
    └───src/
        ├───app/
        │   ├───favicon.ico
        │   ├───globals.css
        │   ├───layout.tsx
        │   ├───page.tsx
        │   ├───kitchen/
        │   │   └───page.tsx
        │   ├───login/
        │   │   └───page.tsx
        │   └───profile/
        │       └───page.tsx
        └───components/
            ├───food/
            ├───layout/
            │   └───Header.tsx
            └───ui/
