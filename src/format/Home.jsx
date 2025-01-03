import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const StarrySky = () => {
  const starRef = useRef();

  // Create stars
  const stars = Array.from({ length: 1000 }).map(() => [
    (Math.random() - 0.5) * 100, // x
    (Math.random() - 0.5) * 100, // y
    (Math.random() - 0.5) * 100  // z
  ]);

  return (
    <points ref={starRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={stars.length}
          array={new Float32Array(stars.flat())}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="white" />
    </points>
  );
};

// BlenderModel component for loading GLB models
const BlenderModel = ({ modelPath, position, scale, initialRotation }) => {
  const modelRef = useRef();

  // Load the GLB model
  const { scene } = useGLTF(modelPath);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={position}
      scale={scale}
      rotation={initialRotation}
    />
  );
};

const Home = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw', background: 'black' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} />

      <Suspense fallback={null}>
        {/* Load the GLB model */}
        <BlenderModel
          modelPath="/src/assets/la_night_city.glb" // Update to your GLB file path
          position={[0, 0, 0]} // Center position
          scale={1} // Adjust scale as needed
          initialRotation={[0, 0, 0]} // Adjust rotation as needed
        />
        {/* Add the starry sky */}
        <StarrySky />
      </Suspense>

      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default Home;
