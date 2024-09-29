import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from './Button';

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
    studyYear: number;
    purpose: string;
    reason: string;
    attachment?: File | null;
    attachmentPath?: string | null;
}

const RequestForm = ({ title, initialValues, onSubmit }: RequestFormProps) => {
    const [attachment, setAttachment] = useState<File | null>(null);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: initialValues,
    });

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
                    <input
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
                    <input
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
                    <select
                        {...register('studyProgram', {
                            required: 'Študijný program je povinný',
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        <option value="">-- Vyberte program --</option>
                        <option value="Informatika">Informatika</option>
                        <option value="Aplikovaná elektrotechnika">Aplikovaná elektrotechnika</option>
                        <option value="Automobilová elektronika">Automobilová elektronika</option>
                        <option value="Elektroenergetika">Elektroenergetika</option>
                        <option value="Fyzikálne inžinierstvo progresívnych materiálov">
                            Fyzikálne inžinierstvo progresívnych materiálov
                        </option>
                        <option value="Hospodárska informatika">Hospodárska informatika</option>
                        <option value="Inteligentné systémy">Inteligentné systémy</option>
                        <option value="Počítačové modelovanie">Počítačové modelovanie</option>
                        <option value="Počítačové siete">Počítačové siete</option>
                        <option value="Priemyselná elektrotechnika">Priemyselná elektrotechnika</option>
                        <option value="Kyberbezpečnosť">Kyberbezpečnosť</option>
                    </select>
                    {errors.studyProgram && <p className="text-red-500 text-sm">{errors.studyProgram.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Študijný stupeň</label>
                    <select
                        defaultValue=""
                        {...register('studyDegree', {
                            required: 'Študijný stupeň je povinný',
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        <option value="" disabled>
                            Vyberte študijný stupeň
                        </option>
                        <option value="Bc.">Bc.</option>
                        <option value="Ing.">Ing.</option>
                        <option value="Doc.">Doc.</option>
                    </select>
                    {errors.studyDegree && <p className="text-red-500 text-sm">{errors.studyDegree.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Rok štúdia</label>
                    <input
                        type="number"
                        {...register('studyYear', {
                            required: 'Rok štúdia je povinný',
                            min: 1,
                            max: 6,
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.studyYear && <p className="text-red-500 text-sm">{errors.studyYear.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Účel</label>
                    <input
                        type="text"
                        {...register('purpose', {
                            required: 'Účel je povinný',
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Dôvod</label>
                    <textarea
                        {...register('reason', {
                            required: 'Dôvod je povinný',
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    ></textarea>
                    {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Odkaz na prílohu (nepovinné)</label>
                    {initialValues?.attachmentPath && (
                        <div className="mb-2">
                            <a
                                href={initialValues.attachmentPath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500"
                            >
                                Zobraziť existujúcu prílohu
                            </a>
                        </div>
                    )}
                    <input
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

export default RequestForm;
