import './App.css';
import { Toaster } from 'react-hot-toast';
import AddTodo from './components/AddTodo';
import MostRecent from './components/MostRecent';

function App() {

    return (
        <div className="App font-poppins w-full md:max-w-screen-xl h-screen p-12">
            <Toaster />
            <h1 className="text-2xl text-center text-primarytext font-semibold mb-8">TodoTS + Redux</h1>
            <AddTodo />
            <hr className="border border-buttonborder my-8" />
            <MostRecent />
        </div>
    );
}

export default App;
