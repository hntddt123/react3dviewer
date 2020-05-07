import React from 'react';
import { Canvas } from 'react-three-fiber'

import './App.css';
import Box from './components/box';
import Plane from './components/plane';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          3D object viewer
        </h2>
        <Canvas
          pixelRatio={window.devicePixelRatio}
          camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 2] }}
        >
          {/* <ambientLight /> */}
          <pointLight position={[-1, 2, 2]} />
          <Box position={[0, 0, 0]} />
          <Box position={[5, 0, 0]} />
          <Plane rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -3, 0]} />
        </Canvas>
      </header>
    </div>
  );
}

export default App;
