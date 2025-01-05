import { useState, useEffect, useRef, useCallback } from 'react';
import { Message, User } from '../types';
import { differenceBy, uniqBy } from 'lodash';
import { useSettingsContext } from '../context/settings-context';
import { loadInitialMessages, loadMoreMessages, sendMessage as sendMessageService, subscribeToNewMessages } from '../lib/chat';
import { soundManager } from '../lib/sound';

const useChat = (currentUser: User | null) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const store = useRef<{ lastMessageRef: any | null }>({ lastMessageRef: null });
    const { settings } = useSettingsContext();

    // Load initial messages
    useEffect(() => {
        if (messages.length > 0) return;

        const fetchInitialMessages = async () => {
            const { messages: initialMessages, hasMore: moreAvailable, lastDoc } = await loadInitialMessages();

            setMessages(uniqBy(initialMessages.reverse(), 'id'));
            store.current.lastMessageRef = lastDoc;
            setHasMore(moreAvailable);
            setIsLoading(false);
        };

        fetchInitialMessages();
    }, [messages.length]);

    // Subscribe to new messages
    useEffect(() => {
        const unsubscribe = subscribeToNewMessages(newMsgs => {
            setMessages(prevMessages => {
                const uniqueNewMsgs = differenceBy(newMsgs, prevMessages, 'id');
                if (uniqueNewMsgs.length > 0 && settings.soundEnabled) soundManager.play('newMessage');
                return uniqBy([...prevMessages, ...uniqueNewMsgs], 'id');
            });
        });

        return () => unsubscribe();
    }, [settings.soundEnabled]);

    const loadMore = useCallback(async () => {
        if (!store.current.lastMessageRef || !hasMore) return;

        setIsLoading(true);
        const { messages: olderMessages, hasMore: moreOlderMessages, lastDoc } = await loadMoreMessages(store.current.lastMessageRef);

        setMessages(prevMessages => uniqBy([...olderMessages.reverse(), ...prevMessages], 'id'));
        setIsLoading(false);

        setHasMore(moreOlderMessages);
        store.current.lastMessageRef = lastDoc;
    }, [hasMore]);

    const sendMessage = useCallback(
        async (content: string) => {
            if (!currentUser) return;

            setIsSending(true);
            try {
                await sendMessageService(content, currentUser);
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                setIsSending(false);
            }
        },
        [currentUser]
    );

    return { messages, isLoading, isSending, sendMessage, loadMore, hasMore };
};

export default useChat;
