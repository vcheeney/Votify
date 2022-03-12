import { CreateTypes, Options } from "canvas-confetti";
import React, { FC, useCallback, useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

function getAnimationSettings(): Options {
  return {
    particleCount: 150,
    spread: 180,
    startVelocity: 90,
    angle: 90,
    origin: { x: 0.5, y: 1 },
    colors: ["#2196f3", "#1e88e5", "#1976d2"],
  };
}

export const GoVoteConfetti: FC = () => {
  const refAnimationInstance = useRef<CreateTypes | null>(null);

  const getInstance = useCallback((instance: CreateTypes | null) => {
    refAnimationInstance.current = instance;
  }, []);

  useEffect(() => {
    if (refAnimationInstance.current) {
      const instance = refAnimationInstance.current as CreateTypes;
      instance(getAnimationSettings());
    }
  }, [refAnimationInstance.current]);

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    />
  );
};
