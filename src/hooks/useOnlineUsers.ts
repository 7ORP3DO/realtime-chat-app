import { useState, useEffect } from 'react';
import { onValue, query, ref, limitToLast, orderByChild } from 'firebase/database';
import { User, UserStatus } from '../types';
import { rtdb } from '../lib/firebase';
import { reverse } from 'lodash';

const useOnlineUsers = () => {
    const [users, setUsers] = useState<UserStatus[]>([]);

    useEffect(() => {
        const userStatusRef = query(ref(rtdb, 'status'), orderByChild('lastOnline'), limitToLast(25));

        const unsubscribe = onValue(userStatusRef, snapshot => {
            const usersData: UserStatus[] = [];

            snapshot.forEach(childSnapshot => {
                const user = childSnapshot.val();
                usersData.push({
                    id: childSnapshot.key || '',
                    ...user,
                });
            });

            setUsers(reverse(usersData));
        });

        // Clean up the listener
        return () => unsubscribe();
    }, []);

    return { users };
};

export default useOnlineUsers;
