import { RequestResponse } from "../../types/isp/Request";
import { useNavigate } from "react-router-dom";

const RequestsPage = () => {
    const navigate = useNavigate();

    const handleDelete = (requestId: string) => {
        if (window.confirm("Are you sure you want to delete this request?")) {
            console.log(`Request ${requestId} deleted`);
            // Logic to remove the request (e.g., call to API to delete)
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between pb-4">
                <h1 className="text-3xl font-bold mb-4">Requests</h1>
                <div className="flex justify-between mb-4">
                    <button
                        onClick={() => navigate("/create-request")}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Create Request
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border">Request ID</th>
                            <th className="py-2 px-4 border">Student Name</th>
                            <th className="py-2 px-4 border">Study Program</th>
                            <th className="py-2 px-4 border">Degree</th>
                            <th className="py-2 px-4 border">Year</th>
                            <th className="py-2 px-4 border">Status</th>
                            <th className="py-2 px-4 border">Purpose</th>
                            <th className="py-2 px-4 border">Reason</th>
                            <th className="py-2 px-4 border">Attachment</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleRequests.map((request) => (
                            <tr key={request.requestId} className="border">
                                <td className="py-2 px-4 border">
                                    {request.requestId}
                                </td>
                                <td className="py-2 px-4 border">
                                    {request.studentName}{" "}
                                    {request.studentSurname}
                                </td>
                                <td className="py-2 px-4 border">
                                    {request.studyProgram}
                                </td>
                                <td className="py-2 px-4 border">
                                    {request.studyDegree}
                                </td>
                                <td className="py-2 px-4 border">
                                    {request.studyYear}
                                </td>
                                <td className="py-2 px-4 border">
                                    {request.requestStatus}
                                </td>
                                <td className="py-2 px-4 border">
                                    {request.purpose}
                                </td>
                                <td className="py-2 px-4 border">
                                    {request.reason}
                                </td>
                                <td className="py-2 px-4 border">
                                    {request.attachment ? (
                                        <a
                                            href={request.attachment}
                                            className="text-blue-500 underline"
                                        >
                                            {request.attachment}
                                        </a>
                                    ) : (
                                        "No attachment"
                                    )}
                                </td>
                                <td className="py-2 px-4 border space-x-2">
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/edit-request/${request.requestId}`
                                            )
                                        }
                                        className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(request.requestId)
                                        }
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestsPage;

const sampleRequests: RequestResponse[] = [
    {
        requestId: "1",
        userId: "U01",
        studentName: "John",
        studentSurname: "Doe",
        studyProgram: "Computer Science",
        studyDegree: "Bachelor",
        studyYear: 3,
        requestStatus: "Pending",
        purpose: "Internship",
        reason: "Gaining experience",
        attachment: "resume.pdf",
    },
    {
        requestId: "2",
        userId: "U02",
        studentName: "Jane",
        studentSurname: "Smith",
        studyProgram: "Business Administration",
        studyDegree: "Master",
        studyYear: 2,
        requestStatus: "Approved",
        purpose: "Scholarship",
        reason: "Financial support",
        attachment: null,
    },
];
