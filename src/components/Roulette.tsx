import React, { useEffect, useRef } from "react";

export function Roulette() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 200;
      const startAngle = 0;
      const endAngle = (3 * Math.PI) / 4;

      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        ctx.fillStyle = "#000000";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "none";

        const angleInDegrees = 135 / 2;
        const angleInRadians = angleInDegrees * Math.PI / 180;
        ctx.rotate(angleInRadians);

        // Calculate the position of the text based on the angle and radius
        const x = radius * Math.cos(endAngle - angleInRadians / 2) + centerX;
        const y = radius * Math.sin(endAngle - angleInRadians / 2) + centerY;

        ctx.fillText("Hello, World!", centerX + x, -centerY + 90);
        ctx.rotate(-angleInRadians);
      }
    }
  }, []);

  return (
    <canvas ref={canvasRef} width={400} height={400} />
  )
}