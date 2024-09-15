import { useNavigate } from "react-router-dom";
import RequestForm, { IFormInput } from "../../components/RequestForm";
import { useCreateRequestMutation } from "../../services/isp/request";
import { useAppSelector } from "../../hooks/redux-hooks";

const CreateRequestPage = () => {
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.user.id);
    const [createRequest] = useCreateRequestMutation();

    const onSubmit = async (data: IFormInput) => {
        if (!userId) {
            alert("User id not found");
            return;
        }
        await createRequest({
            userId: userId,
            studentName: data.studentName,
            studentSurname: data.studentSurname,
            studyProgram: data.studyProgram,
            studyDegree: data.studyDegree,
            studyYear: data.studyYear,
            purpose: data.purpose,
            reason: data.reason,
            attachment: "",
        });
        navigate("/isp/requests");
    };

    return <RequestForm title="Create Request" onSubmit={onSubmit} />;
};

export default CreateRequestPage;
