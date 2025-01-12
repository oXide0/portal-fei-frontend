export function ForbiddenPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen pb-[10%]">
            <h1 className="text-4xl font-bold text-red-600">403 Forbidden</h1>
            <p className="text-gray-600 mt-4">You don’t have permission to access this page.</p>
        </div>
    );
}
