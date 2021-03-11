import * as React from "react";
import { Head } from "next/document";
import { GoogleFonts } from "next-google-fonts";

export default function CustomHead() {
    return (
        <React.Fragment>
            <GoogleFonts href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" />
            <Head>
                <title>Vincent Hirtz</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
        </React.Fragment>
    )
}