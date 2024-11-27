import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/providers/layout';
import { CategoriesPage } from './pages/categories';
import { CreateRequestPage } from './pages/isp/createRequest';
import { EditRequestPage } from './pages/isp/editRequest';
import { RequestsPage } from './pages/isp/requests';
import { SubjectsTablePage } from './pages/isp/subjectsTable';
import { RequestDetailPage } from '@/pages/isp/requestDetail';

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
                path: 'isp/requests',
                Component: RequestsPage,
            },
            {
                path: 'isp/requests/:requestId',
                Component: RequestDetailPage,
            },
            {
                path: 'isp/create-request',
                Component: CreateRequestPage,
            },
            {
                path: 'isp/edit-request/:requestId',
                Component: EditRequestPage,
            },
            {
                path: 'isp/subjects-table/:tableId',
                Component: SubjectsTablePage,
            },
        ],
    },
]);
