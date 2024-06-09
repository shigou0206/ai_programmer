import React from 'react';

interface ProgressTableProps {
    progressList: {
        id: number;
        date: string;
        activity: string;
        file_url: string;
        start_time: string;
        end_time: string;
        completed: boolean;
    }[];
    onDelete: (id: number) => void;
    onEdit: (progress: any) => void;
    onComplete: (id: number) => void;
}

const ProgressTable: React.FC<ProgressTableProps> = ({ progressList, onDelete, onEdit, onComplete }) => {
    return (
        <table className="progress-table">
            <thead>
                <tr>
                    <th>日期</th>
                    <th>活动</th>
                    <th>文件</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {progressList.map((progress) => (
                    <tr key={progress.id}>
                        <td>{progress.date}</td>
                        <td>{progress.activity}</td>
                        <td>
                            <a href={`/get_file?file_path=${encodeURIComponent(progress.file_url)}`} target="_blank" rel="noopener noreferrer">
                                查看文件
                            </a>
                        </td>
                        <td>{progress.start_time}</td>
                        <td>{progress.end_time}</td>
                        <td>
                            <button onClick={() => onEdit(progress)}>编辑</button>
                            <button onClick={() => onDelete(progress.id)}>删除</button>
                            <button onClick={() => onComplete(progress.id)} disabled={progress.completed}>
                                {progress.completed ? '已完成' : '完成'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProgressTable;
