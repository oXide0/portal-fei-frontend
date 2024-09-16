import { useNavigate } from 'react-router-dom';
import RequestForm, { IFormInput } from '../../components/RequestForm';
import { useCreateRequestMutation } from '../../services/isp/request';
import { useAppSelector } from '../../hooks/redux-hooks';

const CreateRequestPage = () => {
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.user.id);
    const [createRequest] = useCreateRequestMutation();

    const onSubmit = async (data: IFormInput) => {
        if (!userId) {
            alert('User id not found');
            return;
        }
        try {
            await createRequest({
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
            alert('Failed to create request');
        }
        navigate('/isp/requests');
    };

    return <RequestForm title="Vytvoriť žiadosť" onSubmit={onSubmit} />;
};

export default CreateRequestPage;
