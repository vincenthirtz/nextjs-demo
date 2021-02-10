import Head from "next/head";
import cn from "classnames";
import Intro from "../components/intro";
import Container from "../components/container";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Resume() {
  const classes = useStyles();

  return (
    <>
      <Layout>
        <Container>
          <Intro />
          <div className={classes.root}>
            <Timeline align="alternate">
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography
                    className="dark:text-white"
                    variant="body2"
                    color="textSecondary"
                  >
                    Juin 2011
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <MenuBookIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper
                    elevation={3}
                    className={cn(
                      "dark:bg-black dark:text-white",
                      classes.paper
                    )}
                  >
                    <Typography variant="h6" component="h1">
                      BAC STG option GSI (acquis)
                    </Typography>
                    <Typography>Rouen, France</Typography>
                    <Typography>Lycée Gustave Flaubert</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography
                    className="dark:text-white"
                    variant="body2"
                    color="textSecondary"
                  >
                    2012-2014
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <MenuBookIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper
                    elevation={3}
                    className={cn(
                      "dark:bg-black dark:text-white",
                      classes.paper
                    )}
                  >
                    <Typography variant="h6" component="h1">
                      BTS option SLAM (acquis)
                    </Typography>
                    <Typography>Le Mesnil-Esnard, France</Typography>
                    <Typography>La Châtaigneraie</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography
                    className="dark:text-white"
                    variant="body2"
                    color="textSecondary"
                  >
                    Mars 2016
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <LaptopMacIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper
                    elevation={3}
                    className={cn(
                      "dark:bg-black dark:text-white",
                      classes.paper
                    )}
                  >
                    <Typography variant="h6" component="h1">
                      Docaposte (4 ans et 7 mois)
                    </Typography>
                    <Typography>Rouen, France</Typography>
                    <Typography>Développeur Front-End</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography
                    className="dark:text-white"
                    variant="body2"
                    color="textSecondary"
                  >
                    Septembre 2020
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <LaptopMacIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper
                    elevation={3}
                    className={cn(
                      "dark:bg-black dark:text-white",
                      classes.paper
                    )}
                  >
                    <Typography variant="h6" component="h1">
                      Horoquartz (En poste)
                    </Typography>
                    <Typography>Lyon, France</Typography>
                    <Typography>Développeur Front-End</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <a href="https://www.linkedin.com/in/hirtzvincent/" target="_blank">
              <Button variant="contained" color="primary">
                Pour en savoir plus
              </Button>
            </a>
          </div>
        </Container>
      </Layout>
    </>
  );
}
