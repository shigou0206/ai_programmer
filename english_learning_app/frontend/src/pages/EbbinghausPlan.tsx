import React, { useState } from 'react';
import EbbinghausForm from '../components/EbbinghausForm';
import EbbinghausReviewTable from '../components/EbbinghausReviewTable';
import './ExistingPlan.css';


const EbbinghausPlan: React.FC = () => {
    const [materials, setMaterials] = useState<string[]>([]);

    const handleMaterialsSubmit = (newMaterials: string[]) => {
        setMaterials(newMaterials);
    };

    return (
        <div>
            <h2>艾宾浩斯遗忘曲线学习计划</h2>
            <EbbinghausForm onSubmit={handleMaterialsSubmit} />
            <EbbinghausReviewTable materials={materials} />
        </div>
    );
};

export default EbbinghausPlan;
