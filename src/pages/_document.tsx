import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="WWXC6DYwfcRg9MReKOdWE4ko9lJ1w4zCnoEv7uM13HY"
        />

        {/* Primary Meta Tags */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#0A0F1A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="application-name" content="Emirzaki — Portfolio" />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>
      <body style={{ backgroundColor: "#0A0F1A" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
