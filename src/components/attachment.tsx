import { useLazyDownloadFileQuery } from '../services/isp/request';
import { Download } from 'lucide-react';

interface AttachmentProps {
    url: string | null;
    label?: string;
}

const Attachment = ({ url, label = 'Stiahnuť prílohu' }: AttachmentProps) => {
    const [triggerDownload] = useLazyDownloadFileQuery();

    const handleDownload = () => {
        if (url) {
            triggerDownload(url)
                .unwrap()
                .then((result) => {
                    const blob = new Blob([result], { type: 'application/pdf' });
                    const blobUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    const fileName = url.split('/').pop() || 'downloadedFile.pdf';
                    link.href = blobUrl;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(blobUrl);
                })
                .catch((error) => console.error('Download failed', error));
        }
    };

    return url ? (
        <button type="button" onClick={handleDownload} className="flex items-center text-blue-500 hover:text-blue-700">
            <Download className="h-5 w-5 mr-2 hidden lg:inline" aria-hidden="true" />
            {label}
        </button>
    ) : (
        <p>Žiadna príloha</p>
    );
};

export { Attachment };
