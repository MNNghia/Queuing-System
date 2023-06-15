import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement);

const DoughnutChart = () => {
    const data = {
        labels: ["Red"],
        datasets: [
            {
                data: [200, 50],
                backgroundColor: ["#FF6384", "#EAEAEC"],
            
            },
        ],
    };

    const options: any = {
        cutoutPercentage: 10, // Đặt phần trống giữa biểu đồ (được tính theo phần trăm)
    };

    return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
