import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Loader2Icon, Send } from 'lucide-react';
import { Input } from './ui/input';

type Props = {
    onSubmit: (e: string) => void;
    isSending: boolean;
};

const MessageInput = ({ onSubmit, isSending }: Props) => {
    // const inputRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSending) return;

        const message = inputRef.current?.value.trim();
        if (!message) return;

        onSubmit(message);
    };

    useEffect(() => {
        if (!isSending && inputRef.current) inputRef.current.value = '';
    }, [isSending]);

    return (
        <div className="p-4 border-t border-border bg-card absolute w-full bottom-0 left-0">
            <div className="absolute w-full top-0 -translate-y-full z-10 h-10 left-0 bg-gradient-to-b from-transparent to-card/70 border-b"></div>

            <form onSubmit={handleSubmit} className="flex gap-2  max-w-screen-md mx-auto group">
                {/* <Textarea
                    ref={inputRef}
                    rows={1}
                    name="message"
                    placeholder="Write your message here..."
                    className="min-h-14 md:min-h-14 bg-background"
                    minLength={2}
                    maxLength={160}
                    required
                    disabled={isSending}
                /> */}

                {/* <Button
                    size="icon"
                    className="shrink-0 group-invalid:opacity-50 group-invalid:cursor-not-allowed"
                    disabled={isSending}
                >
                    {isSending ? <Loader2Icon className="size-4 animate-spin" /> : <Send className="size-4" />}
                </Button> */}

                <Input
                    ref={inputRef}
                    name="message"
                    placeholder="Write your message here..."
                    className="bg-muted/75"
                    minLength={1}
                    max={160}
                    maxLength={160}
                    required
                    disabled={isSending}
                ></Input>

                <Button
                    size="icon"
                    className="chat-gradient !bg-gradient-to-br !bg-local text-white rounded-lg shrink-0 group-invalid:grayscale group-invalid:cursor-not-allowed transition-all duration-500"
                    disabled={isSending}
                >
                    {isSending ? <Loader2Icon className="size-4 animate-spin" /> : <Send className="size-5" />}
                </Button>
            </form>
        </div>
    );
};

export default MessageInput;
