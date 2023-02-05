import React, { useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import * as THREE from "three";

export const Background = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          THREE: THREE,
          touchControls: true,
          gyroControls: false,
          minHeight: 865,
          minWidth: 100,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0x557795,
          color1: 0xbbbbbb,
          color2: 0x18d0f4
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div ref={vantaRef}>
      <p style={{ color: "#fff", paddingTop: "20px" }}>
        
      </p>
    </div>
  );
};

export default Background;
