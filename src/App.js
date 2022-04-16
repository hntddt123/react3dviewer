import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

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
        <h2>
          3D object viewer
        </h2>
        <div style={{ width: '95%', height: 500, backgroundColor: '#000000' }}>
          <Canvas
            shadows
            pixelRatio={window.devicePixelRatio}
            camera={{ fov: 70, near: 0.2, far: 1000, position: [0, 1, 5] }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.1} />
              <pointLight position={[-2, 5, 0]} />
              <Melon />
              <Box position={[-4, 0, 0]} />
              <Box position={[4, 0, 0]} />
              <Stars pointCount={700} />
              <Plane rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1.5, 0]} />
              <OrbitControls makeDefault target={[0, 0, 0]} />
            </Suspense>
          </Canvas>
        </div>
      </header>
    </div>
  );
}

export default App;
