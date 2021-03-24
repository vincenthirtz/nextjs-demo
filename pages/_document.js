import Document, { Html, Main, NextScript } from "next/document";
import CustomHead from "../components/Head";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <CustomHead/>
        <body className="bg-white text-black dark:bg-black dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
