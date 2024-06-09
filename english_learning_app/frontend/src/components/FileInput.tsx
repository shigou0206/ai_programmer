import React from 'react';

interface FileInputProps {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, onChange }) => {
    return (
        <div className="file-input">
            <label>{label}</label>
            <input type="file" onChange={onChange} />
        </div>
    );
};

export default FileInput;
