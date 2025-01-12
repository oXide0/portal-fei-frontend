import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/providers/layout';
import { CategoriesPage } from '../pages/categories';
import { ForbiddenPage } from '../pages/forbiddenPage';
import { ispRoutes } from './ispRoutes';
import { skexRoutes } from './skexRoutes';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                index: true,
                Component: CategoriesPage,
            },
            {
                path: 'forbidden',
                Component: ForbiddenPage,
            },
            ...ispRoutes,
            ...skexRoutes,
        ],
    },
]);
