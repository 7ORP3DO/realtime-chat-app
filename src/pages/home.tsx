import { ArrowRight, ArrowRightIcon, Loader2 } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router';
import ShineBorder from '../components/ui/shine-border';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import AnimatedGridPattern from '../components/ui/animated-grid-pattern';
import AnimatedShinyText from '../components/ui/animated-shiny-text';
import useAuth from '../hooks/useAuth';

type Props = {};

const Home = ({}: Props) => {
    const navigate = useNavigate();
    const { initializeUser, user, isLoading } = useAuth();

    if (user?.id) return <Navigate to={'/chat'} />;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault;
        const name = (e.target as any).name.value;
        const loggedUser = await initializeUser(name);
        if (loggedUser?.id) navigate('/chat');
    };

    const LoginCard = () => (
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
    );

    return (
        <div className="min-h-dvh relative">
            <AnimatedGridPattern
                width={35}
                height={35}
                maxOpacity={0.2}
                className={'[mask-image:linear-gradient(to_top,#fff9,transparent)]'}
            />
            <div className="max-w-screen-xl mx-auto px-4 py-8 min-h-dvh flex items-center justify-center">
                <div className="-translate-y-10">
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

                    <h1 className="text-3xl md:text-5xl mt-6 leading-[1.1] font-bold text-center">
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
                        <LoginCard />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
