import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// 注册所有需要的组件
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface StatisticsProps {
    dailyData: { [key: string]: { [key: string]: number } };
    monthlyData: number[];
    activityData: { [key: string]: number };  // 每天的活动数据
}

const Statistics: React.FC<StatisticsProps> = ({ dailyData, monthlyData, activityData }) => {
    const activityLabels = Object.keys(activityData);
    const activityValues = Object.values(activityData);

    const dailyLabels = Object.keys(dailyData);
    const dailyValues = dailyLabels.map(date => Object.values(dailyData[date]).reduce((a, b) => a + b, 0));

    const colors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
    ];

    return (
        <div className="statistics">
            <h2>每日学习时长</h2>
            <div className="chart-container">
                <Bar
                    data={{
                        labels: dailyLabels,  // 使用具体日期
                        datasets: [
                            {
                                label: '每日学习时长 (小时)',
                                data: dailyValues,
                                backgroundColor: colors,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: '每日学习时长',
                            },
                        },
                    }}
                />
            </div>
            <h2>每日活动分布</h2>
            <div className="chart-container" style={{ width: '50%', margin: '0 auto' }}>
                <Pie
                    data={{
                        labels: activityLabels,
                        datasets: [
                            {
                                label: '每日活动分布 (小时)',
                                data: activityValues,
                                backgroundColor: colors,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: '每日活动分布',
                            },
                        },
                    }}
                />
            </div>
            <h2>每月学习时长</h2>
            <div className="chart-container">
                <Bar
                    data={{
                        labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],  // 使用具体月份
                        datasets: [
                            {
                                label: '每月学习时长 (小时)',
                                data: monthlyData,
                                backgroundColor: colors,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: '每月学习时长',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Statistics;
