/* eslint-disable no-shadow */
import React, { useRef, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import { PointMaterial } from '@react-three/drei';

function getRandomIntFrom(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Stars({ pointCount }) {
  const starsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const positions = [];
    const colors = [];

    for (let index = 0; index < pointCount; index++) {
      const x0 = getRandomIntFrom(-1, 1);
      const x1 = getRandomIntFrom(-1, 1);
      const x2 = getRandomIntFrom(-1, 1);
      const x3 = getRandomIntFrom(-1, 1);
      const x0123Squared = (x0 ** 2)
        + (x1 ** 2)
        + (x2 ** 2)
        + (x3 ** 2);

      const x = (2 * ((x1 * x3) + (x0 * x2)))
        / x0123Squared;
      const y = (2 * ((x2 * x3) - (x0 * x1)))
        / x0123Squared;
      const z = (x0 ** 2 + x3 ** 2 - x1 ** 2 - x2 ** 2)
        / x0123Squared;

      if (x0123Squared >= 1
      ) {
        positions.push(x * 100);
        positions.push(y * 100);
        positions.push(z * 100);

        colors.push(0.8);
        colors.push(0.8);
        colors.push(0.8);
      }
    }

    return [new Float32Array(positions), new Float32Array(colors)];
  }, [pointCount]);

  useFrame(() => {
    starsRef.current.rotation.y += 0.00005;
    starsRef.current.rotation.x += 0.00005;
  });

  return (
    <points
      ref={starsRef}
      positions={positions}
    >
      <pointsMaterial
        transparent
        attach="material"
        vertexColors
        size={8}
        sizeAttenuation={false}
      />
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3} // [0, 0, 0] 1 point
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          ref={starsRef}
          attachObject={['attributes', 'color']}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
}
