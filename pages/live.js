import Head from "next/head";
import Intro from "../components/intro";
import Container from "../components/container";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function Live() {
    const classes = useStyles();

    return (
        <>
            <Layout>
                <Container>
                    <Intro />
                    <div className={classes.root}>
                        <iframe 
                        src={`https://player.twitch.tv/?channel=${process.env.NEXT_EXAMPLE_CHANNEL_TWITCH}&parent=${process.env.NEXT_EXAMPLE_SITE_URL}`}
                        frameBorder="0" 
                        allowFullScreen="true" 
                        scrolling="no" 
                        height="378" 
                        width="620" />
                    </div>
                </Container>
            </Layout>
        </>
    );
}
