import { useEffect, useState } from 'react';

const useWSADSpaceControls = () => {
  const keys = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    Space: 'jump',
  };

  const moveFieldByKey = (key) => keys[key];

  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      setMovement((move) => ({ ...move, [moveFieldByKey(event.code)]: true }));
    };
    const handleKeyUp = (event) => {
      setMovement((move) => ({ ...move, [moveFieldByKey(event.code)]: false }));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
};

export default useWSADSpaceControls;
