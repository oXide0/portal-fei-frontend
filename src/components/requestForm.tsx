import { useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Attachment } from './attachment';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { DownloadIcon, Loader2, UploadIcon } from 'lucide-react';
import { Label } from './ui/label';

interface RequestFormProps {
    title: string;
    initialValues?: IFormInput;
    isLoading: boolean;
    onSubmit: (data: IFormInput) => void;
}

export interface IFormInput {
    studentName: string;
    studentSurname: string;
    studyProgram: string;
    studyDegree: string;
    studyYear: string;
    purpose: string;
    reason: string;
    attachment?: File | null;
    attachmentUrl?: string | null;
}

export function RequestForm({ title, initialValues, isLoading, onSubmit }: RequestFormProps) {
    const [attachment, setAttachment] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: initialValues,
    });
    const watchStudyDegree = watch('studyDegree');

    const onSubmitData: SubmitHandler<IFormInput> = (data) => {
        onSubmit({ ...data, attachment });
    };

    useEffect(() => {
        if (initialValues) {
            Object.keys(initialValues).forEach((key) => {
                setValue(key as keyof IFormInput, initialValues[key as keyof IFormInput]);
            });
        }
    }, [initialValues]);

    return (
        <div className="max-w-4xl my-0 mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            <form onSubmit={handleSubmit(onSubmitData)} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                    <Label>Meno študenta</Label>
                    <Input
                        type="text"
                        {...register('studentName', {
                            required: 'Meno študenta je povinné',
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.studentName && <p className="text-red-500 text-sm">{errors.studentName.message}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label>Priezvisko študenta</Label>
                    <Input
                        type="text"
                        {...register('studentSurname', {
                            required: 'Priezvisko študenta je povinné',
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.studentSurname && <p className="text-red-500 text-sm">{errors.studentSurname.message}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label>Študijný program</Label>
                    <Controller
                        name="studyProgram"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Študijný program je povinný' }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded">
                                    <SelectValue placeholder="-- Vyberte program --" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Študijný program</SelectLabel>
                                        <SelectItem value="Informatika">Informatika</SelectItem>
                                        <SelectItem value="Aplikovaná elektrotechnika">
                                            Aplikovaná elektrotechnika
                                        </SelectItem>
                                        <SelectItem value="Automobilová elektronika">
                                            Automobilová elektronika
                                        </SelectItem>
                                        <SelectItem value="Elektroenergetika">Elektroenergetika</SelectItem>
                                        <SelectItem value="Fyzikálne inžinierstvo progresívnych materiálov">
                                            Fyzikálne inžinierstvo progresívnych materiálov
                                        </SelectItem>
                                        <SelectItem value="Hospodárska informatika">Hospodárska informatika</SelectItem>
                                        <SelectItem value="Inteligentné systémy">Inteligentné systémy</SelectItem>
                                        <SelectItem value="Počítačové modelovanie">Počítačové modelovanie</SelectItem>
                                        <SelectItem value="Počítačové siete">Počítačové siete</SelectItem>
                                        <SelectItem value="Priemyselná elektrotechnika">
                                            Priemyselná elektrotechnika
                                        </SelectItem>
                                        <SelectItem value="Kyberbezpečnosť">Kyberbezpečnosť</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.studyProgram && <p className="text-red-500 text-sm">{errors.studyProgram.message}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label>Študijný stupeň</Label>
                    <Controller
                        name="studyDegree"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Študijný stupeň je povinný' }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded">
                                    <SelectValue placeholder="Vyberte študijný stupeň" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Študijný stupeň</SelectLabel>
                                        <SelectItem value="Bc.">Bc.</SelectItem>
                                        <SelectItem value="Ing.">Ing.</SelectItem>
                                        <SelectItem value="Doc.">Doc.</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.studyDegree && <p className="text-red-500 text-sm">{errors.studyDegree.message}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label>Rok štúdia</Label>
                    <Controller
                        name="studyYear"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Rok štúdia je povinný' }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded">
                                    <SelectValue placeholder="Vyberte rok štúdia" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Rok štúdia</SelectLabel>
                                        {watchStudyDegree === 'Bc.' && (
                                            <>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                            </>
                                        )}
                                        {watchStudyDegree === 'Ing.' && (
                                            <>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                            </>
                                        )}
                                        {watchStudyDegree === 'Doc.' && (
                                            <>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="5">5</SelectItem>
                                            </>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.studyYear && <p className="text-red-500 text-sm">{errors.studyYear.message}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label>Účel</Label>
                    <Input
                        type="text"
                        {...register('purpose', { required: 'Účel je povinný' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose.message}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label>Dôvod</Label>
                    <Textarea
                        {...register('reason', { required: 'Dôvod je povinný' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        maxLength={250}
                    />
                    {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
                </div>

                <div className="flex flex-col gap-3">
                    <Label htmlFor="attachment-input">Príloha</Label>

                    {initialValues?.attachmentUrl && !attachment ? (
                        <div className="flex items-center justify-between p-2 border rounded-md bg-muted">
                            <span className="text-sm text-muted-foreground">Stiahnuť existujúcu prílohu</span>
                            <Button asChild variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                                <a href={initialValues.attachmentUrl} target="_blank" rel="noopener noreferrer">
                                    <DownloadIcon className="w-4 h-4" />
                                    Stiahnuť
                                </a>
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-md bg-muted">
                            {attachment ? (
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-sm font-medium text-primary">{attachment.name}</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setAttachment(null);
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
                    )}

                    <Input
                        ref={fileInputRef}
                        id="attachment-input"
                        type="file"
                        accept=".pdf, .doc, .docx, .txt"
                        className="hidden"
                        onChange={(event) => {
                            const files = event.target.files;
                            if (files && files.length > 0) {
                                const file = files[0];
                                setAttachment(file);
                            }
                        }}
                    />
                </div>
                {errors.attachment && <p className="text-red-500 text-sm">{errors.attachment.message}</p>}

                <div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Odoslať'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
