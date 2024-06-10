import React, { useState } from 'react';

interface EbbinghausFormProps {
    onSubmit: (materials: string[]) => void;
}

const EbbinghausForm: React.FC<EbbinghausFormProps> = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const materials = inputValue.split('\n').filter(line => line.trim() !== '');
        onSubmit(materials);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                输入学习材料（用换行符分割）:
                <textarea
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    rows={10}
                    cols={50}
                />
            </label>
            <button type="submit">保存</button>
        </form>
    );
};

export default EbbinghausForm;
