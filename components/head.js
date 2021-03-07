import * as React from "react";
import NextHead from "next/head";
import { GoogleFonts } from "next-google-fonts";

export default function Head() {
    return (
        <React.Fragment>
            <GoogleFonts href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" />
            <NextHead>
                <title>Vincent Hirtz</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </NextHead>
        </React.Fragment>
    )
}