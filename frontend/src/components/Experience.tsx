'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, Sparkles, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { AvatarModel } from './AvatarModel';

export const Experience = () => {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 30 }}
            className="h-full w-full"
        >
            <color attach="background" args={['#050505']} />

            <Suspense fallback={null}>
                <Environment preset="sunset" />

                <group position-y={-1}>
                    <AvatarModel />
                </group>

                <ContactShadows opacity={0.5} scale={10} blur={1} far={10} resolution={256} color="#000000" />

                <Sparkles count={50} scale={5} size={6} speed={0.4} opacity={0.5} color="#ffa500" />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Suspense>

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
                minPolarAngle={Math.PI / 2.2}
                maxPolarAngle={Math.PI / 2.2}
            />
        </Canvas>
    );
};
