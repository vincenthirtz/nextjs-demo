import Document, { Html, Head, Main, NextScript } from "next/document";
import Head from "../components/Head";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
         
        </Head>
        <body className="bg-white text-black dark:bg-black dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
