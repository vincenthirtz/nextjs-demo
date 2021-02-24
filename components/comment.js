import { useState } from 'react';
import Avatar from "./avatar";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ReCAPTCHA from "react-google-recaptcha";
import firestore from "../firebase"
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(4),
        margin: 'auto',
        maxWidth: 500,
    },
    tree: {
        flexGrow: 1,
        maxWidth: 400,
    },
}));

export default function Comment({ comments, slug }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [res, setRes] = useState({});
    const [pid, setPid] = useState(undefined);
    const [googleCode, setGoogleCode] = useState(undefined);

    const commentBySlug = comments.filter(com => com.slug === slug && !com.pid);

    const validationSchema = yup.object({
        name: yup
            .string("Enter your name")
            .min(10, "Name should be of minimum 10 characters length")
            .required("Name is required"),
        message: yup
            .string("Enter your message")
            .min(20, "Message should be of minimum 20 characters length")
            .required("Message is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "email@example.com",
            message: "message",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            var templateParams = {
                content: values.message,
                name: values.name,
                slug: slug,
                pid: pid
            };

            if (googleCode) {
                firestore
                    .collection(`comments`)
                    .add(templateParams)
                    .then(response => setRes({ status: response.status, text: "succés" }))
                    .catch(error => {
                        setRes({ status: "error", text: error })
                    })
            } else {
                setRes({ status: "error", text: "You are a robot!" })
            }
        },
    });

    const handleAdd = id => {
        if (id) {
            setPid(id)
        }
        setOpen(!open)
    }

    function onChange(value) {
        setGoogleCode(value)
    }

    const getSubComments = id => {
        const subCommentBySlug = comments.filter(com => com.pid === id);

        return subCommentBySlug.map(subcomment => (
            <TreeView
                className={classes.tree}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                <TreeItem nodeId={subcomment.id} label="Réponses">
                    <div key={subcomment.id} className="block mb-6">
                        <Avatar alt={subcomment.name} />
                        <div
                            style={{ margin: "10px" }}>
                            {subcomment.content}
                        </div>
                        <Button
                            onClick={() => handleAdd(subcomment.id)}
                            color="primary"
                        >
                            Répondre
                </Button>
                        {getSubComments(subcomment.id)}
                    </div>
                </TreeItem>

            </TreeView>
        ))

    }

    return (
        <section>
            <h2 className="mb-8 text-6xl md:text-5xl font-bold tracking-tighter leading-tight">
                Commentaires ({comments.length}) <Button
                    onClick={() => handleAdd()}
                    color="primary"

                >
                    {!open ? "Ajouter un commentaire" : "Fermer"}
                </Button>
            </h2>
            {open &&
                <div className="grid grid-cols-1 ">
                    <form onSubmit={formik.handleSubmit}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={4}>
                                        <TextField
                                            id="name"
                                            name="name"
                                            label="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
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
            }
            <div className="grid grid-cols-1 ">
                {commentBySlug.map(com =>
                    <>
                        <div key={com.id} className="block mb-6">
                            <Avatar alt={com.name} />
                            <div
                                style={{ margin: "10px" }}>
                                {com.content}
                            </div>
                            <Button
                                onClick={() => handleAdd(com.id)}
                                color="primary"

                            >
                                Répondre
              </Button>
                            {getSubComments(com.id)}
                        </div></>)}
            </div>
            {res.status === 'error' && res.text}
        </section>
    );
}
