/* eslint-disable no-shadow */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

function getRandomIntFrom(min, max) {
  return Math.random() * (max - min) + min;
}

function generateStars(pointCount) {
  const positions = [];

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
    }
  }

  return [new Float32Array(positions)];
}

export default function Stars({ pointCount }) {
  const starsRef = useRef();

  const [positions] = useMemo(() => generateStars(pointCount), [pointCount]);

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
        color="orange"
        size={4}
        sizeAttenuation={false}
      />
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3} // [0, 0, 0] 1 point
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
}
