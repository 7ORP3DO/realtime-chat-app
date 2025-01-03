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
    // setUsersOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatArea = (props: Props) => {
    const { user } = useAuth();
    const { messages, sendMessage, isSending, isLoading } = useChat(user);

    return (
        <>
            <div className="w-full border-r h-full overflow-hidden flex bg-muted/35 md:relative">
                <ScrollArea className="w-full px-2">
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

                <MessageInput onSubmit={sendMessage} isSending={isSending} />
            </div>
        </>
    );
};

export default ChatArea;
