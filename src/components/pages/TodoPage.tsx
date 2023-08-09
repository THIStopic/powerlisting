import AddTodo from "../todos/AddTodo";
import AllTasks from "../todos/AllTasks";
import Filter from "../todos/Filter";
import Separator from "../common/Separator";

const TodoPage = () => {
    return (
        <div>
            <AddTodo />
            <Separator />
            <AllTasks />
            <Filter />
        </div>
    );
};

export default TodoPage;
