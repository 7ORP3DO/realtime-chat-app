const Loader = () => {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-2 relative">
            {/* <Loader2Icon className="size-12 animate-spin text-muted-foreground" />
            <p>Loading...</p> */}
            <p className="text-gradient text-3xl md:text-4xl font-bold tracking-wider uppercase animate-bounce">Loading</p>
        </div>
    );
};

export default Loader;
