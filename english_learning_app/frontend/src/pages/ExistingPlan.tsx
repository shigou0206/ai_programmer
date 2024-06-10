import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Form from '../components/Form';
import ProgressTable from '../components/ProgressTable';
import Statistics from '../components/Statistics';
import './ExistingPlan.css'; // 引入单独的样式文件

interface Progress {
    id: number;
    date: string;
    activity: string;
    file_url: string;
    start_time: string;
    end_time: string;
    completed: boolean;
}

const ExistingPlan: React.FC = () => {
    const [progressList, setProgressList] = useState<Progress[]>([]);
    const [dailyData, setDailyData] = useState<{ [key: string]: { [key: string]: number } }>({});
    const [monthlyData, setMonthlyData] = useState<number[]>([]);
    const [activityData, setActivityData] = useState<{ [key: string]: number }>({});

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
            const dailyResponse = await axios.get('/api/statistics/daily');
            setDailyData(dailyResponse.data);

            const monthlyResponse = await axios.get('/api/statistics/monthly');
            setMonthlyData(Object.values(monthlyResponse.data));

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
            fetchStatistics();
        } catch (error) {
            console.error("There was an error submitting the form data!", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/progress/${id}`);
            setProgressList(progressList.filter(progress => progress.id !== id));
            fetchStatistics();
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
            fetchStatistics();
        } catch (error) {
            console.error("There was an error completing the progress data!", error);
        }
    };

    const handleEdit = (progress: Progress) => {
        // 编辑逻辑
    };

    return (
        <div className="existing-plan">
            <Header />
            <div className="main-container">
                <div className="form-container">
                    <Form onSubmit={handleFormSubmit} />
                </div>
                <div className="content-container">
                    <ProgressTable
                        progressList={progressList}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onComplete={handleComplete}
                    />
                    <Statistics
                        dailyData={dailyData}
                        monthlyData={monthlyData}
                        activityData={activityData}
                    />
                </div>
            </div>
        </div>
    );
};

export default ExistingPlan;
