import React, { useState } from 'react';

interface EbbinghausReviewTableProps {
    materials: string[];
}

const reviewDays = [1, 2, 5, 10, 20];

const EbbinghausReviewTable: React.FC<EbbinghausReviewTableProps> = ({ materials }) => {
    const [completed, setCompleted] = useState<{ [key: string]: boolean }>({});

    const handleCheckboxChange = (material: string, day: number) => {
        setCompleted({
            ...completed,
            [`${material}-${day}`]: !completed[`${material}-${day}`]
        });
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>学习材料</th>
                    {reviewDays.map(day => (
                        <th key={day}>{day}天后</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {materials.map(material => (
                    <tr key={material}>
                        <td>{material}</td>
                        {reviewDays.map(day => (
                            <td key={day}>
                                <input
                                    type="checkbox"
                                    checked={completed[`${material}-${day}`] || false}
                                    onChange={() => handleCheckboxChange(material, day)}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EbbinghausReviewTable;
