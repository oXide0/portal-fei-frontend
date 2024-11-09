import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Attachment } from './attachment';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface RequestFormProps {
    title: string;
    initialValues?: IFormInput;
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

const RequestForm = ({ title, initialValues, onSubmit }: RequestFormProps) => {
    const [attachment, setAttachment] = useState<File | null>(null);
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
                <div>
                    <label className="block text-sm font-medium mb-1">Meno študenta</label>
                    <Input
                        type="text"
                        {...register('studentName', {
                            required: 'Meno študenta je povinné',
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.studentName && <p className="text-red-500 text-sm">{errors.studentName.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Priezvisko študenta</label>
                    <Input
                        type="text"
                        {...register('studentSurname', {
                            required: 'Priezvisko študenta je povinné',
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.studentSurname && <p className="text-red-500 text-sm">{errors.studentSurname.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Študijný program</label>
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
                <div>
                    <label className="block text-sm font-medium mb-1">Študijný stupeň</label>
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
                <div>
                    <label className="block text-sm font-medium mb-1">Rok štúdia</label>
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
                <div>
                    <label className="block text-sm font-medium mb-1">Účel</label>
                    <Input
                        type="text"
                        {...register('purpose', { required: 'Účel je povinný' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Dôvod</label>
                    <Textarea
                        {...register('reason', { required: 'Dôvod je povinný' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium mb-1">Príloha</label>
                    {initialValues?.attachmentUrl && (
                        <Attachment label="Stiahnuť existujúcu prílohu" url={initialValues.attachmentUrl} />
                    )}
                    <Input
                        type="file"
                        accept=".pdf, .doc, .docx, .txt"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        onChange={(event) => {
                            const files = event.target.files;
                            if (files && files.length > 0) {
                                setAttachment(files[0]);
                            }
                        }}
                    />
                </div>
                {errors.attachment && <p className="text-red-500 text-sm">{errors.attachment.message}</p>}
                <div>
                    <Button type="submit" className="w-full">
                        Odoslať
                    </Button>
                </div>
            </form>
        </div>
    );
};

export { RequestForm };
