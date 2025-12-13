export const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full z-50 py-3 px-6 flex justify-between items-center bg-gradient-to-t from-black/80 to-transparent pointer-events-none text-xs text-white/40">
            <div className="pointer-events-auto">
                &copy; {new Date().getFullYear()} Juned. All rights reserved.
            </div>

            <div className="flex items-center gap-2 pointer-events-auto backdrop-blur-sm bg-white/5 px-3 py-1 rounded-full border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Powered by Gemini 2.5 & React Three Fiber
            </div>
        </footer>
    );
};
