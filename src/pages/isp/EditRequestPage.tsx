import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import RequestForm, { IFormInput } from '../../components/RequestForm';
import { useRequiredParam } from '../../hooks/useRequiredParam';
import { useGetRequestByIdQuery, useUpdateRequestMutation } from '../../services/isp/request';
import { useAppSelector } from '../../hooks/redux-hooks';

const EditRequestPage = () => {
    const navigate = useNavigate();
    const requestId = useRequiredParam('requestId');
    const userId = useAppSelector((state) => state.user.id);
    const { data } = useGetRequestByIdQuery(requestId);
    const [updateRequest] = useUpdateRequestMutation();

    const onSubmit = async (data: IFormInput) => {
        if (!requestId) {
            alert('Invalid request id');
            return;
        }

        if (!userId) {
            alert('User id not found');
            return;
        }

        try {
            await updateRequest({
                requestId: requestId,
                userId: userId,
                studentName: data.studentName,
                studentSurname: data.studentSurname,
                studyProgram: data.studyProgram,
                studyDegree: data.studyDegree,
                studyYear: data.studyYear,
                purpose: data.purpose,
                reason: data.reason,
                attachment: data.attachment,
            });
        } catch (error) {
            alert('Failed to update request');
        }
        navigate('/isp/requests');
    };

    if (!data) return <LoadingSpinner />;
    return <RequestForm title="Upraviť žiadosť" initialValues={data} onSubmit={onSubmit} />;
};

export default EditRequestPage;
