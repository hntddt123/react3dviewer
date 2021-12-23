import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

export default function Melon(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    'textures/Fabric021_1K-JPG/Fabric021_1K_Color.jpg',
    'textures/Fabric021_1K-JPG/Fabric021_1K_Displacement.jpg',
    'textures/Fabric021_1K-JPG/Fabric021_1K_NormalGL.jpg',
    'textures/Fabric021_1K-JPG/Fabric021_1K_Roughness.jpg',
    'textures/Fabric021_1K-JPG/Fabric021_1K_Opacity.jpg',
  ]);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState([0, 0, 0]);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.y += 0.005));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [2, 2, 2] : [1, 1, 1]}
      onClick={(e) => {
        setActive(!active);
      }}
      onPointerOver={(e) => {
        setHover(true);
        setPosition([0, 2, 0]);
        setTimeout(() => {
          setPosition([0, 0, 0]);
        }, 1000);
      }}
      onPointerOut={(e) => {
        setHover(false);
      }}
      position={position}
    >
      <sphereGeometry attach="geometry" args={[1, 20, 20]} />
      <meshStandardMaterial
        map={colorMap}
        displacementScale={0}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
        attach="material"
        color={hovered ? 'green' : 'lightgreen'}
      />
    </mesh>
  );
}
