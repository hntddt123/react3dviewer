import React from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';
import { usePlane } from '@react-three/cannon';

export default function Plane(props) {
  const [planeRef] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));

  return (
    <mesh ref={planeRef} receiveShadow {...props}>
      <planeGeometry attach="geometry" args={[100, 100, 1, 1]} />
      <MeshReflectorMaterial
        blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
        mixBlur={1} // How much blur mixes with surface roughness (default = 1)
        mixStrength={0.6} // Strength of the reflections
        mixContrast={0.9} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.5} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        debug={0}
        /* Depending on the assigned value, one of the following channels is shown:
           0 = no debug
           1 = depth channel
           2 = base channel
           3 = distortion channel
           4 = lod channel (based on the roughness)
        */
        reflectorOffset={0.2}
      // Offsets the virtual camera that projects the reflection.
      // Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>
  );
}
