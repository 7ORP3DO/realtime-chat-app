import { Route, Routes } from 'react-router';
import Home from './pages/home';
import Chat from './pages/chat';
import { AuthProvider } from './context/auth-context';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route index element={<Home />} />
                <Route path="chat" element={<Chat />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
