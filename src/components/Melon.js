import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';

export default function Melon(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.y += 0.005));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [2, 2, 2] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <sphereGeometry attach="geometry" args={[1, 20, 20]} />
      <meshStandardMaterial attach="material" color={hovered ? 'green' : 'lightgreen'} />
    </mesh>
  );
}
