import { useState, useEffect, useRef, useCallback } from 'react';
import { Message, User } from '../types';
import { db } from '../lib/firebase';
import _, { reverse, set, uniqBy } from 'lodash';
import { useSettingsContext } from '../context/settings-context';
import { loadInitialMessages, loadMoreMessages, sendMessage as sendMessageSerice, subscribeToNewMessages } from '../lib/chat';
import { soundManager } from '../lib/sound';

const useChat = (currentUser: User | null) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const store = useRef<any>({ lastMessageRef: null });
    const { settings } = useSettingsContext();

    useEffect(() => {
        console.log('Filtering messages...');
        setMessages(prev => uniqBy(prev, 'id'));
    }, [messages.length]);

    // Load initial messages
    useEffect(() => {
        if (messages.length > 0) return;

        (async () => {
            // @ts-ignore
            const { messages, hasMore, lastDoc } = await loadInitialMessages();

            setMessages(messages.reverse());
            store.current.lastMessageRef = lastDoc;
            setHasMore(hasMore);
            setIsLoading(false);
        })();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToNewMessages(newMsgs => {
            // newMsgs is an array of new messages. I need to add them to the messages state but before that I need to check
            // if any of the new messages are already in the messages state. i can use lodash
            const uniqueNewMsgs = _.differenceBy(newMsgs, messages, 'id');
            console.log('New messages:', newMsgs.length, 'Unique new messages:', uniqueNewMsgs.length, 'Total messages:', messages.length);
            if (uniqueNewMsgs.length == 0) return;

            setMessages(prev => [...prev, ...uniqueNewMsgs]);

            if (settings.soundEnabled) soundManager.play('newMessage');
        });

        return () => unsubscribe();
    }, []);

    // const loadMore = useCallback(async () => {
    //     if (!store.current.lastMessageRef || !hasMore) return;

    //     setIsLoading(true);

    //     const { messages, hasMore: hasMoreOlderMessages, lastDoc } = await loadMoreMessages(store.current.lastMessageRef);

    //     if (messages.length > 0) {
    //         setMessages(prev => [...messages.reverse(), ...prev]);
    //         store.current.lastMessageRef = lastDoc;
    //         setHasMore(hasMoreOlderMessages);
    //     } else {
    //         setHasMore(false);
    //     }
    // }, [hasMore]);

    const sendMessage = async (content: string) => {
        if (!currentUser) return;
        setIsSending(true);

        try {
            await sendMessageSerice(content, currentUser);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSending(false);
        }
    };

    return { messages, isLoading, isSending, sendMessage };
};

export default useChat;
