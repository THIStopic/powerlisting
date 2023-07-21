import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import store from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <div className="flex flex-col justify-center items-center bg-background text-primarytext">
            <App />
        </div>
    </Provider>
);
