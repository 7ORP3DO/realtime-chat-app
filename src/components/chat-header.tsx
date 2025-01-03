import { CodeSquare, Info, LogOut, Settings, UserIcon } from 'lucide-react';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import moment from 'moment';
import { User } from '../types';
import useOnlineUsers from '../hooks/useOnlineUsers';
import countries from '../data/country-data';

type Props = {
    user: User;
    setShowUsers: React.Dispatch<React.SetStateAction<boolean>>;
};

const OnlineCountBadge = ({ count = 0, onClick }: { count: number; onClick: () => void }) => (
    <p
        role="button"
        onClick={onClick}
        title={`Online Users: ${count}`}
        className="border py-0.5 px-2 rounded-md  border-green-500 text-green-400 bg-gradient-to-b from-green-500/20 to-green-500/30 font-[Electrolize] font-semibold"
    >
        <span className="flex items-center gap-1">
            {count} <UserIcon className="size-4" />
        </span>
    </p>
);

const Profile = ({ user }: { user: User }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Avatar className="size-8 cursor-pointer border">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="">
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground -mt-2">
                <b>Country:</b> {countries[user?.country].name} <img className='size-5 inline' src={countries[user?.country].image} />
                {/* ({countries[user?.country].emoji}) */}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground -mt-2">
                <b>Joined:</b> {moment(user?.createdAt?.toDate()).format('D MMM YYYY, h:mm a')}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Settings /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
                <CodeSquare className="size-2" />
                Source Code
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Info className="size-2" />
                About
            </DropdownMenuItem>
            <DropdownMenuItem>
                <LogOut className="size-2" />
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

const ChatHeader = ({ user, setShowUsers }: Props) => {
    const { onlineCount } = useOnlineUsers({ countOnly: true });

    return (
        <div className="px-4 py-1 border-b bg-card shadow-md flex items-center justify-between h-12 z-50 sticky top-0">
            <OnlineCountBadge count={onlineCount} onClick={() => setShowUsers(e => !e)} />
            <h2 className="text-gradient text-xl font-semibold w-fit">Chat World</h2>
            <Profile user={user} />
        </div>
    );
};

export default ChatHeader;
