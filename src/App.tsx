import { Route, Routes } from 'react-router';
import Home from './pages/home';
import Chat from './pages/chat';
import { AuthProvider } from './context/auth-context';
import { SettingsProvider } from './context/settings-context';

function App() {
    return (
        <AuthProvider>
            <SettingsProvider>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="chat" element={<Chat />} />
                </Routes>
            </SettingsProvider>
        </AuthProvider>
    );
}

export default App;
