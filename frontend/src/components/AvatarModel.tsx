'use client';

import { useStore } from '@/hooks/useStore';
import { useGLTF, useAnimations, useFBX } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Working default avatar (Ready Player Me)
const AVATAR_URL = "/models/693d19c1fe6f676b660f9eb3.glb";

export const AvatarModel = (props: any) => {
    const group = useRef<THREE.Group>(null);
    const { scene } = useGLTF(AVATAR_URL);

    // Load Animations
    const { animations: idleAnimation } = useFBX('/animations/Breathing Idle.fbx');
    const { animations: talkingAnimation } = useFBX('/animations/Talking.fbx');
    // const { animations: thinkingAnimation } = useFBX('/animations/Thinking.fbx'); // REMOVED
    const { animations: saluteAnimation } = useFBX('/animations/Salute.fbx');
    const { animations: thankfulAnimation } = useFBX('/animations/Thankful.fbx');

    // Name Animations
    // Name Animations
    idleAnimation[0].name = "Idle";
    talkingAnimation[0].name = "Talking";
    // thinkingAnimation[0].name = "Thinking";
    saluteAnimation[0].name = "Salute";
    thankfulAnimation[0].name = "Thankful";

    const { actions } = useAnimations(
        [
            idleAnimation[0],
            talkingAnimation[0],
            // thinkingAnimation[0],
            saluteAnimation[0],
            thankfulAnimation[0]
        ],
        group
    );

    const [animation, setAnimation] = useState("Idle");
    const audioUrl = useStore(state => state.audioUrl);
    const isPlaying = useStore(state => state.isPlaying);
    const isLoading = useStore(state => state.isLoading);
    const gesture = useStore(state => state.gesture);

    // Animation State Logic
    useEffect(() => {
        if (gesture) {
            setAnimation(gesture);
        } else if (isPlaying) {
            setAnimation("Talking");
        } else {
            setAnimation("Idle");
        }
    }, [isPlaying, isLoading, gesture]);

    // Handle Animation Transition
    useEffect(() => {
        const action = actions[animation];
        if (action) {
            action.reset().fadeIn(0.5).play();
            // Loop logic
            if (animation === "Salute" || animation === "Thankful") {
                action.setLoop(THREE.LoopOnce, 1);
                action.clampWhenFinished = true;
            } else {
                action.setLoop(THREE.LoopRepeat, Infinity);
            }
            return () => {
                action.fadeOut(0.5);
            }
        }
    }, [animation, actions]);

    // Simple Audio Playback
    useEffect(() => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play()
                .then(() => useStore.getState().setIsPlaying(true))
                .catch(e => console.error("Audio play failed", e));

            audio.onended = () => useStore.getState().setIsPlaying(false);
        }
    }, [audioUrl]);

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={scene} />
        </group>
    );
};

// Preload
if (typeof window !== 'undefined') {
    useGLTF.preload(AVATAR_URL);
    useFBX.preload('/animations/Breathing Idle.fbx');
    useFBX.preload('/animations/Talking.fbx');
    // useFBX.preload('/animations/Thinking.fbx');
    useFBX.preload('/animations/Salute.fbx');
    useFBX.preload('/animations/Thankful.fbx');
}
