import './index.css';
import App from './App.tsx';
import Loader from './components/loader.tsx';
import { createRoot } from 'react-dom/client';
import { lazy, StrictMode, Suspense } from 'react';
import { SettingsProvider } from './context/settings-context.tsx';
import { AnimatePresence } from 'motion/react';
import { DefaultToastOptions, Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';

const AuthProvider = lazy(() => import('./context/auth-context').then(module => ({ default: module.AuthProvider })));

const toastOptions: DefaultToastOptions = {
    success: {},
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Suspense fallback={<Loader />}>
            <AuthProvider>
                <SettingsProvider>
                    <AnimatePresence>
                        <App />
                        <Analytics />
                        <Toaster toastOptions={toastOptions} />
                    </AnimatePresence>
                </SettingsProvider>
            </AuthProvider>
        </Suspense>
    </StrictMode>
);
