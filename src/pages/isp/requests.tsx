import { Attachment } from '@/components/attachment';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
import { Pencil, Trash2 } from 'lucide-react';
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
    const [requestToDelete, setRequestToDelete] = useState<string | null>(null);
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

    if (!requests) return <div className="loader"></div>;
    return (
        <div className="p-4">
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

            <AlertDialog
                open={requestToDelete ? true : false}
                onOpenChange={(value: boolean) => {
                    if (!value) {
                        setRequestToDelete(null);
                    }
                }}
            >
                <AlertDialogTrigger asChild>
                    <Button style={{ display: 'none' }}>Open</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ste si úplne istí?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Táto akcia sa nedá zvrátiť. Žiadosť bude vymazaná.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setRequestToDelete(null)}>Zrušiť</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (requestToDelete) {
                                    handleDelete(requestToDelete);
                                    setRequestToDelete(null);
                                }
                            }}
                        >
                            Vymazať
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

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
                            <TableHead className="py-2 px-4 border">Meno študenta</TableHead>
                            <TableHead className="py-2 px-4 border">Študijný program</TableHead>
                            <TableHead className="py-2 px-4 border">Titul</TableHead>
                            <TableHead className="py-2 px-4 border">Rok</TableHead>
                            <TableHead className="py-2 px-4 border">Stav</TableHead>
                            <TableHead className="py-2 px-4 border">Účel</TableHead>
                            <TableHead className="py-2 px-4 border">Dôvod</TableHead>
                            <TableHead className="py-2 px-4 border">Príloha</TableHead>
                            <TableHead className="py-2 px-4 border">Akcie</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.map((request) => (
                            <TableRow key={request.requestId} className="border">
                                <TableCell className="py-2 px-4 border">
                                    {request.studentName} {request.studentSurname}
                                </TableCell>
                                <TableCell className="py-2 px-4 border">{request.studyProgram}</TableCell>
                                <TableCell className="py-2 px-4 border">{request.studyDegree}</TableCell>
                                <TableCell className="py-2 px-4 border">{request.studyYear}</TableCell>
                                <TableCell className="py-2 px-4 border">
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

                                <TableCell className="py-2 px-4 border">{request.purpose}</TableCell>
                                <TableCell className="py-2 px-4 border">{request.reason}</TableCell>
                                <TableCell className="py-2 px-4 border">
                                    <Attachment attachmentPath={request.attachmentPath} />
                                </TableCell>
                                {isStudent ? (
                                    <TableCell className="py-2 px-4 border space-x-2 min-w-96 flex justify-center">
                                        {request.requestStatus !== 'APPROVED' && (
                                            <>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => navigate(`/isp/edit-request/${request.requestId}`)}
                                                >
                                                    <Pencil className="h-4 w-4 mr-1" />
                                                    Upraviť
                                                </Button>
                                                <Button onClick={() => setRequestToDelete(request.requestId)}>
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Odstrániť
                                                </Button>
                                            </>
                                        )}
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <span>
                                                        <Button
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
                                    </TableCell>
                                ) : (
                                    <TableCell className="py-2 px-4 border space-x-2 text-center">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <span>
                                                        <Button
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
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export { RequestsPage };
