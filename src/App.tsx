import AOS from 'aos';
import 'aos/dist/aos.css';

import Loader from '@/components/loader';
import { useAuthContext } from './context/auth-context';
import { lazy, Suspense, useEffect, useState } from 'react';

const Chat = lazy(() => import('./pages/chat'));
const Home = lazy(() => import('./pages/home'));

function App() {
    const { user, isLoading, isInitializing } = useAuthContext();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const { init } = await import('emoji-mart');
                const emojiData = await import('@emoji-mart/data');

                init({ data: emojiData.default });
                AOS.init({ offset: 50 });
                AOS.refresh();

                setIsInitialized(true);
            } catch (error) {
                console.error('Failed to initialize app:', error);
            }
        };

        initializeApp();
    }, []);

    if (!isInitialized || (isLoading && !isInitializing)) return <Loader />;
    return <Suspense fallback={<Loader />}>{user ? <Chat /> : <Home />}</Suspense>;
}

export default App;
