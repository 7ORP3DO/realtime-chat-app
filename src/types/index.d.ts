type FirebaseTimestamp = firebase.firestore.Timestamp;

export interface User {
    id: string;
    name: string;
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
    timestamp: number;
}
