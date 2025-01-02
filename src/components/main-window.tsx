import { ScrollArea } from './ui/scroll-area';
import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';
import UserMessage from './ui/user-message';
import MessageInput from './message-input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import moment from 'moment';
import { CodeSquare, Info, LogOut, Settings, User } from 'lucide-react';

type Props = {
    setUsersOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainWindow = (props: Props) => {
    const { user } = useAuth();
    const { messages, sendMessage } = useChat(user);

    return (
        <div className="w-full border-r h-dvh overflow-hidden flex flex-col relative bg-muted/60">
            <div className="px-4 py-1 border-b border-border bg-card shadow-md flex items-center justify-between h-12">
                <p>
                    <User />
                </p>
                <h2 className="text-lg font-semibold text-center">Chat World</h2>
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

            <ScrollArea className="flex-1 px-2">
                <div className="grid gap-1 max-w-screen-md mx-auto mb-56 mt-16">
                    {messages.map((message, index) => (
                        <UserMessage
                            {...message}
                            key={message.id}
                            isOwnMessage={message.userId == user?.id}
                            showName={messages[index - 1]?.userId != message.userId}
                        />
                    ))}
                </div>
            </ScrollArea>

            <MessageInput onSubmit={sendMessage} />
        </div>
    );
};

export default MainWindow;
