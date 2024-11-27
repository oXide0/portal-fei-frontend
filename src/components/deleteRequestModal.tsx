import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';

interface DeleteRequestModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    onSubmit: () => void;
}

export function DeleteRequestModal({ open, setOpen, onSubmit }: DeleteRequestModalProps) {
    return (
        <AlertDialog open={open} onOpenChange={(value: boolean) => setOpen(value)}>
            <AlertDialogTrigger asChild>
                <Button style={{ display: 'none' }}>Open</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Ste si úplne istí?</AlertDialogTitle>
                    <AlertDialogDescription>Táto akcia sa nedá zvrátiť. Žiadosť bude vymazaná.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Zrušiť</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            onSubmit();
                            setOpen(false);
                        }}
                    >
                        Vymazať
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
