import React, { useState } from "react";
import styles from "./Navbar.module.css";

import { Link, useLocation } from "react-router-dom";
import * as Icon from "react-feather";

import { DARK_THEME } from "../../utils/constants";

const Navbar = (props) => {
  const location = useLocation();
  const activeNavIcon = (path) => ({
    style: {
      stroke: location.pathname === path ? DARK_THEME.label : "#fff",
    },
  });
  const activeLinkColor = (path) => ({
    style: {
      color: location.pathname === path ? DARK_THEME.label : "#fff",
    },
  });
  const { isNavOpen, toggleNav } = props;
  const toggleWarning = () => {
    window.scrollTo(0, 0);
    props.toggleWarning();
  };
  return (
    <>
      <div
        className={`${styles.Navbar} ${isNavOpen ? styles.openNav : ""}`}
        style={{ backgroundColor: DARK_THEME.navbar }}
      >
        <div className={styles.menu} onClick={toggleNav}>
          {!isNavOpen ? (
            <Icon.Menu style={{ stroke: "#fff" }} />
          ) : (
            <Icon.X style={{ stroke: "#fff" }} />
          )}
        </div>
        <div className={styles.topGrop}>
          <div className={styles.Title} style={{ color: DARK_THEME.label }}>
            Covid India DashBoard
          </div>
        </div>
        <div className={styles.middleGrp}>
          <div className={styles.iconWrapper}>
            <Link to="/" {...activeLinkColor("/")}>
              <Icon.Home className={styles.linkIcon} {...activeNavIcon("/")} />
              <span className={styles.link}>Home</span>
            </Link>
          </div>
          <div className={styles.iconWrapper}>
            <Link to="/guide" {...activeLinkColor("/guide")}>
              <Icon.AlertCircle
                className={styles.linkIcon}
                {...activeNavIcon("/guide")}
              />
              <span className={styles.link}>Guide</span>
            </Link>
          </div>
        </div>
        <div className={styles.bottomGrp}>
          <div className={styles.intro}>
            <span style={{ color: DARK_THEME.label }}>
              Made with ❤️ By Shivam Mundhra
            </span>
            <div className={styles.linkGrp}>
              <a href="https://github.com/ShivamMundhra" target="_blank">
                <Icon.GitHub style={{ stroke: "#fff" }} />
              </a>
              <a
                href="https://www.linkedin.com/in/shivam-mundhra-350522173/"
                target="_blank"
              >
                <Icon.Linkedin style={{ stroke: "#fff" }} />
              </a>
            </div>
          </div>
          {!isNavOpen ? (
            <div className={styles.w}>
              <Icon.HelpCircle
                style={{ stroke: "#fff", cursor: "pointer`" }}
                onClick={toggleWarning}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className={`${styles.backdrop} ${isNavOpen ? styles.showBackdrop : ""}`}
        onClick={props.toggleNav}
      />
    </>
  );
};

export default Navbar;
