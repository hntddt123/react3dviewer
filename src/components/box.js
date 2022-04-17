import React, { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

export default function Box(props) {
  // This reference will give us direct access to the mesh
  const [meshRef] = useBox(() => ({ mass: 1, position: [0, 5, 0], linearDamping: 0.125, ...props }));

  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    'textures/PavingStones092_1K-JPG/PavingStones092_1K_Color.jpg',
    'textures/PavingStones092_1K-JPG/PavingStones092_1K_Displacement.jpg',
    'textures/PavingStones092_1K-JPG/PavingStones092_1K_NormalGL.jpg',
    'textures/PavingStones092_1K-JPG/PavingStones092_1K_Roughness.jpg',
    'textures/PavingStones092_1K-JPG/PavingStones092_1K_AmbientOcclusion.jpg',
  ]);

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? [2, 2, 2] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        map={colorMap}
        displacementScale={0}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
        attach="material"
        color={hovered ? 'green' : 'orange'}
      />
    </mesh>
  );
}
