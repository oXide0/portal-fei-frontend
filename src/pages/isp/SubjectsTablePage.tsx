import { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getAvailableSubjectStatusOptions, prettifySubjectStatus, prettifyTableStatus } from '../../helpers';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useRequiredParam } from '../../hooks/useRequiredParam';
import {
    useAddSubjectForTableMutation,
    useDeleteSubjectForTableMutation,
    useEvaluateSubjectMutation,
} from '../../services/isp/subject';
import { useEvaluateTableMutation, useGetTableQuery } from '../../services/isp/table';
import { SubjectStatus } from '../../types/isp/Subject';
import { TableStatus } from '../../types/isp/Table';

const SubjectsTablePage = () => {
    const tableId = useRequiredParam('tableId');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id: userId, role } = useAppSelector((state) => state.user);
    const isStudent = role === 'S';

    const { data, isLoading, refetch } = useGetTableQuery(tableId);
    const [evaluateTable] = useEvaluateTableMutation();
    const [evaluateSubject] = useEvaluateSubjectMutation();
    const [addSubject] = useAddSubjectForTableMutation();
    const [deleteSubject] = useDeleteSubjectForTableMutation();

    const handleDeleteSubject = async (subjectId: string) => {
        if (window.confirm('Are you sure you want to delete this subject?')) {
            await deleteSubject(subjectId);
            refetch();
        }
    };

    const handleChangeSubjectStatus = async (subjectId: string, newStatus: SubjectStatus) => {
        try {
            await evaluateSubject({ subjectId, subjectStatus: newStatus });
        } catch (error) {
            alert('Nepodarilo sa aktualizovať stav predmetu');
        }
        refetch();
    };

    const handleChangeTableStatus = async (newStatus: TableStatus) => {
        if (!userId) {
            alert('User id not found');
            return;
        }

        try {
            await evaluateTable({
                tableId,
                tableStatus: newStatus,
                userId: userId,
            });
        } catch (error) {
            alert('Failed to update table status');
        }
    };

    if (isLoading || !data) return <LoadingSpinner />;

    return (
        <div className="p-4">
            <Breadcrumbs
                links={[
                    { name: 'Kategórie', path: '/' },
                    { name: 'ISP Žiadosti', path: '/isp/requests' },
                    {
                        name: 'Tabuľka Predmetov',
                        path: '/isp/subjects-table/:tableId',
                    },
                ]}
            />
            <h1 className="text-3xl font-bold mb-4">Tabuľka Predmetov</h1>

            <div className="mb-6">
                <div className="flex gap-2">
                    <h2 className="text-xl font-semibold">Status Tabuľky:</h2>
                    <h2
                        className={`text-xl font-semibold ${
                            data.tableStatus === 'APPROVED'
                                ? 'text-green-500'
                                : data.tableStatus === 'DECLINED'
                                  ? 'text-red-500'
                                  : 'text-yellow-500'
                        }`}
                    >
                        {prettifyTableStatus(data.tableStatus)}
                    </h2>
                </div>
                {!isStudent && data.tableStatus === 'PENDING' && (
                    <div className="mt-4 flex gap-3">
                        <Button
                            className="bg-green-500 hover:bg-green-700"
                            onClick={() => handleChangeTableStatus('APPROVED')}
                        >
                            Schváliť Tabuľku
                        </Button>
                        <Button
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleChangeTableStatus('DECLINED')}
                        >
                            Zamietnuť Tabuľku
                        </Button>
                    </div>
                )}
            </div>

            {!isStudent && (
                <div className="mb-4">
                    <Button onClick={() => setIsModalOpen(true)}>Pridať Predmet</Button>
                </div>
            )}

            <div className="overflow-x-auto max-w-5xl">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border">Názov Predmetu</th>
                            <th className="py-2 px-4 border">Stav</th>
                            {!isStudent && <th className="py-2 px-4 border">Akcie</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.subjects.map((subject) => (
                            <tr key={subject.subjectId} className="border">
                                <td className="py-2 px-4 border">{subject.name}</td>
                                <td className="py-2 px-4 border">
                                    {isStudent ? (
                                        prettifySubjectStatus(subject.subjectStatus)
                                    ) : subject.subjectStatus === 'PENDING' ? (
                                        <select
                                            value={subject.subjectStatus}
                                            onChange={(e) =>
                                                handleChangeSubjectStatus(
                                                    subject.subjectId,
                                                    e.target.value as SubjectStatus,
                                                )
                                            }
                                            className="bg-gray-100 border border-gray-300 rounded px-2 py-1"
                                        >
                                            {getAvailableSubjectStatusOptions(subject.subjectStatus).map((status) => (
                                                <option key={status} value={status}>
                                                    {prettifySubjectStatus(status)}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        prettifySubjectStatus(subject.subjectStatus)
                                    )}
                                </td>
                                {!isStudent && (
                                    <td className="py-2 px-4 border space-x-2 text-center">
                                        <Button
                                            variant="transparent"
                                            onClick={() => handleDeleteSubject(subject.subjectId)}
                                        >
                                            Vymazať
                                        </Button>
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
                        alert('User id not found');
                        return;
                    }

                    await addSubject({
                        name: subjectName,
                        tableId,
                        userId: userId,
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

const AddSubjectModal = ({ isOpen, onClose, onSubmit }: AddSubjectModalProps) => {
    const [subjectName, setSubjectName] = useState('');
    const [subjectStatus, setSubjectStatus] = useState<SubjectStatus>('PENDING');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(subjectName, subjectStatus);
        onClose();
        setSubjectName('');
        setSubjectStatus('PENDING');
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 w-"
                    onClick={onClose}
                >
                    <div
                        className="bg-white p-6 rounded shadow-lg max-w-md mx-auto w-96"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-semibold mb-4">Pridať nový predmet</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjectName">
                                    Názov predmetu
                                </label>
                                <input
                                    id="subjectName"
                                    type="text"
                                    value={subjectName}
                                    onChange={(e) => setSubjectName(e.target.value)}
                                    required
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjectStatus">
                                    Stav
                                </label>
                                <select
                                    id="subjectStatus"
                                    value={subjectStatus}
                                    onChange={(e) => setSubjectStatus(e.target.value as SubjectStatus)}
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                >
                                    <option value="PENDING">Čakajúci</option>
                                    <option value="APPROVED">Schválený</option>
                                    <option value="DECLINED">Zamietnutý</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button variant="ghost" type="button" onClick={onClose}>
                                    Zrušiť
                                </Button>
                                <Button type="submit">Pridať predmet</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
