import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../store/features/todos';
import toast from 'react-hot-toast';

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
        toast.success('Tarea añadida correctamente.');
    };

    const taskLabelStyle = `absolute text-primarytext left-3 top-1.5 transition-all duration-300 ease-in-out text-sm pointer-events-none ${
        isTaskFocused || taskValue ? '-ml-2 px-2 transform -translate-y-4 text-sm text-primarytext' : 'text-slate-600'
    }`;

    const descriptionLabelStyle = `absolute text-primarytext left-3 top-1.5 transition-all duration-300 ease-in-out text-sm pointer-events-none ${
        isDescriptionFocused || descriptionValue ? '-ml-2 px-2 transform -translate-y-4 text-sm' : 'text-slate-600'
    }`;

    return (
        <>
            <h1 className="mb-4">Añadir una tarea nueva</h1>
            <div className="container flex flex-col gap-4">
                <div className="flex relative">
                    <input
                        type="text"
                        spellCheck="false"
                        onFocus={handleTaskFocus}
                        onBlur={handleTaskBlur}
                        onChange={handleTaskChange}
                        id="form-input-first-name"
                        className="bg-cards rounded px-3 py-3 w-full text-sm text-slate-500 outline-none"
                    />
                    <label className={taskLabelStyle}>Tarea</label>
                </div>
                <div className="flex relative">
                    <textarea
                        spellCheck="false"
                        onFocus={handleDescriptionFocus}
                        onBlur={handleDescriptionBlur}
                        onChange={handleDescriptionChange}
                        id="form-input-description"
                        className="bg-cards rounded px-3 py-3 w-full text-sm text-slate-500 outline-none"
                    />
                    <label className={descriptionLabelStyle}>Descripción</label>
                </div>
                <button onClick={handleAddTodo} className="w-36 text-sm border border-buttonborder text-blue-100 font-semibold rounded px-4 py-1 transition-all duration-300 ease-in-out">
                    Añadir tarea
                </button>
            </div>
        </>
    );
};

export default AddTodo;
