import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// Importación de router
import { router } from './router/route';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
