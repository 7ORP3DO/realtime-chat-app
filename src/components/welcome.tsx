import { ArrowRight, ArrowRightIcon, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { RainbowButton } from './ui/rainbow-button';
import AnimatedGridPattern from './ui/animated-grid-pattern';
import ShineBorder from './ui/shine-border';
import AnimatedShinyText from './ui/animated-shiny-text';

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
        <div className="min-h-screen relative bg-black">
            <AnimatedGridPattern
                numSquares={50}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={'[mask-image:linear-gradient(to_top,#fffc,transparent)]'}
            />
            <div className="max-w-screen-xl mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
                <div className='-translate-y-8'>
                    <div
                        className={
                            'group relative z-10 w-fit mx-auto rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
                        }
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                            <span>✨ Introducing ChatWorld</span>
                        </AnimatedShinyText>
                    </div>

                    <h1 className="text-3xl md:text-5xl mt-6 leading-[1.1] font-semibold text-center">
                        {/* The simplest way to <br /> <span className="text-gradient"> connect with the world</span>! */}
                        Welcome to <span className="text-gradient">ChatWorld</span>
                    </h1>
                    <p className="text-muted-foreground mt-4 max-w-screen-sm mx-auto text-center md:text-xl">
                        Experience a simple, seamless way to chat. Just enter your name and join the global community.
                        No signup, no hassle.
                    </p>

                    {isLoading ? (
                        <div className="mt-24 h-40 flex items-center justify-center">
                            <Loader2 className="size-14 animate-spin " />
                        </div>
                    ) : (
                        <ShineBorder
                            className="mt-14 md:mt-24 backdrop-blur bg-muted/40 relative w-full max-w-xl mx-auto"
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
