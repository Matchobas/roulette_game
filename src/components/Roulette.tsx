import { useEffect, useMemo, useRef, useState } from "react";
import { RoulleteOption } from "../model/RoulleteOption";

interface RouletteProps {
  options: RoulleteOption[];
  spin: boolean;
  stopSpin: () => void;
}

export function Roulette({ options, spin, stopSpin }: RouletteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const optionsChancesSum = useMemo(() => {
    return options.reduce((prev, cur) => {
      return prev += cur.percentage;
    }, 0);
  }, [options]);

  function convertToDegrees(angle: number) {
    return angle * 180 / Math.PI;
  }

  function textColor(color: string) {
    if (color === ("#000000" || "#808080")) {
      return "#ffffff";
    } else {
      return "#000000";
    }
  }

  const frame = useRef(0);
  const framesToSum = useRef(0.4);

  function rouletteSlowDown() {
    const rate = 0.5;
    framesToSum.current = rate;
    for(let t = 1; t < rate * 10 + 1; t++) {
      setTimeout((time = t) => {
        if (time === rate * 10) {
          framesToSum.current = 0;
          stopSpin();
        } else {
          framesToSum.current = framesToSum.current - 0.1;
        }
        console.log(framesToSum.current);
      }, t * 1000);  
    }
  }

  function drawRoulette() {
    if (canvasRef.current) {
      const colors = ["#000000", "#ffffff", "#808080"];
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 250;
      const optionsAmount = options.length;
      let startAngle = frame.current;
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

            const textAngle = ((optionAngle - startAngle) / 2) + startAngle;
            const textWidth = options[i].title.length;
            const textStart = radius / 2 - (textWidth * 5) <= 0 ? 5 : radius / 2 - (textWidth * 5);
            const adaptedFontSizeNumber = 20 - (5 * Math.floor(textWidth / 20));
            ctx.font = `${adaptedFontSizeNumber}px Arial`;
            
            ctx.fillStyle = textColor(ctx.fillStyle);
            ctx.translate(centerX, centerY);
            ctx.rotate(textAngle);
            ctx.fillText(options[i].title, textStart, 0);
            ctx.rotate(-textAngle);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            startAngle = optionAngle;
          }
        }

        if (spin) {
          frame.current += framesToSum.current;
        }

        requestAnimationFrame(drawRoulette);
      }
    }
  }

  useEffect(() => {
    drawRoulette();
  }, [optionsChancesSum, spin]);

  useEffect(() => {
    if (spin) rouletteSlowDown();
  }, [spin]);

  return (
    <canvas ref={canvasRef} width={500} height={500} />
  )
}