import { Fragment, useRef } from 'react';
import { ScrollArea } from './ui/scroll-area';
import useChat from '../hooks/useChat';
import MessageBubble from './ui/message-bubble';
import MessageInput from './message-input';
import moment from 'moment';
import { Message } from '../types';
import { useAuthContext } from '../context/auth-context';
import ScrollProgress from './ui/scroll-progress';
import { useSettingsContext } from '../context/settings-context';
import { Button } from './ui/button';
import { HistoryIcon, LoaderCircle } from 'lucide-react';
import useTyping from '@/hooks/useTyping';
import { cn } from '@/lib/utils';

const formatMessageDate = (date: Date): string => {
    return moment(date).calendar(null, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: 'dddd',
        sameElse: 'MMM D, YYYY',
    });
};

const shouldShowDate = (currentMessage: Message, previousMessage?: Message): boolean => {
    if (!previousMessage) return true;
    return !moment(currentMessage.timestamp?.toDate()).isSame(previousMessage.timestamp?.toDate(), 'day');
};

const DateDivider = ({ date }: { date: Message['timestamp'] }) => (
    <div className="border bg-muted text-muted-foreground w-fit mx-auto text-xs py-1 px-2 rounded-md mt-5 mb-3">
        {formatMessageDate(date?.toDate())}
    </div>
);

const LoadMore = ({ onClick, isLoading }: { onClick?: () => void; isLoading: boolean }) => (
    <div className="flex items-center justify-center my-1 mb-5">
        {/* <Button variant={'secondary'} className="text-muted-foreground" size={'sm'} onClick={onClick} disabled={isLoading}>
            {isLoading ? <RefreshCcw className="size-5 animate-spin" /> : <HistoryIcon className="size-5" />}
            Load older messages
        </Button> */}

        <Button variant={'ghost'} size={'icon'} disabled={isLoading} onClick={onClick} asChild>
            <HistoryIcon  className={cn('size-8 text-muted-foreground', isLoading && 'animate-spin')} />
        </Button>
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

    // const { y: scrollY } = useScroll(chatContainerRef);

    // useEffect(() => {
    //     if (!isLoading && hasMore && scrollY < 200 && scrollY !== 0) loadMore();
    // }, [scrollY, isLoading]);

    return (
        <div className={`w-full border-r h-full overflow-hidden flex bg-muted/35 md:relative `}>
            {settings.scrollIndicator && messages.length > 0 && (
                <ScrollProgress container={chatContainerRef} className="max-md:top-12 h-[1px]" />
            )}

            {isLoading && messages.length < 2 && <MessageLoader />}

            <ScrollArea
                ref={chatContainerRef}
                className={cn('w-full px-2 overflow-y-auto relative', isLoading && messages.length == 0 && 'hidden')}
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
                    {typingUsers.length > 0 && (
                        <div className="absolute bg-background top-4 z-40 w-fit -translate-x-1/2 left-1/2">
                            <div
                                className={cn(
                                    'border rounded-md px-2.5 py-1 text-xs md:text-sm ',
                                    'bg-gradient-to-b border-green-500 text-green-500 from-green-500/20 to-green-500/30'
                                )}
                            >
                                <p>{typingUsers.map(u => u.name).join(', ')} is typing...</p>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>

            <MessageInput onSubmit={sendMessage} isSending={isSending} />
        </div>
    );
};

export default ChatArea;
