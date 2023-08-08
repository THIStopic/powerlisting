// Librerías externas
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Tooltip } from 'react-tooltip';

// Acciones y slices de Redux
import { addTodo, filterTodos } from '../../store/features/todosSlice';

// Componentes
import FloatingLabelInput from '../common/FloatingLabelInput';

const AddTodo = () => {
    // Hooks y estados
    const [taskValue, setTaskValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const todos = useSelector((state: any) => state.todos.todos);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (taskValue && descriptionValue) {
            dispatch(
                addTodo({
                    id: todos.length + 1,
                    title: taskValue,
                    description: descriptionValue,
                    date: selectedDate.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: 'numeric' }),
                    completed: false,
                })
            );
            dispatch(filterTodos([]));
            setTaskValue('');
            setDescriptionValue('');
        }
    };

    return (
        <>
            <h1 className="mb-4 font-medium">Añadir una tarea nueva</h1>
            <div className="container flex flex-col md:flex-row justify-between md:justify-between gap-8 md:gap-4 mb-4 md:mb-0">
                <div className="left_side flex flex-col justify-between shadow-xl w-full md:w-2/3 gap-8 md:gap-4 mb-4">
                    <div className="flex gap-4 items-center w-full">
                        <FloatingLabelInput id="form-input-task" label="Tarea" value={taskValue} onChange={setTaskValue} />
                        <DatePicker
                            portalId="root"
                            selected={selectedDate}
                            onChange={(date: Date) => setSelectedDate(date)}
                            shouldCloseOnSelect={false}
                            preventOpenOnFocus={true}
                            shouldCloseOnEsc={true}
                            shouldCloseOnOutsideClick={true}
                            dateFormat="dd/MM/yyyy"
                            className="flex justify-center items-center w-full md:w-96 bg-cards rounded-lg shadow-xl px-3 py-4 text-sm text-slate-500 outline-none"
                        />
                    </div>
                    <div className="flex relative">
                        <FloatingLabelInput
                            id="form-input-description"
                            label="Descripción"
                            value={descriptionValue}
                            onChange={setDescriptionValue}
                            inputStyle="bg-cards rounded-lg px-3 py-5 w-full text-sm text-primarytext resize-none outline-none"
                        />
                        <Tooltip className="sampletooltip2" id="ejemplo" />
                        <button onClick={handleAddTodo} className="absolute bottom-0 right-1">
                            <span
                                key="ejemplo"
                                data-tooltip-id="ejemplo"
                                data-tooltip-content="Enviar"
                                data-tooltip-place="bottom-end"
                                className="material-icons-round text-background hover:text-slate-600 transition-all duration-200 ease-in-out px-1"
                            >
                                send
                            </span>
                        </button>
                    </div>
                </div>
                <div className="right_side w-full md:w-1/3">
                    <div className="flex flex-col gap-4 w-full bg-cards shadow-xl rounded-lg py-4 px-6">
                        <div className="flex flex-col items-start truncate">
                            <span className="text-base font-medium w-full truncate">{taskValue == '' ? 'Titulo de la tarea.' : taskValue}</span>
                            <span className="text-xs w-full truncate">{descriptionValue == '' ? 'Descripción de la tarea.' : descriptionValue}</span>
                            <span className="text-xs w-full truncate">
                                {taskValue === '' && descriptionValue === '' && selectedDate === new Date()
                                    ? new Date(0).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })
                                    : selectedDate.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: 'numeric' })}
                            </span>
                        </div>
                        <div className="left_side flex justify-between">
                            <span className="text-xs text-blue-100 bg-background font-semibold py-1 px-2 rounded cursor-pointer truncate">Pendiente</span>
                            <span className="text-xs self-end text-blue-100 font-semibold">Preview</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTodo;
