import { createRoot } from 'react-dom/client';
import App from './app';
import "./style.css";

// Copy code here:

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />)