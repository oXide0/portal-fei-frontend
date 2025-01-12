import { CreateExamPage } from '@/pages/skex/createExam';
import { DashboardPage } from '@/pages/skex/dashboard';
import { RouteObject } from 'react-router-dom';

export const skexRoutes: RouteObject[] = [
    {
        path: 'skex/dashboard',
        element: <DashboardPage />,
    },
    {
        path: 'skex/create-exam',
        element: <CreateExamPage />,
    },
];
