import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
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


    const checkExistingUser = async (name: string) => {
        setIsLoading(true);
        try {
            const userAgent = getUserAgent();
            const userSnap = await getDocs(
                query(collection(db, 'users'), where('name', '==', name), where('userAgent', '==', userAgent))
            );

            if (!userSnap.empty) {
                const existingUser = userSnap.docs[0].data() as User;
                await updateDoc(doc(db, 'users', existingUser.id), {
                    isOnline: true,
                    lastOnline: serverTimestamp(),
                });
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
                isOnline: true,
                lastOnline: serverTimestamp(),
                userAgent,
                isTyping: false,
                createdAt: serverTimestamp(),
            };

            await setDoc(doc(db, 'users', userId), newUser);
            Cookies.set('userId', userId, { expires: 7 });
            Cookies.set('userName', name, { expires: 7 });
            setUser(newUser);

            window.addEventListener('beforeunload', () => {
                updateDoc(doc(db, 'users', userId), {
                    isOnline: false,
                    lastOnline: serverTimestamp(),
                    isTyping: false,
                });
            });

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
