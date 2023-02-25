import React, { useEffect, useRef } from "react";

export function Roulette() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 240;

      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, 0, 0.3 * Math.PI);
        ctx.closePath();

        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      }
    }
  }, []);

  return (
    <canvas ref={canvasRef} width={500} height={500} />
  )
}