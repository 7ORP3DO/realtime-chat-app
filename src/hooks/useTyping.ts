import { useState, useEffect } from 'react';
import { onValue, query, ref, orderByChild, equalTo } from 'firebase/database';
import { rtdb } from '../lib/firebase';
import { TypingStatus } from '@/types';

const useTyping = () => {
    const [typingUsers, setTypingUsers] = useState<TypingStatus[]>([]);

    useEffect(() => {
        const typingQuery = query(ref(rtdb, 'typing'), orderByChild('isTyping'), equalTo(true));

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
