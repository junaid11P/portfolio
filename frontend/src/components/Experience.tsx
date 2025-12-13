'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
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
