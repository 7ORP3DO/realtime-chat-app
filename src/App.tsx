import AOS from 'aos';
import 'aos/dist/aos.css';

import { Route, Routes } from 'react-router';
import { SettingsProvider } from '@/context/settings-context';
import { lazy, Suspense, useEffect } from 'react';
import Loader from '@/components/loader';

const Chat = lazy(() => import('./pages/chat'));
const Home = lazy(() => import('./pages/home'));

const AuthProvider = lazy(() => import('./context/auth-context').then(module => ({ default: module.AuthProvider })));

function App() {
    useEffect(() => {
        AOS.init({ offset: 50 });
        AOS.refresh();
    }, []);

    return (
        <Suspense fallback={<Loader />}>
            <AuthProvider>
                <SettingsProvider>
                    <Routes>
                        <Route index element={<Home />} />
                        <Route
                            path="chat"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <Chat />
                                </Suspense>
                            }
                        />
                    </Routes>
                </SettingsProvider>
            </AuthProvider>
        </Suspense>
    );
}

export default App;
