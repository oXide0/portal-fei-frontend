import RequestForm from "../../components/RequestForm";

const EditRequestPage = () => {
    const onSubmit = (data) => {
        console.log(data);
    };

    return <RequestForm title="Edit Request" onSubmit={onSubmit} />;
};

export default EditRequestPage;
