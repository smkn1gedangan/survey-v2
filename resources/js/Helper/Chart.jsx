// LineChart.jsx
import React from "react";
import {
    Chart,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

// Registrasi komponen Chart.js
Chart.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export const LineChart = ({ datas, labels }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Rekap Survey Per Tahun",
                data: datas,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};
export const DoughnutChart = ({ datas, labels }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Rekap Survey Jurusan Per Tahun",
                data: datas,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                    "green",
                    "red",
                    "pink",
                    "yellow",
                    "gray",
                ],
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Doughnut data={data} options={options} />;
};
