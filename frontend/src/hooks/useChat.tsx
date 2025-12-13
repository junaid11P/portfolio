import { useState } from 'react';




import { useStore } from './useStore';

export const useChat = () => {
    const [cameraZoomed, setCameraZoomed] = useState(false);

    // Global State
    const messages = useStore(state => state.messages);
    const addMessage = useStore(state => state.addMessage);
    const isLoading = useStore(state => state.isLoading);
    const setIsLoading = useStore(state => state.setIsLoading);
    const setGesture = useStore(state => state.setGesture);

    const sendMessage = async (text: string, onAudioReceived?: (audioUrl: string) => void) => {
        setIsLoading(true);
        setGesture(null); // Reset previous gesture
        addMessage({ role: 'user', content: text });

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
                body: JSON.stringify({ message: text, use_gemini_2_5: true }),
            });

            const data = await res.json();

            if (data.error) {
                console.error("Backend Error:", data.error);
                addMessage({ role: 'ai', content: "Error: " + data.error });
                return;
            }

            addMessage({ role: 'ai', content: data.text });

            if (data.audio && onAudioReceived) {
                onAudioReceived(data.audio);
            }

        } catch (err: any) {
            console.error("Chat Error:", err);
            addMessage({ role: 'ai', content: "Error: Connection Failed. Is Backend running?" });
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
