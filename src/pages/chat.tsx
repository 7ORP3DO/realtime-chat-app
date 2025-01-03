import { useState } from 'react';
import UsersList from '../components/users-list';
import ChatArea from '../components/chat-area';
import useAuth from '../hooks/useAuth';
import ChatHeader from '../components/chat-header';

type Props = {};

const Chat = (props: Props) => {
    const { user } = useAuth();
    const [showUsers, setShowUsers] = useState(false);

    if (!user) return <p></p>;

    return (
        <div className="md:grid grid-cols-[20rem_1fr] h-dvh overflow-hidden">
            <div className="px-4 border-b border-r border-border h-12 flex items-center justify-center max-md:hidden">
                <h2 className="text-lg font-semibold text-primary">Online Users</h2>
            </div>
            <ChatHeader user={user} setShowUsers={setShowUsers} />
            <UsersList showUsers={showUsers} />
            <ChatArea />
        </div>
    );
};

export default Chat;
