import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { RequestForm, IFormInput } from '../../components/requestForm';
import { useCreateRequestMutation } from '../../services/isp/request';

const CreateRequestPage = () => {
    const navigate = useNavigate();
    const [createRequest, { isLoading }] = useCreateRequestMutation();

    const onSubmit = async (data: IFormInput) => {
        const formData = new FormData();
        formData.append('studentName', data.studentName);
        formData.append('studentSurname', data.studentSurname);
        formData.append('studyProgram', data.studyProgram);
        formData.append('studyDegree', data.studyDegree);
        formData.append('studyYear', data.studyYear);
        formData.append('purpose', data.purpose);
        formData.append('reason', data.reason);
        if (data.attachment) {
            formData.append('attachment', data.attachment);
        }

        try {
            await createRequest(formData);
        } catch (error) {
            alert('Failed to create request');
        }
        navigate('/isp/requests');
    };

    return (
        <div className="">
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
                        <BreadcrumbPage>Vytvoriť žiadosť</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <RequestForm title="Vytvoriť žiadosť" isLoading={isLoading} onSubmit={onSubmit} />;
        </div>
    );
};

export { CreateRequestPage };
