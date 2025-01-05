import { useState } from 'react';
import UsersList from '../components/users-list';
import ChatArea from '../components/chat-area';
import ChatHeader from '../components/chat-header';
import { useAuthContext } from '../context/auth-context';
import { Loader } from 'lucide-react';
import { Navigate } from 'react-router';

const Chat = () => {
    const { user, isLoading } = useAuthContext();
    const [showUsers, setShowUsers] = useState(false);

    if (isLoading)
        return (
            <div className="h-screen w-screen grid place-items-center">
                <Loader className="size-12 animate-spin text-muted-foreground" />
            </div>
        );

    if (!user) return <Navigate to={'/'} />;

    return (
        <div className="md:grid grid-cols-[20rem_1fr] h-dvh overflow-hidden">
            <div className="px-4 border-b border-r h-12 grid place-items-center max-md:hidden">
                <h2 className="text-lg font-semibold text-muted-foreground">Online Users</h2>
            </div>
            <ChatHeader user={user} setShowUsers={setShowUsers} showUsers={showUsers} />
            <UsersList showUsers={showUsers} />
            <ChatArea />
        </div>
    );
};

export default Chat;
