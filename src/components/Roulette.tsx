import React, { useEffect, useMemo, useRef } from "react";
import { RoulleteOption } from "../model/RoulleteOption";

interface RouletteProps {
  options: RoulleteOption[];
}

export function Roulette({ options }: RouletteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const optionsChancesSum = useMemo(() => {
    return options.reduce((prev, cur) => {
      return prev += cur.percentage;
    }, 0);
  }, [options]);

  useEffect(() => {
    if (canvasRef.current) {
      const colors = ["#000000", "#ffffff", "#808080"];
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 200;
      const optionsAmount = options.length;
      let startAngle = 0;
      let endAngle = 2 * Math.PI;
      let colorIndex = 0;

      if (ctx) {
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "none";

        if (optionsAmount === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.fillStyle = "#808080";
            ctx.arc(centerX, centerY, radius, startAngle, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        } else {
          for (let i = 0; i < optionsAmount; i++) {
            const optionAngle = (options[i].percentage / optionsChancesSum) * endAngle + startAngle;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
  
            ctx.fillStyle = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
            if (i + 1 === options.length) {
              if (ctx.fillStyle === colors[0]) {
                ctx.fillStyle = colors[1];
              }
            }
  
            ctx.arc(centerX, centerY, radius, startAngle, optionAngle);
            ctx.closePath();
            ctx.fill();

            // const textAngle = (endAngle - optionAngle) / 2;
            // const rotateAmount = textAngle * Math.PI / 180;
            // ctx.fillStyle = colors[colorIndex + 1];

            startAngle = optionAngle;
          }
        }
        
        ctx.fillStyle = "#000000";
        for (let a = 0; a < 360; a += 10) {
          ctx.translate(centerX, centerY);
          ctx.rotate(a * Math.PI / 180);
          ctx.fillText("Hello, World!", 0, 0);
          ctx.rotate(-a * Math.PI / 180);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }

        // const angleInDegrees = 90;
        // const angleInRadians = angleInDegrees * Math.PI / 180;
        // ctx.rotate(angleInRadians);

        // // Calculate the position of the text based on the angle and radius
        // const x = radius * Math.cos(endAngle - angleInRadians / 2) + centerX;
        // const y = radius * Math.sin(endAngle - angleInRadians / 2) + centerY;

        // // centerX + x, -centerY + 90
        // ctx.fillText("Hello, World!", centerX + x, -centerY);
        // ctx.rotate(-angleInRadians);
      }
    }
  }, [optionsChancesSum]);

  return (
    <canvas ref={canvasRef} width={400} height={400} />
  )
}