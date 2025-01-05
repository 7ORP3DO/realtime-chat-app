import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Message, User } from '../types';
import { db } from '../lib/firebase';
import { reverse } from 'lodash';
import { soundManager } from '../lib/sound';
import { useSettingsContext } from '../context/settings-context';

const useChat = (currentUser: User | null) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const { settings } = useSettingsContext();

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(100));

        const unsubscribe = onSnapshot(
            q,
            snapshot => {
                const newMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Message[];
                setMessages(reverse(newMessages));
                setIsLoading(false);
                if (settings.soundEnabled) soundManager.play('newMessage');
            },
            error => {
                console.error('Error fetching messages:', error);
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const sendMessage = async (content: string) => {
        if (!currentUser) return;

        setIsSending(true);
        const newMessage: Partial<Message> = {
            content,
            userId: currentUser.id,
            userName: currentUser.name,
            userCountry: currentUser.country,
            timestamp: serverTimestamp(),
        };

        try {
            await addDoc(collection(db, 'messages'), newMessage);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSending(false);
        }
    };

    return { messages, isLoading, isSending, sendMessage };
};

export default useChat;
