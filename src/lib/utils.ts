import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
    const parts = name.trim().split(' ');
    const initials = parts.map((part) => part.charAt(0).toUpperCase()).join('');

    return initials;
}
