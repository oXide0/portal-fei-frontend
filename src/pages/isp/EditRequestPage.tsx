import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import RequestForm, { IFormInput } from "../../components/RequestForm";
import { useRequiredParam } from "../../hooks/useRequiredParam";
import {
    useGetRequestByIdQuery,
    useUpdateRequestMutation,
} from "../../services/isp/request";
import { useEffect } from "react";

const EditRequestPage = () => {
    const requestId = useRequiredParam("requestId");
    const navigate = useNavigate();
    const { data } = useGetRequestByIdQuery(requestId);
    const [updateRequest, { isSuccess }] = useUpdateRequestMutation();

    const onSubmit = async (data: IFormInput) => {
        if (!requestId) {
            alert("Invalid request id");
            return;
        }

        await updateRequest({
            requestId: requestId,
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
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/isp/requests");
        }
    }, [isSuccess]);

    if (!data) return <LoadingSpinner />;
    return (
        <RequestForm
            title="Edit Request"
            initialValues={data}
            onSubmit={onSubmit}
        />
    );
};

export default EditRequestPage;
