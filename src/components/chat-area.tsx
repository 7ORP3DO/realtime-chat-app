import moment from 'moment';
import useChat from '@/hooks/useChat';
import LoadMore from './load-more-btn';
import { Fragment, useEffect, useRef } from 'react';
import useTyping from '@/hooks/useTyping';
import MessageInput from './message-input';
import TypingBubble from './typing-bubble';
import { LoaderCircle } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import MessageBubble from './ui/message-bubble';
import ScrollProgress from './ui/scroll-progress';
import { cn, formatDateCalendar } from '@/lib/utils';
import { useAuthContext } from '@/context/auth-context';
import { useSettingsContext } from '@/context/settings-context';

import type { Message } from '@/types';

const DateDivider = ({ date }: { date: Message['timestamp'] }) => (
    <div className="border bg-muted text-muted-foreground w-fit mx-auto text-xs py-1 px-2 rounded-md mt-5 mb-3">
        {formatDateCalendar(date?.toDate())}
    </div>
);

const MessageLoader = () => (
    <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center text-muted-foreground/75">
        <LoaderCircle className="size-8 animate-spin" />
        <p className="animate-pulse">Loading Messages...</p>
    </div>
);

const ChatArea = () => {
    const { user } = useAuthContext();
    const { typingUsers } = useTyping();
    const { settings } = useSettingsContext();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { messages, sendMessage, isSending, isLoading, hasMore, loadMore } = useChat(user);

    const shouldShowDate = (msg: Message, lastMsg: Message) => {
        if (!lastMsg) return true;
        return !moment(msg.timestamp?.toDate()).isSame(lastMsg.timestamp?.toDate(), 'day');
    };

    useEffect(() => {
        if (messages.length > 0 && chatContainerRef.current && settings.autoScroll) {
            const chatContainer = chatContainerRef.current;
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages[messages.length - 1]]);

    return (
        <div className="w-full border-r h-full overflow-hidden flex bg-muted/35 md:relative">
            {settings.scrollIndicator && messages.length > 0 && (
                <ScrollProgress container={chatContainerRef} className="max-md:top-12 h-[1px]" />
            )}

            {isLoading && messages.length < 2 && <MessageLoader />}

            <ScrollArea
                ref={chatContainerRef}
                className={cn('w-full px-2 overflow-y-auto relative', isLoading && messages.length === 0 && 'hidden')}
            >
                <div className="grid gap-1 max-w-screen-md mx-auto mb-60 mt-6">
                    {hasMore && <LoadMore onClick={loadMore} isLoading={isLoading} />}

                    {messages.map((msg, i) => (
                        <Fragment key={msg.id}>
                            {shouldShowDate(msg, messages[i - 1]) && <DateDivider date={msg.timestamp} />}

                            <MessageBubble
                                {...msg}
                                isOwnMessage={msg.userId === user?.id}
                                showName={messages[i - 1]?.userId !== msg.userId || shouldShowDate(msg, messages[i - 1])}
                            />
                        </Fragment>
                    ))}

                    <TypingBubble typingUsers={typingUsers} />
                </div>
            </ScrollArea>

            <MessageInput onSubmit={sendMessage} isSending={isSending} />
        </div>
    );
};

export default ChatArea;
