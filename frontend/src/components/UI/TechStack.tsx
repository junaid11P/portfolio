'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techCategories = [
    {
        title: "🚀 Frontend Development",
        skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "React Three Fiber", "Bootstrap", "UI/UX Design Tools"]
    },
    {
        title: "💻 Backend Development",
        skills: ["Node.js", "Express.js", "FastAPI", "REST API Development"]
    },
    {
        title: "🛢️ Databases",
        skills: ["MongoDB / Atlas", "MySQL", "Hasura", "Nhost"]
    },
    {
        title: "🤖 AI / ML / Data",
        skills: ["TensorFlow", "Keras", "OpenCV", "NumPy", "Pandas", "CNN Models", "Computer Vision", "Python for AI", "Gemini 2.5 Flash", "Rhubarb Lip Sync", "TikTok TTS"]
    },
    {
        title: "🎨 3D / Graphics",
        skills: ["Three.js", "React Three Fiber", "Blender", "CAD tools", "Character Rigging", "Lip Sync (Rhubarb)"]
    },
    {
        title: "🧪 Automation / Low-Code",
        skills: ["n8n", "Workato", "iPaaS", "Data Integration", "Business Process Automation", "Data Orchestration", "API Management", "Agentic AI Development", "Hasura GraphQL", "Nhost Auth", "Netlify Deployment"]
    },
    {
        title: "🧰 DevOps / Tools",
        skills: ["Git & GitHub", "Jupyter Notebook", "VS Code", "Browser DevTools", "Render / Netlify"]
    },
    {
        title: "🔌 Robotics / Hardware",
        skills: ["Arduino", "ESP32", "Micro:bit", "Sensors", "3D Printing"]
    },
    {
        title: "🔧 Systems",
        skills: ["System Admin", "Networking Basics", "OS Config"]
    }
];

export const TechStack = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % techCategories.length);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(timer);
    }, []);

    const category = techCategories[index];

    return (
        <div className="w-full py-6">
            <h3 className="text-2xl font-bold mb-4 text-white/90">Tech Stack</h3>
            <div className="relative h-40 overflow-hidden"> {/* Fixed height container */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col justify-center"
                    >
                        <h4 className="font-bold text-primary mb-3 text-sm uppercase tracking-wider">{category.title}</h4>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, j) => (
                                <span key={j} className="text-xs text-white/70 bg-black/20 px-2 py-1 rounded border border-white/5 hover:border-primary/30 transition-colors">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-2">
                {techCategories.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-primary' : 'w-2 bg-white/20'}`}
                    />
                ))}
            </div>
        </div>
    );
};
