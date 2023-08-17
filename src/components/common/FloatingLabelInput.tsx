import React, { useState } from 'react';

interface FloatingLabelInputProps {
    id: string;
    label: string;
    value: string;
    labelStyle?: string; // Estilo personalizado para la etiqueta.
    inputStyle?: string; // Estilo personalizado para el input.
    onChange: (value: string) => void;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ id, label, value, labelStyle, inputStyle, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

    const defaultLabelStyle = `absolute text-primarytext left-3 top-1.5 transition-all duration-300 ease-in-out text-sm pointer-events-none ${
        isFocused || value ? '-ml-2 px-2 transform -translate-y-4 text-sm text-primarytext' : 'text-slate-600'
    }`;

    const defaultInputStyle = 'bg-cards rounded-lg px-3 py-4 w-full text-sm text-primarytext outline-none'; 

    return (
        <div className="flex w-full relative">
            <input type="text" spellCheck="false" onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} id={id} value={value} className={inputStyle ? inputStyle : defaultInputStyle} />
            <label className={labelStyle ? labelStyle : defaultLabelStyle}>{label}</label>
        </div>
    );
};

export default FloatingLabelInput;
