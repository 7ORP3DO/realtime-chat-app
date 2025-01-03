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

type Props = {
    user: User;
    setShowUsers: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatHeader = ({ user, setShowUsers }: Props) => {
    return (
        <div className="px-4 py-1 border-b border-border bg-card shadow-md flex items-center justify-between h-12 z-50 sticky top-0">
            <p
                onClick={() => setShowUsers(e => !e)}
                className="border py-0.5 px-2 rounded-md  border-green-500 text-green-400 bg-gradient-to-b from-green-500/20 to-green-500/30 font-[Electrolize] font-semibold"
            >
                <span className="flex items-center gap-1">
                    9 <UserIcon className="size-4" />
                </span>
            </p>
            <h2 className="text-xl font-semibold text-center">
                <span className="text-gradient">Chat World</span>
            </h2>
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
                        <b>Country:</b> India
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
        </div>
    );
};

export default ChatHeader;
