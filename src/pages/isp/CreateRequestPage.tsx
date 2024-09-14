import RequestForm from "../../components/RequestForm";

const CreateRequestPage = () => {
    const onSubmit = (data) => {
        console.log(data);
    };

    return <RequestForm title="Create Request" onSubmit={onSubmit} />;
};

export default CreateRequestPage;
