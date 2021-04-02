import React, { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import Alert from "./Alert";
import Footer from "./Footer";
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
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import FaceIcon from "@material-ui/icons/Face";
import LiveTvIcon from '@material-ui/icons/LiveTv';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PetsIcon from '@material-ui/icons/Pets';

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
      className={cn(
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
        <Link href="/live">
          <a>
            <ListItem button key="Live">
              <ListItemIcon className="dark:text-white">
                <LiveTvIcon />
              </ListItemIcon>
              <ListItemText primary="Live" />
            </ListItem>
          </a>
        </Link>
        <Link href="/resume">
          <a>
            <ListItem button key="CV">
              <ListItemIcon className="dark:text-white">
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary="CV" />
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
      <Link href="/coins">
          <a>
            <ListItem button key="Coins">
              <ListItemIcon className="dark:text-white">
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Coins" />
            </ListItem>
          </a>
        </Link>
        <Link href="/cats">
          <a>
            <ListItem button key="Cats">
              <ListItemIcon className="dark:text-white">
                <PetsIcon />
              </ListItemIcon>
              <ListItemText primary="Cats" />
            </ListItem>
          </a>
        </Link>
      
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
