import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { ref, set, onDisconnect, serverTimestamp as serverTimestampRtdb } from 'firebase/database';
import { User } from '../types';
import { db, rtdb } from '../lib/firebase';

interface IpInfoResponse {
    country: string;
}

const IPINFO_TOKEN = '57cb832fc1de92';
const COOKIE_EXPIRY_DAYS = 7;

const getUserAgent = () => encodeURIComponent(navigator.userAgent);

const fetchCountryCode = async (): Promise<string | null> => {
    try {
        const response = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`);
        if (!response.ok) throw new Error('Failed to fetch country info');

        const data: IpInfoResponse = await response.json();
        return data.country;
    } catch (error) {
        console.error('Error fetching country code:', error);
        return null;
    }
};

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const savedUserId = Cookies.get('userId');
            const savedName = Cookies.get('userName');

            if (savedUserId && savedName) await checkExistingUser(savedName);
            setIsLoading(false);
        })();
    }, []);

    const updatePresence = (userId: string, userName: string) => {
        try {
            const userStatusRef = ref(rtdb, `status/${userId}`);
            const presenceData = {
                name: userName,
                isOnline: true,
                lastOnline: serverTimestampRtdb(),
            };

            set(userStatusRef, presenceData);
            onDisconnect(userStatusRef).update({
                isOnline: false,
                lastOnline: serverTimestampRtdb(),
            });
        } catch (error) {
            console.error('Error updating presence:', error);
            setError('Failed to update presence status');
        }
    };

    const checkExistingUser = async (name: string): Promise<User | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const userAgent = getUserAgent();
            const userSnap = await getDocs(
                query(collection(db, 'users'), where('name', '==', name), where('userAgent', '==', userAgent))
            );

            if (!userSnap.empty) {
                const existingUser = userSnap.docs[0].data() as User;
                const userId = existingUser.id;

                updatePresence(userId, name);
                setUser(existingUser);
                return existingUser;
            }

            return null;
        } catch (error) {
            console.error('Error checking existing user:', error);
            setError('Failed to check existing user');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const initializeUser = async (name: string): Promise<User | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const existingUser = await checkExistingUser(name);
            if (existingUser) {
                Cookies.set('userId', existingUser.id, { expires: COOKIE_EXPIRY_DAYS });
                Cookies.set('userName', name, { expires: COOKIE_EXPIRY_DAYS });
                return existingUser;
            }

            const userAgent = getUserAgent();
            const userId = crypto.randomUUID();
            const countryCode = await fetchCountryCode();

            const newUser: User = {
                id: userId,
                name,
                userAgent,
                country: countryCode || undefined,
                createdAt: serverTimestamp(),
            };

            await setDoc(doc(db, 'users', userId), newUser);
            updatePresence(userId, name);

            Cookies.set('userId', userId, { expires: COOKIE_EXPIRY_DAYS });
            Cookies.set('userName', name, { expires: COOKIE_EXPIRY_DAYS });
            setUser(newUser);

            return newUser;
        } catch (error) {
            console.error('Error initializing user:', error);
            setError('Failed to initialize user');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        Cookies.remove('userId');
        Cookies.remove('userName');
        setUser(null);
    };

    return { user, isLoading, error, initializeUser, logout };
};

export default useAuth;
