import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { getDatabase, ref, set, onDisconnect, serverTimestamp as serverTimestampRtdb } from 'firebase/database';
import { User } from '../types';
import { db } from '../lib/firebase';

const getUserAgent = () => encodeURIComponent(navigator.userAgent);

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const savedUserId = Cookies.get('userId');
        const savedName = Cookies.get('userName');
        if (savedUserId && savedName) checkExistingUser(savedName);
        else setIsLoading(false);
    }, []);

    const updatePresence = (userId: string, userName: string) => {
        const database = getDatabase();
        const userStatusRef = ref(database, `status/${userId}`);
        set(userStatusRef, { name: userName, isOnline: true, lastOnline: serverTimestampRtdb() });
        onDisconnect(userStatusRef).update({ isOnline: false, lastOnline: serverTimestampRtdb() });
    };

    const checkExistingUser = async (name: string) => {
        setIsLoading(true);
        try {
            const userAgent = getUserAgent();
            const userSnap = await getDocs(
                query(collection(db, 'users'), where('name', '==', name), where('userAgent', '==', userAgent))
            );

            if (!userSnap.empty) {
                const existingUser = userSnap.docs[0].data() as User;
                const userId = existingUser.id;
                const userName = existingUser.name;

                updatePresence(userId, userName);

                setUser(existingUser);
                return existingUser;
            }

            return null;
        } catch (error) {
            console.error('Error checking existing user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const initializeUser = async (name: string) => {
        setIsLoading(true);
        try {
            const userAgent = getUserAgent();

            const existingUser = await checkExistingUser(name);
            if (existingUser) {
                Cookies.set('userId', existingUser.id, { expires: 7 });
                Cookies.set('userName', name, { expires: 7 });
                return existingUser;
            }

            const userId = crypto.randomUUID();
            const newUser: User = {
                id: userId,
                name,
                userAgent,
                createdAt: serverTimestamp(),
            };

            await setDoc(doc(db, 'users', userId), newUser);
            updatePresence(userId, name);

            Cookies.set('userId', userId, { expires: 7 });
            Cookies.set('userName', name, { expires: 7 });
            setUser(newUser);

            return newUser;
        } catch (error) {
            console.error('Error initializing user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { user, isLoading, initializeUser };
};

export default useAuth;
