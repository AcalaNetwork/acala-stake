import React, { useState, useEffect } from 'react';

interface ToggleProps {
  initial?: boolean;
  onActive: () => void;
  onInactive: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({ onActive, onInactive, initial = true }) => {
  const [firstLoaded, setFirstLoaded] = useState(true);
  const [active, setActive] = useState(initial);

  useEffect(() => {
    if (active) {
      onActive();
    } else {
      onInactive();
    }
  }, [active]);

  return (
    <div
      className='cursor-pointer'
      onClick={() => {
        if (firstLoaded) {
          setFirstLoaded(false);
        }
        setActive(!active);
      }}
    >
      <div
        className={`${active ? '' : 'hidden'} ${
          firstLoaded ? '' : 'animate-ping-once'
        } absolute w-52 h-24 px-2 rounded-full bg-primary`}
        id='toggle-effect'
      ></div>
      <div
        className={`flex flex-row items-center px-2 w-52 h-24 p-1 border border-ABAAB9 rounded-full cursor-pointer ${
          active ? 'bg-primary justify-end' : ' bg-d6d3de justify-start'
        }`}
      >
        <div className='w-20 h-20 rounded-full bg-white z-10'></div>
      </div>
    </div>
  );
};
