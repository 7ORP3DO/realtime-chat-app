import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { format } from 'date-fns';
import { CodeSquare, FileWarningIcon, Info, LogOut, Settings, UserIcon } from 'lucide-react';
import countries from '../data/country-data';
import LogoutDialog from './logout-dialog';
import SettingsDialog from './settings-dialog';
import { useAuthContext } from '../context/auth-context';

const ProfileAvatar = () => {
    const { user, isLoading } = useAuthContext();
    if (!user || isLoading) return <div></div>;

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);

    return (
        <div>
            <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
            <LogoutDialog open={logoutOpen} onOpenChange={setLogoutOpen} />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <p className="size-8 cursor-pointer border rounded-full bg-gradient-to-b border-orange-500 text-orange-400 from-orange-500/20 to-orange-500/30 grid place-items-center">
                        <UserIcon className="size-5" />
                        {/* <BadgeInfo className='size-5' /> */}
                    </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-48">
                    <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground -mt-2">
                        <b>Country:</b> {countries[user?.country]?.name}{' '}
                        <img className="size-5 inline" src={countries[user?.country]?.image} />
                        {/* ({countries[user?.country].emoji}) */}
                    </DropdownMenuLabel>
                    {user && user.createdAt && user.createdAt.toDate && (
                        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground -mt-2">
                            <b>Joined:</b> {format(user?.createdAt?.toDate(), 'd MMM yyyy, h:mm a')}
                        </DropdownMenuLabel>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                        <Settings /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a href="https://github.com/devXprite/chat-World/" target="_blank">
                            <CodeSquare className="size-2" />
                            Source Code
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a href="https://github.com/devXprite/chat-World/" target="_blank">
                            <Info className="size-2" />
                            About
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a href="https://github.com/devXprite/Chat-World/issues/new/" target="_blank">
                            <FileWarningIcon className="size-2" />
                            Report Issue
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setLogoutOpen(true)}>
                        <LogOut className="size-2" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ProfileAvatar;
