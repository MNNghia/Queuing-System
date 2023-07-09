import React from "react";
import { Chart as ChartJS, ArcElement} from "chart.js";
import { Doughnut} from "react-chartjs-2";

type DoughnutChartProps = {
    a: number,
    b: number,
    c?: number
}

ChartJS.register(ArcElement);

const DoughnutChart = ({a, b, c}: DoughnutChartProps) => {
    const data = {
        labels: ["Red"],
        datasets: [
            {
                data: [a, b],
                backgroundColor: ["#FF6384", "#EAEAEC", 'aqua'],
            
            },
        ],
    };

    const options: any = {
        cutoutPercentage: 10, // Đặt phần trống giữa biểu đồ (được tính theo phần trăm)
    };

    return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
