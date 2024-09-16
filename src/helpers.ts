import { RequestStatus } from './types/isp/Request';
import { SubjectStatus } from './types/isp/Subject';
import { TableStatus } from './types/isp/Table';

export const parseIdToken = (idToken: string) => {
    if (!idToken) {
        throw new Error('Invalid token');
    }

    const tokenParts = idToken.split('.');

    if (tokenParts.length !== 3) {
        throw new Error('Invalid token structure');
    }

    try {
        const payload = atob(tokenParts[1]);

        return JSON.parse(payload);
    } catch (error) {
        throw new Error('Failed to parse token payload');
    }
};

export const prettifyRequestStatus = (status: RequestStatus): string => {
    if (status === 'APPROVED') {
        return 'Schválené';
    }
    if (status === 'DECLINED') {
        return 'Zamietnuté';
    }
    if (status === 'PENDING') {
        return 'Čaká na schválenie';
    }
    if (status === 'RETURNED') {
        return 'Vrátené';
    }

    throw new Error(`Unhandled status: ${status}`);
};

export const prettifyTableStatus = (status: TableStatus): string => {
    if (status === 'APPROVED') {
        return 'Schválené';
    }
    if (status === 'DECLINED') {
        return 'Zamietnuté';
    }
    if (status === 'PENDING') {
        return 'Čaká na schválenie';
    }

    throw new Error(`Unhandled status: ${status}`);
};

export const prettifySubjectStatus = (status: SubjectStatus): string => {
    if (status === 'APPROVED') {
        return 'Schválené';
    }
    if (status === 'DECLINED') {
        return 'Zamietnuté';
    }
    if (status === 'PENDING') {
        return 'Čaká na schválenie';
    }

    throw new Error(`Unhandled status: ${status}`);
};
