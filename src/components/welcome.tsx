import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { RainbowButton } from './ui/rainbow-button';
import AnimatedGridPattern from './ui/animated-grid-pattern';
import ShineBorder from './ui/shine-border';

type Props = {
    isLoading: boolean;
    onSubmit: (name: string) => void;
};

const Welcome = ({ onSubmit, isLoading }: Props) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault;
        const name = (e.target as any).name.value;

        onSubmit(name);
    };

    return (
        <div className="min-h-screen relative">
            <AnimatedGridPattern
                numSquares={50}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={'[mask-image:linear-gradient(to_top,#fffb,transparent)]'}
            />
            <div className="max-w-screen-xl mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
                <div>
                    <h1 className="text-4xl leading-[1.1] font-semibold text-center">
                        <span className="text-gradient">Collection of modern</span>, background snippets
                    </h1>
                    <p className="text-muted-foreground mt-6 max-w-screen-sm mx-auto text-center text-xl">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident hic soluta laudantium
                        repellat at rerum ad fugit
                    </p>

                    {isLoading ? (
                        <div className="mt-10 h-40 flex items-center justify-center">
                            <Loader2 className="size-14 animate-spin " />
                        </div>
                    ) : (
                        <ShineBorder
                            className="mt-12 p-8 md:p-12 bg-red-400 bg-muted/0 relative w-full max-w-screen-lg"
                            color={['#fb923c', '#ec4899', '#9333ea']}
                            borderWidth={2}
                            borderRadius={24}
                        >
                            <form onSubmit={handleSubmit} className="w-full">
                                <CardHeader>
                                    <CardTitle>Join the Chat</CardTitle>
                                    <CardDescription>Enter your name to join the chat</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Input name="name" placeholder="Enter your name" className="bg-muted/50" />
                                </CardContent>
                                <CardFooter>
                                    <Button className="ml-auto">
                                        Join the Chat <ArrowRight />{' '}
                                    </Button>
                                </CardFooter>
                            </form>
                        </ShineBorder>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Welcome;
