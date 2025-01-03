import { useState, useEffect } from 'react';
import { onValue, query, ref, limitToLast, orderByChild, equalTo, get } from 'firebase/database';
import { UserStatus } from '../types';
import { rtdb } from '../lib/firebase';
import { reverse } from 'lodash';

// Options interface for the hook
interface UseOnlineUsersOptions {
    limit?: number; // Maximum number of users to fetch
    countOnly?: boolean; // Whether to only count online users
}

// Custom hook to fetch online users and/or their count
const useOnlineUsers = ({ limit = 25, countOnly = false }: UseOnlineUsersOptions) => {
    const [users, setUsers] = useState<UserStatus[]>([]); // State for user data
    const [onlineCount, setOnlineCount] = useState<number>(0); // State for online users count

    const fetchOnlineCount = async () => {
        try {
            const countQuery = query(ref(rtdb, 'status'), orderByChild('isOnline'), equalTo(true));
            const snapshot = await get(countQuery);
            setOnlineCount(snapshot.size);
        } catch (error) {
            console.error('Error fetching online count:', error);
        }
    };

    const fetchUsers = () => {
        const userQuery = query(ref(rtdb, 'status'), orderByChild('lastOnline'), limitToLast(limit));

        const unsubscribe = onValue(userQuery, snapshot => {
            const usersData: UserStatus[] = [];

            snapshot.forEach(childSnapshot => {
                const user = childSnapshot.val();
                usersData.push({ id: childSnapshot.key, ...user });
            });

            setUsers(reverse(usersData));
        });

        return unsubscribe;
    };

    useEffect(() => {
        if (countOnly) {
            fetchOnlineCount();
        } else {
            const unsubscribe = fetchUsers();
            fetchOnlineCount();
            return () => unsubscribe();
        }
    }, [limit, countOnly]);

    return { users, onlineCount };
};

export default useOnlineUsers;
