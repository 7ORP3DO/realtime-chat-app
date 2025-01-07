import { useState, useEffect } from 'react';
import { onValue, query, ref, orderByChild, equalTo } from 'firebase/database';
import { rtdb } from '../lib/firebase';
import { TypingStatus } from '@/types';
import { soundManager } from '@/lib/sound';
import { useSettingsContext } from '@/context/settings-context';

const useTyping = () => {
    const { settings } = useSettingsContext();
    const [typingUsers, setTypingUsers] = useState<TypingStatus[]>([]);

    useEffect(() => {
        if (typingUsers.length > 0 && settings.soundEnabled) soundManager.play('typing');
    }, [typingUsers.length]);

    useEffect(() => {
        const typingQuery = query(ref(rtdb, 'typingStatus'), orderByChild('isTyping'), equalTo(true));

        const unsubscribe = onValue(typingQuery, snapshot => {
            const typingData: TypingStatus[] = [];

            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                typingData.push({ id: childSnapshot.key, ...data });
            });

            setTypingUsers(typingData);
        });

        return () => unsubscribe();
    }, []);

    return { typingUsers };
};

export default useTyping;
