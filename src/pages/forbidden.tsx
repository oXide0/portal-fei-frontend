import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function ForbiddenPage() {
    const navigate = useNavigate();

    return (
        <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2 pt-20">
            <h1 className="text-[7rem] font-bold leading-tight">403</h1>
            <span className="font-medium">Prístup zakázaný</span>
            <p className="text-center text-muted-foreground">Nemáte potrebné oprávnenia na zobrazenie tohto zdroja.</p>
            <div className="mt-6 flex gap-4">
                <Button variant="outline" onClick={() => navigate(-1)}>
                    Späť
                </Button>
                <Button onClick={() => navigate('/')}>Späť na domovskú stránku</Button>
            </div>
        </div>
    );
}
