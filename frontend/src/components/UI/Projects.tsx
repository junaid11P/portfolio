'use client';

import { GlassCard } from './GlassCard';

const projects = [
    {
        title: "AI Guru J: 3D Virtual Python Tutor",
        desc: "An immersive 3D educational platform featuring a virtual avatar that teaches Python interactively. Built to revolutionize online learning with AI guidance.",
        tech: ["Python", "Three.js", "AI", "React"],
        link: "https://aiguruj-s8fa.onrender.com"
    },
    {
        title: "MERN Auction Platform",
        desc: "Real-time bidding system ensuring secure transactions and live updates. Features user authentication, payment integration, and dynamic bid management.",
        tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
        link: "https://github.com/junaid11P/MERN_Auction"
    },
    {
        title: "Face Emotion Recognition",
        desc: "Deep Learning CNN model capable of detecting real-time human emotions (Happy, Sad, Neutral) with high accuracy for interactive systems.",
        tech: ["Python", "TensorFlow", "OpenCV", "Deep Learning"],
        link: "https://github.com/junaid11P/FaceEmotionRecognition"
    }
];

export const Projects = () => {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white/80">Featured Projects</h3>
            <div className="grid grid-cols-1 gap-4">
                {projects.map((project, i) => (
                    <GlassCard
                        key={i}
                        className="hover:bg-white/10 transition-colors group cursor-pointer group"
                        onClick={() => project.link && window.open(project.link, '_blank')}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{project.title}</h4>
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{project.tech[0]}</span>
                        </div>
                        <p className="text-sm text-white/60 mb-3">{project.desc}</p>
                        <div className="flex gap-2">
                            {project.tech.map(t => (
                                <span key={t} className="text-[10px] text-white/40 border border-white/5 px-2 py-0.5 rounded-full">{t}</span>
                            ))}
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};
