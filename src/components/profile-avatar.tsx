import React from 'react';
import { User } from '../types';
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
import countries from '../data/country-data';
import { CodeSquare, FileWarningIcon, Info, LogOut, Settings } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const ProfileAvatar = ({ user }: { user: User }) => {
    const { logout } = useAuth();

    return (
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
                    <b>Country:</b> {countries[user?.country].name}{' '}
                    <img className="size-5 inline" src={countries[user?.country].image} />
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
                    <FileWarningIcon className="size-2" />
                    Report Issue
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    <LogOut className="size-2" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileAvatar;
