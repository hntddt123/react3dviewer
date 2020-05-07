import React from 'react'

export default function Plane({ ...props }) {
  return (
    <mesh {...props} receiveShadow>
      <planeGeometry attach="geometry" args={[30, 30, 1, 1]} />
      <meshStandardMaterial attach="material" color="#FFFFFF" />
    </mesh>
  )
}