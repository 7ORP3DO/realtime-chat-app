import  { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import moment from 'moment';
import countries from '../data/country-data';
import { CodeSquare, FileWarningIcon, Info, LogOut, Settings, UserIcon } from 'lucide-react';
import SettingsDialog from './settings-dialog';
import LogoutDialog from './logout-dialog';
import { useAuthContext } from '../context/auth-context';

const ProfileAvatar = () => {
    const { user } = useAuthContext();
    if (!user) return null;

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);

    return (
        <div>
            <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
            <LogoutDialog open={logoutOpen} onOpenChange={setLogoutOpen} />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {/* <Avatar className="size-8 cursor-pointer border">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar> */}
                    <p className="size-8 cursor-pointer border rounded-full bg-gradient-to-b border-orange-500 text-orange-400 from-orange-500/20 to-orange-500/30 grid place-items-center">
                        <UserIcon className="size-5" />
                        {/* <BadgeInfo className='size-5' /> */}
                    </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="">
                    <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground -mt-2">
                        <b>Country:</b> {countries[user?.country]?.name}{' '}
                        <img className="size-5 inline" src={countries[user?.country]?.image} />
                        {/* ({countries[user?.country].emoji}) */}
                    </DropdownMenuLabel>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground -mt-2">
                        <b>Joined:</b> {moment(user?.createdAt?.toDate()).format('D MMM YYYY, h:mm a')}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
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
