import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { prettifyRequestStatus } from "../../helpers";
import { useAppSelector } from "../../hooks/redux-hooks";
import {
    useDeleteRequestMutation,
    useEvaluateRequestMutation,
    useGetAllRequestsQuery,
} from "../../services/isp/request";
import { RequestStatus } from "../../types/isp/Request";

const RequestsPage = () => {
    const navigate = useNavigate();
    const userRole = useAppSelector((state) => state.user.role);
    const isClerk = userRole === "N";
    const isStudent = userRole === "S";

    const { data, isLoading, refetch } = useGetAllRequestsQuery();
    const [evaluateRequest] = useEvaluateRequestMutation();
    const [deleteRequest] = useDeleteRequestMutation();

    const handleDelete = async (requestId: string) => {
        if (window.confirm("Are you sure you want to delete this request?")) {
            await deleteRequest(requestId);
            refetch();
        }
    };

    const handleStatusChange = async (
        requestId: string,
        newStatus: RequestStatus
    ) => {
        console.log(requestId, newStatus);
        await evaluateRequest({ requestId, evaluationStatus: newStatus });
        refetch();
    };

    if (!data || isLoading) return <LoadingSpinner />;

    return (
        <div className="p-4">
            <div className="flex justify-between pb-4">
                <h1 className="text-3xl font-bold mb-4">Žiadosti</h1>

                {isStudent && (
                    <div className="flex justify-between mb-4">
                        <button
                            onClick={() => navigate("/isp/create-request")}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Vytvoriť žiadosť
                        </button>
                    </div>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border">Meno študenta</th>
                            <th className="py-2 px-4 border">
                                Študijný program
                            </th>
                            <th className="py-2 px-4 border">Titul</th>
                            <th className="py-2 px-4 border">Rok</th>
                            <th className="py-2 px-4 border">Stav</th>
                            <th className="py-2 px-4 border">Účel</th>
                            <th className="py-2 px-4 border">Dôvod</th>
                            <th className="py-2 px-4 border">Príloha</th>
                            <th className="py-2 px-4 border">Akcie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((request) => (
                            <tr key={request.requestId} className="border">
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
                                    {isClerk ? (
                                        <select
                                            className="border border-gray-300 rounded px-2 py-1"
                                            value={request.requestStatus}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    request.requestId,
                                                    e.target
                                                        .value as RequestStatus
                                                )
                                            }
                                        >
                                            <option value="APPROVED">
                                                Schválené
                                            </option>
                                            <option value="DECLINED">
                                                Zamietnuté
                                            </option>
                                            <option value="PENDING">
                                                Čakajúce
                                            </option>
                                            <option value="RETURNED">
                                                Vrátené
                                            </option>
                                        </select>
                                    ) : (
                                        prettifyRequestStatus(
                                            request.requestStatus
                                        )
                                    )}
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
                                        "Žiadna príloha"
                                    )}
                                </td>
                                {isStudent ? (
                                    <td className="py-2 px-4 border space-x-2 min-w-96">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/isp/edit-request/${request.requestId}`
                                                )
                                            }
                                            className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                                        >
                                            Upraviť
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(request.requestId)
                                            }
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Odstrániť
                                        </button>
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/isp/subjects-table/${request.tableId}`
                                                )
                                            }
                                            className={`px-2 py-1 rounded text-white ${
                                                request.requestStatus ===
                                                "APPROVED"
                                                    ? "bg-blue-500 hover:bg-blue-600"
                                                    : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                            disabled={
                                                request.requestStatus !==
                                                "APPROVED"
                                            }
                                            title={
                                                request.requestStatus !==
                                                "APPROVED"
                                                    ? "Žiadosť nemá stav 'schválená'."
                                                    : ""
                                            }
                                        >
                                            Zobraziť predmety
                                        </button>
                                    </td>
                                ) : (
                                    <td className="py-2 px-4 border space-x-2 text-center">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/isp/subjects-table/${request.tableId}`
                                                )
                                            }
                                            className={`px-2 py-1 rounded text-white ${
                                                request.requestStatus ===
                                                "APPROVED"
                                                    ? "bg-blue-500 hover:bg-blue-600"
                                                    : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                            disabled={
                                                request.requestStatus !==
                                                "APPROVED"
                                            }
                                            title={
                                                request.requestStatus !==
                                                "APPROVED"
                                                    ? "Žiadosť nemá stav 'schválená'."
                                                    : ""
                                            }
                                        >
                                            Zobraziť predmety
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestsPage;
