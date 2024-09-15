import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { prettifyTableStatus } from "../../helpers";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useRequiredParam } from "../../hooks/useRequiredParam";
import {
    useAddSubjectForTableMutation,
    useDeleteSubjectForTableMutation,
} from "../../services/isp/subject";
import {
    useEvaluateTableMutation,
    useGetTableQuery,
} from "../../services/isp/table";
import { SubjectStatus } from "../../types/isp/Subject";
import { TableStatus } from "../../types/isp/Table";

const SubjectsTablePage = () => {
    const tableId = useRequiredParam("tableId");
    const { id: userId, role } = useAppSelector((state) => state.user);
    const isStudent = role === "S";
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, refetch } = useGetTableQuery(tableId);
    const [evaluateTable] = useEvaluateTableMutation();
    const [addSubject] = useAddSubjectForTableMutation();
    const [deleteSubject] = useDeleteSubjectForTableMutation();

    if (isLoading || !data) return <LoadingSpinner />;

    const handleDeleteSubject = async (subjectId: string) => {
        if (window.confirm("Are you sure you want to delete this subject?")) {
            await deleteSubject(subjectId);
            refetch();
        }
    };

    const handleChangeSubjectStatus = (
        subjectId: string,
        newStatus: string
    ) => {
        // Logic to change subject status (e.g., call to API to update status)
        // Assuming you have a mutation for updating subject status
    };

    const handleChangeTableStatus = async (newStatus: TableStatus) => {
        if (!userId) {
            alert("User id not found");
            return;
        }

        await evaluateTable({
            tableId,
            tableStatus: newStatus,
            userId: userId,
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Tabuľka Predmetov</h1>

            <div className="mb-6">
                <div className="flex gap-2">
                    <h2 className="text-xl font-semibold">Status Tabuľky:</h2>
                    <h2
                        className={`text-xl font-semibold ${
                            data.tableStatus === "APPROVED"
                                ? "text-green-500"
                                : data.tableStatus === "DECLINED"
                                ? "text-red-500"
                                : "text-yellow-500"
                        }`}
                    >
                        {prettifyTableStatus(data.tableStatus)}
                    </h2>
                </div>
                {!isStudent && (
                    <div className="mt-4">
                        <button
                            onClick={() => handleChangeTableStatus("APPROVED")}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Schváliť Tabuľku
                        </button>
                        <button
                            onClick={() => handleChangeTableStatus("DECLINED")}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                        >
                            Zamietnuť Tabuľku
                        </button>
                    </div>
                )}
            </div>

            {!isStudent && (
                <div className="mb-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Pridať Predmet
                    </button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border">Názov Predmetu</th>
                            <th className="py-2 px-4 border">Status</th>
                            {!isStudent && (
                                <th className="py-2 px-4 border">Akcie</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.subjects.map((subject) => (
                            <tr key={subject.subjectId} className="border">
                                <td className="py-2 px-4 border">
                                    {subject.name}
                                </td>
                                <td className="py-2 px-4 border">
                                    {isStudent ? (
                                        subject.subjectStatus
                                    ) : (
                                        <select
                                            value={subject.subjectStatus}
                                            onChange={(e) =>
                                                handleChangeSubjectStatus(
                                                    subject.subjectId,
                                                    e.target.value
                                                )
                                            }
                                            className="bg-gray-100 border border-gray-300 rounded px-2 py-1"
                                        >
                                            <option value="Schválené">
                                                Schválené
                                            </option>
                                            <option value="Čaká na schválenie">
                                                Čaká na schválenie
                                            </option>
                                            <option value="Zamietnuté">
                                                Zamietnuté
                                            </option>
                                        </select>
                                    )}
                                </td>
                                {!isStudent && (
                                    <td className="py-2 px-4 border space-x-2">
                                        <button
                                            onClick={() =>
                                                handleDeleteSubject(
                                                    subject.subjectId
                                                )
                                            }
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Vymazať
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AddSubjectModal
                isOpen={isModalOpen}
                onSubmit={async (subjectName, subjectStatus) => {
                    if (!userId) {
                        alert("User id not found");
                        return;
                    }

                    await addSubject({
                        name: subjectName,
                        tableId,
                        userID: userId,
                        subjectStatus,
                    });
                    refetch();
                }}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default SubjectsTablePage;

interface AddSubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (subjectName: string, subjectStatus: SubjectStatus) => void;
}

const AddSubjectModal = ({
    isOpen,
    onClose,
    onSubmit,
}: AddSubjectModalProps) => {
    const [subjectName, setSubjectName] = useState("");
    const [subjectStatus, setSubjectStatus] =
        useState<SubjectStatus>("PENDING");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(subjectName, subjectStatus);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 w-">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto w-96">
                        <h2 className="text-2xl font-semibold mb-4">
                            Add New Subject
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="subjectName"
                                >
                                    Subject Name
                                </label>
                                <input
                                    id="subjectName"
                                    type="text"
                                    value={subjectName}
                                    onChange={(e) =>
                                        setSubjectName(e.target.value)
                                    }
                                    required
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="subjectStatus"
                                >
                                    Status
                                </label>
                                <select
                                    id="subjectStatus"
                                    value={subjectStatus}
                                    onChange={(e) =>
                                        setSubjectStatus(
                                            e.target.value as SubjectStatus
                                        )
                                    }
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Declined">Declined</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Add Subject
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
