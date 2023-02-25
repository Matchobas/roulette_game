import React, { useEffect, useRef } from "react";

export function Roulette() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");

    const centerX = canvas!.width / 2;
    const centerY = canvas!.height / 2;
    const radius = 200;

    ctx?.beginPath();
    ctx?.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx?.stroke();
  }, []);

  return (
    <canvas ref={canvasRef} width={500} height={500} />
  )
}