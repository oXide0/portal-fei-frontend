import { Button } from '@/components/ui/button';
import { Calendar, User, CheckCircle, Edit, Trash } from 'lucide-react';

interface ExamCardProps {
    name: string;
    audience: string;
    date: string;
    examType: string;
    isFinished: boolean;
    onClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export function ExamCard(props: ExamCardProps) {
    return (
        <div className="rounded-lg border p-4 shadow-md hover:shadow-lg">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center justify-center rounded-lg bg-muted p-2">
                    <Calendar size={24} className="text-primary" />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="default" onClick={props.onClick}>
                        See details
                    </Button>
                    <Button variant="outline" size="icon" onClick={props.onEdit}>
                        <Edit />
                    </Button>
                    <Button variant="outline" size="icon" onClick={props.onDelete}>
                        <Trash />
                    </Button>
                </div>
            </div>
            <div>
                <h2 className="mb-1 font-semibold">{props.name}</h2>
                <p className="line-clamp-2 text-gray-500">{props.examType}</p>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
                <User size={16} className="mr-2" />
                <span>{props.audience}</span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-2" />
                <span>{props.date}</span>
            </div>
            {props.isFinished && (
                <div className="mt-4 flex items-center text-sm text-green-500">
                    <CheckCircle size={16} className="mr-2" />
                    <span>Finished</span>
                </div>
            )}
        </div>
    );
}
