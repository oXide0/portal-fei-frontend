import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetStudentExamsQuery } from '@/services/skex/student';
import Fuse from 'fuse.js';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export function StudentExamsPage() {
    const { data } = useGetStudentExamsQuery();
    const [searchTerm, setSearchTerm] = useState('');
    const [examTypeFilter, setExamTypeFilter] = useState('');
    const [isFinishedFilter, setIsFinishedFilter] = useState<boolean | null>(null);

    const fuse = new Fuse(data ?? [], { keys: ['name', 'audience', 'date', 'examType', 'mark'], threshold: 0.3 });
    const filteredData = useMemo(() => {
        if (data == null) return null;
        let result = data;

        if (searchTerm) {
            result = fuse.search(searchTerm).map((result) => result.item);
        }

        if (examTypeFilter) {
            result = result.filter((exam) => exam.examType === examTypeFilter);
        }

        if (isFinishedFilter !== null) {
            result = result.filter((exam) => exam.isFinished === isFinishedFilter);
        }

        return result;
    }, [data, searchTerm, examTypeFilter, isFinishedFilter]);

    if (filteredData == null) return <div className="loader"></div>;
    return (
        <>
            <div className="flex items-center space-x-2">
                <h1 className="text-3xl font-bold">Tabuľka skúšok</h1>
            </div>

            <div className="flex items-center justify-between gap-4 pt-16 pb-4">
                <div className="relative flex items-center max-w-sm w-full">
                    <Search className="absolute left-3" size={16} />
                    <Input
                        placeholder="Filtrovať skúšky..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-4">
                    <div className="w-52">
                        <Select value={examTypeFilter} onValueChange={setExamTypeFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Vyberte typ skúšky" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="LETNY">Letný</SelectItem>
                                <SelectItem value="ZIMNY">Zimný</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-52">
                        <Select
                            value={isFinishedFilter?.toString()}
                            onValueChange={(value) => setIsFinishedFilter(value === 'true')}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Vyberte stav" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Ukončené</SelectItem>
                                <SelectItem value="false">Neukončené</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table className="hidden md:table w-full">
                    <TableCaption className="text-gray-500">Tabuľka s výsledkami</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center border">Názov skúšky</TableHead>
                            <TableHead className="text-center border">Miestnosť</TableHead>
                            <TableHead className="text-center border">Datum</TableHead>
                            <TableHead className="text-center border">Typ</TableHead>
                            <TableHead className="text-center border">Hodnotenie</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((exam) => (
                            <TableRow key={exam.examId} className="border">
                                <TableCell className="py-2 px-4 border text-center">{exam.name}</TableCell>
                                <TableCell className="py-2 px-4 border text-center">{exam.audience}</TableCell>
                                <TableCell className="py-2 px-4 border text-center">{exam.date}</TableCell>
                                <TableCell className="py-2 px-4 border text-center">{exam.examType}</TableCell>
                                <TableCell className="py-2 px-4 border text-center">
                                    {exam.isFinished ? exam.mark : 'N/A'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
