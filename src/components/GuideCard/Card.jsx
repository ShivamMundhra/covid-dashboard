import React from "react";
import Lottie from "react-lottie";
import styles from "./Card.module.css";
import { DARK_THEME } from "../../utils/constants";
const Card = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: props.animationData.default,
  };
  console.log(props);
  return (
    <div className={styles.Card} style={{ backgroundColor: DARK_THEME.navbar }}>
      <div className={styles.lottieBox}>
        <Lottie options={defaultOptions} />
      </div>
      <div className={styles.text}>{props.text}</div>
    </div>
  );
};

export default Card;
