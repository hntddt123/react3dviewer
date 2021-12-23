import React from 'react';

export default function Plane({ ...props }) {
  return (
    <mesh {...props} receiveShadow>
      <planeGeometry attach="geometry" args={[20, 20, 1, 1]} />
      <meshStandardMaterial attach="material" color="#448844" />
    </mesh>
  );
}
