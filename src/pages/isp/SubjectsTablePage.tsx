import { TableResponse } from "../../types/isp/Table";

const SubjectsTablePage = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Subjects Table</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Table Information</h2>
                <p className="mt-2">
                    <strong>Table ID:</strong> {sampleTableResponse.tableId}
                </p>
                <p>
                    <strong>User ID:</strong> {sampleTableResponse.userId}
                </p>
                <p>
                    <strong>Request ID:</strong> {sampleTableResponse.requestId}
                </p>
                <p>
                    <strong>Table Status:</strong>{" "}
                    <span
                        className={`${
                            sampleTableResponse.tableStatus === "Approved"
                                ? "text-green-500"
                                : sampleTableResponse.tableStatus === "Declined"
                                ? "text-red-500"
                                : "text-yellow-500"
                        }`}
                    >
                        {sampleTableResponse.tableStatus}
                    </span>
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border">Subject ID</th>
                            <th className="py-2 px-4 border">Subject Name</th>
                            <th className="py-2 px-4 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleTableResponse.subjects.map((subject) => (
                            <tr key={subject.subjectId} className="border">
                                <td className="py-2 px-4 border">
                                    {subject.subjectId}
                                </td>
                                <td className="py-2 px-4 border">
                                    {subject.name}
                                </td>
                                <td className="py-2 px-4 border">
                                    {subject.subjectStatus}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubjectsTablePage;

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
