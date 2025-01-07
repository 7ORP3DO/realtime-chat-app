import AOS from 'aos';
import 'aos/dist/aos.css';

import data from '@emoji-mart/data';
import { init } from 'emoji-mart';

import { lazy, Suspense, useEffect } from 'react';
import Loader from '@/components/loader';
import { useAuthContext } from './context/auth-context';

const Chat = lazy(() => import('./pages/chat'));
const Home = lazy(() => import('./pages/home'));

function App() {
    const { user, isLoading, isInitializing } = useAuthContext();

    useEffect(() => {
        init({ data });
        AOS.init({ offset: 50 });
        AOS.refresh();
    }, []);

    if (isLoading && !isInitializing) return <Loader />;

    if (user) {
        return (
            <Suspense fallback={<Loader />}>
                <Chat />
            </Suspense>
        );
    }

    return <Home />;
}

export default App;
