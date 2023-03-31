import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WheelOptionModel } from "../model/WheelOptionModel";

interface WheelOfFortuneProps {
  options: WheelOptionModel[];
}

export function WheelOfFortune({ options }: WheelOfFortuneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spin, setSpin] = useState(false);
  const [winner, setWinner] = useState("");

  if (options.length === 0) {
    options = [
      { title: "Yes", percentage: 100 }, { title: "No", percentage: 100 }, 
      { title: "Yes", percentage: 100 }, { title: "No", percentage: 100 },
      { title: "Yes", percentage: 100 }, { title: "No", percentage: 100 },
    ]
  }

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
  const framesToSum = useRef(0.5);

  function wheelSlowDown() {
    const rate = 0.5;
    framesToSum.current = rate;
    const animationDuration = 10;
    for(let t = 1; t <= animationDuration; t++) {
      if (t < 5) {
        setTimeout(() => {
          framesToSum.current = framesToSum.current - 0.1;
        }, t * 1000);
      } else {
        setTimeout((time = t) => {
          if (time === animationDuration) {
            framesToSum.current = 0;
            setSpin(false);
          } else {
            framesToSum.current = framesToSum.current - (0.1 / 6);
          }
        }, t * 1000);
      }
    }
  }

  function drawSpinButton(
    draw: CanvasRenderingContext2D, 
    x: number, 
    y: number,
    radius: number
  ) {
    draw.beginPath();
    draw.moveTo(x, y);
    draw.fillStyle = "#ca75fb";
    draw.arc(x, y, radius, 0, 2 * Math.PI);
    draw.lineWidth = 4;
    draw.setLineDash([]);
    draw.strokeStyle = "#blue";
    draw.stroke();
    draw.closePath();
    draw.fill();

    draw.beginPath();
    draw.moveTo(x, y - radius - 11);
    draw.lineTo(x - 10, y - radius + 1);
    draw.lineTo(x + 10,  y - radius + 1);
    draw.closePath();
    draw.fill();

    draw.fillStyle = "white";
    draw.font = "bold 16px Arial";
    draw.textAlign = "center";
    draw.fillText("SPIN", x, y);

    draw.lineWidth = 1;
  }

  function addSpinButtonListener() {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const canvasHalf = canvas.width / 2;

      if (ctx) {
        const circle = new Path2D();
        circle.arc(canvasHalf, canvasHalf, 4/36 * canvasHalf, 0, 2 * Math.PI);

        canvas.addEventListener('click', function(event) {
          if (ctx.isPointInPath(circle, event.offsetX, event.offsetY)) {
            setSpin(true);
          }
        });
      }
    }
  }

  const drawWheel = useCallback(() => {
    if (canvasRef.current) {
      const colors = ["#000000", "#ffffff", "#808080"];
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 2;
      const optionsAmount = options.length;
      const maxAngle = 2 * Math.PI;
      let startAngle = frame.current;
      let endAngle = maxAngle;
      let colorIndex = 0;

      if (ctx) {
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "none";
        
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
          ctx.setLineDash([]);
          ctx.strokeStyle = "#blue";
          ctx.stroke();

          ctx.closePath();
          ctx.fill();

          if (framesToSum.current === 0) {
            const angleOffset = frame.current - (Math.floor(frame.current / maxAngle) * maxAngle);
            const firstStartAngle = startAngle - frame.current;

            let finalArcStart = angleOffset + firstStartAngle;
            while (finalArcStart > maxAngle) {
              finalArcStart = finalArcStart - maxAngle;
            }
            const finalArcEnd = finalArcStart + (optionAngle - startAngle);
            if (finalArcStart < 3/4 * endAngle && finalArcEnd > 3/4 * endAngle) {
              setWinner(options[i].title);
            }
          }

          const textAngle = ((optionAngle - startAngle) / 2) + startAngle;
          const textWidth = options[i].title.length;
          const textStart = radius / 2 - (textWidth * 5) <= 30 ? 40 : radius / 2 - (textWidth * 4);
          const betterFontSize = 20 - (5 * Math.floor(textWidth / 20));
          const adaptedFontSizeNumber = betterFontSize > 8 ? 20 - (5 * Math.floor(textWidth / 20)) : 8;
          ctx.font = `${adaptedFontSizeNumber}px Arial`;
          
          ctx.fillStyle = textColor(ctx.fillStyle);
          ctx.translate(centerX, centerY);
          ctx.rotate(textAngle);
          ctx.fillText(options[i].title, textStart, 0);
          ctx.rotate(-textAngle);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          startAngle = optionAngle;
        }

        drawSpinButton(ctx, centerX, centerY, 4/36 * radius);

        if (spin && framesToSum.current !== 0) {
          frame.current += framesToSum.current;
          requestAnimationFrame(drawWheel);
        }
      }
    }
  }, [optionsChancesSum, spin, framesToSum]);

  useEffect(() => {
    if (spin) {
      wheelSlowDown();
    }
    drawWheel();
  }, [optionsChancesSum, spin]);

  useEffect(() => {
    addSpinButtonListener();
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width={600} height={600} />
      {winner && (
        <div className="w-[40%] h-[30%] flex flex-col items-center justify-center bg-gray-800 fixed top-1/2 left-1/2 opacity-95 rounded-md transform -translate-x-1/2 -translate-y-1/2">
          <span className='h-3/4 flex items-center text-5xl text-white font-extrabold'>{winner}</span>
          <div className="h-1/4 flex items-center">
            <button
              type="button" 
              className="bg-slate-200 p-2 rounded-lg mb-8 font-medium"
              onClick={() => setWinner("")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}