import { useNavigate } from "react-router-dom";
import RequestForm, { IFormInput } from "../../components/RequestForm";
import { useCreateRequestMutation } from "../../services/isp/request";

const CreateRequestPage = () => {
    const navigate = useNavigate();
    const [createRequest] = useCreateRequestMutation();

    const onSubmit = async (data: IFormInput) => {
        await createRequest({
            userId: "b8743d15-cd36-4293-b21a-89b4fe45051d",
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
