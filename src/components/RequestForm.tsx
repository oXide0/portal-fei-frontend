import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./Button";

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
    attachment: string | null;
}

const RequestForm = ({ title, initialValues, onSubmit }: RequestFormProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: initialValues,
    });

    const onSubmitData: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
        onSubmit(data);
    };

    useEffect(() => {
        if (initialValues) {
            Object.keys(initialValues).forEach((key) => {
                setValue(
                    key as keyof IFormInput,
                    initialValues[key as keyof IFormInput]
                );
            });
        }
    }, [initialValues, setValue]);

    return (
        <div className="max-w-4xl my-0 mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            <form onSubmit={handleSubmit(onSubmitData)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Meno študenta
                    </label>
                    <input
                        type="text"
                        {...register("studentName", {
                            required: "Meno študenta je povinné",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.studentName && (
                        <p className="text-red-500 text-sm">
                            {errors.studentName.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Priezvisko študenta
                    </label>
                    <input
                        type="text"
                        {...register("studentSurname", {
                            required: "Priezvisko študenta je povinné",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.studentSurname && (
                        <p className="text-red-500 text-sm">
                            {errors.studentSurname.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Študijný program
                    </label>
                    <input
                        type="text"
                        {...register("studyProgram", {
                            required: "Študijný program je povinný",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.studyProgram && (
                        <p className="text-red-500 text-sm">
                            {errors.studyProgram.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Študijný stupeň
                    </label>
                    <select
                        defaultValue=""
                        {...register("studyDegree", {
                            required: "Študijný stupeň je povinný",
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
                    {errors.studyDegree && (
                        <p className="text-red-500 text-sm">
                            {errors.studyDegree.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Rok štúdia
                    </label>
                    <input
                        type="number"
                        {...register("studyYear", {
                            required: "Rok štúdia je povinný",
                            min: 1,
                            max: 6,
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.studyYear && (
                        <p className="text-red-500 text-sm">
                            {errors.studyYear.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Účel
                    </label>
                    <input
                        type="text"
                        {...register("purpose", {
                            required: "Účel je povinný",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.purpose && (
                        <p className="text-red-500 text-sm">
                            {errors.purpose.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Dôvod
                    </label>
                    <textarea
                        {...register("reason", {
                            required: "Dôvod je povinný",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    ></textarea>
                    {errors.reason && (
                        <p className="text-red-500 text-sm">
                            {errors.reason.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Príloha (nepovinné)
                    </label>
                    <input
                        type="file"
                        {...register("attachment")}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>

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
