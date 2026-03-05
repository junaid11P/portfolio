'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, Sparkles, Float, MeshDistortMaterial } from '@react-three/drei';
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

                {/* 3D Background - High Visual Impact, Low Load */}
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <mesh scale={[8, 8, 8]} position={[0, 0, -8]}>
                        <sphereGeometry args={[1, 32, 32]} />
                        <MeshDistortMaterial
                            color="#0a0a0a"
                            speed={2}
                            distort={0.3}
                            radius={1}
                            opacity={0.8}
                            transparent
                        />
                    </mesh>
                </Float>

                <group position-y={-1}>
                    <AvatarModel />
                </group>

                <ContactShadows opacity={0.5} scale={10} blur={1} far={10} resolution={256} color="#000000" />

                <Sparkles count={30} scale={5} size={3} speed={0.3} opacity={0.4} color="#ffa500" />
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
