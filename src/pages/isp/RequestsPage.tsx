import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Attachment from '../../components/Attachment';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getAvailableRequestStatusOptions, prettifyRequestStatus } from '../../helpers';
import { useAppSelector } from '../../hooks/redux-hooks';
import {
    useDeleteRequestMutation,
    useEvaluateRequestMutation,
    useGetAllRequestsQuery,
    useGetRequestsByUserIdQuery,
} from '../../services/isp/request';
import { RequestResponse, RequestStatus } from '../../types/isp/Request';

const RequestsPage = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState<RequestResponse[]>();
    const { role, id: userId } = useAppSelector((state) => state.user);
    const isClerk = role === 'N';
    const isStudent = role === 'S';

    const { data, refetch } = useGetAllRequestsQuery(undefined, {
        skip: isStudent,
    });
    const { data: userRequests } = useGetRequestsByUserIdQuery(userId!, {
        skip: !isStudent || !userId,
    });

    const [evaluateRequest] = useEvaluateRequestMutation();
    const [deleteRequest] = useDeleteRequestMutation();

    const handleDelete = async (requestId: string) => {
        if (window.confirm('Are you sure you want to delete this request?')) {
            await deleteRequest(requestId);
            refetch();
        }
    };

    const handleStatusChange = async (requestId: string, newStatus: RequestStatus) => {
        try {
            await evaluateRequest({ requestId, evaluationStatus: newStatus });
        } catch (error) {
            alert('Failed to update request status');
        }
        refetch();
    };

    useEffect(() => {
        if (userRequests && isStudent) {
            setRequests(userRequests ?? []);
        }
        if (data && isClerk) {
            setRequests(data ?? []);
        }
    }, [data, userRequests]);

    if (!requests) return <LoadingSpinner />;

    return (
        <div className="p-4">
            <Breadcrumbs
                links={[
                    { name: 'Kategórie', path: '/' },
                    { name: 'ISP Žiadosti', path: '/isp/requests' },
                ]}
            />
            <div className="flex justify-between pb-4">
                <h1 className="text-3xl font-bold mb-4">{isStudent ? 'Moje Žiadosti' : 'Žiadosti'}</h1>

                {isStudent && (
                    <div className="flex justify-between mb-4">
                        <Button onClick={() => navigate('/isp/create-request')}>Vytvoriť žiadosť</Button>
                    </div>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border">Meno študenta</th>
                            <th className="py-2 px-4 border">Študijný program</th>
                            <th className="py-2 px-4 border">Titul</th>
                            <th className="py-2 px-4 border">Rok</th>
                            <th className="py-2 px-4 border">Stav</th>
                            <th className="py-2 px-4 border">Účel</th>
                            <th className="py-2 px-4 border">Dôvod</th>
                            <th className="py-2 px-4 border">Príloha</th>
                            <th className="py-2 px-4 border">Akcie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.requestId} className="border">
                                <td className="py-2 px-4 border">
                                    {request.studentName} {request.studentSurname}
                                </td>
                                <td className="py-2 px-4 border">{request.studyProgram}</td>
                                <td className="py-2 px-4 border">{request.studyDegree}</td>
                                <td className="py-2 px-4 border">{request.studyYear}</td>
                                <td className="py-2 px-4 border">
                                    {isClerk ? (
                                        request.requestStatus === 'PENDING' ||
                                        request.requestStatus === 'APPROVED_BY_REFERENT' ? (
                                            <select
                                                className="border border-gray-300 rounded px-2 py-1"
                                                value={request.requestStatus}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        request.requestId,
                                                        e.target.value as RequestStatus,
                                                    )
                                                }
                                            >
                                                {getAvailableRequestStatusOptions(request.requestStatus).map(
                                                    (status) => (
                                                        <option key={status} value={status}>
                                                            {prettifyRequestStatus(status)}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        ) : (
                                            <p className="font-bold">{prettifyRequestStatus(request.requestStatus)}</p>
                                        )
                                    ) : (
                                        <p className="font-bold">{prettifyRequestStatus(request.requestStatus)}</p>
                                    )}
                                </td>
                                <td className="py-2 px-4 border">{request.purpose}</td>
                                <td className="py-2 px-4 border">{request.reason}</td>
                                <td className="py-2 px-4 border">
                                    <Attachment attachmentPath={request.attachmentPath} />
                                </td>

                                {isStudent ? (
                                    <td className="py-2 px-4 border space-x-2 min-w-96 flex justify-center">
                                        {request.requestStatus !== 'APPROVED' && (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => navigate(`/isp/edit-request/${request.requestId}`)}
                                                    startIcon={<PencilIcon className="h-4 w-4 mr-1" />}
                                                >
                                                    Upraviť
                                                </Button>
                                                <Button
                                                    onClick={() => handleDelete(request.requestId)}
                                                    startIcon={<TrashIcon className="h-4 w-4 mr-1" />}
                                                >
                                                    Odstrániť
                                                </Button>
                                            </>
                                        )}
                                        <Button
                                            onClick={() => navigate(`/isp/subjects-table/${request.tableId}`)}
                                            disabled={request.requestStatus !== 'APPROVED'}
                                            title={
                                                request.requestStatus !== 'APPROVED'
                                                    ? "Žiadosť nemá stav 'schválená'."
                                                    : ''
                                            }
                                        >
                                            Zobraziť predmety
                                        </Button>
                                    </td>
                                ) : (
                                    <td className="py-2 px-4 border space-x-2 text-center">
                                        <Button
                                            onClick={() => navigate(`/isp/subjects-table/${request.tableId}`)}
                                            disabled={request.requestStatus !== 'APPROVED'}
                                            title={
                                                request.requestStatus !== 'APPROVED'
                                                    ? "Žiadosť nemá stav 'schválená'."
                                                    : ''
                                            }
                                        >
                                            Zobraziť predmety
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestsPage;
