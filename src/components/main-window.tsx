import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';
import UserMessage from './ui/user-message';

type Props = {};

const MainWindow = (props: Props) => {
    const { user } = useAuth();
    const { messages, sendMessage } = useChat(user);

    return (
        <div className="w-full border-r h-dvh overflow-hidden flex flex-col relative bg-muted/50">
            <div className="p-4 py-3 border-b border-border bg-card shadow-md">
                <h2 className="text-lg font-semibold text-center">Chat World</h2>
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

            <div className="p-4 border-t border-border bg-card absolute w-full bottom-0 left-0">
                <div className="absolute w-full top-0 -translate-y-full z-10 h-10 left-0 bg-gradient-to-b from-transparent to-card/80 border-b"></div>

                <form
                    onSubmit={e => {
                        e.preventDefault();
                        sendMessage((e.target as any).message.value);
                        (e.target as any).message.value = '';
                    }}
                    className="flex gap-2  max-w-screen-md mx-auto"
                >
                    <Textarea
                        name="message"
                        // rows={3}
                        placeholder="Write your message here..."
                        className="min-h-[50px] bg-background"
                    />
                    <Button size="icon" className="shrink-0">
                        <Send className="size-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default MainWindow;
