import { useNavigate } from 'react-router-dom';
import RequestForm, { IFormInput } from '../../components/RequestForm';
import { useCreateRequestMutation } from '../../services/isp/request';
import { useAppSelector } from '../../hooks/redux-hooks';
import Breadcrumbs from '../../components/Breadcrumbs';

const CreateRequestPage = () => {
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.user.id);
    const [createRequest] = useCreateRequestMutation();

    const onSubmit = async (data: IFormInput) => {
        if (!userId) {
            alert('User id not found');
            return;
        }

        const formData = new FormData();
        formData.append('userId', userId);
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
            await createRequest(formData);
        } catch (error) {
            alert('Failed to create request');
        }
        navigate('/isp/requests');
    };

    return (
        <div className="p-4">
            <Breadcrumbs
                links={[
                    { name: 'Kategórie', path: '/' },
                    { name: 'ISP Žiadosti', path: '/isp/requests' },
                    { name: 'Vytvoriť žiadosť', path: '/isp/requests/create' },
                ]}
            />
            <RequestForm title="Vytvoriť žiadosť" onSubmit={onSubmit} />;
        </div>
    );
};

export default CreateRequestPage;
