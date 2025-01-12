import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function DashboardPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen pb-[15%] bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Teacher Dashboard</h1>
            <p className="text-gray-600 mb-8">Select an option to get started:</p>

            <div className="grid grid-cols-1 gap-4 w-full max-w-md">
                <Button onClick={() => navigate('/skex/create-exam')} className="w-full py-3 text-lg">
                    Create Exam
                </Button>

                <Button onClick={() => navigate('/skex/manage-students')} className="w-full py-3 text-lg">
                    Manage Students
                </Button>

                <Button onClick={() => navigate('/skex/upload-results')} className="w-full py-3 text-lg">
                    Upload Results
                </Button>
            </div>
        </div>
    );
}
