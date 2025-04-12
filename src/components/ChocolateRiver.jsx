
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ChocolateFluid = () => {
  const meshRef = useRef();
  const materialRef = useRef();
  
  // Créer une texture pour le chocolat
  const textureLoader = new THREE.TextureLoader();
  const chocolateDisplacementMap = useRef(null);
  
  React.useEffect(() => {
    // Simuler une texture de déplacement pour le chocolat
    const size = 128;
    const data = new Uint8Array(size * size);
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const index = i * size + j;
        data[index] = Math.floor(Math.random() * 50) + 100; // Valeurs plus élevées pour simuler une surface ondulée
      }
    }
    
    const displacementMap = new THREE.DataTexture(data, size, size, THREE.LuminanceFormat, THREE.UnsignedByteType);
    displacementMap.needsUpdate = true;
    chocolateDisplacementMap.current = displacementMap;
    
    if (materialRef.current) {
      materialRef.current.displacementMap = displacementMap;
      materialRef.current.displacementScale = 0.5;
    }
  }, []);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotation et mouvement lent simulant le fluide de chocolat
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
      
      // Mettre à jour la position des vertices pour simuler l'écoulement
      if (meshRef.current.geometry.attributes.position) {
        const positions = meshRef.current.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] = Math.sin(positions[i] * 0.5 + state.clock.elapsedTime * 0.5) * 0.1 + 
                            Math.sin(positions[i + 2] * 0.5 + state.clock.elapsedTime * 0.3) * 0.1;
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[30, 30, 64, 64]} />
      <meshStandardMaterial 
        ref={materialRef}
        color="#4a2511" 
        roughness={0.3}
        metalness={0.1}
        side={THREE.DoubleSide}
        displacementScale={0.5}
      />
    </mesh>
  );
};

const ChocolateRiver = () => {
  return (
    <div className="chocolate-river-container fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} />
        <ChocolateFluid />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default ChocolateRiver;
