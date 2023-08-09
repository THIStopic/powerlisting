import AddTodo from "../todos/AddTodo";
import AllTasks from "../todos/AllTasks";
import Separator from "../common/Separator";
import PinnedTasks from "../todos/PinnedTasks";

const TodoPage = () => {
    return (
        <div>
            <AddTodo />
            <Separator />
            <PinnedTasks />
            <AllTasks />
        </div>
    );
};

export default TodoPage;
