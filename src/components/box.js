import React, { useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'

export default function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.y += 0.005))

  return (
    <mesh
      visible
      userData={{ test: 'hello' }}
      position={[10, 2, -3]}
      rotation={[0, 0, 0]}
      {...props}
      ref={mesh}
      scale={active ? [5, 5, 5] : [4, 4, 4]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <sphereGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'green' : 'orange'} />
    </mesh>
  )
}
