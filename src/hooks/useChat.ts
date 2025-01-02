import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Message, User } from '../types';
import { db } from '../lib/firebase';

const useChat = (currentUser: User | null) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(100));

        const unsubscribe = onSnapshot(q, snapshot => {
            const newMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)).reverse();
            setMessages(newMessages);
        });

        return () => unsubscribe();
    }, []);

    const handleTyping = async () => {};

    const sendMessage = async (content: string) => {
        if (!currentUser) return;

        const newMessage = {
            userId: currentUser.id,
            userName: currentUser.name,
            content,
            timestamp: serverTimestamp(),
        };

        await addDoc(collection(db, 'messages'), newMessage);
    };

    return { messages, sendMessage, handleTyping };
};

export default useChat;
