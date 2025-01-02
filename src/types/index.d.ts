type FirebaseTimestamp = firebase.firestore.Timestamp;

export interface User {
    id: string;
    name: string;
    isOnline: boolean;
    lastOnline: FirebaseTimestamp;
    userAgent: string;
    isTyping?: boolean;
    typingTimeout?: NodeJS.Timeout;
    createdAt?: FirebaseTimestamp;
}

export interface Message {
    id: string;
    userId: string;
    userName: string;
    content: string;
    timestamp: number;
}
