import React from "react";
import { Doughnut } from "react-chartjs-2";


const DoughnutChart = () => {
    const data = {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    const config = {
  type: 'doughnut',
  data: data,
};
      
    return (<Doughnut data={data} />);
};

export default DoughnutChart;
