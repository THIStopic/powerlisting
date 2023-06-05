import { useState } from 'react';

const AddTodo = () => {
    const [isTaskFocused, setIsTaskFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
    const [taskValue, setTaskValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');

    const handleTaskFocus = () => setIsTaskFocused(true);
    const handleTaskBlur = () => setIsTaskFocused(false);
    const handleTaskChange = (e: any) => setTaskValue(e.target.value);

    const handleDescriptionFocus = () => setIsDescriptionFocused(true);
    const handleDescriptionBlur = () => setIsDescriptionFocused(false);
    const handleDescriptionChange = (e: any) => setDescriptionValue(e.target.value);

    const taskLabelStyle = `absolute left-3 top-1.5 transition-all duration-300 ease-in-out text-xs text-blue-300 pointer-events-none ${
        isTaskFocused || taskValue ? 'bg-white -ml-2 px-2 transform -translate-y-3.5 text-sm text-blue-600' : ''
    }`;

    const descriptionLabelStyle = `absolute left-3 top-1.5 transition-all duration-300 ease-in-out text-xs text-blue-300 pointer-events-none ${
        isDescriptionFocused || descriptionValue ? 'bg-white -ml-2 px-2 transform -translate-y-3.5 text-sm text-blue-600' : ''
    }`;

    return (
        <>
            <h1 className="text-slate-800 mb-4">Añadir una tarea nueva</h1>
            <div className="flex flex-col justify-center gap-4 bg-white rounded-md shadow-lg p-6 my-4">
                <div className="relative">
                    <input
                        type="text"
                        spellCheck="false"
                        onFocus={handleTaskFocus}
                        onBlur={handleTaskBlur}
                        onChange={handleTaskChange}
                        className="border border-blue-200 rounded-sm px-3 py-1.5 w-full text-xs text-slate-500 outline-none"
                    />
                    <label className={taskLabelStyle}>{isTaskFocused ? 'Tarea' : 'Tarea...'}</label>
                </div>
                <div className="relative">
                    <textarea
                        spellCheck="false"
                        onFocus={handleDescriptionFocus}
                        onBlur={handleDescriptionBlur}
                        onChange={handleDescriptionChange}
                        className="border border-blue-200 rounded-sm px-3 py-1.5 w-full text-xs text-slate-500 outline-none"
                    />
                    <label className={descriptionLabelStyle}>{isDescriptionFocused ? 'Descripción' : 'Descripción...'}</label>
                </div>
            </div>
        </>
    );
};

export default AddTodo;
