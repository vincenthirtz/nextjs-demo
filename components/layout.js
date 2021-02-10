import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import Alert from "../components/alert";
import Footer from "../components/footer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function Layout({ preview, children }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (bool) => {
    setOpen(bool);
  };

  const list = (string) => (
    <div
      className={clsx(
        "bg-white text-black dark:bg-black dark:text-white",
        classes.list,
        {
          [classes.fullList]: string === "top" || string === "bottom",
        }
      )}
      style={{ height: "100%" }}
      role="presentation"
      // onClick={() => toggleDrawer(false)}
      // onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        <Link href="/">
          <a>
            <ListItem button key="Home">
              <ListItemIcon className="dark:text-white">
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </a>
        </Link>
        <Link href="/portfolio">
          <a>
            <ListItem button key="Portfolio">
              <ListItemIcon className="dark:text-white">
                <DeveloperBoardIcon />
              </ListItemIcon>
              <ListItemText primary="Portfolio" />
            </ListItem>
          </a>
        </Link>
        <Link href="/contact">
          <a>
            <ListItem button key="Contact">
              <ListItemIcon className="dark:text-white">
                <MailOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
          </a>
        </Link>
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <>
      <div className="min-h-screen">
        <Alert preview={preview} />
        <div style={{ padding: "20px 0 0 20px", cursor: "pointer" }}>
          <MenuIcon onClick={() => toggleDrawer(true)} />
          <SwipeableDrawer
            anchor="left"
            open={open === true}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(true)}
          >
            {list("left")}
          </SwipeableDrawer>{" "}
        </div>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
