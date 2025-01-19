
const Loader = () => {
    return (
        <div className="h-[92vh] w-screen flex flex-col  items-center justify-center gap-4 relative">
            <svg className="pl" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                        <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                        <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                        {/* <stop offset="0%" stop-color="#f43f5e" />
                        <stop offset="50%" stop-color="#a855f7" />
                        <stop offset="100%" stop-color="#3b82f6" /> */}
                    </linearGradient>
                    <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                        <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                    </linearGradient>
                </defs>
                <circle
                    className="pl__ring"
                    cx="100"
                    cy="100"
                    r="82"
                    fill="none"
                    stroke="url(#pl-grad1)"
                    stroke-width="30"
                    stroke-dasharray="0 257 1 257"
                    stroke-dashoffset="0.01"
                    stroke-linecap="round"
                    transform="rotate(-90,100,100)"
                />
                <line
                    className="pl__ball"
                    stroke="url(#pl-grad2)"
                    x1="100"
                    y1="18"
                    x2="100.01"
                    y2="182"
                    stroke-width="30"
                    stroke-dasharray="1 165"
                    stroke-linecap="round"
                />
            </svg>

            {/* <p className="text-gradient text-3xl md:text-4xl font-bold tracking-wider uppercase">Loading</p> */}
            <p className="text-gradient text-lg md:text-2xl font-bold tracking-wider uppercase ">Loading</p>
        </div>
    );
};

export default Loader;
