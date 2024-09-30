import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import LoadingSpinner from '../../components/LoadingSpinner';
import RequestForm, { IFormInput } from '../../components/RequestForm';
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

    if (!data) return <LoadingSpinner />;
    return (
        <div className="p-4">
            <Breadcrumbs
                links={[
                    { name: 'Kategórie', path: '/' },
                    { name: 'ISP Žiadosti', path: '/isp/requests' },
                    { name: 'Upraviť žiadosť', path: `/isp/requests/${requestId}` },
                ]}
            />
            <RequestForm title="Upraviť žiadosť" initialValues={data} onSubmit={onSubmit} />;
        </div>
    );
};

export default EditRequestPage;
