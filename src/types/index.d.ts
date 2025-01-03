import countries from "../data/country-data";

type FirebaseTimestamp = firebase.firestore.Timestamp;

export interface User {
    id: string;
    name: string;
    country: keyof typeof countries;
    userAgent: string;
    typingTimeout?: NodeJS.Timeout;
    createdAt?: FirebaseTimestamp;
}

export interface UserStatus {
    id: string;
    name: string;
    isOnline: boolean;
    isTyping?: boolean;
    lastOnline: FirebaseTimestamp;
}

export interface Message {
    id: string;
    userId: string;
    userName: string;
    content: string;
    timestamp: FirebaseTimestamp;
}
