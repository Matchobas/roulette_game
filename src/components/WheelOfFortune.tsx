import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { WheelOptionModel } from "../model/WheelOptionModel";
import { adaptWheelTitle } from "../utils/adaptWheelTitle";

interface WheelOfFortuneProps {
  options: WheelOptionModel[];
  canvasSize: number;
  colors: string[];
}

export function WheelOfFortune({
  options,
  canvasSize,
  colors
}: WheelOfFortuneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spin, setSpin] = useState(false);
  const [winner, setWinner] = useState("Postar no Linkedin");

  if (options.length === 0) {
    // eslint-disable-next-line no-param-reassign
    options = [
      { title: "Yes", percentage: 100 },
      { title: "No", percentage: 100 },
      { title: "Yes", percentage: 100 },
      { title: "No", percentage: 100 },
      { title: "Yes", percentage: 100 },
      { title: "No", percentage: 100 }
    ];
  }

  const optionsChancesSum = useMemo(() => {
    return options.reduce((prev, cur) => {
      const sum = prev + cur.percentage;
      return sum;
    }, 0);
  }, [options]);

  function convertToDegrees(angle: number) {
    return (angle * 180) / Math.PI;
  }

  function textColor(backgroundColor: string) {
    const red = parseInt(backgroundColor.slice(1, 3), 16);
    const green = parseInt(backgroundColor.slice(3, 5), 16);
    const blue = parseInt(backgroundColor.slice(5, 7), 16);

    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

    if (brightness > 128) {
      return "#000000";
    }

    return "#ffffff";
  }

  const frame = useRef(0);
  const framesToSum = useRef(0.5);

  function wheelSlowDown() {
    const rate = 0.3;
    framesToSum.current = rate;
    const animationDurationInSeconds = Math.floor(Math.random() * 8 + 6);
    const smoothnessIndicator = 10;
    const slowdownTicks = animationDurationInSeconds * smoothnessIndicator;
    const speedToReduceByTick = rate / (slowdownTicks - 1);
    for (let t = 1; t <= slowdownTicks; t += 1) {
      setTimeout(() => {
        if (framesToSum.current - speedToReduceByTick > 0) {
          framesToSum.current -= speedToReduceByTick;
        } else {
          framesToSum.current = 0;
        }
      }, (t * 1000) / smoothnessIndicator);
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
    draw.lineWidth = 5;
    draw.setLineDash([]);
    draw.strokeStyle = "#ff88ff";
    draw.stroke();
    draw.lineWidth = 3;
    draw.strokeStyle = "#5f46a5";
    draw.stroke();
    draw.closePath();
    draw.fill();

    draw.beginPath();
    draw.moveTo(x, y - radius - 11);
    draw.lineTo(x - 10, y - radius + 1);
    draw.lineTo(x + 10, y - radius + 1);
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
        circle.arc(
          canvasHalf,
          canvasHalf,
          (4 / 36) * canvasHalf,
          0,
          2 * Math.PI
        );

        canvas.addEventListener("click", (event) => {
          if (ctx.isPointInPath(circle, event.offsetX, event.offsetY)) {
            setSpin(true);
          }
        });
      }
    }
  }

  function drawBackground(
    draw: CanvasRenderingContext2D,
    w: number,
    h: number
  ) {
    draw.clearRect(0, 0, w, h);

    draw.fillStyle = "rgba(63,63,70,1)";
    draw.fillRect(0, 0, w, h);
  }

  const drawWheel = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 2;
      const optionsAmount = options.length;
      const maxAngle = 2 * Math.PI;
      let startAngle = frame.current;
      const endAngle = maxAngle;
      let colorIndex = 0;

      if (ctx) {
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "none";
        drawBackground(ctx, canvas.width, canvas.height);

        for (let i = 0; i < optionsAmount; i += 1) {
          const optionAngle =
            (options[i].percentage / optionsChancesSum) * endAngle + startAngle;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);

          ctx.fillStyle = colors[colorIndex];
          console.log(ctx.fillStyle);
          colorIndex = (colorIndex + 1) % colors.length;
          if (i + 1 === options.length) {
            const [firstColor, secondColor] = colors;
            if (ctx.fillStyle === firstColor) {
              ctx.fillStyle = secondColor;
            }
          }

          ctx.arc(centerX, centerY, radius, startAngle, optionAngle);
          ctx.setLineDash([]);
          ctx.strokeStyle = "#000000";
          ctx.stroke();

          ctx.closePath();
          ctx.fill();

          if (framesToSum.current === 0 && spin) {
            const angleOffset =
              frame.current - Math.floor(frame.current / maxAngle) * maxAngle;
            const firstStartAngle = startAngle - frame.current;

            let finalArcStart = angleOffset + firstStartAngle;
            while (finalArcStart > maxAngle) {
              finalArcStart -= maxAngle;
            }
            const finalArcEnd = finalArcStart + (optionAngle - startAngle);
            if (
              finalArcStart < (3 / 4) * endAngle &&
              finalArcEnd > (3 / 4) * endAngle
            ) {
              setWinner(options[i].title);
              setSpin(false);
            }
          }

          const [textAngle, textStart, adaptedFontSizeNumber] = adaptWheelTitle(
            options[i].title,
            startAngle,
            optionAngle,
            radius
          );
          ctx.font = `${adaptedFontSizeNumber}px Arial`;

          ctx.fillStyle = textColor(ctx.fillStyle);
          ctx.translate(centerX, centerY);
          ctx.rotate(textAngle);
          ctx.fillText(options[i].title, textStart, 0);
          ctx.rotate(-textAngle);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          startAngle = optionAngle;
        }

        drawSpinButton(ctx, centerX, centerY, (4 / 36) * radius);

        if (spin && framesToSum.current !== 0) {
          frame.current += framesToSum.current;
          requestAnimationFrame(drawWheel);
        }
      }
    }
  }, [options, spin, framesToSum, colors]);

  useEffect(() => {
    if (spin) {
      wheelSlowDown();
    }
    drawWheel();
  }, [options, spin, colors]);

  useEffect(() => {
    addSpinButtonListener();
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
      {winner && (
        <section className="min-w-[50%] h-[30%] px-6 whitespace-nowrap flex flex-col items-center justify-center bg-gray-800 fixed top-1/2 left-1/2 opacity-95 rounded-md transform -translate-x-1/2 -translate-y-1/2">
          <span className="h-3/4 flex items-center justify-center text-5xl text-white font-extrabold">
            {winner}
          </span>
          <div className="h-1/4 flex items-center">
            <button
              type="button"
              className="bg-slate-200 p-2 rounded-lg mb-8 font-medium"
              onClick={() => setWinner("")}
            >
              Close
            </button>
          </div>
        </section>
      )}
    </>
  );
}
