import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Form from './components/Form';
import ProgressTable from './components/ProgressTable';
import Statistics from './components/Statistics';
import './App.css';

interface Progress {
    id: number;
    date: string;
    activity: string;
    file_url: string;
    start_time: string;
    end_time: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [progressList, setProgressList] = useState<Progress[]>([]);
    const [dailyData, setDailyData] = useState<{ [key: string]: { [key: string]: number } }>({});
    const [monthlyData, setMonthlyData] = useState<number[]>([]);
    const [activityData, setActivityData] = useState<{ [key: string]: number }>({});  // 每天的活动数据

    useEffect(() => {
        fetchProgress();
        fetchStatistics();
    }, []);

    const fetchProgress = async () => {
        try {
            const response = await axios.get('/api/progress');
            setProgressList(response.data);
        } catch (error) {
            console.error("There was an error fetching the progress data!", error);
        }
    };

    const fetchStatistics = async () => {
        try {
            // 获取每天的活动数据
            const dailyResponse = await axios.get('/api/statistics/daily');
            setDailyData(dailyResponse.data);

            // 获取每月的学习时间
            const monthlyResponse = await axios.get('/api/statistics/monthly');
            setMonthlyData(Object.values(monthlyResponse.data));

            // 获取活动类型的总时间
            const activityResponse = await axios.get('/api/statistics/activity');
            setActivityData(activityResponse.data);

        } catch (error) {
            console.error("Error fetching statistics data:", error);
        }
    };

    const handleFormSubmit = async (formData: FormData) => {
        try {
            const response = await axios.post('/api/progress', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setProgressList([...progressList, response.data]);
            fetchStatistics();  // 更新统计数据
        } catch (error) {
            console.error("There was an error submitting the form data!", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/progress/${id}`);
            setProgressList(progressList.filter(progress => progress.id !== id));
            fetchStatistics();  // 更新统计数据
        } catch (error) {
            console.error("There was an error deleting the progress data!", error);
        }
    };

    const handleComplete = async (id: number) => {
        try {
            await axios.patch(`/api/progress/${id}/complete`);
            const updatedProgressList = progressList.map(progress => {
                if (progress.id === id) {
                    return { ...progress, completed: true };
                }
                return progress;
            });
            setProgressList(updatedProgressList);
            fetchStatistics();  // 更新统计数据
        } catch (error) {
            console.error("There was an error completing the progress data!", error);
        }
    };

    const handleEdit = (progress: Progress) => {
        // 编辑逻辑
    };

    return (
        <div className="app">
            <div className="form-container">
                <Header />
                <Form onSubmit={handleFormSubmit} />
            </div>
            <div className="progress-container">
                <ProgressTable progressList={progressList} onDelete={handleDelete} onEdit={handleEdit} onComplete={handleComplete} />
                <Statistics dailyData={dailyData} monthlyData={monthlyData} activityData={activityData} />
            </div>
        </div>
    );
};

export default App;
