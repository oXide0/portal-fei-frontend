import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { ExamType } from '@/types/skex/Exam';
import { UploadIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Label } from './ui/label';

interface ResultsUploadDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (data: FormValues) => Promise<void>;
}

interface FormValues {
    file: File;
    examType: ExamType;
}

export function ResultsUploadDrawer(props: ResultsUploadDrawerProps) {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        props.onSubmit(data);
    };

    return (
        <Sheet open={props.open} onOpenChange={(v) => props.setOpen(v)}>
            <SheetContent className="flex flex-col h-full sm:max-w-lg">
                <SheetHeader className="text-left">
                    <SheetTitle>Nahrať výsledky</SheetTitle>
                    <SheetDescription>Nahrajte CSV súbor obsahujúci údaje o študentoch.</SheetDescription>
                </SheetHeader>

                <form id="tasks-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-auto">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="examType">Typ skúšky</Label>
                        <Controller
                            name="examType"
                            control={control}
                            rules={{ required: 'Typ skúšky je povinný' }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Vyberte typ skúšky" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="LETNY">LETNÝ</SelectItem>
                                            <SelectItem value="ZIMNY">ZIMNÝ</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.examType && <p className="text-red-500 text-sm">{errors.examType.message}</p>}
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label htmlFor="attachment-input">Súbor</Label>

                        <div className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-md bg-muted">
                            {file ? (
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-sm font-medium text-primary">{file.name}</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setFile(null);
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = '';
                                            }
                                        }}
                                    >
                                        Odstrániť súbor
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <UploadIcon className="w-6 h-6 text-gray-500" />
                                    <p className="text-sm text-muted-foreground">
                                        Nahrajte súbor kliknutím na tlačidlo nižšie
                                    </p>
                                    <Label
                                        htmlFor="attachment-input"
                                        className="flex items-center gap-1 cursor-pointer border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 rounded-md px-3"
                                    >
                                        <UploadIcon className="w-4 h-4 mr-2" />
                                        Nahrať súbor
                                    </Label>
                                </>
                            )}
                        </div>

                        <Input
                            ref={fileInputRef}
                            id="attachment-input"
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={(event) => {
                                const files = event.target.files;
                                if (files && files.length > 0) {
                                    const file = files[0];
                                    setFile(file);
                                }
                            }}
                        />
                    </div>
                    {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
                </form>

                <SheetFooter className="gap-2 sm:justify-start">
                    <Button form="tasks-form" type="submit">
                        Uložiť zmeny
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">Zatvoriť</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
