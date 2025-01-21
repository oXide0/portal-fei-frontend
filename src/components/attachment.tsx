import { useLazyDownloadFileQuery, useLazyGenerateDocumentQuery } from '../services/isp/request';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

interface AttachmentProps {
    url: string;
    label?: string;
    variant?: 'download' | 'generate';
}

const Attachment = ({ url, variant = 'download', label = 'Stiahnuť prílohu' }: AttachmentProps) => {
    const [triggerDownload, { isError: attachmentError }] = useLazyDownloadFileQuery();
    const [triggerGenerateDocument, { isError: documentError }] = useLazyGenerateDocumentQuery();
    const { toast } = useToast();
    const action = variant === 'download' ? triggerDownload : triggerGenerateDocument;

    const handleAction = async () => {
        try {
            const response = await action(url).unwrap();
            const fileType = getFileType(url);
            const blob = new Blob([response], { type: fileType });
            const blobUrl = window.URL.createObjectURL(blob);
            const fileName = url.split('/').pop() || 'downloadedFile';
            const extension = fileType === 'application/pdf' ? '.pdf' : '.docx';
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', fileName + extension);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            // Only log the error; let useEffect handle the toast
            console.error(`${variant} failed`, error);
        }
    };

    useEffect(() => {
        if (attachmentError || documentError) {
            toast({
                title: 'Nepodarilo sa spracovať požiadavku',
                description: `Nastala chyba pri spracovaní požiadavky na ${variant === 'download' ? 'stiahnutie' : 'vygenerovanie'} dokumentu.`,
                variant: 'destructive',
            });
        }
    }, [attachmentError, documentError, toast, variant]);

    const getFileType = (url: string): string => {
        const extension = url.split('.').pop()?.toLowerCase();
        if (extension === 'pdf') {
            return 'application/pdf';
        } else if (extension === 'docx') {
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        }
        return 'application/octet-stream';
    };

    return url ? (
        <>
            <button
                type="button"
                onClick={handleAction}
                className="flex items-center text-blue-500 hover:text-blue-700"
            >
                <Download className="h-5 w-5 mr-2 hidden lg:inline" aria-hidden="true" />
                {label}
            </button>
        </>
    ) : (
        <p>Žiadna príloha</p>
    );
};

export { Attachment };
