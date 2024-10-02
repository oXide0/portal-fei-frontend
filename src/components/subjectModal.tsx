import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface SubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (subjectName: string) => void;
}

const SubjectModal = ({ isOpen, onClose, onSubmit }: SubjectModalProps) => {
    const [subjectName, setSubjectName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(subjectName);
        onClose();
        setSubjectName('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Pridať nový predmet</DialogTitle>
                    <DialogDescription>Zadajte názov nového predmetu, ktorý chcete pridať.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjectName">
                            Názov predmetu
                        </label>
                        <Input
                            id="subjectName"
                            type="text"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                            required
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button variant="ghost" type="button" onClick={onClose}>
                            Zrušiť
                        </Button>
                        <Button type="submit">Pridať predmet</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export { SubjectModal };
