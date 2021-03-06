import Document, { Html, Head, Main, NextScript } from "next/document";
import GoogleFonts from "next-google-fonts";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          <title>Vincent Hirtz</title>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <body className="bg-white text-black dark:bg-black dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
