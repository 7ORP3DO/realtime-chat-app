import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';
import { Message, User } from '../types';
import { Card, CardHeader, CardTitle } from './ui/card';
import moment from 'moment';

type Props = {};

const UserMessage = ({ id, timestamp, content, userId, userName }: Message) => {
    return (
        <div key={id}>
            <h4 className="mb-1 ml-0.5 -mt-0.5 text-muted-foreground text-xs capitalize">{userName}</h4>
            <div className="bg-card py-1 px-2.5 rounded-xl rounded-tl-sm border border-border/90 min-w-[30%] max-w-[80%] w-fit shadow-md">
                <p className="text-foreground/80 text-sm">{content}</p>

                <p className="text-muted-foreground text-[10px] text-right ">{moment(timestamp).fromNow()}</p>
            </div>
        </div>
    );
};

const MainWindow = (props: Props) => {
    const { user } = useAuth();
    const { messages, sendMessage } = useChat(user);

    return (
        <div className="w-full border-r h-screen overflow-y-auto flex flex-col">
            <div className="p-4 py-3 border-b border-border bg-card">
                <h2 className="text-lg font-semibold text-center">Chat World</h2>
            </div>

            <ScrollArea className="flex-1 p-4 ">
                <div className="grid gap-3 max-w-screen-md mx-auto mb-20">
                    {messages.map(message => (
                        <UserMessage key={message.id} {...message} />
                    ))}
                </div>
            </ScrollArea>

            <div className="p-4 border-t border-border bg-card">
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
                        rows={3}
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
