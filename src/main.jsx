import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './components/App/App';
import { BrowserRouter } from 'react-router';
import 'modern-normalize';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        <Toaster />
    </StrictMode>
);
