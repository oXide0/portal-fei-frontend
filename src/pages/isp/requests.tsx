import { Attachment } from '@/components/attachment';
import { DeleteRequestModal } from '@/components/deleteRequestModal';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowRight, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const [requestToDelete, setRequestIdToDelete] = useState<{ id: string | null; open: boolean }>({
        id: null,
        open: false,
    });
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
        await deleteRequest(requestId);
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
        if (data && !isStudent) {
            setRequests(data ?? []);
        }
    }, [data, userRequests]);

    if (requests == null) return <div className="loader"></div>;
    return (
        <div>
            <Breadcrumb style={{ paddingBottom: '20px' }}>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Kategórie</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>ISP Žiadosti</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <DeleteRequestModal
                open={requestToDelete.open}
                setOpen={(value) => setRequestIdToDelete({ ...requestToDelete, open: value })}
                onSubmit={() => {
                    if (requestToDelete.id) {
                        handleDelete(requestToDelete.id);
                    }
                }}
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
                <Table>
                    <TableCaption>Zoznam vašich žiadostí.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="py-2 px-4 border text-center">Detail</TableHead>
                            <TableHead className="py-2 px-4 border text-center">Meno študenta</TableHead>
                            <TableHead className="py-2 px-4 border text-center">Stav</TableHead>
                            <TableHead className="py-2 px-4 border text-center">Príloha</TableHead>
                            <TableHead className="py-2 px-4 border text-center">Akcie</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.map((request) => (
                            <TableRow key={request.requestId} className="border">
                                <TableCell className="py-2 px-4 border text-center">
                                    <Link
                                        to={`${request.requestId}`}
                                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1"
                                    >
                                        <span>Pozrieť detail</span>
                                        <ArrowRight size="20px" />
                                    </Link>
                                </TableCell>

                                <TableCell className="py-2 px-4 border text-center">
                                    {request.studentName} {request.studentSurname}
                                </TableCell>
                                <TableCell className="py-2 px-4 border text-center">
                                    {isClerk ? (
                                        request.requestStatus === 'PENDING' ||
                                        request.requestStatus === 'APPROVED_BY_REFERENT' ? (
                                            <Select
                                                defaultValue={request.requestStatus}
                                                onValueChange={(value) =>
                                                    handleStatusChange(request.requestId, value as RequestStatus)
                                                }
                                            >
                                                <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded">
                                                    <SelectValue placeholder="-- Vyberte stav --" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {getAvailableRequestStatusOptions(request.requestStatus).map(
                                                        (status) => (
                                                            <SelectItem key={status} value={status}>
                                                                {prettifyRequestStatus(status)}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <p className="font-bold">{prettifyRequestStatus(request.requestStatus)}</p>
                                        )
                                    ) : (
                                        <p className="font-bold">{prettifyRequestStatus(request.requestStatus)}</p>
                                    )}
                                </TableCell>

                                <TableCell className="py-2 px-4 border">
                                    <div className="flex justify-center">
                                        <Attachment url={request.attachmentUrl ? request.attachmentUrl : null} />
                                    </div>
                                </TableCell>

                                <TableCell
                                    className={`py-2 px-4 border space-x-2 ${isStudent ? 'min-w-96 flex justify-center' : 'text-center'}`}
                                >
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span>
                                                    <Button
                                                        variant="outline"
                                                        disabled={
                                                            request.requestStatus !== 'APPROVED_BY_REFERENT' &&
                                                            request.requestStatus !== 'APPROVED'
                                                        }
                                                        onClick={() =>
                                                            navigate(`/isp/subjects-table/${request.tableId}`)
                                                        }
                                                    >
                                                        Zobraziť predmety
                                                    </Button>
                                                </span>
                                            </TooltipTrigger>
                                            {request.requestStatus !== 'APPROVED_BY_REFERENT' &&
                                                request.requestStatus !== 'APPROVED' && (
                                                    <TooltipContent>
                                                        <p>Žiadosť nemá stav 'schválená'.</p>
                                                    </TooltipContent>
                                                )}
                                        </Tooltip>
                                    </TooltipProvider>

                                    {isStudent && request.requestStatus !== 'APPROVED' && (
                                        <>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => navigate(`/isp/edit-request/${request.requestId}`)}
                                            >
                                                <Pencil className="h-5 w-5" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() =>
                                                    setRequestIdToDelete({ id: request.requestId, open: true })
                                                }
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export { RequestsPage };
