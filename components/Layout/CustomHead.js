import * as React from "react";
import { Head } from "next/document";

export default function CustomHead() {
    return (
        <React.Fragment>
            <Head>
                <title>Vincent Hirtz</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
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
            </Head>
        </React.Fragment>
    )
}