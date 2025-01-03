import countries from '../data/country-data';

type FirebaseTimestamp = firebase.firestore.Timestamp;

export interface User {
    id: string;
    name: string;
    userAgent: string;
    typingTimeout?: NodeJS.Timeout;
    createdAt?: FirebaseTimestamp;
    country: keyof typeof countries;
}

export interface UserStatus {
    id: User['id'];
    name: User['name'];
    isOnline: boolean;
    isTyping?: boolean;
    lastOnline: FirebaseTimestamp;
}

export interface Message {
    id: string;
    content: string;
    timestamp: FirebaseTimestamp;

    userId: User['id'];
    userName: User['name'];
    userCountry: User['country'];
}
