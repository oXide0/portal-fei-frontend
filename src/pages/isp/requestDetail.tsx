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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prettifyRequestStatus } from '@/helpers';
import { useAppSelector } from '@/hooks/redux-hooks';
import { useRequiredParam } from '@/hooks/useRequiredParam';
import { useDeleteRequestMutation, useGetRequestByIdQuery } from '@/services/isp/request';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RequestDetailPage() {
    const requestId = useRequiredParam('requestId');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { data } = useGetRequestByIdQuery(requestId);
    const { role } = useAppSelector((state) => state.user);
    const isStudent = role === 'S';

    const [deleteRequest] = useDeleteRequestMutation();

    if (data == null) return <div className="loader"></div>;
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Kategórie</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/isp/requests">ISP Žiadosti</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Detail žiadosti</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <DeleteRequestModal
                open={open}
                setOpen={setOpen}
                onSubmit={async () => {
                    await deleteRequest(requestId);
                    navigate('/isp/requests');
                }}
            />

            <header className="py-6">
                <h1 className="text-3xl font-bold">Detail žiadosti</h1>
                <p className="text-gray-600">Zobrazenie detailov pre žiadosť č. {data.requestId}</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Informácie o žiadosti</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Meno študenta</p>
                            <p className="text-lg">{`${data.studentName} ${data.studentSurname}`}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Študijný program</p>
                            <p className="text-lg">{data.studyProgram}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Titul</p>
                            <p className="text-lg">{data.studyDegree}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Rok</p>
                            <p className="text-lg">{data.studyYear}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Stav</p>
                            <p className="text-lg font-bold">{prettifyRequestStatus(data.requestStatus)}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Účel</p>
                            <p className="text-lg">{data.purpose}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Dôvod</p>
                            <p className="text-lg">{data.reason}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 pb-2">Príloha</p>
                            <Attachment url={data.attachmentUrl ? data.attachmentUrl : null} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-6 space-x-4">
                {isStudent && data.requestStatus !== 'APPROVED' && (
                    <>
                        <Button onClick={() => navigate(`/isp/edit-request/${data.requestId}`)}>Upraviť</Button>
                        <Button onClick={() => setOpen(true)}>Odstrániť</Button>
                    </>
                )}
                <Button
                    disabled={data.requestStatus !== 'APPROVED_BY_REFERENT' && data.requestStatus !== 'APPROVED'}
                    onClick={() => navigate(`/isp/subjects-table/${data.tableId}`)}
                >
                    Zobraziť predmety
                </Button>
            </div>
        </div>
    );
}

export { RequestDetailPage };
