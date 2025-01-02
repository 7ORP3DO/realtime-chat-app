import React from 'react';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { Textarea } from './ui/textarea';

type Props = {
    onSubmit: (e: string) => void;
};

const MessageInput = ({ onSubmit }: Props) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const message = (e.target as any).message.value.trim();
        if (!message) return;

        onSubmit(message);
        (e.target as any).message.value = '';
    };

    return (
        <div className="p-4 border-t border-border bg-card absolute w-full bottom-0 left-0">
            <div className="absolute w-full top-0 -translate-y-full z-10 h-10 left-0 bg-gradient-to-b from-transparent to-card/70 border-b"></div>

            <form onSubmit={handleSubmit} className="flex gap-2  max-w-screen-md mx-auto group">
                <Textarea
                    name="message"
                    placeholder="Write your message here..."
                    className="min-h-[50px] bg-background"
                    required
                    minLength={2}
                />
                <Button size="icon" className="shrink-0 group-invalid:opacity-50">
                    <Send className="size-4" />
                </Button>
            </form>
        </div>
    );
};

export default MessageInput;
