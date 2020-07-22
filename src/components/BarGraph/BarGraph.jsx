import React from "react";

import { Bar } from "react-chartjs-2";
import styles from "./BarGraph.module.css";

const BarGraph = (props) => {
  const labelsArr = [...props.data.labels];
  const dataArr = [...props.data.dataArr];
  const data = {
    labels: labelsArr.reverse(),
    datasets: [
      {
        label: props.label,
        fill: false,
        lineTension: 1,
        backgroundColor: props.barColor,
        borderColor: props.borderColor,
        hoverBackgroundColor: props.borderColor,
        hoverBorderColor: props.borderColor,
        hoverBorderWidth: 2,
        data: dataArr.reverse(),
      },
    ],
  };
  return (
    <div className={styles.graphBox}>
      <Bar
        data={data}
        options={{
          responsive: true,
          legend: {
            display: false,
          },

          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  beginAtZero: true,
                  fontColor: props.backgroundColor,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontColor: props.backgroundColor,
                },
                position: "right",
                gridLines: { display: false },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default BarGraph;
