import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../store/features/todos';

const AddTodo = () => {
    const [isTaskFocused, setIsTaskFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
    const [taskValue, setTaskValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const todos = useSelector((state: any) => state.todos.todos);

    const handleTaskFocus = () => setIsTaskFocused(true);
    const handleTaskBlur = () => setIsTaskFocused(false);
    const handleTaskChange = (e: any) => setTaskValue(e.target.value);

    const handleDescriptionFocus = () => setIsDescriptionFocused(true);
    const handleDescriptionBlur = () => setIsDescriptionFocused(false);
    const handleDescriptionChange = (e: any) => setDescriptionValue(e.target.value);

    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (taskValue && descriptionValue) {
            dispatch(
                addTodo({
                    id: todos.length + 1,
                    title: taskValue,
                    description: descriptionValue,
                    date: new Date().toLocaleDateString(),
                    completed: false,
                })
            );
            setTaskValue('');
            setDescriptionValue('');
            const firstName = document.getElementById('form-input-first-name') as HTMLInputElement;
            const description = document.getElementById('form-input-description') as HTMLInputElement;
            firstName.value = '';
            description.value = '';
        }
    };

    const taskLabelStyle = `absolute left-3 top-1 transition-all duration-300 ease-in-out text-sm pointer-events-none ${
        isTaskFocused || taskValue ? 'bg-white -ml-2 px-2 transform -translate-y-4 text-sm text-slate-600' : 'text-slate-300'
    }`;

    const descriptionLabelStyle = `absolute left-3 top-1 transition-all duration-300 ease-in-out text-sm pointer-events-none ${
        isDescriptionFocused || descriptionValue ? 'bg-white -ml-2 px-2 transform -translate-y-4 text-sm text-slate-600' : 'text-slate-300'
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
                        id="form-input-first-name"
                        className="border border-slate-200 rounded-sm px-3 py-1.5 w-full text-sm text-slate-500 outline-none"
                    />
                    <label className={taskLabelStyle}>{isTaskFocused ? 'Tarea' : 'Tarea...'}</label>
                </div>
                <div className="relative">
                    <textarea
                        spellCheck="false"
                        onFocus={handleDescriptionFocus}
                        onBlur={handleDescriptionBlur}
                        onChange={handleDescriptionChange}
                        id="form-input-description"
                        className="border border-slate-200 rounded-sm px-3 py-1.5 w-full text-sm text-slate-500 outline-none"
                    />
                    <label className={descriptionLabelStyle}>{isDescriptionFocused ? 'Descripción' : 'Descripción...'}</label>
                </div>
                <button onClick={handleAddTodo} className="w-36 text-sm bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-sm px-4 py-1 transition-all duration-300 ease-in-out">
                    Añadir tarea
                </button>
            </div>
        </>
    );
};

export default AddTodo;
