import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface PieChartProps {
    data: { status: string; count: number }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const pieChartData = {
        labels: data.map((item) => item.status),
        datasets: [
            {
                label: 'Manutenção Status',
                data: data.map((item) => item.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    const pieChartOptions = {
        plugins: {
            datalabels: {
                color: '#000',
                font: {
                    size: 36,
                    weight: 'bold',
                },
                formatter: (value: number) => value,
            },
        },
    };

    return <Pie data={pieChartData} options={pieChartOptions} />;
};

export default PieChart;
