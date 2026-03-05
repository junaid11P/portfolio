'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, Sparkles, Float, MeshDistortMaterial } from '@react-three/drei';
import { Suspense } from 'react';
import { AvatarModel } from './AvatarModel';

export const Background = () => {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 30 }}
            className="h-full w-full"
        >
            <color attach="background" args={['#050505']} />

            <Suspense fallback={null}>
                <Environment preset="sunset" />

                {/* Neural Architecture Background - Interactive & Premium */}
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <group position={[0, 0, -10]}>
                        {/* Outer Wireframe - Technical feel */}
                        <mesh scale={[12, 12, 12]} rotation={[Math.PI / 4, 0, 0]}>
                            <icosahedronGeometry args={[1, 1]} />
                            <meshBasicMaterial color="#f97316" wireframe opacity={0.1} transparent />
                        </mesh>

                        {/* Inner Core - Pulsing AI Energy */}
                        <mesh scale={[6, 6, 6]}>
                            <sphereGeometry args={[1, 32, 32]} />
                            <MeshDistortMaterial
                                color="#111111"
                                speed={4}
                                distort={0.4}
                                radius={1}
                                metalness={0.8}
                                roughness={0.2}
                            />
                        </mesh>

                        {/* Floating Data Nodes */}
                        {[...Array(5)].map((_, i) => (
                            <Float key={i} speed={3} rotationIntensity={2} floatIntensity={2}>
                                <mesh
                                    position={[
                                        Math.sin(i * 1.5) * 4,
                                        Math.cos(i * 1.5) * 4,
                                        Math.sin(i * 3) * 2
                                    ]}
                                    scale={[0.2, 0.2, 0.2]}
                                >
                                    <boxGeometry />
                                    <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={2} />
                                </mesh>
                            </Float>
                        ))}
                    </group>
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
