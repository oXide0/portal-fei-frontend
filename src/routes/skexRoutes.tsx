import { ExamsPage } from '@/pages/skex/exams';
import { ExamDetailPage } from '@/pages/skex/examDetail';
import { RouteObject } from 'react-router-dom';

export const skexRoutes: RouteObject[] = [
    {
        path: 'skex/exams',
        element: <ExamsPage />,
    },
    {
        path: 'skex/exam/:id',
        element: <ExamDetailPage />,
    },
];
