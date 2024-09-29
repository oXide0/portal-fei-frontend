import { useLazyDownloadFileQuery } from '../services/isp/request';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
// Refactor this file
const Attachment = ({ attachmentPath }: { attachmentPath: string | null }) => {
    const [triggerDownload] = useLazyDownloadFileQuery();

    const handleDownload = () => {
        if (attachmentPath) {
            triggerDownload(attachmentPath) // Trigger the lazy query
                .then((result) => {
                    // Ensure the result contains valid data
                    if (result.data) {
                        const blob = new Blob([result.data]); // Create Blob from result
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        const fileName = attachmentPath.split('/').pop() || 'downloadedFile';
                        link.href = url;
                        link.setAttribute('download', fileName);
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                    } else {
                        console.error('No file data available');
                    }
                })
                .catch((error) => console.error('Download failed', error));
        }
    };
    return (
        <td className="py-2 px-4 border">
            {attachmentPath ? (
                <button onClick={handleDownload} className="flex items-center text-blue-500 hover:text-blue-700">
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                    Download Attachment
                </button>
            ) : (
                'Žiadna príloha'
            )}
        </td>
    );
};

export default Attachment;
