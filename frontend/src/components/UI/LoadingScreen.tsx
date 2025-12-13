'use client';

export const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
            <h2 className="text-xl font-bold animate-pulse">Initializing Neural Link...</h2>
            <p className="text-white/40 text-sm mt-2">Loading 3D Assets & AI Models</p>
        </div>
    );
};
