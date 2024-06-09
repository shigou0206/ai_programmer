import React, { useState } from 'react';

interface FormProps {
    onSubmit: (formData: FormData) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const [date, setDate] = useState('');
    const [activity, setActivity] = useState('');
    const [filePath, setFilePath] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('date', date);
        formData.append('activity', activity);
        formData.append('file_path', filePath);
        formData.append('start_time', startTime);
        formData.append('end_time', endTime);
        onSubmit(formData);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label>
                日期:
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </label>
            <label>
                学习卡片:
                <select value={activity} onChange={e => setActivity(e.target.value)} required>
                    <option value="">选择活动</option>
                    <option value="news_listening">新闻听力</option>
                    <option value="podcast_audio">播客/有声书</option>
                    <option value="dictation">听写练习</option>
                    <option value="summary">复述总结</option>
                    <option value="imitation">跟读模仿</option>
                    <option value="self_expression">自我表达</option>
                    <option value="conversation">对话练习</option>
                </select>
            </label>
            <label>
                选择学习材料路径:
                <input type="text" value={filePath} onChange={e => setFilePath(e.target.value)} required />
            </label>
            <label>
                开始时间:
                <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required />
            </label>
            <label>
                结束时间:
                <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required />
            </label>
            <button type="submit">确定</button>
        </form>
    );
};

export default Form;
