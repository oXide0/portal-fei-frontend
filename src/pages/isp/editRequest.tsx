import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { RequestForm, IFormInput } from '../../components/requestForm';
import { useRequiredParam } from '../../hooks/useRequiredParam';
import { useGetRequestByIdQuery, useUpdateRequestMutation } from '../../services/isp/request';

const EditRequestPage = () => {
    const navigate = useNavigate();
    const requestId = useRequiredParam('requestId');
    const { data } = useGetRequestByIdQuery(requestId);
    const [updateRequest] = useUpdateRequestMutation();

    const onSubmit = async (data: IFormInput) => {
        if (!requestId) {
            alert('Invalid request id');
            return;
        }

        const formData = new FormData();
        formData.append('requestId', requestId);
        formData.append('studentName', data.studentName);
        formData.append('studentSurname', data.studentSurname);
        formData.append('studyProgram', data.studyProgram);
        formData.append('studyDegree', data.studyDegree);
        formData.append('studyYear', data.studyYear.toString());
        formData.append('purpose', data.purpose);
        formData.append('reason', data.reason);
        if (data.attachment) {
            formData.append('attachment', data.attachment);
        }

        try {
            await updateRequest(formData);
        } catch (error) {
            alert('Failed to update request');
        }
        navigate('/isp/requests');
    };

    if (!data) return <Skeleton />;
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
                        <BreadcrumbLink asChild>
                            <Link to="/isp/requests">ISP Žiadosti</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Upraviť žiadosť</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <RequestForm title="Upraviť žiadosť" initialValues={data} onSubmit={onSubmit} />;
        </div>
    );
};

export { EditRequestPage };
