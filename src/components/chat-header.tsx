import React, { useCallback } from 'react';
import { GithubIcon, MessageCircleMoreIcon, Star, UserIcon } from 'lucide-react';
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
        'border w-12 h-8 rounded-md',
        'bg-gradient-to-b border-green-500 text-green-400 from-green-500/20 to-green-500/30',
        'font-[Electrolize] font-semibold flex items-center justify-center gap-1'
    );

    return (
        <p onClick={onClick} aria-label={`${count} users online `} className={buttonClasses}>
            {/* Mobile view */}
            <span className="md:hidden flex items-center gap-1">
                {showUsers ? (
                    <MessageCircleMoreIcon className="size-5 m-0.5" aria-hidden="true" />
                ) : (
                    <>
                        {count} <UserIcon className="size-4" aria-hidden="true" />
                    </>
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
        <header className="px-4 py-1 border-b bg-card shadow-md flex gap-2.5 items-center justify-between h-12 z-50 sticky top-0">
            <OnlineCountBadge count={onlineCount} onClick={handleToggleUsers} showUsers={showUsers} />
            <h1 className="text-gradient mx-auto text-xl font-semibold w-fit translate-x-1/3 md:translate-x-full">Chat World</h1>

            <p className="ml-auto border bg-gradient-to-b border-cyan-500 text-cyan-400 from-cyan-500/20 to-cyan-500/30 rounded-md px-2 py-1.5">
                <GithubIcon className='size-4' /> 
            </p>

            <ProfileAvatar user={user} />
        </header>
    );
};

export default ChatHeader;
