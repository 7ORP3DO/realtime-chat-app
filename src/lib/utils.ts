import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import { format, isToday, isYesterday, isThisWeek } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDateCalendar(date: Date): string {
    if (isToday(date)) return 'Today';
    else if (isYesterday(date)) return 'Yesterday';
    else if (isThisWeek(date)) return format(date, 'eeee');
    else return format(date, 'MMM d, yyyy');
}
