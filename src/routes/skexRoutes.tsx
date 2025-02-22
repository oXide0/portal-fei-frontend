import { ProtectedRoute } from '@/components/providers/protectedRoute';
import { ExamDetailPage } from '@/pages/skex/examDetail';
import { ExamsPage } from '@/pages/skex/exams';
import { StudentExamsPage } from '@/pages/skex/studentExams';
import { RouteObject } from 'react-router-dom';

export const skexRoutes: RouteObject[] = [
    {
        path: 'skex/exams',
        element: (
            <ProtectedRoute allowedRoles={['P', 'D', 'N']} redirectPath="/forbidden">
                <ExamsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: 'skex/exam/:id',
        element: (
            <ProtectedRoute allowedRoles={['P', 'D', 'N']} redirectPath="/forbidden">
                <ExamDetailPage />
            </ProtectedRoute>
        ),
    },
    {
        path: 'skex/student-exams',
        element: (
            <ProtectedRoute allowedRoles={['S']} redirectPath="/forbidden">
                <StudentExamsPage />
            </ProtectedRoute>
        ),
    },
];
