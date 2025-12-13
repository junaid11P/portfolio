'use client';

import { motion } from 'framer-motion';

interface Props {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const GlassCard = ({ children, className = "", onClick }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClick}
            className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl ${className}`}
        >
            {children}
        </motion.div>
    );
};
