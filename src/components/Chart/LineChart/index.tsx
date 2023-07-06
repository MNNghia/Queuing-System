import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);
function LineChart() {
    const data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
            {
                data: [
                    2600, 4100, 4500, 3200, 3500, 3433, 3700, 4100, 3800, 3900,
                    4500, 3700,
                ],
                backgroundColor: function (context: any) {
                    const gradient = context.chart.ctx.createLinearGradient(
                        0,
                        0,
                        0,
                        550
                    );
                    gradient.addColorStop(0, "#5185F7"); // Màu sắc đầu của gradient
                    gradient.addColorStop(1, "#fff"); // Màu sắc cuối của gradient
                    return gradient;
                },
                borderColor: "#5185F7",
                pointBorderColor: "#fff",
                pointBorderWidth: 4,
                tension: 0.4,
                fill: true,
            },
        ],
    };
    const options = {
        plugins: {
            legend: false,
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                min: 0,
                max: 6000,
                ticks: {
                    stepSize: 1000,
                    callback: (value: any) => value,
                },
            },
        },
        layout: {
            padding: {
                bottom: 20,
                left: 20,
                right: 20,
            },
            margin: {
                
            }
        },
    };
    return (
        <div className="" style={{ width: "92%", height: "100%", margin: 'auto' }}>
            <Line data={data} options={options as any}></Line>
        </div>
    );
}

export default LineChart;
