import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const Graph = ({ item }) => {
  const line1Data = [];
  const line1Label = item[0].rank[0].category;
  const line2Data = [];
  const line2Label = item[0].rank[1].category;
  const line3Data = [];
  const line3Label = item[0].rank[2].category;
  const dates = [];

  item.map((element) => {
    line1Data.push(element.rank[0].rank);
    line2Data.push(element.rank[1].rank);
    line3Data.push(element.rank[2].rank);
    dates.push(moment(element.timestamp).format("MM/DD/YY"));
  });

  const data = {
    labels: dates,
    datasets: [
      {
        label: line1Label,
        data: line1Data,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: line2Label,
        data: line2Data,
        backgroundColor: "rgb(48, 99, 132)",
        borderColor: "rgba(48, 99, 132, 0.2)",
      },
      {
        label: line3Label ? line3Label : "Not Available",
        data: line3Data,
        backgroundColor: "rgb(48, 155, 99)",
        borderColor: "rgba(48, 155, 99, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
};

export default Graph;
