import { useLazyDownloadFileQuery } from '../services/isp/request';
import { Download } from 'lucide-react';

interface AttachmentProps {
    attachmentPath: string | null;
    label?: string;
}

const Attachment = ({ attachmentPath, label = 'Stiahnuť prílohu' }: AttachmentProps) => {
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
        <button type="button" onClick={handleDownload} className="flex items-center text-blue-500 hover:text-blue-700">
            <Download className="h-5 w-5 mr-2" aria-hidden="true" />
            {label}
        </button>
    ) : (
        <p>Žiadna príloha</p>
    );
};

export { Attachment };
