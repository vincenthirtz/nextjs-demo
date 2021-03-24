import { useState } from 'react';
import Head from "next/head";
import Intro from "../components/Intro";
import Container from "../components/Container";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import emailjs from 'emailjs-com';
import ReCAPTCHA from "react-google-recaptcha";
import { request } from "../lib/datocms";
import { useQuerySubscription } from "react-datocms";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    maxWidth: 500,
  },
}));

export async function getStaticProps({ preview }) {
  const graphqlRequest = {
    query: `
      {
        _site {
          globalSeo {
            siteName
            titleSuffix
            twitterAccount
            fallbackSeo {
              title
              twitterCard
              description
            }
          }
          faviconMetaTags {
            tag
            content
            attributes
          }
        }
      }

    `,
    preview,
  };

  return {
    props: {
      subscription: preview
        ? {
          ...graphqlRequest,
          initialData: await request(graphqlRequest),
          token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
        }
        : {
          enabled: false,
          initialData: await request(graphqlRequest),
        },
    },
  };
}

export default function Contact({ subscription }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState({});
  const [googleCode, setGoogleCode] = useState('');

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    subject: yup
      .string("Enter your subject")
      .min(5, "Message should be of minimum 5 characters length")
      .required("Subject is required"),
    message: yup
      .string("Enter your message")
      .min(20, "Message should be of minimum 20 characters length")
      .required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "email@example.com",
      subject: "sujet",
      message: "message",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      var templateParams = {
        subject: values.subject,
        message: values.message,
        email: values.email,
        'g-recaptcha-response': googleCode
      };

      emailjs.send('gmail', 'template_c41sr4d', templateParams, 'user_Va7JBiVD56bGbkAiSk2Xj')
        .then(function (response) {
          setRes({ status: response.status, text: response.text })
          handleClick()
        }, function (error) {
          setRes({ status: "error", text: error })
          handleClick()
        });
    },
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function onChange(value) {
    setGoogleCode(value)
  }

  const {
    data: { _site },
  } = useQuerySubscription(subscription);

  const { globalSeo } = _site;

  return (
    <>
      <Layout>
        <Head>
        <title>Contact {globalSeo.titleSuffix}</title>
          <meta name="author" content={globalSeo.siteName} />
          <meta name="description" content={globalSeo.fallbackSeo.description}></meta>
        </Head>
        <Container>
          <Intro />
          <div className={classes.root}>
            <form onSubmit={formik.handleSubmit}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={4}>
                      <TextField
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                      />

                      <TextField
                        id="subject"
                        name="subject"
                        label="Sujet"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        error={formik.touched.subject && Boolean(formik.errors.subject)}
                        helperText={formik.touched.subject && formik.errors.subject}
                      />

                      <TextField
                        id="message"
                        name="message"
                        label="Message"
                        type="text"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.message && Boolean(formik.errors.message)
                        }
                        helperText={formik.touched.message && formik.errors.message}
                        multiline
                        rows={2}
                        rowsMax={4}
                      />

                      <ReCAPTCHA
                        sitekey="6LfHB00aAAAAAHBd41U1IzNVzoZNt58YGVqndmNh"
                        onChange={onChange}
                      />

                      <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                      >
                        Envoyer
              </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={res.status === 200 ? "success" : "error"}>
              {res.status === 200 ? "Formulaire envoyé, merci" : "Erreur, le service n'est pas disponible"}
            </Alert>
          </Snackbar>
        </Container>
      </Layout>
    </>
  );
}
