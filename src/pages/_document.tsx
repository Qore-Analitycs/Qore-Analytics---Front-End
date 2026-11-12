import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <div className="assistant-status" role="status" aria-label="Assistente ativo">
          <span className="assistant-status__dot" aria-hidden="true" />
          <span>Assistente ativo</span>
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
