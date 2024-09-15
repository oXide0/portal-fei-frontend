import { useNavigate } from "react-router-dom";
import { TableResponse } from "../../types/isp/Table";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useState } from "react";
import { prettifyTableStatus } from "../../helpers";

type TableStatus = "Approved" | "Declined" | "Pending";

const SubjectsTablePage = () => {
    const userRole = useAppSelector((state) => state.user.role);
    const isStudent = userRole === "S";

    const [subjects, setSubjects] = useState(sampleTableResponse.subjects);
    const [tableStatus, setTableStatus] = useState<TableStatus>(
        sampleTableResponse.tableStatus
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteSubject = (subjectId: string) => {
        if (window.confirm("Are you sure you want to delete this subject?")) {
            // Logic to delete the subject (e.g., call to API to delete)
            setSubjects(
                subjects.filter((subject) => subject.subjectId !== subjectId)
            );
        }
    };

    const handleChangeSubjectStatus = (
        subjectId: string,
        newStatus: string
    ) => {
        // Logic to change subject status (e.g., call to API to update status)
        setSubjects(
            subjects.map((subject) =>
                subject.subjectId === subjectId
                    ? { ...subject, subjectStatus: newStatus }
                    : subject
            )
        );
    };

    const handleChangeTableStatus = (newStatus: TableStatus) => {
        // Logic to change table status (e.g., call to API to update status)
        setTableStatus(newStatus);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Tabuľka Predmetov</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Informácie o Tabuľke</h2>
                <p>
                    <strong>Status Tabuľky:</strong>{" "}
                    <span
                        className={`${
                            tableStatus === "Approved"
                                ? "text-green-500"
                                : tableStatus === "Declined"
                                ? "text-red-500"
                                : "text-yellow-500"
                        }`}
                    >
                        {prettifyTableStatus(tableStatus)}
                    </span>
                </p>
                {!isStudent && (
                    <div className="mt-4">
                        <button
                            onClick={() => handleChangeTableStatus("Approved")}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Schváliť Tabuľku
                        </button>
                        <button
                            onClick={() => handleChangeTableStatus("Declined")}
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
                        {subjects.map((subject) => (
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
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default SubjectsTablePage;

const AddSubjectModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [subjectName, setSubjectName] = useState("");
    const [subjectStatus, setSubjectStatus] = useState("Pending");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Dispatch the action to add the subject

        onClose(); // Close the modal after submission
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
                                        setSubjectStatus(e.target.value)
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

const sampleTableResponse: TableResponse = {
    tableId: "table1",
    userId: "user1",
    requestId: "request1",
    tableStatus: "Approved",
    subjects: [
        {
            subjectId: "sub1",
            userId: "user1",
            tableId: "table1",
            subjectStatus: "Completed",
            name: "Mathematics",
        },
        {
            subjectId: "sub2",
            userId: "user1",
            tableId: "table1",
            subjectStatus: "Pending",
            name: "Physics",
        },
        {
            subjectId: "sub3",
            userId: "user1",
            tableId: "table1",
            subjectStatus: "In Progress",
            name: "Chemistry",
        },
    ],
};
