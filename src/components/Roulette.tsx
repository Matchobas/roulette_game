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
      const divisor = 8;
      let startAngle = 0;
      let endAngle = Math.PI / divisor;

      if (ctx) {
        const arcsAmount = divisor * 2;
        for (let i = 0; i < arcsAmount; i++) {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          if (i % 2 === 0) {
            ctx.fillStyle = "#FFFFFF";
          } else {
            ctx.fillStyle = "#000000";
          }
          ctx.arc(centerX, centerY, radius, startAngle, endAngle);
          startAngle += Math.PI / divisor;
          endAngle += Math.PI / divisor;
          ctx.closePath();
          ctx.fill();
        }

        ctx.fillStyle = "#000000";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "none";

        const angleInDegrees = 90;
        const angleInRadians = angleInDegrees * Math.PI / 180;
        ctx.rotate(angleInRadians);

        // Calculate the position of the text based on the angle and radius
        const x = radius * Math.cos(endAngle - angleInRadians / 2) + centerX;
        const y = radius * Math.sin(endAngle - angleInRadians / 2) + centerY;

        // centerX + x, -centerY + 90
        ctx.fillText("Hello, World!", centerX + x, -centerY);
        ctx.rotate(-angleInRadians);
      }
    }
  }, []);

  return (
    <canvas ref={canvasRef} width={400} height={400} />
  )
}