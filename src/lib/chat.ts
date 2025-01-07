import { ref, serverTimestamp as serverTimestampRealtime, set } from 'firebase/database';
import { db, rtdb } from '../lib/firebase';
import { Message, TypingStatus, User } from '../types';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { startAfter, addDoc, serverTimestamp, QueryDocumentSnapshot, onSnapshot } from 'firebase/firestore';

const INITIAL_MESSAGES = 30;
const MESSAGES_PER_PAGE = 5;

const loadInitialMessages = async () => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(INITIAL_MESSAGES));
    const snapshot = await getDocs(q);

    console.log('Loading initial messages...');

    return {
        messages: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Message[],
        lastDoc: snapshot.docs[snapshot.docs.length - 1],
        hasMore: snapshot.docs.length === INITIAL_MESSAGES,
    };
};

const loadMoreMessages = async (lastDoc: QueryDocumentSnapshot) => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), startAfter(lastDoc), limit(MESSAGES_PER_PAGE));
    const snapshot = await getDocs(q);

    console.log('Loading more messages...');

    return {
        messages: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Message[],
        lastDoc: snapshot.docs[snapshot.docs.length - 1],
        hasMore: snapshot.docs.length === MESSAGES_PER_PAGE,
    };
};

const subscribeToNewMessages = (onUpdate: (messages: Message[]) => void, onError?: (error: Error) => void) => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(1));
    console.log('Subscribing to new messages...');

    return onSnapshot(
        q,
        snapshot => {
            console.log('New message received...');
            const newMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Message[];
            if (newMessages.length > 0) onUpdate(newMessages);
        },
        onError
    );
};

const sendMessage = async (content: string, currentUser: User) => {
    console.log('Sending message...');

    const newMessage: Partial<Message> = {
        content,
        userId: currentUser.id,
        userName: currentUser.name,
        userCountry: currentUser.country,
        timestamp: serverTimestamp(),
    };

    return addDoc(collection(db, 'messages'), newMessage);
};

const updateTypingStatus = (isTyping: boolean, user: User) => {
    try {
        const typingStatusRef = ref(rtdb, `typingStatus/${user.id}`);

        const typingData: Partial<TypingStatus> = {
            name: user.name,
            isTyping,
            updatedAt: serverTimestampRealtime(),
        };

        set(typingStatusRef, typingData);
    } catch (error) {
        console.error('Error updating typing:', error);
    }
};

export { loadInitialMessages, loadMoreMessages, subscribeToNewMessages, sendMessage, updateTypingStatus };
