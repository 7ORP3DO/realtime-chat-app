import './index.css';
import App from './App.tsx';
import Loader from './components/loader.tsx';
import { createRoot } from 'react-dom/client';
import { lazy, StrictMode, Suspense } from 'react';
import { SettingsProvider } from './context/settings-context.tsx';

const AuthProvider = lazy(() => import('./context/auth-context').then(module => ({ default: module.AuthProvider })));

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Suspense fallback={<Loader />}>
            <AuthProvider>
                <SettingsProvider>
                    <App />
                </SettingsProvider>
            </AuthProvider>
        </Suspense>
    </StrictMode>
);
