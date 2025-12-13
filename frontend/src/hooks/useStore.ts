import { create } from 'zustand';


type Message = {
    role: 'user' | 'ai';
    content: string;
};

interface State {
    audioUrl: string | null;
    isPlaying: boolean;
    isLoading: boolean;
    gesture: string | null;
    messages: Message[];
    setAudioUrl: (url: string | null) => void;
    setIsPlaying: (playing: boolean) => void;
    setIsLoading: (loading: boolean) => void;
    setGesture: (gesture: string | null) => void;
    addMessage: (message: Message) => void;
}

export const useStore = create<State>()((set) => ({
    audioUrl: null,
    isPlaying: false,
    isLoading: false,
    gesture: null,
    messages: [],
    setAudioUrl: (url) => set({ audioUrl: url }),
    setIsPlaying: (playing) => set({ isPlaying: playing }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setGesture: (gesture) => set({ gesture }),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
