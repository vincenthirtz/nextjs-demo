import * as React from "react";
import { Head } from "next/document";

export default function CustomHead() {
  return (
    <React.Fragment>
      <Head>
        <title>Vincent Hirtz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="preload"
          href="/fonts/Rubik-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Rubik-Medium.ttf"
          as="font"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo:wght@900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Mr+Dafoe&display=swap"
          rel="stylesheet"
        />
      </Head>
    </React.Fragment>
  );
}
