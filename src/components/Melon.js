import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Vector3 } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useSphere } from '@react-three/cannon';

import useWSADSpaceControls from '../hooks/useWSADSpaceControls';
import melonColor from '../../public/textures/Fabric021_1K-JPG/Fabric021_1K_Color.jpg';
import melonDisplacement from '../../public/textures/Fabric021_1K-JPG/Fabric021_1K_Displacement.jpg';
import melonNormal from '../../public/textures/Fabric021_1K-JPG/Fabric021_1K_NormalGL.jpg';
import melonRoughness from '../../public/textures/Fabric021_1K-JPG/Fabric021_1K_Roughness.jpg';
import melonOpacity from '../../public/textures/Fabric021_1K-JPG/Fabric021_1K_Opacity.jpg';

console.log(melonColor);
console.log(melonDisplacement);
console.log(melonNormal);
console.log(melonRoughness);
console.log(melonOpacity);

export default function Melon(props) {
  // This reference will give us direct access to the mesh
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    melonColor,
    melonDisplacement,
    melonNormal,
    melonRoughness,
    melonOpacity,
  ]);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState([0, 0, 0]);

  const [melonRef, api] = useSphere(() => ({
    mass: 1,
    position: position,
    type: 'Dynamic',
    linearDamping: 0.35,
    angularDamping: 0.7,
    ...props
  }));

  const { forward, backward, left, right, jump } = useWSADSpaceControls();

  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => {
      velocity.current = v;
    });
    return unsubscribe;
  }, []);

  useFrame(() => {
    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (backward ? 1 : 0) - (forward ? 1 : 0)
    );

    const sideVector = new Vector3(
      (left ? 1 : 0) - (right ? 1 : 0),
      0,
      0
    );

    const upVector = new Vector3(
      0,
      (jump ? 6 : velocity.current[1]), // jump use 6 or use gravity
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(6);

    if (!forward && !backward && !left && !right && !jump) {
      api.velocity.set(velocity.current[0], velocity.current[1], velocity.current[2]);
    } else {
      api.velocity.set(direction.x, upVector.y, direction.z);
    }
  });

  return (
    <mesh
      {...props}
      castShadow
      ref={melonRef}
      scale={active ? [2, 2, 2] : [1, 1, 1]}
      onClick={(e) => {
        setActive(!active);
      }}
      onPointerOver={(e) => {
        setHover(true);
        setPosition([0, 1, 0]);
        setTimeout(() => {
          setPosition([0, 0, 0]);
        }, 2000);
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
