import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import CategoryPage from './pages/CategoryPage';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                index: true,
                Component: CategoryPage,
            },
        ],
    },
]);
