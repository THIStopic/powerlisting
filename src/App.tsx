import './App.css';
import AddTodo from './components/AddTodo';
import AllTasks from './components/AllTasks';
import Separator from './components/Separator';

function App() {

    return (
        <div className="App font-poppins w-full md:max-w-screen-xl h-full md:h-screen p-12">
            <h1 className="text-2xl text-center text-primarytext font-semibold mb-8">PowerListing</h1>
            <AddTodo />
            <Separator />
            <AllTasks />
        </div>
    );
}

export default App;
