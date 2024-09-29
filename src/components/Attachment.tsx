import { useLazyDownloadFileQuery } from '../services/isp/request';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const Attachment = ({ attachmentPath }: { attachmentPath: string | null }) => {
    const [triggerDownload] = useLazyDownloadFileQuery();

    const handleDownload = () => {
        if (attachmentPath) {
            triggerDownload(attachmentPath)
                .unwrap()
                .then((result) => {
                    const blob = new Blob([result]);
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    const fileName = attachmentPath.split('/').pop() || 'downloadedFile';
                    link.href = url;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                })
                .catch((error) => console.error('Download failed', error));
        }
    };

    return attachmentPath ? (
        <button onClick={handleDownload} className="flex items-center text-blue-500 hover:text-blue-700">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Stiahnuť prílohu
        </button>
    ) : (
        <p>Žiadna príloha</p>
    );
};

export default Attachment;
