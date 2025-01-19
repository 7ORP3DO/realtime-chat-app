import './index.css';
import App from './App.tsx';
import Loader from './components/loader.tsx';
import { createRoot } from 'react-dom/client';
import { lazy, StrictMode, Suspense } from 'react';
import { SettingsProvider } from './context/settings-context.tsx';
import { AnimatePresence } from 'motion/react';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ReactGA from 'react-ga4';

const AuthProvider = lazy(() => import('./context/auth-context').then(module => ({ default: module.AuthProvider })));

ReactGA.initialize('G-KEZHDV7Y1X');

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Analytics />
        <SpeedInsights />

        <Suspense key={'layout'} fallback={<Loader />}>
            <AuthProvider>
                <SettingsProvider>
                    <AnimatePresence>
                        <App />

                        <Toaster />
                    </AnimatePresence>
                </SettingsProvider>
            </AuthProvider>
        </Suspense>
    </StrictMode>
);
