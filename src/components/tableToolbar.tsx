import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TableToolbarProps {
    values: {
        name: string;
        surname: string;
        email: string;
    };
    onChange: (values: { name: string; surname: string; email: string }) => void;
    onReset: () => void;
    onSave: () => void;
}

export function TableToolbar(props: TableToolbarProps) {
    return (
        <div className="flex items-end justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-4">
                <div className="flex flex-col gap-1 w-full max-w-xs">
                    <Label htmlFor="filter-name">Meno</Label>
                    <Input
                        id="filter-name"
                        placeholder="Filtrovať podľa mena..."
                        value={props.values.name}
                        onChange={(event) => props.onChange({ ...props.values, name: event.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-1 w-full max-w-xs">
                    <Label htmlFor="filter-surname">Priezvisko</Label>
                    <Input
                        id="filter-surname"
                        placeholder="Filtrovať podľa priezviska..."
                        value={props.values.surname}
                        onChange={(event) => props.onChange({ ...props.values, surname: event.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-1 w-full max-w-xs">
                    <Label htmlFor="filter-email">Email</Label>
                    <Input
                        id="filter-email"
                        placeholder="Filtrovať podľa emailu..."
                        value={props.values.email}
                        onChange={(event) => props.onChange({ ...props.values, email: event.target.value })}
                    />
                </div>
            </div>
            <Button onClick={props.onSave}>Uložiť vybraných študentov</Button>
        </div>
    );
}
