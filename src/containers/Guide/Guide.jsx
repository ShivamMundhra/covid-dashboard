import React, { useState, useEffect } from "react";

import styles from "./Guide.module.css";
import * as Icon from "react-feather";
import Card from "../../components/GuideCard/Card";

import * as animationData1 from "../../assets/lottieFiles/social-distancing.json";
import * as animationData2 from "../../assets/lottieFiles/wear-mask.json";
import * as animationData3 from "../../assets/lottieFiles/wash-your-hands-covid-19.json";
import * as animationData4 from "../../assets/lottieFiles/stay-home-stay-safe-red.json";

const Guide = (props) => {
  const cardData = [
    {
      animationData: animationData1,
      text: "Maintain atleast 2 meter distance in public",
    },
    {
      animationData: animationData2,
      text: "Cover your mouth and nose properly in public",
    },
    {
      animationData: animationData3,
      text: "Wash your hands thoroughly",
    },
    {
      animationData: animationData4,
      text: "Avoid public places if possible",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      increment();
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  const [cardNo, setCardNo] = useState(0);
  const increment = () => {
    setCardNo((cardNo) => (cardNo + 1) % cardData.length);
  };
  const decrement = () => {
    setCardNo((cardNo) => (cardNo + cardData.length - 1) % cardData.length);
  };
  const renderCard = (cardNo) => {
    return (
      <div className={styles.cardWrapper}>
        <Card {...cardData[cardNo]} />{" "}
      </div>
    );
  };
  console.log("Hi");
  return (
    <div className={styles.Guide}>
      <div className={styles.Heading}>Guide</div>
      <div className={styles.cara}>
        <div className={styles.leftArrowWrapper} onClick={decrement}>
          <Icon.ArrowLeft
            size={40}
            className={styles.leftArrow}
            style={{ stroke: "#fff" }}
          />
        </div>
        {renderCard(cardNo)}
        <div className={styles.rightArrowWrapper} onClick={increment}>
          <Icon.ArrowRight
            size={40}
            className={styles.rightArrow}
            style={{ stroke: "#fff" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Guide;
