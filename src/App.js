import React from 'react';
import { Canvas } from 'react-three-fiber'

import './App.css';
import Box from './components/box';
import Plane from './components/plane';
import Melon from './components/Melon';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          3D object viewer
        </h2>
        <div style={{ width: 800, height: 500, backgroundColor: "black" }}>
          <Canvas
            pixelRatio={window.devicePixelRatio}
            camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1, 6] }}
          >
            <ambientLight intensity={0.2} />
            <pointLight position={[-1, 2, 2]} />
            <Melon position={[0, 0, 0]} />
            <Box position={[-4, 0, 0]} />
            <Box position={[4, 0, 0]} />
            <Plane rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -3, 0]} />
          </Canvas>
        </div>
      </header>
    </div>
  );
}

export default App;
