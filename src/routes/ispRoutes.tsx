import { ProtectedRoute } from '@/components/providers/protectedRoute';
import { CreateRequestPage } from '@/pages/isp/createRequest';
import { EditRequestPage } from '@/pages/isp/editRequest';
import { RequestDetailPage } from '@/pages/isp/requestDetail';
import { RequestsPage } from '@/pages/isp/requests';
import { SubjectsTablePage } from '@/pages/isp/subjectsTable';
import { RouteObject } from 'react-router-dom';

export const ispRoutes: RouteObject[] = [
    {
        path: 'isp/requests',
        element: <RequestsPage />,
    },
    {
        path: 'isp/requests/:requestId',
        element: <RequestDetailPage />,
    },
    {
        path: 'isp/create-request',
        element: (
            <ProtectedRoute allowedRoles={['S']} redirectPath="/forbidden">
                <CreateRequestPage />
            </ProtectedRoute>
        ),
    },
    {
        path: 'isp/edit-request/:requestId',
        element: (
            <ProtectedRoute allowedRoles={['S']} redirectPath="/forbidden">
                <EditRequestPage />
            </ProtectedRoute>
        ),
    },
    {
        path: 'isp/subjects-table/:tableId',
        element: <SubjectsTablePage />,
    },
];
