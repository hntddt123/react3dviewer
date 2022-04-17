import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import './App.css';
import Box from './components/Box';
import Plane from './components/Plane';
import Melon from './components/Melon';
import Stars from './components/Stars';

// TODO: 855988 6b4984 483475 2b2f77 141852 070b34 gradient
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: '98%', height: '98%', position: 'absolute', backgroundColor: '#000000' }}>
          <Canvas
            shadows
            camera={{ fov: 70, near: 0.2, far: 1000, position: [0, 1, 5] }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.1} />
              <pointLight position={[-2, 5, 0]} castShadow />
              <Physics
                defaultContactMaterial={{ restitution: 0.7 }}
              >
                <Melon />
                <Box position={[-4, 0, 0]} />
                <Box position={[-4, 1, 0]} />
                <Box position={[-4, 2, 0]} />
                <Box position={[4, 0, 0]} />
                <Plane rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1.5, 0]} />
              </Physics>
              <Stars pointCount={700} />
              <OrbitControls makeDefault target={[0, 0, 0]} />
            </Suspense>
          </Canvas>
        </div>
      </header>
    </div>
  );
}

export default App;
