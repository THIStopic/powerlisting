import AddTodo from "../todos/AddTodo";
import AllTasks from "../todos/AllTasks";
import Separator from "../common/Separator";

const TodoPage = () => {
    return (
        <div>
            <AddTodo />
            <Separator />
            <AllTasks />
        </div>
    );
};

export default TodoPage;
