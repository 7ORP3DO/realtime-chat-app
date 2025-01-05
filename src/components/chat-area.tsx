import { Fragment, useRef } from 'react';
import { ScrollArea } from './ui/scroll-area';
import useChat from '../hooks/useChat';
import UserMessage from './ui/user-message';
import MessageInput from './message-input';
import moment from 'moment';
import { Message } from '../types';
import { useAuthContext } from '../context/auth-context';
import ScrollProgress from './ui/scroll-progress';
import { useSettingsContext } from '../context/settings-context';
import { Button } from './ui/button';
import { HistoryIcon, RefreshCcw } from 'lucide-react';

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
    // <div className="border bg-gradient-to-b border-zinc-800 text-zinc-400 from-zinc-900 to-zinc-800/80 w-fit mx-auto text-xs md:text-sm py-1 px-2 rounded-md mt-5 mb-3">
    <div className="border bg-muted text-muted-foreground w-fit mx-auto text-xs py-1 px-2 rounded-md mt-5 mb-3">
        {formatMessageDate(date?.toDate())}
    </div>
);

const LoadMore = ({ onClick, isLoading }: { onClick?: () => void; isLoading: boolean }) => (
    <div className="flex items-center justify-center my-6">
        <Button variant={'secondary'} className="text-muted-foreground" size={'sm'} onClick={onClick} disabled={isLoading}>
            {isLoading ? <RefreshCcw className="size-5 animate-spin" /> : <HistoryIcon className="size-5" />}
            Load older messages
        </Button>
    </div>
);

const ChatArea = () => {
    const { user } = useAuthContext();
    const { settings } = useSettingsContext();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { messages, sendMessage, isSending, isLoading, hasMore, loadMore } = useChat(user);

    return (
        <div className={`w-full border-r h-full overflow-hidden flex bg-muted/35 md:relative `}>
            {settings.scrollIndicator && <ScrollProgress container={chatContainerRef} className="max-md:top-12 h-[1px]" />}

            <ScrollArea ref={chatContainerRef} className="w-full px-2 overflow-y-auto">
                <div className="grid gap-1 max-w-screen-md mx-auto mb-96 mt-6">
                    {hasMore && <LoadMore isLoading={isLoading} onClick={loadMore} />}

                    {messages.map((msg, i) => (
                        <Fragment key={msg.id}>
                            {shouldShowDate(msg, messages[i - 1]) && <DateDivider date={msg.timestamp} />}

                            <UserMessage
                                {...msg}
                                isOwnMessage={msg.userId === user?.id}
                                showName={messages[i - 1]?.userId !== msg.userId || shouldShowDate(msg, messages[i - 1])}
                            />
                        </Fragment>
                    ))}
                </div>
            </ScrollArea>

            <MessageInput onSubmit={sendMessage} isSending={isSending} />
        </div>
    );
};

export default ChatArea;
