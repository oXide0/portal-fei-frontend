import { CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from './use-toast';

interface ToastOptions {
    successMessage: string;
    errorMessage: string;
}

export const useMutationWithToast = <T, R>(mutation: (data: T) => any) => {
    const { toast } = useToast();

    return async (data: T, options: ToastOptions): Promise<R> => {
        const { successMessage, errorMessage } = options;

        try {
            const response: R = await mutation(data).unwrap();

            toast({
                className: 'bg-green-100',
                description: (
                    <div className="flex items-center gap-2">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span>{successMessage}</span>
                    </div>
                ),
            });
            return response;
        } catch (error) {
            toast({
                className: 'bg-red-100',
                description: (
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                        <span>{errorMessage}</span>
                    </div>
                ),
            });
            throw error; // re-throw the error to handle further if needed
        }
    };
};
