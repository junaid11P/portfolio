import { useState } from 'react';


type Message = {
    role: 'user' | 'ai';
    content: string;
};

import { useStore } from './useStore';

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [cameraZoomed, setCameraZoomed] = useState(false);

    // Global State
    const isLoading = useStore(state => state.isLoading);
    const setIsLoading = useStore(state => state.setIsLoading);
    const setGesture = useStore(state => state.setGesture);

    const sendMessage = async (text: string, onAudioReceived?: (audioUrl: string) => void) => {
        setIsLoading(true);
        setGesture(null); // Reset previous gesture
        setMessages((prev) => [...prev, { role: 'user', content: text }]);

        // Gesture Logic
        const lowerText = text.toLowerCase();
        if (lowerText.includes("hi") || lowerText.includes("hello")) {
            setGesture("Salute");
            setTimeout(() => setGesture(null), 3000); // Reset after 3s
        } else if (lowerText.includes("thank")) {
            setGesture("Thankful");
            setTimeout(() => setGesture(null), 3000);
        }

        try {
            // Call Backend
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
            });

            const data = await res.json();

            if (data.error) {
                console.error("Backend Error:", data.error);
                setMessages((prev) => [...prev, { role: 'ai', content: "Error: " + data.error }]);
                return;
            }

            setMessages((prev) => [...prev, { role: 'ai', content: data.text }]);

            if (data.audio && onAudioReceived) {
                onAudioReceived(data.audio);
            }

        } catch (err: any) {
            console.error("Chat Error:", err);
            setMessages((prev) => [...prev, { role: 'ai', content: "Error: Connection Failed. Is Backend running?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        loading: isLoading,
        sendMessage,
        cameraZoomed,
        setCameraZoomed
    };
};
