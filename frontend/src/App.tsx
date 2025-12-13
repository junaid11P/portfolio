import { Experience } from '@/components/Experience';
import { useChat } from '@/hooks/useChat';
import { useStore } from '@/hooks/useStore';
import { Suspense, useState, KeyboardEvent } from 'react';
import { Projects } from '@/components/UI/Projects';
import { TechStack } from '@/components/UI/TechStack';
import { LoadingScreen } from '@/components/UI/LoadingScreen';
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function App() {
    const { sendMessage, loading, messages } = useChat();
    const setAudioUrl = useStore((state) => state.setAudioUrl);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        const text = input;
        setInput("");

        await sendMessage(text, (audioUrl) => {
            setAudioUrl(audioUrl);
        });
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <main className="h-screen w-full relative overflow-hidden bg-background text-foreground">
            {/* 3D Scene Container */}
            <div className="absolute inset-0 z-0 text-white">
                <Suspense fallback={<LoadingScreen />}>
                    <Experience />
                </Suspense>
            </div>

            {/* Interface Overlay (HUD) */}
            <div className="relative z-10 pointer-events-none h-full w-full p-4 lg:p-10 flex flex-col lg:flex-row gap-6 justify-between">

                {/* Left Panel: Profile & Content */}
                <div className="pointer-events-auto h-full w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto scrollbar-none pb-20">

                    {/* Header */}
                    <div className="mt-10">
                        <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-primary/50 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                            <img
                                src="/Juned.png"
                                alt="Juned Profile"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 mb-2">
                            Hello.<br /> I'm <span className="text-primary">Juned</span>
                        </h1>
                        <p className="text-white/60 text-lg mb-4">Full Stack Developer & AI Specialist</p>

                        {/* Social Icons */}
                        <div className="flex gap-4 mb-6">
                            <a href="https://github.com/junaid11P" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white hover:scale-110 transition-all">
                                <FaGithub size={24} />
                            </a>
                            <a href="https://linkedin.com/in/juned11" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-blue-400 hover:scale-110 transition-all">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="https://youtube.com/@JunnuBlr" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-red-500 hover:scale-110 transition-all">
                                <FaYoutube size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-pink-500 hover:scale-110 transition-all">
                                <FaInstagram size={24} />
                            </a>
                            <a href="mailto:Muhammadjunaid8105@gmail.com" className="text-white/70 hover:text-primary hover:scale-110 transition-all">
                                <MdEmail size={24} />
                            </a>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center cursor-pointer">View Projects</button>
                            <a href="/JunedResume.pdf" download="JunedResume.pdf" className="border border-white/20 text-white px-6 py-2 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center">
                                My Resume
                            </a>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="backdrop-blur-md bg-black/20 p-6 rounded-2xl border border-white/5">
                        <h3 className="text-xl font-bold text-white/90 mb-2">About Me</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            I started my journey training teachers in AI & Robotics.
                            Since then, I've led full-stack software development, fulfilling my passion for building AI-powered applications.
                        </p>

                        <div className="flex justify-between mt-6 text-center">
                            <div><div className="text-2xl font-bold text-primary">10+</div><div className="text-xs text-white/40">Projects</div></div>
                            <div><div className="text-2xl font-bold text-primary">100+</div><div className="text-xs text-white/40">Trained</div></div>
                            <div><div className="text-2xl font-bold text-primary">2+</div><div className="text-xs text-white/40">Experience</div></div>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <TechStack />

                    {/* Projects */}
                    <div id="projects">
                        <Projects />
                    </div>
                </div>

                {/* Right Panel: Chat Interface */}
                <div className="pointer-events-auto w-full lg:w-1/3 flex flex-col justify-end pb-10">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden p-4 shadow-2xl">
                        <div className="h-60 overflow-y-auto mb-4 space-y-2 pr-2 scrollbar-thin">
                            {messages.length === 0 && <p className="text-white/30 text-sm text-center italic mt-10">Ask my AI twin about my work...</p>}
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-2 px-4 rounded-xl text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-primary/20 border border-primary/30 text-white' : 'bg-white/10 border border-white/5 text-gray-200'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {loading && <div className="text-xs text-primary animate-pulse text-center">Thinking...</div>}
                        </div>

                        <div className="flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                placeholder="Type a message..."
                                className="flex-1 bg-black/20 border-white/10 border rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-white/20"
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading}
                                className="bg-primary hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl px-6 py-2 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
