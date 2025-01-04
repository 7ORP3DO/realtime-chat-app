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
import ScrollProgress from './ui/scroll-progress';
import { useRef } from 'react';

type Props = {
    // setUsersOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatArea = (props: Props) => {
    const { user } = useAuth();
    const chatContainerRef = useRef(null);
    const { messages, sendMessage, isSending } = useChat(user);

    return (
        <>
            <div  className="w-full border-r h-full overflow-hidden flex bg-muted/35 md:relative">
                {/* <ScrollProgress container={chatContainerRef} className="max-md:top-12 h-[1px] md:h-0.5" /> */}

                <ScrollArea ref={chatContainerRef} className="w-full px-2 overflow-y-auto">
                    <div  className="grid gap-1 max-w-screen-md mx-auto mb-56 mt-16">
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
