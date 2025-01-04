import { useState, useEffect } from 'react';
import { onValue, query, ref, orderByChild, equalTo } from 'firebase/database';
import { rtdb } from '../lib/firebase';

const useOnlineCount = () => {
    const [onlineCount, setOnlineCount] = useState<number>(0);

    useEffect(() => {
        const countQuery = query(ref(rtdb, 'status'), orderByChild('isOnline'), equalTo(true));

        const unsubscribe = onValue(
            countQuery,
            snapshot => setOnlineCount(snapshot.size),
            error => console.error('Error in online count subscription:', error)
        );

        return () => unsubscribe();
    }, []);

    return { onlineCount };
};

export default useOnlineCount;
