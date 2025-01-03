import React, { useCallback } from 'react';
import { MessageCircleMoreIcon, UserIcon } from 'lucide-react';
import { User } from '../types';
import { cn } from '../lib/utils';
import useOnlineUsers from '../hooks/useOnlineUsers';
import ProfileAvatar from './profile-avatar';

interface ChatHeaderProps {
    user: User;
    showUsers: boolean;
    setShowUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OnlineCountBadgeProps {
    count: number;
    onClick: () => void;
    showUsers: boolean;
}

const OnlineCountBadge = ({ count = 0, onClick, showUsers }: OnlineCountBadgeProps) => {
    const buttonClasses = cn(
        'border py-0.5 px-2 rounded-md',
        'border-green-500 text-green-400',
        'bg-gradient-to-b from-green-500/20 to-green-500/30',
        'font-[Electrolize] font-semibold'
    );

    return (
        <p onClick={onClick} aria-label={`${count} users online`} className={buttonClasses}>
            {/* Mobile view */}
            <span className="md:hidden">
                {showUsers ? (
                    <MessageCircleMoreIcon className="size-5 m-0.5" aria-hidden="true" />
                ) : (
                    <span className="flex items-center gap-1">
                        {count} <UserIcon className="size-4" aria-hidden="true" />
                    </span>
                )}
            </span>

            {/* Desktop view */}
            <span className="hidden md:flex items-center gap-1">
                {count} <UserIcon className="size-4" aria-hidden="true" />
            </span>
        </p>
    );
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ user, setShowUsers, showUsers }) => {
    const { onlineCount } = useOnlineUsers({ countOnly: true });

    const handleToggleUsers = useCallback(() => {
        setShowUsers(prev => !prev);
    }, [setShowUsers]);

    return (
        <header className="px-4 py-1 border-b bg-card shadow-md flex items-center justify-between h-12 z-50 sticky top-0">
            <OnlineCountBadge count={onlineCount} onClick={handleToggleUsers} showUsers={showUsers} />
            <h1 className="text-gradient text-xl font-semibold w-fit">Chat World</h1>
            <ProfileAvatar user={user} />
        </header>
    );
};

export default ChatHeader;
