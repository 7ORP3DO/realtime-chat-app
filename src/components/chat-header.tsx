import React, { useCallback } from 'react';
import { GithubIcon, MessageCircleMoreIcon, UserIcon } from 'lucide-react';
import { User } from '../types';
import { cn } from '../lib/utils';
import ProfileAvatar from './profile-avatar';
import useOnlineCount from '../hooks/useOnlineCount';

interface ChatHeaderProps {
    user: User;
    showUsers: boolean;
    setShowUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OnlineCountBadgeProps {
    onClick: () => void;
    showUsers: boolean;
}

const OnlineCountBadge = ({ onClick, showUsers }: OnlineCountBadgeProps) => {
    const { onlineCount } = useOnlineCount();

    const buttonClasses = cn(
        'border w-12 h-[30px] rounded-md',
        'bg-gradient-to-b border-green-500 text-green-400 from-green-500/20 to-green-500/30',
        'font-[Electrolize] font-semibold flex items-center justify-center gap-1'
    );

    return (
        <p onClick={onClick} aria-label={`${onlineCount} users online `} className={buttonClasses}>
            {/* Mobile view */}
            <span className="md:hidden flex items-center gap-1 md:gap-3 ">
                {showUsers ? (
                    <MessageCircleMoreIcon className="size-5 m-0.5" aria-hidden="true" />
                ) : (
                    <>
                        {onlineCount} <UserIcon className="size-4" aria-hidden="true" />
                    </>
                )}
            </span>

            {/* Desktop view */}
            <span className="hidden md:flex items-center gap-1">
                {onlineCount} <UserIcon className="size-4" aria-hidden="true" />
            </span>
        </p>
    );
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ setShowUsers, showUsers }) => {
    const handleToggleUsers = useCallback(() => setShowUsers(prev => !prev), [setShowUsers]);

    return (
        <header className="px-4 py-1 border-b bg-card shadow-md flex gap-2.5 items-center justify-between h-12 z-50 sticky top-0">
            <OnlineCountBadge onClick={handleToggleUsers} showUsers={showUsers} />
            <h1 className="text-gradient mx-auto text-xl font-bold w-fit translate-x-1/3 md:translate-x-full">Chat World</h1>

            <a
                href="#"
                className="ml-auto border bg-gradient-to-b border-cyan-500 text-cyan-400 from-cyan-500/20 to-cyan-500/30 rounded-md px-2 py-1.5 flex gap-1 items-center text-sm"
            >
                <GithubIcon className="size-4" />
            </a>

            <ProfileAvatar />
        </header>
    );
};

export default ChatHeader;
