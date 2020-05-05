import React from 'react';
import Box from './components/box';
import { Canvas } from 'react-three-fiber'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          3D object viewer
        </p>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-5, 0, -2]} />
          <Box position={[5, 0, -3]} />
        </Canvas>
      </header>
    </div>
  );
}

export default App;
