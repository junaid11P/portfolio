import { create } from 'zustand';

interface State {
    audioUrl: string | null;
    isPlaying: boolean;
    isLoading: boolean;
    gesture: string | null;
    setAudioUrl: (url: string | null) => void;
    setIsPlaying: (playing: boolean) => void;
    setIsLoading: (loading: boolean) => void;
    setGesture: (gesture: string | null) => void;
}

export const useStore = create<State>((set) => ({
    audioUrl: null,
    isPlaying: false,
    isLoading: false,
    gesture: null,
    setAudioUrl: (url) => set({ audioUrl: url }),
    setIsPlaying: (playing) => set({ isPlaying: playing }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setGesture: (gesture) => set({ gesture }),
}));
