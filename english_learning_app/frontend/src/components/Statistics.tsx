import React, { useEffect, useRef } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement
} from 'chart.js';
import './Statistics.css';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement
);

interface StatisticsProps {
    dailyData: { [key: string]: { [key: string]: number } };
    monthlyData: number[];
    activityData: { [key: string]: number };
}

const Statistics: React.FC<StatisticsProps> = ({ dailyData, monthlyData, activityData }) => {
    const dailyChartRef = useRef<Chart<'bar', number[], string> | null>(null);
    const monthlyChartRef = useRef<Chart<'bar', number[], string> | null>(null);
    const activityChartRef = useRef<Chart<'pie', number[], string> | null>(null);

    useEffect(() => {
        const dailyCtx = document.getElementById('dailyChart') as HTMLCanvasElement;
        const monthlyCtx = document.getElementById('monthlyChart') as HTMLCanvasElement;
        const activityCtx = document.getElementById('activityChart') as HTMLCanvasElement;

        if (dailyChartRef.current) {
            dailyChartRef.current.destroy();
        }

        if (monthlyChartRef.current) {
            monthlyChartRef.current.destroy();
        }

        if (activityChartRef.current) {
            activityChartRef.current.destroy();
        }

        dailyChartRef.current = new Chart(dailyCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(dailyData),
                datasets: Object.keys(dailyData).map((key) => ({
                    label: key,
                    data: Object.values(dailyData[key]),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }))
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category',
                        labels: Object.keys(dailyData)
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        monthlyChartRef.current = new Chart(monthlyCtx, {
            type: 'bar',
            data: {
                labels: Array.from({ length: 12 }, (_, i) => `${i + 1}月`),
                datasets: [{
                    label: 'Monthly Study Time',
                    data: monthlyData,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category',
                        labels: Array.from({ length: 12 }, (_, i) => `${i + 1}月`)
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        activityChartRef.current = new Chart(activityCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(activityData),
                datasets: [{
                    label: 'Activity Distribution',
                    data: Object.values(activityData),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });

        return () => {
            if (dailyChartRef.current) {
                dailyChartRef.current.destroy();
            }
            if (monthlyChartRef.current) {
                monthlyChartRef.current.destroy();
            }
            if (activityChartRef.current) {
                activityChartRef.current.destroy();
            }
        };
    }, [dailyData, monthlyData, activityData]);

    return (
        <div className="statistics-container">
            <div className="chart-container">
                <canvas id="dailyChart"></canvas>
            </div>
            <div className="chart-container">
                <canvas id="monthlyChart"></canvas>
            </div>
            <div className="chart-container">
                <canvas id="activityChart"></canvas>
            </div>
        </div>
    );
};

export default Statistics;
