import { useState, useEffect } from 'react';
import { query, ref, orderByChild, onValue, limitToLast } from 'firebase/database';
import { rtdb } from '../lib/firebase';

import { UserStatus } from '../types';
import { reverse } from 'lodash';

interface UseOnlineUsersOptions {
    limit?: number;
}

const useOnlineUsers = ({ limit = 25 }: UseOnlineUsersOptions = {}) => {
    const [users, setUsers] = useState<UserStatus[]>([]);

    useEffect(() => {
        const userQuery = query(ref(rtdb, 'userStatus'), orderByChild('updatedAt'), limitToLast(limit));

        const unsubscribe = onValue(userQuery, snapshot => {
            const usersData: UserStatus[] = [];

            snapshot.forEach(childSnapshot => {
                const user = childSnapshot.val();
                usersData.push({ id: childSnapshot.key, ...user });
            });

            setUsers(reverse(usersData));
        });

        return () => unsubscribe();
    }, [limit]);

    return { users };
};

export default useOnlineUsers;
