import { useForm, SubmitHandler } from "react-hook-form";
import { CreateRequestBody as IFormInput } from "../types/isp/Request";

interface RequestFormProps {
    title: string;
    onSubmit: (data: IFormInput) => void;
}

const RequestForm = ({ title, onSubmit }: RequestFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();

    const onSubmitData: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
        onSubmit(data);
    };

    return (
        <div className="max-w-4xl my-0 mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            <form onSubmit={handleSubmit(onSubmitData)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        User ID
                    </label>
                    <input
                        type="text"
                        {...register("userId", {
                            required: "User ID is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.userId && (
                        <p className="text-red-500 text-sm">
                            {errors.userId.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Student Name
                    </label>
                    <input
                        type="text"
                        {...register("studentName", {
                            required: "Student Name is required",
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
                        Student Surname
                    </label>
                    <input
                        type="text"
                        {...register("studentSurname", {
                            required: "Student Surname is required",
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
                        Study Program
                    </label>
                    <input
                        type="text"
                        {...register("studyProgram", {
                            required: "Study Program is required",
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
                        Study Degree
                    </label>
                    <input
                        type="text"
                        {...register("studyDegree", {
                            required: "Study Degree is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.studyDegree && (
                        <p className="text-red-500 text-sm">
                            {errors.studyDegree.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Study Year
                    </label>
                    <input
                        type="number"
                        {...register("studyYear", {
                            required: "Study Year is required",
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
                        Purpose
                    </label>
                    <input
                        type="text"
                        {...register("purpose", {
                            required: "Purpose is required",
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
                        Reason
                    </label>
                    <textarea
                        {...register("reason", {
                            required: "Reason is required",
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
                        Attachment (optional)
                    </label>
                    <input
                        type="file"
                        {...register("attachment")}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default RequestForm;
